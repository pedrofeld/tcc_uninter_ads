import type { UserDTO } from '../dtos/user.dto';
import { UserRepository } from '../database/user.repository';
import { handleError } from '../config/error.handler';

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
        try {
            if (!id){
                throw new Error('User id is required');
            }

            if (!data) {
                throw new Error('User data is required');
            }

            const user = await this.userRepository.findById(id);

            if (!user) {
                throw new Error('User not found');
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
