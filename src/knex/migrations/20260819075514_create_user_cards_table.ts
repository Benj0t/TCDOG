import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_cards", (table) => {
        table.string("user_id").notNullable();
        table.string("card_id").notNullable();
        table.integer("quantity").notNullable().defaultTo(1);
        table.timestamp("obtained_at").defaultTo(knex.fn.now());
        table.primary(["user_id", "card_id"]);
        table.check("quantity >= 1");
        table.foreign("user_id").references("users.user_id").onDelete("CASCADE");
        table.foreign("card_id").references("cards.card_id").onDelete("CASCADE");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user_cards");
}

