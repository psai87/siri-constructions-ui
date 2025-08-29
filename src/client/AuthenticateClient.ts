import {AuthState, host} from "../model/Constants.ts";
import type AuthenticateResponse from "../model/AuthenticateResponse.ts";


export default class AuthenticateClient {
    authUrl: string = host + "/siricons/authenticate";

    async authenticate(): Promise<AuthenticateResponse> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`}
        };
        const response: Response = await fetch(this.authUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`authenticate HTTP error! status: ${response.status}`);
        }
        return await response.json() as AuthenticateResponse;
    }

}

export const authenticateClient: AuthenticateClient = new AuthenticateClient();