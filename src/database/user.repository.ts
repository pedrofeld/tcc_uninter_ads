import { db } from '../../prisma/db';

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
}
