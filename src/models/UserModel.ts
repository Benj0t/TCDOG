import {knex} from "../knex/database.js";
import type {User} from "../types/User.js";

/**
 * UserModel class provides methods to interact with the users table in the database.
 */

export default class UserModel{
    static tableName = "users";
    
    /**
     * Finds an user by their ID.
     * @param {string} id - The ID of the user to find.
     * @returns {Promise<User | null>} - A promise resolving to the found user or null.
     */
    static async findOneById(id: string): Promise<User | null> {
        const user = await knex(UserModel.tableName).where({ id }).first();
        return user || null;
    }

    /**
     * Finds all users in the database.
     * @returns {Promise<User[]>} - A promise resolving to an array of all users.
     */
    static async findAll(): Promise<User[]> {
        return knex(UserModel.tableName).select("*");
    }

    /**
     * Finds an user by their username.
     * @param {string} username - The username of the user to find.
     * @returns {Promise<User | null>} - A promise resolving to the found user or null.
     */
    static async findOneByUsername(username: string): Promise<User | null> {
        const user = await knex(UserModel.tableName).where({ username }).first();
        return user || null;
    }

    /**
     * Finds an user by their email.
     * @param {string} email - The email of the user to find.
     * @returns {Promise<User | null>} - A promise resolving to the found user or null.
     */
    static async findOneByEmail(email: string): Promise<User | null> {
        const user = await knex(UserModel.tableName).where({ email }).first();
        return user || null;
    }

    /**
     * Creates a new user in the database.
     * @param {Omit<User, "id" | "created_at">} user - The user object to create.
     * @returns {Promise<User>} - A promise resolving to the created user.
     */
    static async create(user: Omit<User, "id" | "created_at">): Promise<User> {
        const [createdUser] = await knex(UserModel.tableName)
            .insert(user)
            .returning("*");
        return createdUser;
    }

    /**
     * Updates an existing user in the database.
     * @param {string} id - The ID of the user to update.
     * @param {Partial<Omit<User, "id" | "created_at">>} user - The user object with updated properties.
     * @returns {Promise<User | null>} - A promise resolving to the updated user or null.
     */
    static async update(id: string, user: Partial<Omit<User, "id" | "created_at">>): Promise<User | null> {
        const [updatedUser] = await knex(UserModel.tableName)
            .where({ id })
            .update(user)
            .returning("*");
        return updatedUser || null;
    }

    /**
     * Deletes a user from the database by their ID.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<void>} - A promise that resolves when the user is deleted.
     */
    static async delete(id: string): Promise<void> {
        await knex(UserModel.tableName).where({ id }).del();
    }
}