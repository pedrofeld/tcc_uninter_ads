import { db } from '../../prisma/db';

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
}