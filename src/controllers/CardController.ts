// src/controllers/card.controller.ts
import { Request, Response, NextFunction } from "express";
import { CardService } from "../services/CardService.js";

export class CardController {
  // GET /api/cards
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await CardService.getAllCards();
      return res.status(200).json(cards);
    } catch (error) {
      next(error); // Envoie l'erreur au middleware global d'erreur
    }
  }

  // GET /api/cards/:id
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id  = req.params.id as string;
      const card = await CardService.getCardById(id);
      return res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/cards (payload déjà validé par un middleware Yup/Zod en amont)
  static async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      const newCard = await CardService.createCard(req.body);
      return res.status(201).json(newCard);
    } catch (error) {
      next(error);
    }
  }

  static async updateCard(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const updatedCard = await CardService.updateCard(id, req.body);
      return res.status(200).json(updatedCard);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCard(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await CardService.deleteCard(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}