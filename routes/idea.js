import express from "express";
import { getIdeas, createIdea, deleteIdea } from "../controllers/idea.js";

const router = express.Router();

router.get("/ideas", getIdeas);

router.post("/ideas", createIdea);

router.delete("/ideas/:ideaId", deleteIdea);

export default router;
