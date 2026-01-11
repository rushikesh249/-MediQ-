import { Request, Response } from "express";
import ollama from "ollama";
import fs from "fs";
import { extractTextFromImage, extractTextFromPDF } from "../services/ocrService";

export const analyzeReport = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }

        const { path: filePath, mimetype } = req.file;
        let extractedText = "";

        if (mimetype.startsWith("image/")) {
            extractedText = await extractTextFromImage(filePath);
        } else if (mimetype === "application/pdf") {
            extractedText = await extractTextFromPDF(filePath);
        } else {
            res.status(400).json({ message: "Unsupported file type" });
            // Cleanup
            fs.unlinkSync(filePath);
            return;
        }

        // Clean up uploaded file after extraction
        fs.unlinkSync(filePath);

        if (!extractedText.trim()) {
            res.status(400).json({ message: "Could not extract text from the document" });
            return;
        }

        const prompt = `
      You are a helpful medical assistant. 
      Analyze the following medical report or symptoms text.
      1. Explain it in extremely simple, easy-to-understand language for a non-educated person. Avoid complex jargon.
      2. Suggest which specialist doctor they should consult.

      Medical Text:
      "${extractedText}"

      Format your response as a JSON object with the following keys:
      - "explanation": "The simple explanation..."
      - "specialist": "Cardiologist" (or typically relevant specialist)
      - "urgency": "High", "Medium", or "Low" (based on severity)
      - "dietPlan": "A simple list of nutritional advice or action plan."
      - "followUpQuestions": ["Question 1?", "Question 2?"] (2-3 relevant follow-up questions the patient might ask)
    `;

        const response = await ollama.chat({
            model: "llama3.2",
            messages: [{ role: "user", content: prompt }],
            format: "json",
        });

        const aiResponse = JSON.parse(response.message.content);

        res.json(aiResponse);

    } catch (error: any) {
        console.error("AI Analysis Error:", error);
        res.status(500).json({ message: "Failed to analyze report", error: error.message });
    }
};
