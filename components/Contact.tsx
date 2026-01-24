import React from 'react';
import { Section } from './Section';
import { Mail, Linkedin, Github } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <Section id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Get In Touch</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Whether you have a question, a job opportunity, or just want to say hi, my inbox is always open.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 flex flex-col justify-center">
            <a href="mailto:eli@example.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 rounded-lg hover:bg-accent transition-colors">
              <div className="p-3 bg-accent text-primary rounded-full group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email Me</h3>
                <p className="text-muted-foreground">floresca.darlellisong@gmail.com</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/darlfloresca/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 rounded-lg hover:bg-accent transition-colors">
              <div className="p-3 bg-accent text-primary rounded-full group-hover:scale-110 transition-transform">
                <Linkedin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">LinkedIn</h3>
                <p className="text-muted-foreground">Darl Ellison Floresca</p>
              </div>
            </a>

            <a href="https://github.com/elli1216" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 rounded-lg hover:bg-accent transition-colors">
              <div className="p-3 bg-accent text-primary rounded-full group-hover:scale-110 transition-transform">
                <Github size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">GitHub</h3>
                <p className="text-muted-foreground">@elli1216</p>
              </div>
            </a>
          </div>

          {/* Simple Form */}
          <form className="bg-card p-8 rounded-2xl shadow-lg border space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-input border focus:ring-2 focus:ring-ring focus:outline-none transition-shadow text-foreground"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-input border focus:ring-2 focus:ring-ring focus:outline-none transition-shadow text-foreground"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-input border focus:ring-2 focus:ring-ring focus:outline-none transition-shadow text-foreground resize-none"
                placeholder="Hello Eli, I'd like to discuss..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};