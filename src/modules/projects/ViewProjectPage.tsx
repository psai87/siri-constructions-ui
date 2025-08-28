import {useEffect, useState} from "react";
import type {Image} from "../../model/Image.ts";
import type {Project} from "../../model/Project.ts";
import {projectClient} from "../../client/ProjectClient.ts";
import type {AlertsProps} from "../../model/Props.ts";
import {imageClient} from "../../client/ImageClient.ts";
import ImagePreview from "../ImagePreview.tsx";

export default function ViewProjectPage({setAlerts}: AlertsProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [images, setImages] = useState<Map<string, Image[]>>(new Map());
    const [pageIndex, setPageIndex] = useState<number>(0);

    useEffect(() => {
        projectClient.getProjects()
            .then(response => {
                setProjects(response);
                console.log("Projects loaded");
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

    const handleOnProjectClick = (project: Project) => {
        setSelectedProject(project)
        if (!images.get(project.id)) {
            imageClient.getImages([project.id])
                .then(response =>
                    setImages(oldMap => new Map(oldMap).set(project.id, response)))
                .catch(error => {
                    console.log(error)
                    showAlert("error", error.message)
                });
        }

    }

    function handlePageLeft() {
        setPageIndex((index) => {
            return Math.max(0, index - 1);
        });
    }

    function handlePageRight() {
        setPageIndex((index) => {
            return selectedProject?.id
                ? Math.min(
                    (images.get(selectedProject.id)?.length ?? 0) - 1,
                    index + 1
                ) : 0;
        });
    }

    return (
        <div className="flex flex-col md:flex-row h-screen p-4 md:p-20 gap-4">
            {/* LEFT LIST */}
            <div className="md:w-1/4 w-full overflow-y-auto p-2 md:p-4">
                <h2 className="text-xl font-bold mb-4 text-primary">Projects</h2>
                <ul className="space-y-3">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            className={`card shadow-sm cursor-pointer transition ${
                                selectedProject?.id === project.id ? "border-2 border-blue-500" : ""
                            }`}
                            onClick={() => handleOnProjectClick(project)}
                        >
                            <div className="card-body p-4">
                                <h3 className="font-semibold text-blue-700">{project.clientName}</h3>
                                <p className="text-gray-700 line-clamp-2">{project.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT DETAIL VIEW */}
            <div className="flex-1 w-full p-2 md:p-6">
                {selectedProject ? (
                    <div className="card bg-base-100 shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-blue-700">{selectedProject.clientName}</h2>
                        <p className="mt-2 text-gray-700">{selectedProject.description}</p>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <ImagePreview image={images.get(selectedProject?.id)?.[pageIndex]} />
                        </div>

                        <div className="flex justify-center mt-2">
                            <div className="join">
                                <button
                                    className="join-item btn"
                                    onClick={handlePageLeft}
                                    disabled={images.get(selectedProject.id)?.length === 0}
                                >
                                    «
                                </button>
                                <button
                                    className="join-item btn"
                                    disabled={images.get(selectedProject.id)?.length === 0}
                                >
                                    Page {images.get(selectedProject.id)?.length === 0 ? 0 : pageIndex + 1}/
                                    {images.get(selectedProject.id)?.length ?? 0}
                                </button>
                                <button
                                    className="join-item btn"
                                    onClick={handlePageRight}
                                    disabled={images.get(selectedProject.id)?.length === 0}
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Select a project to view details
                    </div>
                )}
            </div>
        </div>

    );
}
