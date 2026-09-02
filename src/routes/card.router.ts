import { Router } from "express";
import { CardController } from "../controllers/CardController.js";

const cardRouter = Router();

cardRouter.get("/", CardController.getAll);
cardRouter.get("/:id", CardController.getById);
cardRouter.post("/", CardController.create);

export default cardRouter;