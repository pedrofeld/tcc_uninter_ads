import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        if (!result) {
            return res.status(401).json({
                ok: false,
                message: "Invalid login credentials",
            });
        }
        res.status(200).json({
            ok: true,
            message: "Login successful",
            data: result,
        });
    } catch (error: any) {
        res.status(401).json({
            ok: false,
            message: "Login failed",
            error: error.message,
        });
    }
  }
}
