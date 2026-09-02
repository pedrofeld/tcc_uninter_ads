import { db } from '../../prisma/db';
import bcrypt = require('bcrypt');
import type { UserDTO } from '../dtos/user.dto';

export class UserRepository {
    public async findAll() {
        try {
            const users = await db.orm.public.User.all();
            return users;
        } catch (error: any) {
            return error.message;
        }
    }

    public async findById(id: string) {
        try {
            const user = await db.orm.public.User.first({id});
            return user;
        } catch (error: any) {
            return error.message;
        }
    }

    public async create(data: UserDTO) {
        const passwordHash = await bcrypt.hash(data.password, 12);

        return db.orm.public.User
            .select('id', 'firstName', 'lastName', 'email', 'role', 'city', 'state', 'createdAt', 'updatedAt')
            .create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                passwordHash,
                role: data.role,
                city: data.city,
                state: data.state,
            });
    }
}
