import {useEffect, useState} from "react";
import type {AvailableService} from "../../model/Service.ts";
import {availableServiceClient} from "../../client/AvailableServiceClient.ts";
import ImagePreview from "../ImagePreview.tsx";
import type {Image} from "../../model/Image.ts";
import {imageClient} from "../../client/ImageClient.ts";
import type {AlertsProps} from "../../model/Props.ts";


export default function ViewServicePage({setAlerts}: AlertsProps) {
    const [services, setServices] = useState<AvailableService[]>([]);
    const [images, setImages] = useState<Map<string, Image>>(new Map());

    useEffect(() => {
        availableServiceClient.getAvailableService()
            .then(response => {
                setServices(response);
                console.log("Available service loaded");
                return imageClient.getImages(response.map(data => data.id));
            })
            .then(response => {
                setImages(new Map(response.map(image => [image.refId, image])));
            })
            .catch(error => {
                console.log(error)
                showAlert("error", error.message)
            })
    }, []);

    const showAlert = (type: "success" | "error", message: string) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, {id, type, message}]);
    };

    return (
        <div className="p-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="card max-w-150 bg-base-100 shadow-xl border border-gray-200"
                    >
                        <figure className="h-48 min-w-48">
                            <ImagePreview image={images.get(service.id)}/>
                        </figure>
                        <div className="card-body min-w-48">
                            <h3 className="card-title">{service.name}</h3>
                            <p>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
