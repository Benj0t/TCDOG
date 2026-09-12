import BoosterDropRateModel from "../models/BoosterDropRateModel.js";
import type  BoosterDropRate from "../types/BoosterDropRate.js";

export class BoosterDropRateService {
    static async findDropRatesByBoosterId(boosterId: string): Promise<Omit<BoosterDropRate, 'boosterId'>[]> {
        return await BoosterDropRateModel.findByBoosterId(boosterId);
    }

    static async createDropRate(boosterId: string, rarity: number, dropRate: number): Promise<void> {
        await BoosterDropRateModel.create(boosterId, rarity, dropRate);
    }

    static async updateDropRate(boosterId: string, rarity: number, dropRate: number): Promise<void> {
        await BoosterDropRateModel.update(boosterId, rarity, dropRate);
    }

    static async deleteDropRate(boosterId: string, rarity: number): Promise<void> {
        await BoosterDropRateModel.delete(boosterId, rarity);
    }

}