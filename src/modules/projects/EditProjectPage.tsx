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
        location: "",
        createdTime: new Date().toISOString()
    };
};
const defaultImage = (uuid: string, defaultProject: Project): Image => {
    return {
        name: undefined,
        id: uuid,
        refId: defaultProject.id,
        description: null,
        image: "",
        createdTime: new Date().toISOString()
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
        <div className="antialiased font-inter bg-gray-50 min-h-screen">
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
            <main className="flex items-center justify-center py-12 md:py-20 px-6">
                <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-12 flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 flex flex-col gap-6 w-full">
                        <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-2">
                            {selectedProject ? "Edit Project" : "Add New Project"}
                        </h1>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Existing Service</label>
                            <select
                                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                                value={selectedProject?.id || ""}
                                onChange={(e) => handleSelectService(e.target.value)}
                            >
                                <option value="">-- None selected --</option>
                                {projects.map(prj => (
                                    <option key={prj.id} value={prj.id}>{prj.clientName}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">ID</label>
                            <p className="px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg">{projectForm.id}</p>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="current"
                                checked={projectForm.current ?? false}
                                onChange={handleCheckboxChange}
                                className="h-5 w-5 text-gray-800 bg-gray-100 rounded border-gray-300 focus:ring-orange-500"
                            />
                            <label className="ml-2 text-sm font-semibold text-gray-700">Current</label>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="clientName"
                                value={projectForm.clientName}
                                onChange={handleTextChange}
                                placeholder="Enter name"
                                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={projectForm.description}
                                onChange={handleTextChange}
                                placeholder="Enter description"
                                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors min-h-[12rem]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                            <input
                                name="location"
                                value={projectForm.location ?? ""}
                                onChange={handleTextChange}
                                placeholder="Enter location"
                                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                            />
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl shadow-inner flex flex-col gap-4">
                            <h2 className="text-xl font-bold text-gray-800">Image Details</h2>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Image Description</label>
                                <textarea
                                    name="description"
                                    value={selectedImageForm.description ?? ""}
                                    onChange={handleAddImageTextChange}
                                    placeholder="Enter description"
                                    className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors min-h-[8rem]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Browse Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 transition-colors"
                                />
                            </div>

                            <button
                                className="w-full py-3 text-lg font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={selectedImageForm.image.trim() === ""}
                                onClick={handleAddImageButton}
                            >
                                Add Image
                            </button>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-4">
                            {selectedProject ? (
                                <>
                                    <button className="flex-1 py-3 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isInvalid} onClick={handleEdit}>
                                        Save
                                    </button>
                                    <button className="flex-1 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isInvalid} onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button className="w-full py-3 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isInvalid} onClick={handleAdd}>
                                    Save
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6 w-full p-4 md:p-8 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-l-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handlePageLeft} disabled={imageForms.length <= 1 || pageIndex === 0}>
                                    «
                                </button>
                                <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border-x border-gray-300">
                  Pages {imageForms.length === 0 ? 0 : pageIndex + 1}/{imageForms.length}
                </span>
                                <button className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-r-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handlePageRight} disabled={imageForms.length <= 1 || pageIndex === imageForms.length - 1}>
                                    »
                                </button>
                            </div>
                            <button
                                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={imageForms.length <= 0}
                                onClick={handleDeleteImageButton}
                            >
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </div>

                        <div className="w-full h-96 flex flex-col items-center justify-center bg-white rounded-lg shadow-md border-2 border-gray-300 p-2">
                            <ImagePreview image={imageForms[pageIndex]}/>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-700">
                                {imageForms[pageIndex] ? imageForms[pageIndex].description : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white py-8 text-center mt-12">
                <div className="container mx-auto px-6">
                    <p>&copy; 2024 Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
        );
}
