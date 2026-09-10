import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("boosters", (table) => {
        table.string("booster_id").primary().defaultTo(knex.fn.uuid());
        table.string("name").notNullable();
        table.integer("price", 10).notNullable();
        table.string("image_url");
        table.boolean("active").notNullable().defaultTo(true);
        table.integer("cards_count").notNullable();
        table.string("serie").notNullable().defaultTo("Standard");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("boosters");
}

