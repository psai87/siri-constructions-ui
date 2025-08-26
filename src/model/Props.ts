import type {AlertToast} from "./AlertToast.ts";
import * as React from "react";
import type {Image} from "./Image.ts";

export interface AlertsProps {
    setAlerts: React.Dispatch<React.SetStateAction<AlertToast[]>>,
    alerts: AlertToast[]
}

export interface ImageProps {
    image: Image | undefined
}
