import { db } from '../../prisma/db';
import type { ProjectDTO } from '../dtos/project.dto';

export class ProjectRepository {
    public async findAll() {
        return db.orm.public.Project.all();
    }

    public async findById(id: string) {
        return db.orm.public.Project.first({id});
    }

    public async create(data: ProjectDTO) {
        return db.transaction(async (tx) => {
                const project = await tx.orm.public.Project
                    .select('id', 'userId', 'name', 'resume', 'description', 'sector', 'obstacles', 'city', 'state', 'status', 'projectImageUrl')
                    .create({
                        userId: data.userId,
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
    }

    public async update(id: string, data: ProjectDTO) {
        return db.transaction(async (tx) => {
                const project = await tx.orm.public.Project
                    .where({id})
                    .select('id', 'userId', 'name', 'resume', 'description', 'sector', 'obstacles', 'city', 'state', 'status', 'projectImageUrl')
                    .update({
                        userId: data.userId,
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
    }

    public async delete(id: string) {
        return db.transaction(async (tx) => {
                await tx.orm.public.ProjectSupport
                    .where({projectId: id})
                    .delete();
                    
                const project = await tx.orm.public.Project
                    .where({id})
                    .delete();
                    
                return project;
        });
    }
}
