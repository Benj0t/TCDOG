import { Router } from "express";
import { CardController } from "../controllers/CardController.js";

const cardRouter = Router();

cardRouter.get("/", CardController.getAll);
cardRouter.get("/:id", CardController.getById);
cardRouter.post("/", CardController.createCard);
cardRouter.put("/:id", CardController.updateCard);
cardRouter.delete("/:id", CardController.deleteCard);

export default cardRouter;