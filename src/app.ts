import express, { type Request, type Response } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cardRouter from "./routes/CardRoutes.js";
import userCardsRouter from "./routes/UserCardsRoutes.js";
import boosterRouter from "./routes/BoosterRoutes.js";
import { boosterDropRateRouter } from "./routes/BoosterDropRate.js";
import userRouter from "./routes/UserRoutes.js";

const app = express();
const currentDirectory = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(join(currentDirectory, "public")));

app.use("/api/cards", cardRouter);
app.use("/api/users", userRouter);
app.use("/api/users", userCardsRouter);
app.use("/api/boosters", boosterRouter);
app.use("/api/boosters", boosterDropRateRouter);

// 3. Health check simple
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;