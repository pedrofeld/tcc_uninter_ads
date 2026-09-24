import type { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../database/user.repository.js';
import { handleError } from '../config/error.handler.js';
import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({
            ok: false,
            message: 'Authentication token is required'
            });
        }

        const token = authorizationHeader.toLowerCase().startsWith('bearer ')
            ? authorizationHeader.slice(7).trim()
            : authorizationHeader.trim();

        if (!token) {
            return res.status(401).json({
            ok: false,
            message: 'Authentication token is required'
            });
        }

        const payload = new JwtService().validateToken(token);

        if (!payload) {
            return res.status(401).json({
            ok: false,
            message: 'Invalid or expired token'
            });
        }

        const userId = payload.id;
        const userRepository = new UserRepository();
        const user = await userRepository.findById(userId);

        if (!user) {
            return res.status(401).json({
            ok: false,
            message: 'User not found'
            });
        }

        (req as any).user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        next();
    } catch (error: any) {
        return handleError(error);
    }
};
