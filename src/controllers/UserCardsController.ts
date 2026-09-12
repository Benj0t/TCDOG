import { Request, Response, NextFunction } from "express";
import {UserCardsService} from "../services/UserCardsService.js";

export class UserCardsController {
    static async getAllUserCards(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const userCards = await UserCardsService.findUserCardsByUserId(userId);
            return res.status(200).json(userCards);
        } catch (error) {
            next(error);
        }
    }

    static async getUserCard(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const cardId = req.params.cardId as string;
            const userCard = await UserCardsService.findUserCardsByUserIdAndCardId(userId, cardId);
            return res.status(200).json(userCard);
        } catch (error) {
            next(error);
        }
    }

    static async createUserCard(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId as string;
        req.body.user_id = userId; // Ensure the user_id is set in the request body
        try {
            const newUserCard = await UserCardsService.createUserCards(userId, req.body);
            return res.status(201).json(newUserCard);
        } catch (error) {
            next(error);
        }
    }

    static async updateUserCardQuantity(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const cardId = req.params.cardId as string;
            const { quantity } = req.body;
            const updatedUserCard = await UserCardsService.updateUserCardsQuantity(userId, cardId, quantity);
            return res.status(200).json(updatedUserCard);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUserCard(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const cardId = req.params.cardId as string;
            await UserCardsService.deleteUserCards(userId, cardId);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}