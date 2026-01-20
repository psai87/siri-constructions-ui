import {AuthState, host} from "../model/Constants.ts";
import type {AvailableService} from "../model/Service.ts";

class AvailableServiceClient {
    serviceUrl: string = host + "/siricons/service";

    async getAvailableService(): Promise<AvailableService[]> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        const response: Response = await fetch(this.serviceUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`getAvailableService HTTP error! status: ${response.status}`);
        }
        return await response.json() as AvailableService[];
    }

    async createAvailableService(services: AvailableService[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(services)
        };
        const response: Response = await fetch(this.serviceUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`createAvailableService HTTP error! status: ${response.status}`);
        }
    }

    async updateAvailableService(services: AvailableService[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(services)
        };
        const response: Response = await fetch(this.serviceUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`updateAvailableService HTTP error! status: ${response.status}`);
        }
    }

    async deleteAvailableService(services: string[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(services)
        };
        const response: Response = await fetch(this.serviceUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`deleteAvailableService HTTP error! status: ${response.status}`);
        }
    }

}

export const availableServiceClient = new AvailableServiceClient();