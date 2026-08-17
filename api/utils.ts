import {
  EXPERIENCE_DATA,
  PROJECT_DATA,
  SKILL_DATA,
  EDUCATION,
  NAMES,
  certificates,
  PERSONAL_DATA,
} from '../src/constants/constants.js';

// ==========================================
// Rate Limiting
// ==========================================
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15; // Max 15 requests per minute per IP

/**
 * Checks if the given IP address has exceeded the rate limit.
 * @param ip - The client's IP address
 * @returns boolean indicating if the request is rate-limited
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(ip);

  // Periodically clean up expired entries to prevent memory leaks
  if (rateLimitCache.size > 1000) {
    for (const [key, val] of rateLimitCache.entries()) {
      if (now > val.resetTime) rateLimitCache.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// ==========================================
// Chat History Normalizer
// ==========================================
/**
 * Formats and normalizes the chat history to be compatible with Gemini.
 * Removes UI auto-messages and combines consecutive messages of the same role.
 */
export function formatChatHistory(history: any[]): any[] {
  const formattedHistory: any[] = [];

  for (const msg of history) {
    const role = msg.role === 'user' ? 'user' : 'model';

    // Filter out known automated UI messages to prevent model confusion
    if (
      role === 'model' &&
      (msg.content.startsWith("Hi! I'm Nova") ||
        msg.content.startsWith("You're sending messages too fast") ||
        msg.content.startsWith("Sorry, I'm having trouble connecting"))
    ) {
      continue;
    }

    const last = formattedHistory[formattedHistory.length - 1];
    if (last && last.role === role) {
      // Combine consecutive messages of the same role
      last.parts[0].text += '\n\n' + msg.content;
    } else {
      formattedHistory.push({
        role,
        parts: [{ text: msg.content }],
      });
    }
  }

  // Ensure history starts with 'user'
  if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
    formattedHistory.shift();
  }

  // Ensure history ends with 'model' (since the next action is user sending a message)
  if (
    formattedHistory.length > 0 &&
    formattedHistory[formattedHistory.length - 1].role === 'user'
  ) {
    formattedHistory.pop();
  }

  return formattedHistory;
}

// ==========================================
// Function Calling Configuration & Utilities
// ==========================================
export const systemInstruction = `
You are the official AI Assistant for Darl Ellison Floresca (Eli)'s personal developer portfolio.

<names>
The developer also has the following names:
  ${JSON.stringify(NAMES, null, 2)}
</names>

<role_and_objective>
Your primary purpose is to assist visitors by answering questions strictly about his background, skills, work experience, projects, education, hackathons, and technical services.
</role_and_objective>

<strict_guardrails>
1. SCOPE BOUNDARY: You MUST ONLY answer questions related to Eli, Eli's work, experience, projects, skills, or hiring/contacting Eli.
2. REFUSAL POLICY: If the user asks about off-topic subjects (e.g., general programming help, math, recipes, news), politely decline.
3. DATA RETRIEVAL: You DO NOT have the portfolio data injected directly in your prompt. You MUST use the provided tools/functions to retrieve the required information (PersonalData, Experience, Projects, Skills) BEFORE answering the user's question. Call the relevant function(s) based on what the user is asking.
4. HONESTY & FACTUALITY: Only state facts returned by the functions. If a function returns data that doesn't contain the specific detail, state that you don't know. Do not hallucinate or fabricate details.
</strict_guardrails>

<response_style>
- Tone: Warm, professional, concise, and helpful.
- Format: Use clean Markdown formatting (bullet points, bold keywords) when listing projects or skills.
- Project Links: When discussing a project that has a demoLink or repoLink, include them as standard Markdown links like [Live Demo](url) or [GitHub Repository](url).
- Call to Action: When users ask about hiring or collaborating, guide them to reach out via the Contact section.
</response_style>
`;

export const tools = [
  {
    functionDeclarations: [
      {
        name: 'getPersonalData',
        description: 'Get basic personal data, education, and interests.',
      },
      {
        name: 'getCertificatesData',
        description: 'Get certificates and their description.',
      },
      {
        name: 'getExperience',
        description: 'Get professional work experience, roles, and company details.',
      },
      {
        name: 'getProjects',
        description: 'Get portfolio projects, tech stacks, links, and descriptions.',
      },
      {
        name: 'getSkills',
        description: 'Get technical skills, languages, and technologies.',
      },
    ],
  },
];

/**
 * Extracts function calls safely from the Gemini SDK response
 */
export const getFunctionCalls = (response: any) => {
  if (typeof response.functionCalls === 'function') {
    return response.functionCalls() || [];
  } else if (Array.isArray(response.functionCalls)) {
    return response.functionCalls;
  }
  return [];
};

/**
 * Executes a requested function call and maps data appropriately
 */
export function executeFunctionCall(call: any): Record<string, any> {
  console.log(`[Nova Chat API] Triggered function call: ${call.name}`);
  try {
    if (call.name === 'getExperience') {
      return {
        experience: EXPERIENCE_DATA.map((e) => ({
          role: e.role,
          company: e.company,
          period: e.period,
          description: e.description,
        })),
      };
    } else if (call.name === 'getProjects') {
      return {
        projects: PROJECT_DATA.map((p) => ({
          title: p.title,
          role: p.position,
          problem: p.problem,
          description: p.description,
          techStack: p.techStack,
          demoLink: p.demoLink,
          repoLink: p.repoLink,
        })),
      };
    } else if (call.name === 'getSkills') {
      return { skills: SKILL_DATA.map((s) => s.name) };
    } else if (call.name === 'getPersonalData') {
      return {
        personal_data: PERSONAL_DATA,
      };
    } else if (call.name === 'getCertificatesData') {
      return {
        certificates: certificates.map((c) => ({
          issuer: c.issuer,
          certificate_name: c.alt,
        })),
      };
    } else {
      console.warn(`[Nova Chat API] Unrecognized function call: ${call.name}`);
      return { error: 'Function not recognized' };
    }
  } catch (e) {
    console.error(`[Nova Chat API] Error executing ${call.name}:`, e);
    return { error: 'Failed to retrieve data' };
  }
}
