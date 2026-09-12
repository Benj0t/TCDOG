import {knex} from "../knex/database.js";
import type {Card} from "../types/Card.js";

export default class CardModel{
    static tableName = "cards";
    
    /**
     * Finds a card by its ID.
     * @param {string} card_id - The ID of the card to find.
     * @returns {Promise<Card | null>} - A promise resolving to the found card or null.
     */
    static async findOneById(card_id: string): Promise<Card | null> {
        const card = await knex(CardModel.tableName).where({ card_id }).first();
        return card || null;
    }

    static async findAll(): Promise<Card[]> {
        return knex(CardModel.tableName).select("*");
    }

    /**
     * Creates a new card in the database.
     * @param {Omit<Card, "card_id">} card - The card object to create.
     * @returns {Promise<Card>} - A promise resolving to the created card.
     */
static async create(card: Card): Promise<Card> {
    const [createdId] = await knex(CardModel.tableName).insert(card);

    const createdCard = await knex(CardModel.tableName)
        .where({ card_id : createdId })
        .first();

    if (!createdCard) {
        throw new Error("Failed to create card");
    }

    return createdCard;
}

    /**
     * Updates an existing card in the database.
     * @param {string} card_id - The ID of the card to update.
     * @param {Partial<Omit<Card, "card_id">>} card - The updated card data.
     * @returns {Promise<Card | null>} - A promise resolving to the updated card or null.
     */
    static async update(card_id: string, card: Partial<Omit<Card, "card_id">>): Promise<Card | null> {
        const rowsAffected = await knex(CardModel.tableName)
            .where({ card_id })
            .update(card);

        if (!rowsAffected) {
            return null;
        }

        const updatedCard = await knex(CardModel.tableName)
            .where({ card_id })
            .first();

        return updatedCard || null;
    }

    /**
     * Deletes a card from the database by its ID.
     * @param {string} card_id - The ID of the card to delete.
     * @returns {Promise<void>} - A promise that resolves when the card is deleted.
     */
    static async delete(card_id: string): Promise<void> {
        await knex(CardModel.tableName).where({ card_id }).del();
    }

}