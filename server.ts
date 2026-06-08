import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
      console.log("GoogleGenAI initialized successfully on Amazon 2030 server.");
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI:", err);
    }
  } else {
    console.log("No valid GEMINI_API_KEY found, running Rufus Assistant in smart-fallback simulation.");
  }

  // API endpoints
  app.post("/api/chat", async (req, res) => {
    const { messages, productsContext } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Default simulation if Gemini client is unavailable
    if (!ai) {
      const lastUserMessage = messages[messages.length - 1]?.text?.toLowerCase() || '';
      let reply = "Greetings! I'm Rufus, your holographic AI shopping assistant. Under current diagnostics mode (Gemini key pending), I can guide you through our standard catalog:\n\n";

      if (lastUserMessage.includes('ring') || lastUserMessage.includes('sero')) {
        reply += "Our **Sero Smart Ring Active ($249.00)** is quite spectacular! It tracks biometrics like VO2, heart rate variability, and neural focus metrics with up to 8 days of battery. It is crafted in aerospace Class 4 titanium.";
      } else if (lastUserMessage.includes('headphone') || lastUserMessage.includes('soundcore') || lastUserMessage.includes('audio')) {
        reply += "I highly recommend the **Soundcore Space One Pro over-ear headphones ($199.99)**. They feature custom silk diaphragms, adaptive noise cancelling (52dB), and neural spatial tracking for perfect celestial acoustics.";
      } else if (lastUserMessage.includes('deal') || lastUserMessage.includes('discount')) {
        reply += "Today's hot deals include:\n- **Echo Show 10** for $149.99 (-40% off!)\n- **iRobot Roomba Combo j7+** at $269.99 (-33% off!)\n- **Owala FreeSip Hydration Bottle** at $31.99 (-20% off!).";
      } else if (lastUserMessage.includes('delivery') || lastUserMessage.includes('arrive') || lastUserMessage.includes('drone')) {
        reply += "Your current order of the **Owala FreeSip Bottle** and **Carbonite Smart Journal** is dispatched under drone Argo-4, flying over Seattle. It is scheduled to arrive at your bio-safe balcony hatch between 1:30 PM & 3:30 PM today!";
      } else {
        reply += "We have excellent items in our 2030 collection. You can purchase the **Breville Barista Touch Impress with Auto MilQ ($899.95)**, the **Spectral Augmented Glasses 2.0 ($299.00)**, or the **AeroSolar Power Charger ($189.99)**. Try clicking on any items on your dashboard to see full tech specs!";
      }

      reply += "\n\n*Note: To experience real-time neural thinking with Gemini 3.5 Flash, simply add your GEMINI_API_KEY in the Secrets panel!*";
      return res.json({ text: reply });
    }

    try {
      const systemInstruction = `You are "Rufus", the extremely intelligent, friendly, and witty holographic AI shopping assistant for Amazon in the year 2030.
In the year 2030, shopping is highly predictive, conversational, and futuristic. Deliveries are made via sub-orbital drones and sub-second hyperloops.
You represent Amazon's commitment to tech innovation, human connection, and green sustainability.
Be enthusiastic, snappy, and use professional markdown (such as bold headers, lists, bullet points, mini specs-tables).
Ground your suggestions strictly in our available catalog:
${productsContext || ''}

If the user inquires about other items, explain that Amazon 2030 can procure them within hours via sub-orbital logistics, but suggest matching items from our live stock!
Make interactions cheerful. You represent the cozy premium experience on our Amazon 2030 digital platform. Keep responses concise yet complete.`;

      // Translate standard message history to Gemini API format
      // filter out timestamp and other complex structures
      const contents = messages.map((m: any) => {
        const isUser = m.sender === 'user';
        return {
          role: isUser ? 'user' : 'model',
          parts: [{ text: m.text }]
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Sub-space relay completed, but text was empty. How else may I direct your Seattle purchases?";
      return res.json({ text: replyText });
    } catch (err: any) {
      console.error("Error calling GoogleGenAI:", err);
      return res.json({
        text: `My cognitive circuits are experiencing minor sub-space static: ${err.message || "Interference"}. Please double-check your API key credentials at Secrets.`
      });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server mounted as Express middleware.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static production assets from dist/ folder.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Amazon 2030 Server successfully online at http://0.0.0.0:${PORT}`);
  });
}

startServer();
