import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cards", (table) => {
        table.string("card_id").primary().notNullable();
        table.string("name").notNullable();
        table.string("serie").notNullable().defaultTo("Standard");
        table.string("description").notNullable().defaultTo("No description available.");
        table.string("image_url").nullable();
        table.integer("rarity").notNullable().defaultTo(1);
        table.check("rarity >= 1 AND rarity <= 6");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cards");
}

