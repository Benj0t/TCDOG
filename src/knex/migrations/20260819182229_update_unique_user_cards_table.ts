import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("user_cards", (table) => {
        table.unique(["user_id", "card_id"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("user_cards", (table) => {
        table.dropUnique(["user_id", "card_id"]);
    });
}