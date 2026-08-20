import type {UserCards} from "../types/UserCards.js";
import {knex} from "../knex/database.js";

export default class UserCardsModel {
    static tableName = "user_cards";
    /**
     * Creates a new user card association in the database.
     * @param {UserCards} userCard - The user card object to create.
     * @returns A promise resolving to the created user card.
     */
    static async create(userCard: UserCards): Promise<UserCards> {
        const [created] = await knex(UserCardsModel.tableName)
            .insert(userCard)
            .returning("*");

        return created;
    }

    /**
     * Finds a user card association by user ID and card ID.
     * @param {string} user_id - The ID of the user.
     * @param {string} card_id - The ID of the card.
     * @returns A promise resolving to the found user card or null if not found.
     */
    static async findOneByUserIdAndCardId(user_id: string, card_id: string): Promise<UserCards | null> {
        const userCard = await knex(UserCardsModel.tableName)
            .where({ user_id, card_id })
            .first();
        return userCard || null;
    }

    /**
     * Retrieves all cards associated with a specific user.
     * @param {string} userId - The ID of the user.
     * @returns A promise resolving to an array of user card associations.
     */
    static async getUserCards(userId: string): Promise<UserCards[]> {
        return knex(UserCardsModel.tableName).where({ user_id: userId });
    }

    /**
     * Updates the quantity of a specific card for a user.
     * @param {string} userId - The ID of the user.
     * @param {string} cardId - The ID of the card to update.
     * @param {number} quantity - The new quantity of the card.
     * @returns A promise resolving to the updated user card association or null if not found. 
     * */
    static async updateQuantity(userId: string, cardId: string, quantity: number): Promise<UserCards | null> {
        const [updated] = await knex(UserCardsModel.tableName)
            .where({ user_id: userId, card_id: cardId })
            .update({ quantity })
            .returning("*");
        return updated || null;
    }

    /** 
     * Deletes a card from a user's collection.
     * @param {string} userId - The ID of the user.
     * @param {string} cardId - The ID of the card to delete.
     * @returns A promise that resolves when the card is deleted.
     */
    static async deleteCard(userId: string, cardId: string): Promise<void> {
        await knex(UserCardsModel.tableName)
            .where({ user_id: userId, card_id: cardId })
            .del();
    }

}