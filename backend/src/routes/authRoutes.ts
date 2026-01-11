import express from "express";
import { registerUser, authUser, getPatients } from "../controllers/authController";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", authUser);
router.get("/patients", getPatients);

export default router;
