import { Request, Response, NextFunction } from "express";
import { BoosterService } from "../services/BoosterService.js";

export class BoosterController {
    static async getAllBoosters(req: Request, res: Response, next: NextFunction) {
        try {
            const boosters = await BoosterService.getAllBoosters();
            return res.status(200).json(boosters);
        } catch (error) {
            next(error);
        }
    }

    static async getBoosterById(req: Request, res: Response, next: NextFunction) {
        try {
            const boosterId = req.params.boosterId as string;
            const booster = await BoosterService.findBoosterById(boosterId);
            return res.status(200).json(booster);
        } catch (error) {
            next(error);
        }
    }

    static async createBooster(req: Request, res: Response, next: NextFunction) {
        try {
            const newBooster = await BoosterService.createBooster(req.body);
            return res.status(201).json(newBooster);
        } catch (error) {
            next(error);
        }
    }

    static async updateBooster(req: Request, res: Response, next: NextFunction) {
        try {
            const boosterId = req.params.boosterId as string;
            const updatedBooster = await BoosterService.updateBooster(boosterId, req.body);
            return res.status(200).json(updatedBooster);
        } catch (error) {
            next(error);
        }
    }

    static async deleteBooster(req: Request, res: Response, next: NextFunction) {
        try {
            const boosterId = req.params.boosterId as string;
            await BoosterService.deleteBooster(boosterId);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}