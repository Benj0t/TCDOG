import {knex} from "../knex/database.js";
import type {Booster} from "../types/Booster.js";

export default class BoosterModel{
    static tableName = "boosters";

    static async findOneById(boosterId: string): Promise<Booster | null> {
        const booster = await knex(BoosterModel.tableName).where({ booster_id: boosterId }).first();
        return booster || null;
    }

    static async findAll(): Promise<Booster[]> {
        return knex(BoosterModel.tableName).select("*");
    }

    static async create(booster: Omit<Booster, "boosterId">): Promise<Booster> {
        const [createdBooster] = await knex(BoosterModel.tableName)
            .insert({
                name: booster.name,
                price: booster.price,
                image_url: booster.imageUrl,
                active: booster.active,
                cards_count: booster.cardsCount,
                serie: booster.serie
            })
            .returning("*");
        return createdBooster;
    }

    static async update(boosterId: string, booster: Partial<Omit<Booster, "boosterId">>): Promise<Booster | null> {
        const [updatedBooster] = await knex(BoosterModel.tableName)
            .where({ booster_id: boosterId })
            .update(booster)
            .returning("*");
        return updatedBooster || null;
    }

    static async delete(boosterId: string): Promise<void> {
        await knex(BoosterModel.tableName).where({ booster_id: boosterId }).del();
    }


}