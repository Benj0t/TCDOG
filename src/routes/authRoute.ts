import {Router} from "express";
import { authDiscordController } from "../controllers/auth/AuthDiscordController.js";
import { authGoogleController } from "../controllers/auth/AuthGoogleController.js";
import { authLoginController } from "../controllers/auth/AuthLoginController.js";

const authRoute = Router();
authRoute.post("/discord", authDiscordController);
authRoute.post("/google", authGoogleController);
authRoute.get("/login", authLoginController);
export default authRoute;