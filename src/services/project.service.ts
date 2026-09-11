import { ProjectRepository } from '../database/project.repository';
import { UserRepository } from '../database/user.repository';
import type { ProjectDTO } from '../dtos/project.dto';

export class ProjectService {
    private projectRepository = new ProjectRepository();
    private userRepository = new UserRepository();
    private sectors = ['TECH', 'HEALTH', 'EDUCATION', 'ENVIRONMENT', 'SOCIAL', 'OTHER'];
    private statuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
    private supportTypes = ['FINANCIAL', 'MENTORSHIP', 'PARTNERSHIP', 'EQUIPMENT', 'TECHNOLOGICAL', 'PROMOTION', 'SPACE', 'OTHER'];

    public async findAll() {
        return this.projectRepository.findAll();
    }

    public async findById(id: string) {
        if (!id){
            throw new Error('Project id is required');
        }

        const project = await this.projectRepository.findById(id);

        if (!project) {
            throw new Error('Project not found');
        }

        return project;
    }

    public async create(data: ProjectDTO) {
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
    }

    public async update(id: string, data: ProjectDTO) {
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
    }

    public async delete(id: string) {
        if (!id){
            throw new Error('Project id is required');
        }

        const project = await this.projectRepository.findById(id);

        if (!project) {
            throw new Error('Project not found');
        }

        return this.projectRepository.delete(id);
    }
}
