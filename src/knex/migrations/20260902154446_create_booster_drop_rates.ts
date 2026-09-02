import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("booster_drop_rates", (table) => {
        table.string("booster_id").notNullable();
        table.integer("rarity").notNullable();
        table.decimal("drop_rate", 5, 4).notNullable();
        table.primary(["booster_id", "rarity"]);
        table.check("rarity >= 1 AND rarity <= 6");
        table.check("drop_rate >= 0 AND drop_rate <= 1");
        table.foreign("booster_id").references("boosters.booster_id").onDelete("CASCADE");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("booster_drop_rates");
}

