import type {Request, Response} from 'express';
import type {ProjectDTO} from '../dtos/project.dto';
import {ProjectService} from '../services/project.service';

export class ProjectController {
    private projectService = new ProjectService();

    public findAll = async (req: Request, res: Response,) => {
        try {
            const projects = await this.projectService.findAll();
            res.status(200).json({
                success: true,
                data: projects
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while fetching users",
                error: error.message
            });
        }
    };

    public findById = async (req: Request<{id: string}>, res: Response) => {
        try {
            const project = await this.projectService.findById(req.params.id);
            res.status(200).json({
                success: true,
                data: project
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while fetching user",
                error: error.message
            });
        }
    };

    public create = async (req: Request<object, ProjectDTO>, res: Response) => {
        try {
            const newProject = await this.projectService.create(req.body);
            res.status(201).json({
                success: true,
                data: newProject
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while creating project",
                error: error.message
            });
        }
    };

    public update = async (req: Request<{id: string}, object, ProjectDTO>, res: Response) => {
        try {
            const projectUpdated = await this.projectService.update(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: projectUpdated
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while updating project",
                error: error.message
            });
        }
    };

    public delete = async (req: Request<{id: string}>, res: Response) => {
        try {
            const project = await this.projectService.delete(req.params.id);
            res.status(200).json({
                success: true,
                data: project
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while deleting project",
                error: error.message
            });
        }
    };
}
