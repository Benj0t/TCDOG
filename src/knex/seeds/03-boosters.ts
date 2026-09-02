import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("boosters").del();

    await knex("boosters").insert([
        {
            booster_id: "BOOSTER-GEN1",
            name: "Booster Gen 1",
            price: 10,
            image_url: "https://tcdog.local/boosters/gen1.png",
            cards_count: 5,
            serie: "Gen 1",
        },
        {
            booster_id: "BOOSTER-PREMIUM",
            name: "Booster Premium Gen 1",
            price: 25,
            image_url: "https://tcdog.local/boosters/premium_gen1.png",
            cards_count: 7,
            serie: "Gen 1",
        },
    ]);
}
