import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/authRoutes";
import aiRoutes from "./routes/aiRoutes";

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Placeholder for routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
