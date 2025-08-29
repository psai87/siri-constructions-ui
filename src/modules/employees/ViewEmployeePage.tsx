import {useEffect, useState} from "react";

import ImagePreview from "../ImagePreview.tsx";
import type {Image} from "../../model/Image.ts";
import {imageClient} from "../../client/ImageClient.ts";
import type {AlertsProps} from "../../model/Props.ts";
import type {Employee} from "../../model/Employee.ts";
import {employeeClient} from "../../client/EmployeeClient.ts";


export default function ViewEmployeePage({setAlerts}: AlertsProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [images, setImages] = useState<Map<string, Image>>(new Map());

    useEffect(() => {
        employeeClient.getEmployees()
            .then(response => {
                setEmployees(response);
                console.log("Employee loaded");
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
                <section id="team-gallery" className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-800">
                        Our Team
                    </h1>
                    <p className="text-lg md:text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
                        Meet the skilled professionals and dedicated staff who drive our success in every project.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
                        {employees.map((employee) => (
                            <div
                                key={employee.id}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105"
                            >
                                <figure className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-200">
                                    <ImagePreview image={images.get(employee.id)}/>
                                </figure>
                                <div className="p-4 md:p-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-800 truncate">{employee.firstName} {employee.lastName}</h3>
                                    <p className="mt-1 text-sm text-gray-600 truncate">{employee.email}</p>
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
