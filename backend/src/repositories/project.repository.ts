import { User } from "../models/user.js";
import { AppDataSource } from "../config/data-source.js";
import { Project } from "../models/project.js";
import { DeleteResult } from "typeorm";
import { OriginalDocument } from "../models/document.js";

export interface ICreateProjectPayload{
    name: string
}

export const getProjectById= async (projectId: number): Promise<Project> => {
    return AppDataSource.manager.findOneByOrFail(Project, {id: projectId})
}

export const getProjectsByUserId = async (userId: number, withChats: boolean): Promise<Array<Project>> => {
    let projects;
    if (withChats) {
        projects = await AppDataSource.manager.find(Project, 
            {
                where: {userId: userId},
                relations: { chats: true }
            })

    } else {
        projects = await AppDataSource.manager.findBy(Project, {userId: userId})
    }
    return projects
}

export const deleteProjectById = async (projectId: number): Promise<DeleteResult> => {
    return await AppDataSource.manager.delete(Project, {id: projectId})
}

export const registerFileToProject = async (projectId: number, doc: Partial<OriginalDocument>): Promise<OriginalDocument> => {
    const project = await AppDataSource.manager.findOneByOrFail(Project, {id: projectId})
    return await AppDataSource.manager.save(OriginalDocument, {...doc, project: project})
}

export const getAllProjectDocuments = async (projectId: number): Promise<OriginalDocument[]> => {
    return await AppDataSource.manager.findBy(OriginalDocument, {project: { id: projectId}})
}

export const createNewProject = async (userId: number, payload: ICreateProjectPayload): Promise<Project> => {
    const user = await AppDataSource.manager.findOneByOrFail(User, {id: userId})
    const projects =  await AppDataSource.manager.find(Project, { where: { userId: user.id } })
    await AppDataSource.manager.save(Project, [... projects, { name: payload.name, user: user}])
    return AppDataSource.manager.findOneOrFail(Project, {where: {name: payload.name}})
}