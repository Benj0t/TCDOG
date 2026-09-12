import {Request, Response, NextFunction} from "express";
import {BoosterDropRateService} from "../services/BoosterDropRateService.js";

export class BoosterDropRateController {
    static async getDropRatesByBoosterId(req: Request, res: Response, next: NextFunction) {
        try {
            const boosterId = req.params.boosterId as string;
            const dropRates = await BoosterDropRateService.findDropRatesByBoosterId(boosterId);
            return res.status(200).json(dropRates);
        } catch (error) {
            next(error);
        }
    }
    
    static async createDropRate(req: Request, res: Response, next: NextFunction) {
        try {
            const boosterId = req.params.boosterId as string;
            const { rarity, drop_rate } = req.body;
            console.log(`Creating drop rate for boosterId: ${boosterId}, rarity: ${rarity}, dropRate: ${drop_rate}`);
            await BoosterDropRateService.createDropRate(boosterId, rarity, drop_rate);
            return res.status(201).json({ message: "Drop rate created successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async updateDropRate(req: Request, res: Response, next: NextFunction) {
        try {
            const boosterId = req.params.boosterId as string;
            const rarity = parseInt(req.params.rarity as string, 10);
            const { drop_rate } = req.body;
            console.log(`Updating drop rate for boosterId: ${boosterId}, rarity: ${rarity}, new dropRate: ${drop_rate}`);
            await BoosterDropRateService.updateDropRate(boosterId, rarity, drop_rate);
            return res.status(200).json({ message: "Drop rate updated successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async deleteDropRate(req: Request, res: Response, next: NextFunction) {
        try {
            const boosterId = req.params.boosterId as string;
            const rarity = parseInt(req.params.rarity as string, 10);
            await BoosterDropRateService.deleteDropRate(boosterId, rarity);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}