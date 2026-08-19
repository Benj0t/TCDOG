import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cards").del();

    // Inserts seed entries
    await knex("cards").insert([
    {
      card_id: "DOG-001",
      name: "Chihuahua Électrique",
      serie: "Gen 1",
      description: "Petit mais débordant d'une énergie survoltée.",
      image_url: "https://tcdog.local/cards/chihuahua.png",
      rarity: 1,
    },
    {
      card_id: "DOG-002",
      name: "Bouledogue Français",
      serie: "Gen 1",
      description: "Robuste, calme et fidèle protecteur du foyer.",
      image_url: "https://tcdog.local/cards/bouledogue.png",
      rarity: 2,
    },
    {
      card_id: "DOG-003",
      name: "Berger Australien",
      serie: "Gen 1",
      description: "Un meneur agile capable de guider toute son équipe.",
      image_url: "https://tcdog.local/cards/berger_australien.png",
      rarity: 3,
    },
    {
      card_id: "DOG-004",
      name: "Husky des Glaces",
      serie: "Gen 1",
      description: "Endurant et habitué aux climats les plus extrêmes.",
      image_url: "https://tcdog.local/cards/husky.png",
      rarity: 4,
    },
    {
      card_id: "DOG-005",
      name: "Shiba Inu Doré",
      serie: "Gen 1",
      description: "Une légende vivante au regard malicieux.",
      image_url: "https://tcdog.local/cards/shiba_dore.png",
      rarity: 5,
    },
    {
      card_id: "DOG-006",
      name: "Cerbère Mythique",
      serie: "Gen 1",
      description: "Le gardien suprême doté de trois têtes redoutables.",
      image_url: "https://tcdog.local/cards/cerbere.png",
      rarity: 6,
    },
  ]);
};
