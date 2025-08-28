import {AuthState} from "../../model/Constants.ts";
import AuthenticateClient from "../../client/AuthenticateClient.ts";
import type {AlertsProps} from "../../model/Props.ts";

export default function LoginPage({setAlerts}: AlertsProps) {
    const authenticateClient: AuthenticateClient = new AuthenticateClient();

    function handleTokenChange(value: string) {
        AuthState.token = value;
    }

    function handleAuthenticate() {
        authenticateClient.authenticate()
            .then(() => {
                console.log("Authentication Successful")
                showAlert("success", "Authentication Successful");
            })
            .catch(err => {
                console.log(err)
                showAlert("error", "Authentication Failed");
            });
    }

    const showAlert = (type: "success" | "error", message: string) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, {id, type, message}]);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 transform transition-transform duration-300 hover:scale-105">
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600 mb-6 md:mb-8">
                        👋 Admin Login
                    </h1>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Enter password..."
                            onChange={(e) => handleTokenChange(e.target.value)}
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleAuthenticate}
                            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            Authenticate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
