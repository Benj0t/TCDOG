import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("booster_drop_rates").del();

    const dropRates = [
        ["BOOSTER-GEN1", [0.45, 0.3, 0.15, 0.07, 0.025, 0.005]],
        ["BOOSTER-PREMIUM", [0.3, 0.25, 0.2, 0.15, 0.07, 0.03]],
    ] as const;

    await knex("booster_drop_rates").insert(
        dropRates.flatMap(([boosterId, rates]) =>
            rates.map((dropRate, rarity) => ({
                booster_id: boosterId,
                rarity: rarity + 1,
                drop_rate: dropRate,
            })),
        ),
    );
}
