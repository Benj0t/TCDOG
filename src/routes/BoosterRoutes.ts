import { Router } from "express";
import { BoosterController } from "../controllers/BoosterController.js";

const boosterRouter = Router();

boosterRouter.get("/", BoosterController.getAllBoosters);
boosterRouter.get("/:boosterId", BoosterController.getBoosterById);
boosterRouter.post("/", BoosterController.createBooster);
boosterRouter.put("/:boosterId", BoosterController.updateBooster);
boosterRouter.delete("/:boosterId", BoosterController.deleteBooster);

export default boosterRouter;