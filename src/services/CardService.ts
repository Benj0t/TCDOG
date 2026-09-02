import CardModel from '../models/CardModel.js';
import { Card } from '../types/Card.js';


/**
 * Service class for managing card-related operations.
 * This class provides methods to interact with the CardModel for CRUD operations.
 */
export class CardService {
    static async findCardById(card_id: string): Promise<Card> {
        const card = await CardModel.findOneById(card_id);
        if (!card) {
            throw new Error(`Card with ID ${card_id} not found`);
        }
        return card;
    }

    static async getCardById(card_id: string): Promise<Card> {
        const card = await CardModel.findOneById(card_id);
        if (!card) {
            throw new Error(`Card with ID ${card_id} not found`);
        }
        return card;
    }

    static async getAllCards(): Promise<Card[]> {
        return await CardModel.findAll();
    }

    static async createCard(card: Omit<Card, "card_id">): Promise<Card> {
        return await CardModel.create(card);
    }

    static async updateCard(card_id: string, card: Partial<Omit<Card, "card_id">>): Promise<Card> {
        const updatedCard = await CardModel.update(card_id, card);
        if (!updatedCard) {
            throw new Error(`Card with ID ${card_id} not found`);
        }
        return updatedCard;
    }

    static async deleteCard(card_id: string): Promise<void> {
        const card = await CardModel.findOneById(card_id);
        if (!card) {
            throw new Error(`Card with ID ${card_id} not found`);
        }
        await CardModel.delete(card_id);
    }
}