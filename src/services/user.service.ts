import type { UserDTO } from '../dtos/user.dto';
import { UserRepository } from '../database/user.repository';

export class UserService {
    private userRepository = new UserRepository();

    public async findAll() {
        return this.userRepository.findAll();
    }

    public async findById(id: string) {
        if (!id){
            throw new Error('User id is required');
        }

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    public async create(data: UserDTO) {
        if (!data) {
            throw new Error('User data is required');
        }
        return this.userRepository.create(data);
    }

    public async update(id: string, data: UserDTO) {
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
    }

    public async delete(id: string) {
        if (!id) {
            throw new Error('User id is required');
        }

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return this.userRepository.delete(id);
    }
}
