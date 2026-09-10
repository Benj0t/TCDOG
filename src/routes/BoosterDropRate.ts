import {Router} from "express";
import {BoosterDropRateController} from "../controllers/BoosterDropRateController.js";

export const boosterDropRateRouter = Router();

boosterDropRateRouter.get("/:boosterId/drop-rates", BoosterDropRateController.getDropRatesByBoosterId);
boosterDropRateRouter.post("/:boosterId/drop-rates", BoosterDropRateController.createDropRate);
boosterDropRateRouter.put("/:boosterId/drop-rates/:dropRateId", BoosterDropRateController.updateDropRate);
boosterDropRateRouter.delete("/:boosterId/drop-rates/:dropRateId", BoosterDropRateController.deleteDropRate);