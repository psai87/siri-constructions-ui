import { host } from "../model/Constants.ts";
import type AuthenticateResponse from "../model/AuthenticateResponse.ts";


export default class AuthenticateClient {
    authUrl: string = host + "/siricons/authenticate";

    async generateOtp(email: string): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        };
        const response: Response = await fetch(`${this.authUrl}/otp/generate`, requestOptions);
        if (!response.ok) {
            throw new Error(`generateOtp HTTP error! status: ${response.status}`);
        }
    }

    async validateOtp(email: string, otp: string): Promise<AuthenticateResponse> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        };
        const response: Response = await fetch(`${this.authUrl}/otp/validate`, requestOptions);
        if (!response.ok) {
            throw new Error(`validateOtp HTTP error! status: ${response.status}`);
        }
        return await response.json() as AuthenticateResponse;
    }



}

export const authenticateClient: AuthenticateClient = new AuthenticateClient();