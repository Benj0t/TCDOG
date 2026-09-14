import UserModel from "../models/UserModel.js";
import { OAuthUserPayload, User } from "../types/User.js";

export class UserService {
    static async findUserById(user_id: string): Promise<User> {
        const user = await UserModel.findOneById(user_id);
        if (!user) {
            throw new Error(`User with ID ${user_id} not found`);
        }
        return user;
    }

    static async getAllUsers(): Promise<User[]> {
        return await UserModel.findAll();
    }

    static async createUser(user: Omit<User, "user_id">): Promise<User> {
        const userToInsert = {user_id: crypto.randomUUID(), ...user};

        return await UserModel.create(userToInsert);
    }

    static async createOAuthUser(user: OAuthUserPayload): Promise<User> {
        const userToInsert = {user_id: crypto.randomUUID(), ...user};

        return await UserModel.create(userToInsert);
    }

    static async updateUser(user_id: string, user: Partial<Omit<User, "user_id">>): Promise<User> {
        const updatedUser = await UserModel.update(user_id, user);
        if (!updatedUser) {
            throw new Error(`User with ID ${user_id} not found`);
        }
        return updatedUser;
    }

    static async deleteUser(user_id: string): Promise<void> {
        const user = await UserModel.findOneById(user_id);
        if (!user) {
            throw new Error(`User with ID ${user_id} not found`);
        }
        await UserModel.delete(user_id);
    }
}