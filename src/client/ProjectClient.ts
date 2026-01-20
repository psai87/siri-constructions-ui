import {AuthState, host} from "../model/Constants.ts";
import type {Project} from "../model/Project.ts";

class ProjectClient {
    projectUrl: string = host + "/siricons/project";

    async getProjects(): Promise<Project[]> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        const response: Response = await fetch(this.projectUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`getProjects HTTP error! status: ${response.status}`);
        }
        return await response.json() as Project[];
    }

    async createProjects(projects: Project[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(projects)
        };
        const response: Response = await fetch(this.projectUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`createProjects HTTP error! status: ${response.status}`);
        }
    }

    async updateProjects(projects: Project[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(projects)
        };
        const response: Response = await fetch(this.projectUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`updateProjects HTTP error! status: ${response.status}`);
        }
    }

    async deleteProjects(projects: string[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(projects)
        };
        const response: Response = await fetch(this.projectUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`deleteProjects HTTP error! status: ${response.status}`);
        }
    }

}

export const projectClient = new ProjectClient();