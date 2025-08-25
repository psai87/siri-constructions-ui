import type {AlertToast} from "./AlertToast.ts";
import * as React from "react";

export interface AlertsProps {
    setAlerts: React.Dispatch<React.SetStateAction<AlertToast[]>>,
    alerts: AlertToast[]
}
