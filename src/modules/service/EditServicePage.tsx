import {type ChangeEvent, useEffect, useState} from "react";
import type {AvailableService} from "../../model/Service.ts";
import type {Image} from "../../model/Image.ts";
import {availableServiceClient} from "../../client/AvailableServiceClient.ts";
import {imageClient} from "../../client/ImageClient.ts";
import {imageUtil} from "../../common/ImageUtil.ts";

export default function EditServicePage() {

    const defaultService = (uuid: string): AvailableService => {
        return {
            id: uuid,
            name: "",
            description: ""
        };
    };
    const defaultImage = (uuid: string, defaultService: AvailableService): Image => {
        return {
            id: uuid,
            refId: defaultService.id,
            description: null,
            image: ""
        }
    }
    const [service, setService] = useState<AvailableService[]>([]);
    const [serviceForm, setServiceForm] = useState<AvailableService>(defaultService(crypto.randomUUID()));
    const [selectedService, setSelectedService] = useState<AvailableService | null>(null);
    const [_, setSelectedImage] = useState<Image | null>(null);
    const [imageForm, setImageForm] = useState<Image>(defaultImage(crypto.randomUUID(), serviceForm));
    const [previewUrl, setPreviewUrl] = useState<string>("/siri-constructions-ui/preview_image.png");
    const isInvalid: boolean = !serviceForm.name.trim() || !serviceForm.description.trim() || !imageForm.image;
    const [alerts, setAlerts] = useState<{ id: number, type: "success" | "error"; message: string }[]>([])

    useEffect(() => {
        setTimeout(function () {
            setAlerts(prevState => prevState.filter(data => data.id > Date.now()));
        }, 5000);
    }, [alerts]);

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

    useEffect(() => {
        if (!imageForm || !imageForm.image) {
            setPreviewUrl("/siri-constructions-ui/preview_image.png")
            return;
        }
        const buffer = imageUtil.base64ToArrayBuffer(imageForm.image);
        const blob = new Blob([buffer], {type: "image/jpeg"});
        const objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);
        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [imageForm]);

    const handleSelectService = (selectedValue: string) => {
        const newService: AvailableService = defaultService(crypto.randomUUID());
        const newImage: Image = defaultImage(crypto.randomUUID(), newService);
        if (!selectedValue || !selectedValue.trim()) {
            setServiceForm(newService);
            setImageForm(newImage);
            setSelectedImage(null);
            setSelectedService(null);
            return;
        }

        const selectedService: AvailableService | undefined = service.find((availableService: AvailableService) => availableService.id === selectedValue);
        setSelectedService(selectedService ?? null);
        setServiceForm(selectedService ?? newService);
        if (selectedService) {
            imageClient
                .getImages(selectedService.id)
                .then(response => {
                    setSelectedImage(response[0] ?? null)
                    setImageForm(response[0] ?? newImage)
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
                setAlerts(prevState => [...prevState, {
                    id: Date.now(),
                    type: "success",
                    message: "Service created"
                }])
                handleSelectService("");
                callAvailableService()
            })
            .catch(error => {
                console.log("Create failed", error)
                setAlerts(prevState => [...prevState, {
                    id: Date.now(),
                    type: "error",
                    message: error.message
                }])
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
                setAlerts(prevState => [...prevState, {
                    id: Date.now(),
                    type: "success",
                    message: "Service created"
                }])
                handleSelectService("");
                callAvailableService()
            })
            .catch(error => {
                console.log("Update failed", error)
                setAlerts(prevState => [...prevState, {
                    id: Date.now(),
                    type: "error",
                    message: error.message
                }])
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
                handleSelectService("");
                callAvailableService()
            })
            .catch(error => {
                console.log("delete failed", error)
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
                            <span className="label-text font-semibold">ID</span>
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
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="object-cover w-full h-full rounded-xl"
                        />
                    </div>
                </div>

                {alerts.map((alert) => (
                    <div className="toast toast-end" key={alert.id}>
                        <div className={alert.type === 'success' ? "alert alert-success" : "alert alert-er"}>
                            <span>{alert.message}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
