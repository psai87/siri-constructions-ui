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
        <div className="px-10 py-25">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl">
                {employees.map((employee) => (
                    <div
                        key={employee.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                        <figure className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                            <ImagePreview image={images.get(employee.id)}/>
                        </figure>
                        <div className="p-4 md:p-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800 truncate">{employee.firstName} {employee.lastName}</h3>
                            <p className="mt-1 text-sm text-gray-600 truncate">{employee.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
