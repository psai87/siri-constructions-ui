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
        <div className="antialiased font-inter">
            <style>
                {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Oswald:wght@500;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F4F6F8;
            color: #1a202c;
        }
        h1, h2, h3, h4, .font-oswald {
            font-family: 'Oswald', sans-serif;
        }
        `}
            </style>

            <main className="container mx-auto px-6 py-25">
                <section id="services-gallery" className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-800">
                        Our Services Gallery
                    </h1>
                    <p className="text-lg md:text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
                        Explore the range of high-quality MEP and structural services we provide, delivered with precision and expertise.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105"
                            >
                                <figure className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-200">
                                    <ImagePreview image={images.get(service.id)}/>
                                </figure>
                                <div className="p-4 md:p-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                                    <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8 text-center">
                <div className="container mx-auto px-6">
                    <p>&copy; 2024 Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
