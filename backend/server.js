import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();  // 🔒 Load API key from .env file

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // ✅ Secretly stored in .env
});

app.post("/get-recipe", async (req, res) => {
    try {
        const ingredients = req.body.ingredients;
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: `You are a recipe assistant...`,
            messages: [{ role: "user", content: `I have ${ingredients}. Suggest a recipe.` }]
        });

        res.json({ recipe: msg.content[0].text });
    } catch (error) {
        console.error("API request failed:", error);
        res.status(500).json({ error: "API request failed" });
    }
});

app.listen(3001, () => console.log("✅ Backend running on port 3001"));
