import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import debateRoutes from "./routes/debate.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api/debate", debateRoutes);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
