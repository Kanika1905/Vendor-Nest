import express from "express";
import authRoutes from "./auth.routes.js";

const router = express.Router();

// All auth related APIs
router.use("/auth", authRoutes);

export default router;
