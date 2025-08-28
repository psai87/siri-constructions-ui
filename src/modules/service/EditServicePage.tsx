import {type ChangeEvent, useEffect, useState} from "react";
import type {AvailableService} from "../../model/Service.ts";
import type {Image} from "../../model/Image.ts";
import {availableServiceClient} from "../../client/AvailableServiceClient.ts";
import {imageClient} from "../../client/ImageClient.ts";
import {imageUtil} from "../../common/ImageUtil.ts";
import type {AlertsProps} from "../../model/Props.ts";
import ImagePreview from "../ImagePreview.tsx";

const defaultService = (uuid: string): AvailableService => {
    return {
        id: uuid,
        name: "",
        description: ""
    };
};
const defaultImage = (uuid: string, defaultService: AvailableService): Image => {
    return {
        name: undefined,
        id: uuid,
        refId: defaultService.id,
        description: null,
        image: ""
    }
}

export default function EditServicePage({setAlerts}: AlertsProps) {

    const [service, setService] = useState<AvailableService[]>([]);
    const [serviceForm, setServiceForm] = useState<AvailableService>(defaultService(crypto.randomUUID()));
    const [selectedService, setSelectedService] = useState<AvailableService | null>(null);
    const [imageForm, setImageForm] = useState<Image>(defaultImage(crypto.randomUUID(), serviceForm));
    const isInvalid: boolean = !serviceForm.name.trim() || !serviceForm.description.trim() || !imageForm.image;

    useEffect(() => {
        callAvailableService()
    }, []);

    function callAvailableService() {
        availableServiceClient.getAvailableService()
            .then(response => {
                setService(response);
                console.log("Available service loaded");
            })
            .catch(error => console.log(error))
    }

    const resetForm = () => {
        const newService = defaultService(crypto.randomUUID());
        const newImage = defaultImage(crypto.randomUUID(), newService);
        setServiceForm(newService);
        setImageForm(newImage);
        setSelectedService(null);
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
        const selectedService: AvailableService | undefined = service.find((availableService: AvailableService) => availableService.id === selectedValue);
        if (selectedService) {
            setSelectedService(selectedService);
            setServiceForm(selectedService);
            setImageForm(defaultImage(crypto.randomUUID(), selectedService));
            imageClient
                .getImages([selectedService.id])
                .then(response => {
                    if (response && response.length > 0) {
                        setImageForm(response[0])
                    }
                });
        }
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setServiceForm({...serviceForm, [name]: value});
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

    const handleAdd = () => {
        imageClient.createImages([imageForm])
            .then(() => {
                console.log("Image created");
                return availableServiceClient.createAvailableService([serviceForm]);
            })
            .then(() => {
                console.log("Service created");
                showAlert("success", "Service created")
                resetForm();
                callAvailableService()
            })
            .catch(error => {
                console.log("Create failed", error)
                showAlert(error, error.message)
            });
    };

    const handleEdit = () => {
        imageClient.updateImages([imageForm])
            .then(() => {
                console.log("Image updated");
                return availableServiceClient.updateAvailableService([serviceForm]);
            })
            .then(() => {
                console.log("Service updated");
                showAlert("success", "Service updated")
                resetForm();
                callAvailableService()
            })
            .catch(error => {
                console.log("Update failed", error)
                showAlert(error, error.message)
            });
    };

    const handleDelete = () => {
        imageClient.deleteImages([imageForm.id])
            .then(() => {
                console.log("Image deleted");
                return availableServiceClient.deleteAvailableService([serviceForm.id]);
            })
            .then(() => {
                console.log("Service deleted");
                showAlert("success", "Service deleted")
                resetForm();
                callAvailableService()
            })
            .catch(error => {
                console.log("delete failed", error)
                showAlert(error, error.message)
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-12 md:p-12 py-20">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-12 flex flex-col md:flex-row gap-8">

                {/* Form Fields Section */}
                <div className="flex-1 flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blue-700 text-center md:text-left mb-2">
                        {selectedService ? "Edit Service" : "Add New Service"}
                    </h1>

                    {/* Select Existing Service */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Existing Service</label>
                        <select
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            value={selectedService?.id || ""}
                            onChange={(e) => handleSelectService(e.target.value)}
                        >
                            <option value="">-- None selected --</option>
                            {service.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ID Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">ID</label>
                        <p className="px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg">{serviceForm.id}</p>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={serviceForm.name}
                            onChange={handleTextChange}
                            placeholder="Enter name"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={serviceForm.description}
                            onChange={handleTextChange}
                            placeholder="Enter description"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[12rem]"
                        />
                    </div>

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
                        {selectedService ? (
                            <>
                                <button className="flex-1 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isInvalid} onClick={handleEdit}>
                                    Edit
                                </button>
                                <button className="flex-1 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isInvalid} onClick={handleDelete}>
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isInvalid} onClick={handleAdd}>
                                Add
                            </button>
                        )}
                    </div>
                </div>

                {/* Image Preview Section */}
                <div className="flex-shrink-0 flex items-center justify-center p-4 md:p-8">
                    <div className="w-64 h-64 bg-gray-200 rounded-2xl shadow-lg border-2 border-gray-300 overflow-hidden flex items-center justify-center p-2">
                        <ImagePreview image={imageForm} />
                    </div>
                </div>
            </div>
        </div>
         );
}
