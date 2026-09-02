import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
    {
      id: 1,
      username: "AlphaTrainer",
      email: "alpha@tcdog.com",
      password: "$2b$10$SampleHashedPasswordForDev1234567890", // Hash bcrypt fictif
      money: 50,
      created_at: new Date(),
    },
    {
      id: 2,
      username: "DogCollector",
      email: "collector@tcdog.com",
      password: "$2b$10$SampleHashedPasswordForDev1234567890",
      money: 50,
      created_at: new Date(),
    },
    {
      id: 3,
      username: "BarkMaster",
      email: "bark@tcdog.com",
      password: "$2b$10$SampleHashedPasswordForDev1234567890",
      money: 50,
      created_at: new Date(),
    },
  ]);
};
