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

    static async create(booster: Booster): Promise<Booster> {
        const [createdId] = await knex(BoosterModel.tableName)
            .insert(booster)

        console.log("Created booster:", createdId); // Log the created booster for debugging
            const createdBooster = await knex(BoosterModel.tableName)
            .where({ booster_id: createdId })
            .first();

            if (!createdBooster) {
                throw new Error("Failed to create booster");
            }    
        return createdBooster;
    }

    static async update(boosterId: string, booster: Partial<Omit<Booster, "boosterId">>): Promise<Booster | null> {
        const rowsAffected = await knex(BoosterModel.tableName)
            .where({ booster_id: boosterId })
            .update(booster);

        if (!rowsAffected) {
            return null;
        }

        const updatedBooster = await knex(BoosterModel.tableName)
            .where({ booster_id: boosterId })
            .first();

        return updatedBooster || null;
    }

    static async delete(boosterId: string): Promise<void> {
        await knex(BoosterModel.tableName).where({ booster_id: boosterId }).del();
    }


}