import type {Request, Response} from 'express';
import type {UserDTO} from '../dtos/user.dto.js';
import {UserService} from '../services/user.service.js';

export class UserController {
    private userService = new UserService();

    public findAll = async (_req: Request, res: Response) => {
        try {
            const users = await this.userService.findAll();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while fetching users",
                error: error.message
            });
        }
    };

    public findById = async (req: Request<{id: string}>, res: Response) => {
        try {
            const user = await this.userService.findById(req.params.id);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while fetching user",
                error: error.message
            });
        }
    };

    public create = async (req: Request<object, UserDTO>, res: Response) => {
        try {
            const newUser = await this.userService.create(req.body);
            res.status(201).json({
                success: true,
                data: newUser
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while creating user",
                error: error.message
            });
        }
    };

    public update = async (req: Request<{id: string}, object, UserDTO>, res: Response) => {
        try {
            const userUpdated = await this.userService.update(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: userUpdated
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while updating user",
                error: error.message
            });
        }
    };

    public delete = async (req: Request<{id: string}>, res: Response) => {
        try {
            const user = await this.userService.delete(req.params.id);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while deleting user",
                error: error.message
            });
        }
    };
}
