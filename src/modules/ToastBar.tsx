import {useEffect} from "react";
import type {AlertsProps} from "../model/Props.ts";

export default function ToastBar({setAlerts, alerts}: AlertsProps) {
    useEffect(() => {
        if (alerts.length === 0) return;
        const timer = setTimeout(() => {
            setAlerts((prev) => prev.slice(1)); // remove first alert
        }, 5000);

        return () => clearTimeout(timer); // cleanup on unmount/re-render
    }, [alerts, setAlerts]);

    return (
        <>
            {alerts.map((alert) => (
                <div className="toast toast-end" key={alert.id}>
                    <div
                        className={
                            alert.type === "success"
                                ? "alert alert-success shadow-lg"
                                : "alert alert-error shadow-lg"
                        }
                    >
                        <span>{alert.message}</span>
                    </div>
                </div>
            ))}
        </>
    );
}
