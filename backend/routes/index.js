// routes/index.js
import express from "express";
import authRoutes from "./auth.routes.js";
import categoryRoutes from "./category.routes.js";

const router = express.Router();

// All auth related APIs
router.use("/auth", authRoutes);

// All category related APIs
router.use("/categories", categoryRoutes);

export default router;
