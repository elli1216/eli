import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  isRateLimited,
  formatChatHistory,
  getFunctionCalls,
  executeFunctionCall,
  systemInstruction,
  tools,
} from './utils.js';

// This acts as a Serverless Function
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Identify client IP
  const clientIp = 
    req.headers['x-forwarded-for'] || 
    req.socket?.remoteAddress || 
    'unknown-ip';

  if (isRateLimited(clientIp as string)) {
    console.warn(`[Nova Chat API] Rate limit exceeded for IP: ${clientIp}`);
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  try {
    const { message, history } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash-lite',
      systemInstruction: systemInstruction,
      tools: tools,
    });

    const formattedHistory = formatChatHistory(history);
    
    // Add the current user message to the history
    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    // Use generateContent instead of startChat to manually manage roles and avoid SDK 'function' role bugs
    let result = await model.generateContent({ contents: formattedHistory });

    // Handle function calls loop
    let callCount = 0;
    const MAX_CALLS = 5;

    while (getFunctionCalls(result.response).length > 0 && callCount < MAX_CALLS) {
      callCount++;
      
      // The model made a function call. We must append its response to history so it has context.
      const candidateContent = result.response.candidates?.[0]?.content;
      if (candidateContent) {
        // Ensure role is explicitly model
        candidateContent.role = 'model';
        formattedHistory.push(candidateContent);
      }

      const calls = getFunctionCalls(result.response);
      const functionResponses = [];

      for (const call of calls) {
        const functionResponseData = executeFunctionCall(call);

        functionResponses.push({
          functionResponse: {
            name: call.name,
            response: functionResponseData,
          },
        });
      }

      // Append the function execution results as a 'user' role message (as required by newer Gemini APIs)
      formattedHistory.push({ role: 'user', parts: functionResponses });

      // Call generateContent again with updated history
      result = await model.generateContent({ contents: formattedHistory });
    }

    return res.status(200).json({ text: result.response.text() });
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
