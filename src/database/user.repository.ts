import { db } from '../../prisma/db';
import bcrypt = require('bcrypt');
import type { UserDTO } from '../dtos/user.dto';

export class UserRepository {
    public async findAll() {
        return db.orm.public.User
            .select('id', 'firstName', 'lastName', 'email', 'role', 'city', 'state', 'createdAt', 'updatedAt')
            .all();
    }

    public async findById(id: string) {
        return db.orm.public.User
            .where({id})
            .select('id', 'firstName', 'lastName', 'email', 'role', 'city', 'state', 'createdAt', 'updatedAt')
            .first();
    }

    public async create(data: UserDTO) {
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
    }

    public async update(id: string, data: UserDTO) {
        const passwordHash = await bcrypt.hash(data.password, 12);
        return db.transaction(async (tx) => {
                const user = await tx.orm.public.User
                    .where({id})
                    .select('id', 'firstName', 'lastName', 'email', 'role', 'city', 'state', 'createdAt', 'updatedAt')
                    .update({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        passwordHash,
                        role: data.role,
                        city: data.city,
                        state: data.state,
                    });

                if (data.role === 'VISIONARY') {
                    await tx.orm.public.Investor.where({userId: id}).delete();
                    const visionary = await tx.orm.public.Visionary
                        .where({userId: id})
                        .select('profession', 'studyArea', 'biography', 'phoneNumber', 'linkedIn')
                        .upsert({
                            create: {
                                userId: id,
                                profession: data.profession,
                                studyArea: data.studyArea,
                                biography: data.biography,
                                phoneNumber: data.phoneNumber,
                                linkedIn: data.linkedIn,
                            },
                            update: {
                                profession: data.profession,
                                studyArea: data.studyArea,
                                biography: data.biography,
                                phoneNumber: data.phoneNumber,
                                linkedIn: data.linkedIn,
                            },
                        });

                    return {...user, ...visionary};
                }

                if (data.role === 'INVESTOR') {
                    if (data.investorType === null) {
                        throw new Error('investorType is required for investors');
                    }

                    await tx.orm.public.Visionary.where({userId: id}).delete();
                    const investor = await tx.orm.public.Investor
                        .where({userId: id})
                        .select('investorType', 'companyName', 'position', 'companyWebsite', 'biography', 'phoneNumber', 'linkedIn')
                        .upsert({
                            create: {
                                userId: id,
                                investorType: data.investorType,
                                companyName: data.companyName,
                                position: data.position,
                                companyWebsite: data.companyWebsite,
                                biography: data.biography,
                                phoneNumber: data.phoneNumber,
                                linkedIn: data.linkedIn,
                            },
                            update: {
                                investorType: data.investorType,
                                companyName: data.companyName,
                                position: data.position,
                                companyWebsite: data.companyWebsite,
                                biography: data.biography,
                                phoneNumber: data.phoneNumber,
                                linkedIn: data.linkedIn,
                            },
                        });

                    return {...user, ...investor};
                }

                await tx.orm.public.Visionary.where({userId: id}).delete();
                await tx.orm.public.Investor.where({userId: id}).delete();
                return user;
        });
    }

    public async delete(id: string) {
        return db.transaction(async (tx) => {
                const user = await tx.orm.public.User.first({id});
                if (!user) {
                    throw new Error('User not found');
                }

                if (user.role === 'VISIONARY') {
                    await tx.orm.public.Visionary.where({userId: id}).delete();
                }

                if (user.role === 'INVESTOR') {
                    await tx.orm.public.Investor.where({userId: id}).delete();
                }

                await tx.orm.public.User.where({id}).delete();

                return {message: 'User deleted successfully'};
        });
    }
}
