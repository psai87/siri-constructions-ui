import {type ChangeEvent, useEffect, useState} from "react";
import type {Image} from "../../model/Image.ts";
import {imageClient} from "../../client/ImageClient.ts";
import {imageUtil} from "../../common/ImageUtil.ts";
import type {AlertsProps} from "../../model/Props.ts";
import ImagePreview from "../ImagePreview.tsx";
import type {Employee} from "../../model/Employee.ts";
import {employeeClient} from "../../client/EmployeeClient.ts";
import {DateInput} from "@mantine/dates";

const defaultEmployee = (uuid: string): Employee => {
    return {
        id: uuid,
        firstName: "",
        lastName: "",
        email: undefined,
        dob: "1900/01/01"
    };
};
const defaultImage = (uuid: string, defaultEmployee: Employee): Image => {
    return {
        id: uuid,
        refId: defaultEmployee.id,
        description: null,
        image: ""
    }
}

export default function EditEmployeePage({setAlerts}: AlertsProps) {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeForm, setEmployeeForm] = useState<Employee>(defaultEmployee(crypto.randomUUID()));
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [imageForm, setImageForm] = useState<Image>(defaultImage(crypto.randomUUID(), employeeForm));
    const isInvalid: boolean = !employeeForm.firstName.trim() || !employeeForm.lastName.trim() || !employeeForm.dob.trim();

    useEffect(() => {
        loadEmployees()
    }, []);

    function loadEmployees() {
        employeeClient.getEmployees()
            .then(response => {
                setEmployees(response);
                console.log("Employees loaded");
            })
            .catch(error => {
                console.log(error)
                showAlert("error", error.message)
            })
    }

    const resetForm = () => {
        const newEmployee: Employee = defaultEmployee(crypto.randomUUID());
        const newImage: Image = defaultImage(crypto.randomUUID(), newEmployee);
        setEmployeeForm(newEmployee);
        setImageForm(newImage);
        setSelectedEmployee(null);
    };

    const showAlert = (type: "success" | "error", message: string) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, {id, type, message}]);
    };

    const handleSelectService = (selectedValue: string) => {
        resetForm()
        if (!selectedValue || !selectedValue.trim()) {
            return;
        }
        const selectedEmployee: Employee | undefined = employees.find((employee: Employee) => employee.id === selectedValue);
        if (selectedEmployee) {
            setSelectedEmployee(selectedEmployee);
            setEmployeeForm(selectedEmployee);
            setImageForm(defaultImage(crypto.randomUUID(), selectedEmployee));
            imageClient
                .getImages([selectedEmployee.id])
                .then(response => {
                    if (response && response.length > 0) {
                        setImageForm(response[0])
                    }
                });
        }
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setEmployeeForm({...employeeForm, [name]: value});
    };

    const handleDateChange = (date: string | null) => {
        if (date) {
            setEmployeeForm({...employeeForm, ["dob"]: date});
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file: File = e.target.files[0];
            file.arrayBuffer()
                .then(data => {
                    setImageForm({...imageForm, image: imageUtil.arrayBufferToBase64(data)})
                });
        }
    };

    const handleAdd = async () => {
        try {
            if (imageForm.image.trim()) {
                await imageClient.createImages([imageForm]);
            }
            await employeeClient.createEmployees([employeeForm]);
            showAlert("success", "Employee created")
            resetForm();
            loadEmployees()
        } catch (error) {
            console.error("Create failed", error)
            showAlert("error", "Employee creation failed")
        }
    };

    const handleEdit = async () => {
        try {
            if (imageForm.image.trim()) {
                await imageClient.updateImages([imageForm]);
            }
            await employeeClient.updateEmployees([employeeForm]);
            showAlert("success", "Employee updated")
            resetForm();
            loadEmployees()
        } catch (error) {
            console.error("Employee update failed", error)
            showAlert("error", "Employee update failed")
        }
    };

    const handleDelete = async () => {
        try {
            if (imageForm.image.trim()) {
                await imageClient.deleteImages([imageForm.id]);
            }
            await employeeClient.deleteEmployees([employeeForm.id]);
            showAlert("success", "Employee deleted")
            resetForm();
            loadEmployees()
        } catch (error) {
            console.error("Employee deleted failed", error)
            showAlert("error", "Employee deleted failed")
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
            <div
                className="card w-full max-w-5xl bg-base-100 shadow-2xl rounded-2xl p-8 animate-fade-in flex flex-col md:flex-row gap-8">

                {/* Form Fields */}
                <div className="flex-1 max-w-lg flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-blue-700 text-center md:text-left mb-4">
                        {selectedEmployee ? "Edit Employee" : "Add New Employee"}
                    </h1>

                    {/* Select existing service */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Select Existing Employee</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={selectedEmployee?.id || ""}
                            onChange={(e) => handleSelectService(e.target.value)}
                        >
                            <option value="">-- None selected --</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ID */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">ID:&nbsp;</span>
                        </label>
                        <label className="label">
                            <span className="label-text">{employeeForm.id}</span>
                        </label>
                    </div>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">First Name</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={employeeForm.firstName}
                            onChange={handleTextChange}
                            placeholder="Enter first name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Last Name</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={employeeForm.lastName}
                            onChange={handleTextChange}
                            placeholder="Enter last name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Last Name</span>
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={employeeForm.email}
                            onChange={handleTextChange}
                            placeholder="Enter email"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <DateInput
                        value={employeeForm.dob}
                        onChange={handleDateChange}
                        placeholder="Pick month and year"
                        label="Select Month & Year"
                        valueFormat="YYYY/MM/DD"
                    />

                    {/* Buttons */}
                    <div className="form-control mt-4 flex gap-3">
                        {selectedEmployee ? (
                            <>
                                <button className="btn btn-primary flex-1" disabled={isInvalid} onClick={handleEdit}>
                                    Edit
                                </button>
                                <button className="btn btn-error flex-1" disabled={isInvalid} onClick={handleDelete}>
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-success w-full" disabled={isInvalid} onClick={handleAdd}>
                                Add
                            </button>
                        )}
                    </div>

                    {/* Upload button */}
                    <div className="form-control mt-4 w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Add Image</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Image Preview Card */}
                <div className="flex-shrink-0 flex items-center justify-center w-100">
                    <div
                        className="card w-64 h-64 bg-base-200 shadow-2xl rounded-2xl border-2 border-gray-300 overflow-hidden flex items-center justify-center p-2"
                    >
                        <ImagePreview image={imageForm}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
