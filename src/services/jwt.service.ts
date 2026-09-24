import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

interface JwtUserPayload {
    id: string;
    email: string;
};

export class JwtService {
    public createToken(data: JwtUserPayload){
        const token = jwt.sign(data, process.env.SECRET_KEY!, {
            expiresIn: '1d'
        });
        return token;
    };

    public validateToken(token: string): JwtUserPayload | null {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!);
            return decoded as JwtUserPayload;
        } catch (error) {
            console.log('Invalid token:', error);
            return null;
        }
    };
};
