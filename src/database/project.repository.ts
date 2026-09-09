import { db } from '../../prisma/db';
import type { ProjectDTO } from '../dtos/project.dto';

export class ProjectRepository {
    public async findAll() {
        try {
            const projects = await db.orm.public.Project.all();
            return projects;
        } catch (error: any) {
            return error.message;
        }
    }

    public async findById(id: string) {
        try {
            const project = await db.orm.public.Project.first({id});
            return project;
        } catch (error: any) {
            return error.message;
        }
    }

    public async create(data: ProjectDTO) {
        try {
            return db.transaction(async (tx) => {
                const project = await tx.orm.public.Project
                    .select('id', 'name', 'resume', 'description', 'sector', 'obstacles', 'city', 'state', 'status', 'projectImageUrl')
                    .create({
                        name: data.name,
                        resume: data.resume,
                        description: data.description,
                        sector: data.sector,
                        obstacles: data.obstacles,
                        city: data.city,
                        state: data.state,
                        status: data.status ?? 'DRAFT',
                        projectImageUrl: data.projectImageUrl ?? null,
                    });

                const typesOfSupportSought = [...new Set(data.typesOfSupportSought)];

                for (const type of typesOfSupportSought) {
                    await tx.orm.public.ProjectSupport.create({
                        projectId: project.id,
                        type,
                    });
                }

                return {...project, typesOfSupportSought};
            });
        } catch (error: any) {
            return error.message;
        }
    }

    public async update(id: string, data: ProjectDTO) {
        try {
            return db.transaction(async (tx) => {
                const project = await tx.orm.public.Project
                    .where({id})
                    .select('id', 'name', 'resume', 'description', 'sector', 'obstacles', 'city', 'state', 'status', 'projectImageUrl')
                    .update({
                        name: data.name,
                        resume: data.resume,
                        description: data.description,
                        sector: data.sector,
                        obstacles: data.obstacles,
                        city: data.city,
                        state: data.state,
                        status: data.status ?? 'DRAFT',
                        projectImageUrl: data.projectImageUrl ?? null,
                    });

                const typesOfSupportSought = [...new Set(data.typesOfSupportSought)];

                await tx.orm.public.ProjectSupport
                    .where({projectId: id})
                    .delete();

                for (const type of typesOfSupportSought) {
                    await tx.orm.public.ProjectSupport.create({
                        projectId: id,
                        type,
                    });
                }

                return {...project, typesOfSupportSought};
            });
        } catch (error: any) {
            return error.message;
        }
    }

    public async delete(id: string) {
        try {
            return db.transaction(async (tx) => {
                await tx.orm.public.ProjectSupport
                    .where({projectId: id})
                    .delete();
                    
                const project = await tx.orm.public.Project
                    .where({id})
                    .delete();
                    
                return project;
            });
        } catch (error: any) {
            return error.message;
        }
    }
}