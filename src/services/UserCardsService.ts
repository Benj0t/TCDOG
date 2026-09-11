import UserCardsModel from "../models/UserCardsModel.js";
import { UserCards } from "../types/UserCards.js";

export class UserCardsService {
    static async findUserCardsById(user_cards_id: string): Promise<UserCards> {
        const userCards = await UserCardsModel.findOneById(user_cards_id);
        if (!userCards) {
            throw new Error(`UserCards with ID ${user_cards_id} not found`);
        }
        return userCards;
    }

    static async findUserCardsByUserIdAndCardId(user_id: string, card_id: string): Promise<UserCards> {
        const userCards = await UserCardsModel.findOneByUserIdAndCardId(user_id, card_id);
        if (!userCards) {
            throw new Error(`UserCards with User ID ${user_id} and Card ID ${card_id} not found`);
        }
        return userCards;
    }

    static async findUserCardsByUserId(user_id: string): Promise<UserCards[]> {
        const userCards = await UserCardsModel.getUserCards(user_id);
        if (!userCards || userCards.length === 0) {
            throw new Error(`No UserCards found for User ID ${user_id}`);
        }
        return userCards;
    }

    static async getAllUserCards(): Promise<UserCards[]> {
        return await UserCardsModel.findAll();
    }

    static async createUserCards(userId: string, userCards: Omit<UserCards, "user_cards_id">): Promise<UserCards> {
        return await UserCardsModel.create({ ...userCards, user_id: userId });
    }

    static async updateUserCardsQuantity(user_id: string, card_id: string, quantity: number): Promise<UserCards> {
        const userCards = await UserCardsModel.updateQuantity(user_id, card_id, quantity);
        if (!userCards) {
            throw new Error(`UserCards with User ID ${user_id} and Card ID ${card_id} not found`);
        }
        return userCards;
    }

    static async deleteUserCards(user_id: string, card_id: string): Promise<void> {
        const userCards = await UserCardsModel.findOneByUserIdAndCardId(user_id, card_id);
        if (!userCards) {
            throw new Error(`UserCards with User ID ${user_id} and Card ID ${card_id} not found`);
        }
        await UserCardsModel.delete(user_id, card_id);
    }
}