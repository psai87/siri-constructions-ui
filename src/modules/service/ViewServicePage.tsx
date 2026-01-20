import { useEffect, useState, useRef } from "react";
import type { AvailableService } from "../../model/Service.ts";
import { availableServiceClient } from "../../client/AvailableServiceClient.ts";
import ImagePreview from "../ImagePreview.tsx";
import type { Image } from "../../model/Image.ts";
import { imageClient } from "../../client/ImageClient.ts";
import type { AlertsProps } from "../../model/Props.ts";
import { Link } from "react-router-dom";


export default function ViewServicePage({ setAlerts }: AlertsProps) {
    const [services, setServices] = useState<AvailableService[]>([]);
    const [images, setImages] = useState<Map<string, Image>>(new Map());
    const servicesRef = useRef<HTMLDivElement | null>(null);

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
        setAlerts((prev) => [...prev, { id, type, message }]);
    };

    return (
        <div className="antialiased min-h-screen bg-gray-50 font-outfit">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
                
                body {
                    font-family: 'Outfit', sans-serif;
                }
                
                .text-gradient {
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-image: linear-gradient(to right, #f97316, #ea580c);
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                .animate-delay-100 { animation-delay: 0.1s; }
                .animate-delay-200 { animation-delay: 0.2s; }
                .animate-delay-300 { animation-delay: 0.3s; }
                `}
            </style>

            <main className="container mx-auto px-4 md:px-6 py-16 relative z-20">
                <section id="services-gallery" ref={servicesRef} className="scroll-mt-24">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our <span className="text-orange-600">Services</span></h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
                            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
                                We offer a wide range of specialized construction and maintenance services designed to meet the highest industry standards.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-orange-200 flex flex-col h-full"
                                >
                                    <figure className="w-full h-56 flex items-center justify-center overflow-hidden bg-gray-100 relative">
                                        <div className="transform transition-transform duration-500 group-hover:scale-110 w-full h-full flex items-center justify-center">
                                            <ImagePreview image={images.get(service.id)} />
                                        </div>
                                    </figure>
                                    <div className="p-6 flex-1 flex flex-col relative z-20">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">{service.name}</h3>
                                            <div className="h-0.5 w-12 bg-orange-200 group-hover:w-full transition-all duration-500"></div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mt-20 mb-10">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
                            <p className="text-xl text-gray-300 mb-10 font-light">
                                Contact us today for a consultation and let us help you build your vision with excellence.
                            </p>
                            <Link to="/contact" className="inline-block px-10 py-4 bg-orange-600 text-white font-bold rounded-full shadow-lg hover:bg-orange-500 hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1">
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-8 font-bold text-2xl tracking-tight">
                        <span className="text-orange-500">Siri</span> Constructions
                    </div>
                    <div className="flex justify-center space-x-8 mb-8 text-gray-400">
                        {['About', 'Services', 'Projects', 'Contact'].map(link => (
                            <span key={link} className="hover:text-orange-500 cursor-pointer transition-colors">{link}</span>
                        ))}
                    </div>
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
