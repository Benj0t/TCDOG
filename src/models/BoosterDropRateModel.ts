import {knex} from "../knex/database.js";

export default class BoosterDropRateModel {
    static tableName = "booster_drop_rates";

    static async findByBoosterId(boosterId: string): Promise<{ rarity: number; dropRate: number }[]> {
        return knex(BoosterDropRateModel.tableName)
            .where({ booster_id: boosterId })
            .select("rarity", "drop_rate as dropRate");    
        }

    static async create(boosterId: string, rarity: number, dropRate: number): Promise<void> {
        await knex(BoosterDropRateModel.tableName).insert({
            booster_id: boosterId,
            rarity,
            drop_rate: dropRate
        });
    }

    static async update(boosterId: string, rarity: number, dropRate: number): Promise<void> {
        await knex(BoosterDropRateModel.tableName)
            .where({ booster_id: boosterId, rarity })
            .update({ drop_rate: dropRate });
    }

    static async delete(boosterId: string, rarity: number): Promise<void> {
        await knex(BoosterDropRateModel.tableName)
            .where({ booster_id: boosterId, rarity })
            .del();
    }
}

