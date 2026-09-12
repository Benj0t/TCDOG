import { Router } from "express";
import { UserCardsController } from "../controllers/UserCardsController.js";

const userCardsRouter = Router();

userCardsRouter.get("/:userId/cards", UserCardsController.getAllUserCards);
userCardsRouter.get("/:userId/cards/:cardId", UserCardsController.getUserCard);
userCardsRouter.post("/:userId/cards", UserCardsController.createUserCard);
userCardsRouter.put("/:userId/cards/:cardId", UserCardsController.updateUserCardQuantity);
userCardsRouter.delete("/:userId/cards/:cardId", UserCardsController.deleteUserCard);

export default userCardsRouter;