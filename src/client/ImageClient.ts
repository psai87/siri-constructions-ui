import {AuthState, host} from "../model/Constants.ts";
import type {Image} from "../model/Image.ts";

export default class ImageClient {
    imageUrl: string = host + "/siricons/image";

    async getImages(refIds: string[]): Promise<Image[]> {
        const urlParams = new URLSearchParams();
        refIds.forEach(refId => urlParams.append("ref_id", refId));
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        const response: Response = await fetch(`${this.imageUrl}?${urlParams.toString()}`, requestOptions);
        if (!response.ok) {
            throw new Error(`getImages HTTP error! status: ${response.status}`);
        }
        return await response.json() as Image[];
    }

    async createImages(images: Image[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(images)
        };
        const response: Response = await fetch(this.imageUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`createImages HTTP error! status: ${response.status}`);
        }
    }

    async updateImages(images: Image[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(images)
        };
        const response: Response = await fetch(this.imageUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`updateImages HTTP error! status: ${response.status}`);
        }
    }

    async deleteImages(services: string[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(services)
        };
        const response: Response = await fetch(this.imageUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`deleteImages HTTP error! status: ${response.status}`);
        }
    }
}

export const imageClient = new ImageClient();