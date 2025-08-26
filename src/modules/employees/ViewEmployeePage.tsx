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
        <div className="p-20">
            <div className="flex flex-wrap gap-6">
                {employees.map((employee: Employee) => (
                    <div
                        key={employee.id}
                        className="card card-side max-w-96 bg-base-100 shadow-xl border border-gray-200 "
                    >
                        <figure className="h-40 w-40">
                            <ImagePreview image={images.get(employee.id)}/>
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title ">{employee.firstName} {employee.lastName}</h3>
                            <p>{employee.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
