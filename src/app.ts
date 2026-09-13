import express, { type Request, type Response } from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import cardRouter from "./routes/CardRoutes.js";
import userCardsRouter from "./routes/UserCardsRoutes.js";
import boosterRouter from "./routes/BoosterRoutes.js";
import { boosterDropRateRouter } from "./routes/BoosterDropRate.js";
import userRouter from "./routes/UserRoutes.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Allow cookies to be sent with requests
}));
const currentDirectory = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(join(currentDirectory, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(currentDirectory, "../public/index.html"));
});
app.use("/api/auth", authRoute);
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