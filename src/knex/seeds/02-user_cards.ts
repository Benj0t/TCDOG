import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_cards").del();

    // Inserts seed entries
    await knex("user_cards").insert([
    // AlphaTrainer (id: 1) possède plusieurs cartes et des doublons
    { user_id: 1, card_id: "DOG-001", quantity: 3, obtained_at: new Date() },
    { user_id: 1, card_id: "DOG-002", quantity: 1, obtained_at: new Date() },
    { user_id: 1, card_id: "DOG-005", quantity: 1, obtained_at: new Date() },

    // DogCollector (id: 2) a une collection plus variée dont la carte secrète
    { user_id: 2, card_id: "DOG-003", quantity: 2, obtained_at: new Date() },
    { user_id: 2, card_id: "DOG-004", quantity: 1, obtained_at: new Date() },
    { user_id: 2, card_id: "DOG-006", quantity: 1, obtained_at: new Date() },

    // BarkMaster (id: 3) débute avec une seule carte
    { user_id: 3, card_id: "DOG-001", quantity: 1, obtained_at: new Date() },
  ]);
};
