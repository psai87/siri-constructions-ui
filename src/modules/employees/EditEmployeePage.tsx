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
        name: undefined,
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-12 md:p-12 py-20">
            <div
                className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-12 flex flex-col md:flex-row gap-8">

                {/* Form Fields Section */}
                <div className="flex-1 flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blue-700 text-center md:text-left mb-2">
                        {selectedEmployee ? "Edit Employee" : "Add New Employee"}
                    </h1>

                    {/* Select Existing Employee */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Existing
                            Employee</label>
                        <select
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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

                    {/* ID Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">ID</label>
                        <p className="px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg">{employeeForm.id}</p>
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={employeeForm.firstName}
                            onChange={handleTextChange}
                            placeholder="Enter first name"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={employeeForm.lastName}
                            onChange={handleTextChange}
                            placeholder="Enter last name"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={employeeForm.email}
                            onChange={handleTextChange}
                            placeholder="Enter email"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    {/* Date Picker */}
                    <DateInput
                        value={employeeForm.dob}
                        onChange={handleDateChange}
                        placeholder="Pick month and year"
                        label="Select Month & Year"
                        valueFormat="YYYY/MM/DD"
                    />

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Add Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        {selectedEmployee ? (
                            <>
                                <button
                                    className="flex-1 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isInvalid} onClick={handleEdit}>
                                    Edit
                                </button>
                                <button
                                    className="flex-1 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isInvalid} onClick={handleDelete}>
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button
                                className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isInvalid} onClick={handleAdd}>
                                Add
                            </button>
                        )}
                    </div>
                </div>

                {/* Image Preview Section */}
                <div className="flex-shrink-0 flex items-center justify-center p-4 md:p-8">
                    <div
                        className="w-64 h-64 bg-gray-200 rounded-2xl shadow-lg border-2 border-gray-300 overflow-hidden flex items-center justify-center p-2">
                        <ImagePreview image={imageForm}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
