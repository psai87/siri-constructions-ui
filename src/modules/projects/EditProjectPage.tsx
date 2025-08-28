import {type ChangeEvent, useEffect, useState} from "react";
import type {Image} from "../../model/Image.ts";
import {imageClient} from "../../client/ImageClient.ts";
import type {AlertsProps} from "../../model/Props.ts";
import type {Project} from "../../model/Project.ts";
import {projectClient} from "../../client/ProjectClient.ts";
import {imageUtil} from "../../common/ImageUtil.ts";
import ImagePreview from "../ImagePreview.tsx";
import {TrashIcon} from "@heroicons/react/24/outline";

const defaultProject = (uuid: string): Project => {
    return {
        id: uuid,
        clientName: "",
        description: "",
        current: false,
        location: ""
    };
};
const defaultImage = (uuid: string, defaultProject: Project): Image => {
    return {
        name: undefined,
        id: uuid,
        refId: defaultProject.id,
        description: null,
        image: ""
    }
}

export default function EditProjectPage({setAlerts}: AlertsProps) {

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectForm, setProjectForm] = useState<Project>(defaultProject(crypto.randomUUID()));
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [imageForms, setImageForms] = useState<Image[]>([]);
    const [selectedImageForm, setSelectedImageForm] = useState<Image>(defaultImage(crypto.randomUUID(), projectForm));
    const isInvalid: boolean = !projectForm.clientName.trim() || !projectForm.description.trim();
    const [pageIndex, setPageIndex] = useState<number>(0);

    useEffect(() => {
        loadProjects()
    }, []);

    function loadProjects() {
        projectClient.getProjects()
            .then(response => {
                setProjects(response);
                console.log("Projects loaded");
            })
            .catch(error => {
                console.log(error)
                showAlert("error", error.message);
            })
    }

    const resetForm = () => {
        const newService = defaultProject(crypto.randomUUID());
        const newImage = defaultImage(crypto.randomUUID(), newService);
        setProjectForm(newService);
        setImageForms([]);
        setSelectedProject(null);
        setSelectedImageForm(newImage);
        setPageIndex(0)
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
        const selectedProject: Project | undefined = projects.find((project: Project) => project.id === selectedValue);
        if (selectedProject) {
            setSelectedProject(selectedProject);
            setProjectForm(selectedProject);
            setSelectedImageForm(defaultImage(crypto.randomUUID(), selectedProject));
            imageClient
                .getImages([selectedProject.id])
                .then(response => {
                    if (response && response.length > 0) {
                        setImageForms(response)
                    }
                });
        }
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setProjectForm({...projectForm, [name]: value});
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectForm({...projectForm, ["current"]: e.target.checked});
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file: File = e.target.files[0];
            file.arrayBuffer()
                .then(data => {
                    setSelectedImageForm({...selectedImageForm, image: imageUtil.arrayBufferToBase64(data)})
                });
        }
    };

    const handleAddImageTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setSelectedImageForm({...selectedImageForm, [name]: value});
    };

    const handleAddImageButton = () => {
        setImageForms((images) => {
            const newImages = [...images, selectedImageForm]
            setPageIndex(newImages.length - 1)
            return newImages;
        });
        setSelectedImageForm(defaultImage(crypto.randomUUID(), projectForm));
    };

    const handleDeleteImageButton = () => {
        setImageForms((images) => images.filter((_, index) => pageIndex != index));
        setSelectedImageForm(defaultImage(crypto.randomUUID(), projectForm))
        setPageIndex(0)
    };


    function handlePageLeft() {
        setPageIndex((index) => {
            return Math.max(0, index - 1);
        });
    }

    function handlePageRight() {
        setPageIndex((index) => {
            return Math.min(imageForms.length - 1, index + 1);
        });
    }

    const handleAdd = async () => {
        try {
            if (imageForms.length) {
                await imageClient.createImages(imageForms);
            }
            await projectClient.createProjects([projectForm]);
            showAlert("success", "Project created")
            resetForm();
            loadProjects();
        } catch (error) {
            console.error("Create failed", error)
            showAlert("error", "Project creation failed")
        }
    };

    const handleEdit = async () => {
        try {
            if (imageForms.length) {
                await imageClient.deleteImages(imageForms.map(data => data.id));
                await imageClient.createImages(imageForms);
            }
            await projectClient.updateProjects([projectForm]);
            showAlert("success", "Project updated")
            resetForm();
            loadProjects()
        } catch (error) {
            console.error("Project update failed", error)
            showAlert("error", "Project update failed")
        }
    };

    const handleDelete = async () => {
        try {
            if (imageForms.length) {
                await imageClient.deleteImages(imageForms.map(data => data.id));
            }
            await projectClient.deleteProjects([projectForm.id]);
            showAlert("success", "Project deleted")
            resetForm();
            loadProjects()
        } catch (error) {
            console.error("Project deleted failed", error)
            showAlert("error", "Project deleted failed")
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-100 p-20 w-full">
            <div
                className="card w-full max-w-7xl bg-base-100 shadow-2xl rounded-2xl p-8 animate-fade-in flex flex-col md:flex-row gap-8">

                {/* Left Form Fields */}
                <div className="flex-1 max-w-3xl flex flex-col gap-4 w-full">
                    <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
                        {selectedProject ? "Edit Project" : "Add New Project"}
                    </h1>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Select Existing Service</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={selectedProject?.id || ""}
                            onChange={(e) => handleSelectService(e.target.value)}
                        >
                            <option value="">-- None selected --</option>
                            {projects.map(prj => (
                                <option key={prj.id} value={prj.id}>{prj.clientName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">ID:</span>
                        </label>
                        <label className="label">
                            <span className="label-text">{projectForm.id}</span>
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text font-semibold">Current</span>
                            <input
                                type="checkbox"
                                name="current"
                                checked={projectForm.current ?? false}
                                onChange={handleCheckboxChange}
                                className="checkbox checkbox-primary ml-2"
                            />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input
                            type="text"
                            name="clientName"
                            value={projectForm.clientName}
                            onChange={handleTextChange}
                            placeholder="Enter name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea
                            name="description"
                            value={projectForm.description}
                            onChange={handleTextChange}
                            placeholder="Enter description"
                            className="textarea textarea-bordered w-full min-h-48"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Location</span>
                        </label>
                        <input
                            name="location"
                            value={projectForm.location ?? ""}
                            onChange={handleTextChange}
                            placeholder="Enter description"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Image Related Section */}
                    <div className="bg-gray-100 p-4 rounded-xl shadow-inner flex flex-col gap-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Image Details</h2>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Image Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={selectedImageForm.description ?? ""}
                                onChange={handleAddImageTextChange}
                                placeholder="Enter description"
                                className="textarea textarea-bordered w-full min-h-32"
                            />
                        </div>

                        {/* Upload Image */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Browse Image</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input file-input-bordered w-full"
                            />
                        </div>
                        <div className="form-control mt-4 flex gap-3">
                            <button
                                className="btn btn-primary flex-1"
                                disabled={selectedImageForm.image.trim() == ""}
                                onClick={handleAddImageButton}
                            >
                                Add Image
                            </button>
                        </div>
                    </div>


                    <div className="form-control mt-4 flex gap-3">
                        {selectedProject ? (
                            <>
                                <button className="btn btn-primary flex-1" disabled={isInvalid}
                                        onClick={handleEdit}>Save
                                </button>
                                <button className="btn btn-error flex-1" disabled={isInvalid}
                                        onClick={handleDelete}>Delete
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-success w-full" disabled={isInvalid}
                                    onClick={handleAdd}>Save</button>
                        )}
                    </div>
                </div>


                {/* Right Image Upload & Preview */}
                <div className="flex-1 max-w-3xl flex flex-col gap-4 w-full ">
                    {/* Pagination */}
                    <div className="flex justify-center mt-2">
                        <div className="join">
                            <button className="join-item btn" onClick={handlePageLeft}
                                    disabled={imageForms.length == 0}>«
                            </button>
                            <button className="join-item btn"
                                    disabled={imageForms.length == 0}>Pages {imageForms.length == 0 ? pageIndex : pageIndex + 1}/{
                                imageForms.length
                            }</button>
                            <button className="join-item btn" onClick={handlePageRight}
                                    disabled={imageForms.length == 0}>»
                            </button>
                        </div>

                        <button className="btn btn-error btn-circle" disabled={imageForms.length <= 0}
                                onClick={handleDeleteImageButton}>
                            <TrashIcon className="h-5 w-5"/>
                        </button>
                    </div>

                    <div className="hero bg-base-200 p-4 rounded-2xl shadow-2xl border-2 border-gray-300">
                        <div className="hero-content flex flex-col items-center gap-4">
                            {/* Image */}

                            <div
                                className="h-96/12 rounded-2xl overflow-hidden flex items-center justify-center bg-base-100 shadow-inner p-2">
                                <ImagePreview image={imageForms.length > 0 ? imageForms[pageIndex] : undefined}/>
                            </div>

                            {/* Description */}
                            <div className="text-center">
                                <p className="text-gray-700">
                                    {imageForms.length > 0 ? imageForms[pageIndex].description : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
