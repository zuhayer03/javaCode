import express from "express";
import { randomUUID } from "crypto";
import { generateArguments } from "../services/openaiClient.js";
import { getDebate, saveDebate } from "../store/memoryStore.js";

const router = express.Router();

function validateCreatePayload(body) {
  const { topic, mode } = body;

  if (typeof topic !== "string" || topic.trim().length < 10) {
    return "Topic must be a string with at least 10 characters.";
  }

  if (!["aiOpponent", "aiJudge"].includes(mode)) {
    return 'Mode must be either "aiOpponent" or "aiJudge".';
  }

  return null;
}

// Route for creating a debate and generating AI arguments.
router.post("/create", async (req, res) => {
  const validationError = validateCreatePayload(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { topic, mode } = req.body;
    const generated = await generateArguments({ topic: topic.trim(), mode });

    const record = {
      id: randomUUID(),
      topic: topic.trim(),
      mode,
      pro: generated.pro,
      con: generated.con,
      judge: generated.judge,
      createdAt: new Date().toISOString(),
    };

    saveDebate(record);

    return res.json({
      id: record.id,
      pro: record.pro,
      con: record.con,
      judge: record.judge,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to generate debate arguments." });
  }
});

// Route for retrieving one in-memory debate by id for the results page.
router.get("/:id", (req, res) => {
  const debate = getDebate(req.params.id);

  if (!debate) {
    return res.status(404).json({ error: "Debate result not found." });
  }

  return res.json(debate);
});

export default router;
