import * as bcrypt from "bcrypt";
import { UserRepository } from "../database/user.repository";
import { JwtService } from "./jwt.service";
import { handleError } from "../config/error.handler";

export class AuthService {
  private repo = new UserRepository();
  private jwt = new JwtService();

  async login(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      let user = await this.repo.findByEmail(email);
      
      if (!user){
        throw new Error("User not found");
      }
      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        throw new Error("Invalid credentials");
      }
      const token = this.jwt.createToken({
        id: user.id,
        email: user.email,
      });
      return {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      };
    } catch (error: any) {
      return handleError(error);
    }
  }
}