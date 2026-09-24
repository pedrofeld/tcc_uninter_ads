import type { UserDTO } from '../dtos/user.dto.js';
import { UserRepository } from '../database/user.repository.js';
import { handleError } from '../config/error.handler.js';

export class UserService {
    private userRepository = new UserRepository();

    public async findAll() {
        try {
            return this.userRepository.findAll();
        } catch (error: any) {
            return handleError(error);
        }
    }

    public async findById(id: string) {
        try {
            if (!id){
                throw new Error('User id is required');
            }

            const user = await this.userRepository.findById(id);

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error: any) {
            return handleError(error);
        }
    }

    public async findByEmail(email: string) {
        try {
            if (!email) {
                throw new Error('User email is required');
            }
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error: any) {
            return handleError(error);
        }
    }

    public async create(data: UserDTO) {
        try {
            if (!data) {
                throw new Error('User data is required');
            }
            return this.userRepository.create(data);
        } catch (error: any) {
            return handleError(error);
        }
    }

    public async update(id: string, data: UserDTO) {
        try{
            if (!id){
            throw new Error('User id is required');
        }

        if (!data) {
            throw new Error('User data is required');
        }

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found. User needs to exist to be updated');
        }

        return this.userRepository.update(id, data);
        } catch (error: any) {
            return handleError(error);
        }   
    }

    public async delete(id: string) {
        try {
            if (!id) {
                throw new Error('User id is required');
            }

            const user = await this.userRepository.findById(id);

            if (!user) {
                throw new Error('User not found');
            }

            return this.userRepository.delete(id);
        } catch (error: any) {
            return handleError(error);
        }
    }
}
