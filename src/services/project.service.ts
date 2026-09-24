import { handleError } from '../config/error.handler.js';
import { ProjectRepository } from '../database/project.repository.js';
import { UserRepository } from '../database/user.repository.js';
import type { ProjectDTO } from '../dtos/project.dto.js';

export class ProjectService {
    private projectRepository = new ProjectRepository();
    private userRepository = new UserRepository();
    private sectors = ['TECH', 'HEALTH', 'EDUCATION', 'ENVIRONMENT', 'SOCIAL', 'OTHER'];
    private statuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
    private supportTypes = ['FINANCIAL', 'MENTORSHIP', 'PARTNERSHIP', 'EQUIPMENT', 'TECHNOLOGICAL', 'PROMOTION', 'SPACE', 'OTHER'];

    public async findAll() {
        try {
            return this.projectRepository.findAll();
        } catch (error: any) {
            return handleError(error);
        }
    }

    public async findById(id: string) {
        try {
            if (!id){
                throw new Error('Project id is required');
            }

            const project = await this.projectRepository.findById(id);

            if (!project) {
                throw new Error('Project not found');
            }

            return project;
        } catch (error: any) {
            return handleError(error);
        }
    }

    public async create(data: ProjectDTO) {
        try {
            if (!data) {
                throw new Error('Project data is required');
            }

            const creator = await this.userRepository.findById(data.userId);

            if (!creator) {
                throw new Error('User not found')
            }

            if (!this.sectors.includes(data.sector)) {
                throw new Error('Invalid sector');
            }

            if (data.status && !this.statuses.includes(data.status)) {
                throw new Error('Invalid status');
            }

            if (data.typesOfSupportSought.some((type) => !this.supportTypes.includes(type))) {
                throw new Error('Invalid type of support sought');
            }

            return this.projectRepository.create(data);
        } catch (error: any) {
            return handleError(error);
        }
    }

    public async update(id: string, data: ProjectDTO) {
        try {
            if (!id){
                throw new Error('Project id is required');
            }

            if (!data) {
                throw new Error('Project data is required');
            }

            const project = await this.projectRepository.findById(id);

            if (!project) {
                throw new Error('Project not found');
            }

            const creator = await this.userRepository.findById(data.userId);

            if (!creator) {
                throw new Error('User not found')
            }

            if (!this.sectors.includes(data.sector)) {
                throw new Error('Invalid sector');
            }

            if (data.status && !this.statuses.includes(data.status)) {
                throw new Error('Invalid status');
            }

            if (data.typesOfSupportSought.some((type) => !this.supportTypes.includes(type))) {
                throw new Error('Invalid type of support sought');
            }

            return this.projectRepository.update(id, data);
        } catch (error: any) {
            throw error;
        }
    }

    public async delete(id: string) {
        try {
            if (!id){
                throw new Error('Project id is required');
            }

            const project = await this.projectRepository.findById(id);

            if (!project) {
                throw new Error('Project not found');
            }

            return this.projectRepository.delete(id);
        } catch (error: any) {
            return handleError(error);
        }
    }
}
