import {AuthState} from "../../model/Constants.ts";
import type {ChangeEvent} from "react";
import AuthenticateClient from "../clients/AuthenticateClient.ts";

export default function LoginPage() {
    const authenticateClient: AuthenticateClient = new AuthenticateClient();

    function handleTokenChange(value: string) {
        AuthState.token = value;
    }

    function handleAuthenticate() {
        authenticateClient.authenticate()
            .then(() => {
                console.log("Authentication Successful")
            })
            .catch(err => {
                console.log(err)
                console.log("Authentication Failed")
            });
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-blue-100 p-6">
            <div className="card w-full max-w-md bg-base-100 shadow-xl animate-fade-in">
                <div className="card-body text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-6">
                        👋 Login to access Admin page!
                    </h1>

                    <div className="form-control mb-4">
                        <input
                            type="text"
                            placeholder="🔐 Enter password..."
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleTokenChange(e.target.value)
                            }
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button
                            onClick={handleAuthenticate}
                            className="btn btn-primary"
                        >
                            Authenticate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
