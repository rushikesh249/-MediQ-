// @ts-ignore
import Tesseract from "tesseract.js";
const { PDFParse } = require("pdf-parse");
import fs from "fs";

export const extractTextFromImage = async (imagePath: string): Promise<string> => {
    try {
        const { data: { text } } = await Tesseract.recognize(imagePath, "eng");
        return text;
    } catch (error) {
        console.error("OCR Error:", error);
        throw new Error("Failed to extract text from image");
    }
};

export const extractTextFromPDF = async (pdfPath: string): Promise<string> => {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const parser = new PDFParse({ data: dataBuffer });
        const data = await parser.getText();
        return data.text;
    } catch (error) {
        console.error("PDF Parse Error:", error);
        throw new Error("Failed to extract text from PDF");
    }
};
