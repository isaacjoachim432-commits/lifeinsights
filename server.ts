import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = 3000;

// Middleware for JSON parsing
app.use(express.json());

// Lazy-initialized Gemini Client to prevent crashes if key is initially absent
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY_FOR_BUILD_ONLY", // safe fallback for compiling
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. AI Coach Chat Session Proxy
app.post("/api/ai/coach", async (req, res) => {
  try {
    const { coachPrompt, message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing required 'message' in request body." });
    }

    const ai = getGeminiClient();

    // Map the standard message history to the Gemini chats schema
    // Roles must be "user" or "model" (not "ai" or "assistant")
    const formattedHistory = Array.isArray(history) 
      ? history.map((msg: any) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        }))
      : [];

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: coachPrompt || "You are a professional life coach.",
        temperature: 0.7,
      },
      history: formattedHistory
    });

    const response = await chatInstance.sendMessage({ message: message });
    
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Coach system error:", error);
    res.status(500).json({ error: error?.message || "Internal server error occurred while invoking Gemini." });
  }
});

// 2. Expand Daily Insight Depth
app.post("/api/ai/expand-insight", async (req, res) => {
  try {
    const { insight, userQuestion } = req.body;

    if (!insight) {
      return res.status(400).json({ error: "Missing required 'insight' object." });
    }

    const ai = getGeminiClient();

    const prompt = `
      You are an expert growth coach. Take the following daily wisdom insight and provide a deep, highly personalized expansion.
      
      Insight Title: ${insight.title}
      Category: ${insight.categoryLabel}
      Explanation: ${insight.simpleExplanation}
      Action Step: ${insight.actionStep}
      
      User's specific context/question: "${userQuestion || "Can you expand on how I can apply this in modern high-stress situations?"}"
      
      Please structure your response with elegant markdown, including:
      1. **Subtle Psychological Depth**: Why our minds resist this lesson.
      2. **Alternative Actionable Blueprint**: One customized, concrete, micro-routine they can start doing in 2 minutes.
      3. **The Micro-Win**: What to expect in 24 hours if they follow this step.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.75,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Expand Insight API error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate expansion text from Gemini." });
  }
});

// 3. AI Powered Custom Book Generator (Search and Grounding for genuine lessons)
app.post("/api/ai/generate-book-summary", async (req, res) => {
  try {
    const { bookTitle, bookAuthor } = req.body;

    if (!bookTitle) {
      return res.status(400).json({ error: "Missing required 'bookTitle'." });
    }

    const ai = getGeminiClient();

    const prompt = `
      Perform a comprehensive deep check of the popular personal development/psychology/business book called "${bookTitle}" ${bookAuthor ? `by ${bookAuthor}` : ""}.
      
      Provide a highly accurate, fully realized book profile, outline, and summary including key practical takeaways.
      Return the output as a valid raw JSON object matching the following structure exactly (without enclosing backticks like \`\`\`json, do NOT prefix it, just raw valid JSON):
      {
        "title": "The exact book title",
        "author": "The author names",
        "category": "The main category (e.g., Habits & Productivity, Financial Wisdom, Psychology)",
        "oneSentence": "One elegant, powerful one-sentence thesis of the book.",
        "summary": "A cohesive 2-paragraph summary explaining the core message of the book.",
        "lessons": [
          { "title": "First Critical Lesson Name", "description": "Highly actionable detail" },
          { "title": "Second Critical Lesson Name", "description": "Highly actionable detail" },
          { "title": "Third Critical Lesson Name", "description": "Highly actionable detail" }
        ],
        "favoriteQuotes": [
          "Curated famous quote 1",
          "Curated famous quote 2"
        ],
        "takeaways": [
          "Practical micro-action or mental exercise 1",
          "Practical micro-action or mental exercise 2",
          "Practical micro-action or mental exercise 3"
        ],
        "recommendation": "A friendly personal recommendation expressing exactly who needs to read this book."
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, // Low temperature for high structural precision
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("Book summary generation error:", error);
    res.status(500).json({ error: error?.message || "Failed to compile book data with Gemini." });
  }
});

// ==========================================
// STATIC FRONTEND ASSETS & VITE SERVING
// ==========================================

async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware attached.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from dist.");
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}).catch((err) => {
  console.error("Vite startup failed:", err);
});
