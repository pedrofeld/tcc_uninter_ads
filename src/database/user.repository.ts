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
        try {
            const passwordHash = await bcrypt.hash(data.password, 12);
            return db.transaction(async (tx) => {
                const user = await tx.orm.public.User
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

                if (data.role === 'VISIONARY') {
                    const visionary = await tx.orm.public.Visionary
                        .select('profession', 'studyArea', 'biography', 'phoneNumber', 'linkedIn')
                        .create({
                            userId: user.id,
                            profession: data.profession,
                            studyArea: data.studyArea,
                            biography: data.biography,
                            phoneNumber: data.phoneNumber,
                            linkedIn: data.linkedIn,
                        });

                    return {...user, ...visionary};
                }

                if (data.role === 'INVESTOR') {
                    if (data.investorType === null) {
                        throw new Error('investorType is required for investors');
                    }

                    const investor = await tx.orm.public.Investor
                        .select('investorType', 'companyName', 'position', 'companyWebsite', 'biography', 'phoneNumber', 'linkedIn')
                        .create({
                            userId: user.id,
                            investorType: data.investorType,
                            companyName: data.companyName,
                            position: data.position,
                            companyWebsite: data.companyWebsite,
                            biography: data.biography,
                            phoneNumber: data.phoneNumber,
                            linkedIn: data.linkedIn,
                        });

                    return {...user, ...investor};
                }

                return user;
            });
        } catch (error: any) {
            return error.message;
        }
    }
}
