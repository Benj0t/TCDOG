import type { Knex } from "knex";

/**
 * 
 * @param knex 
 * @returns Promise
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cards", (table) => {
        table.string("card_id").primary();
        table.string("name").notNullable();
        table.string("serie").notNullable().defaultTo("Standard");
        table.string("description").notNullable();
        table.string("image_url");
        table.integer("rarity").notNullable();
        table.check("rarity >= 1 AND rarity <= 6");
    });
}

/**
 * 
 * @param knex 
 * @returns 
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cards");
}

