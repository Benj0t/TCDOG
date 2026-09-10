import BoosterModel from "../models/BoosterModel.js";
import { Booster } from "../types/Booster.js";

export class BoosterService {
    static async findBoosterById(boosterId: string): Promise<Booster> {
        const booster = await BoosterModel.findOneById(boosterId);
        if (!booster) {
            throw new Error(`Booster with ID ${boosterId} not found`);
        }
        return booster;
    }

    static async getAllBoosters(): Promise<Booster[]> {
        return await BoosterModel.findAll();
    }

    static async createBooster(booster: Omit<Booster, "boosterId">): Promise<Booster> {
        return await BoosterModel.create(booster);
    }

    static async updateBooster(boosterId: string, booster: Partial<Omit<Booster, "boosterId">>): Promise<Booster> {
        const updatedBooster = await BoosterModel.update(boosterId, booster);
        if (!updatedBooster) {
            throw new Error(`Booster with ID ${boosterId} not found`);
        }
        return updatedBooster;
    }

    static async deleteBooster(boosterId: string): Promise<void> {
        const booster = await BoosterModel.findOneById(boosterId);
        if (!booster) {
            throw new Error(`Booster with ID ${boosterId} not found`);
        }
        await BoosterModel.delete(boosterId);
    }
}