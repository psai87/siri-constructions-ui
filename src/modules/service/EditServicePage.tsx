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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
            <div
                className="card w-full max-w-5xl bg-base-100 shadow-2xl rounded-2xl p-8 animate-fade-in flex flex-col md:flex-row gap-8">

                {/* Form Fields */}
                <div className="flex-1 max-w-lg flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-blue-700 text-center md:text-left mb-4">
                        {selectedService ? "Edit Service" : "Add New Service"}
                    </h1>

                    {/* Select existing service */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Select Existing Service</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
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

                    {/* ID */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">ID:&nbsp;</span>
                        </label>
                        <label className="label">
                            <span className="label-text">{serviceForm.id}</span>
                        </label>
                    </div>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={serviceForm.name}
                            onChange={handleTextChange}
                            placeholder="Enter name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea
                            name="description"
                            value={serviceForm.description}
                            onChange={handleTextChange}
                            placeholder="Enter description"
                            className="textarea textarea-bordered w-full min-h-48"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="form-control mt-4 flex gap-3">
                        {selectedService ? (
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
