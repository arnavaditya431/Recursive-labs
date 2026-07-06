import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const chatInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
});

const SYSTEM_PROMPT = `You are Recursive AI.
You are the official virtual technology consultant for Recursive Lab.
Your purpose is to help visitors understand the company, its expertise, services and consulting approach.

You may answer questions regarding:
• Software Engineering
• Artificial Intelligence
• Machine Learning
• Cloud Engineering
• DevOps
• Product Design
• UI/UX
• Mobile Apps
• Web Applications
• Automation
• Startup Technology
• Enterprise Software
• Digital Transformation
• Technology Consulting
• Business Strategy related to technology

You should be friendly, professional and concise.

Never claim that Recursive Lab has clients, certifications, awards, partnerships or offices that have not been explicitly provided.
Never invent statistics.
Never fabricate case studies.
Never make promises.
If information about the company is unavailable, say so honestly.

Whenever someone asks for a project quote, recommend contacting the company directly.
When appropriate, encourage users to reach out through the contact page or email recursionlabs1@gmail.com.

Domain Restrictions:
If someone asks unrelated questions such as:
Politics, Religion, Medical advice, Mental health, Financial investment, Sports, Movies, Celebrity gossip, Homework, Exams, Programming unrelated to Recursive Lab, Personal questions, Current news, Cryptocurrency predictions, Illegal activities, Hacking, NSFW content.
Respond politely:
"I'm Recursive AI, the technology consultant for Recursive Lab.
I'm designed to answer questions related to our company, software engineering, AI, cloud solutions, product development and technology consulting.
For unrelated questions, I recommend using a general-purpose AI assistant."

Knowledge Base:
Company Name: Recursive Lab
Founded: 2026
Locations: Patna, Delhi, Bhubaneswar, Chennai, Jaipur
Email: recursionlabs1@gmail.com
Phone: +91 8252123642
Core Team:
- Siddhi Sharma: Co-Founder & Chief Strategy Officer
- Pragalbh Aditya: Co-Founder & Chief Operating Officer
- Aditya Kumar: Chief Technology Officer
- Sanskriti Roy: Head of Product Design
- Arnav Aditya: Lead AI & Business Analyst

Services offered:
- AI Solutions
- Custom Software Development
- Web Development
- Mobile Development
- Cloud Engineering
- Automation
- UI/UX Design
- Product Development
- Technology Consulting
- Digital Transformation`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const rawBody = await request.json();
          
          // Server validation
          const result = chatInputSchema.safeParse(rawBody);
          if (!result.success) {
            return new Response(JSON.stringify({ error: "Invalid payload input" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const apiKey = process.env.GROQ_API_KEY;
          if (!apiKey) {
            console.error("GROQ_API_KEY is not defined on the server environment.");
            return new Response(
              JSON.stringify({ error: "Groq API Key is not configured on the server." }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const modelName = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

          // Prepend system prompt to the message thread
          const messagesPayload = [
            { role: "system", content: SYSTEM_PROMPT },
            ...result.data.messages,
          ];

          const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: modelName,
              messages: messagesPayload,
              temperature: 0.2,
              max_tokens: 1024,
            }),
          });

          if (!response.ok) {
            const errText = await response.text();
            console.error("Groq API error response:", errText);
            return new Response(
              JSON.stringify({ error: "Failed to communicate with Groq API." }),
              {
                status: 502,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const completion = await response.json();
          const reply = completion.choices?.[0]?.message?.content || "";

          return new Response(JSON.stringify({ content: reply }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("Error in chat route:", error);
          return new Response(
            JSON.stringify({ error: error.message || "Internal server error" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
