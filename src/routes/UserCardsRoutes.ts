import { Router } from "express";
import { UserCardsController } from "../controllers/UserCardsController.js";

const userCardsRouter = Router();

userCardsRouter.get("/", UserCardsController.getAllUserCards);
userCardsRouter.get("/:cardId", UserCardsController.getUserCard);
userCardsRouter.post("/", UserCardsController.createUserCard);
userCardsRouter.put("/:cardId", UserCardsController.updateUserCardQuantity);
userCardsRouter.delete("/:cardId", UserCardsController.deleteUserCard);

export default userCardsRouter;