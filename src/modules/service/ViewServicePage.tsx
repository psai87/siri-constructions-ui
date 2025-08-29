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
        <div className="px-10 py-25">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                        <figure className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                            <ImagePreview image={images.get(service.id)}/>
                        </figure>
                        <div className="p-4 md:p-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                            <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
