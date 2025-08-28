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
        <div className="bg-gray-100 text-gray-900 min-h-screen p-28 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            {/* LEFT LIST - CORRECTED ALIGNMENT */}
            <div className="md:w-1/3 w-full max-w-sm md:max-w-none md:p-6 p-4 rounded-lg bg-white shadow-lg overflow-y-auto h-[90vh]">
                <h2 className="text-2xl font-bold mb-6 text-blue-600">Projects</h2>
                <ul className="space-y-4">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            className={`
                        p-5 rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer
                        hover:bg-gray-50 hover:transform hover:-translate-y-1 hover:shadow-md
                        ${selectedProject?.id === project.id ? "bg-blue-50 border-blue-500 shadow-md scale-105" : "bg-white border-transparent"}
                    `}
                            onClick={() => handleOnProjectClick(project)}
                        >
                            <h3 className="text-lg font-semibold text-blue-700 mb-1">{project.clientName}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT DETAIL VIEW - CORRECTED ALIGNMENT */}
            <div className="flex-1 w-full p-4 md:p-6 rounded-lg bg-white shadow-xl h-[90vh]">
                {selectedProject ? (
                    <div className="w-full h-full p-8 rounded-lg flex flex-col">
                        <h2 className="text-3xl font-extrabold text-blue-700 mb-2">{selectedProject.clientName}</h2>
                        <p className="text-gray-600 text-lg mb-6">{selectedProject.description}</p>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="w-full flex justify-center items-center">
                                <ImagePreview image={images.get(selectedProject?.id)?.[pageIndex]} />
                            </div>
                            <p className="text-gray-600 text-lg mb-6">{images.get(selectedProject?.id)?.[pageIndex]?.description}</p>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-l-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handlePageLeft}
                                    disabled={images.get(selectedProject.id)?.length === 0}
                                >
                                    «
                                </button>
                                <span className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 border-x border-gray-300">
                            Page {images.get(selectedProject.id)?.length === 0 ? 0 : pageIndex + 1} / {images.get(selectedProject.id)?.length ?? 0}
                        </span>
                                <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handlePageRight}
                                    disabled={images.get(selectedProject.id)?.length === 0}
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-400 font-medium text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                            Select a project to view details
                        </div>
                    </div>
                )}
            </div>
        </div>
         );
}
