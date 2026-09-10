import { Request, Response, NextFunction } from "express";
import {UserService} from "../services/UserService.js";

export class UserController {
    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const user = await UserService.findUserById(userId);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = await UserService.createUser(req.body);
            return res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const updatedUser = await UserService.updateUser(userId, req.body);
            return res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            await UserService.deleteUser(userId);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}