import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", (table) => {
        table.decimal("money", 10, 0).notNullable().defaultTo(50);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("money");
    });
}

