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
        <div className="bg-gray-50 text-gray-900 min-h-screen px-10 py-25">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[90vh]">
                {/* LEFT LIST - CORRECTED ALIGNMENT */}
                <div
                    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col overflow-y-auto">
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

                <section className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8 flex flex-col overflow-y-auto">
                    {selectedProject ? (
                        <>
                            {/* Header */}
                            <header className="mb-6">
                                <h2 className="text-2xl font-extrabold text-blue-700">{selectedProject.clientName}</h2>
                                <p className="text-gray-500 mt-1">{selectedProject.description}</p>
                            </header>

                            {/* Main content with image + description */}
                            <div className="flex-1 flex flex-col md:flex-row gap-6 items-start">
                                <div
                                    className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl shadow-inner p-4">
                                    <ImagePreview image={images.get(selectedProject?.id)?.[pageIndex]}/>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        {images.get(selectedProject?.id)?.[pageIndex]?.description ?? "No description available"}
                                    </p>
                                </div>
                            </div>

                            {/* Pagination / controls */}
                            <footer className="mt-6 flex justify-center">
                                <div className="inline-flex rounded-lg shadow-sm overflow-hidden border">
                                    <button
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                                        onClick={handlePageLeft}
                                        disabled={images.get(selectedProject.id)?.length === 0}
                                    >
                                        «
                                    </button>
                                    <span className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100">
                Page {images.get(selectedProject.id)?.length === 0 ? 0 : pageIndex + 1} / {images.get(selectedProject.id)?.length ?? 0}
              </span>
                                    <button
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                                        onClick={handlePageRight}
                                        disabled={images.get(selectedProject.id)?.length === 0}
                                    >
                                        »
                                    </button>
                                </div>
                            </footer>
                        </>
                    ) : (
                        // Empty state
                        <div className="flex flex-1 items-center justify-center">
                            <div className="text-center text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-14 h-14 mx-auto mb-3 text-gray-300"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>
                                </svg>
                                <p className="font-medium text-lg">Select a project to view details</p>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

// <div className="bg-gray-50 text-gray-900 min-h-screen p-6 md:p-10">
// <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[90vh]">
//
// {/* LEFT SIDEBAR */}
// <aside className="bg-white rounded-2xl shadow-lg p-6 flex flex-col overflow-y-auto">
// <h2 className="text-xl font-bold mb-4 text-blue-600">Projects</h2>
//
// <input
//                         type="text"
//                         placeholder="Search projects..."
//                         className="mb-4 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//
//                     <ul className="space-y-3 overflow-y-auto pr-2">
//                         {projects.map((project) => (
//                             <li
//                                 key={project.id}
//                                 className={`
//         p-4 rounded-xl cursor-pointer flex items-start gap-3 shadow-sm transition-transform duration-200
//         hover:-translate-y-1 hover:scale-105 hover:shadow-md
//         ${selectedProject?.id === project.id
//                                     ? "bg-blue-50 ring-2 ring-blue-400 shadow-md scale-105"
//                                     : "bg-gray-50"}
//       `}
//                                 onClick={() => handleOnProjectClick(project)}
//                             >
//                                 <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
//                                     {project.clientName.charAt(0)}
//                                 </div>
//                                 <div className="flex-1">
//                                     <h3 className="text-sm font-semibold">{project.clientName}</h3>
//                                     <p className="text-gray-500 text-xs line-clamp-2">{project.description}</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//
//                 </aside>
//
//                 {/* RIGHT DETAIL VIEW */}
//                 <section className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8 flex flex-col overflow-y-auto">
//                     {selectedProject ? (
//                         <>
//                             {/* Header */}
//                             <header className="mb-6">
//                                 <h2 className="text-2xl font-extrabold text-blue-700">{selectedProject.clientName}</h2>
//                                 <p className="text-gray-500 mt-1">{selectedProject.description}</p>
//                             </header>
//
//                             {/* Main content with image + description */}
//                             <div className="flex-1 flex flex-col md:flex-row gap-6 items-start">
//                                 <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl shadow-inner p-4">
//                                     <ImagePreview image={images.get(selectedProject?.id)?.[pageIndex]} />
//                                 </div>
//                                 <div className="flex-1">
//                                     <p className="text-gray-600 text-base leading-relaxed">
//                                         {images.get(selectedProject?.id)?.[pageIndex]?.description ?? "No description available"}
//                                     </p>
//                                 </div>
//                             </div>
//
//                             {/* Pagination / controls */}
//                             <footer className="mt-6 flex justify-center">
//                                 <div className="inline-flex rounded-lg shadow-sm overflow-hidden border">
//                                     <button
//                                         className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
//                                         onClick={handlePageLeft}
//                                         disabled={images.get(selectedProject.id)?.length === 0}
//                                     >
//                                         «
//                                     </button>
//                                     <span className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100">
//                 Page {images.get(selectedProject.id)?.length === 0 ? 0 : pageIndex + 1} / {images.get(selectedProject.id)?.length ?? 0}
//               </span>
//                                     <button
//                                         className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
//                                         onClick={handlePageRight}
//                                         disabled={images.get(selectedProject.id)?.length === 0}
//                                     >
//                                         »
//                                     </button>
//                                 </div>
//                             </footer>
//                         </>
//                     ) : (
//                         // Empty state
//                         <div className="flex flex-1 items-center justify-center">
//                             <div className="text-center text-gray-400">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     strokeWidth={1.5}
//                                     stroke="currentColor"
//                                     className="w-14 h-14 mx-auto mb-3 text-gray-300"
//                                 >
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
//                                 </svg>
//                                 <p className="font-medium text-lg">Select a project to view details</p>
//                             </div>
//                         </div>
//                     )}
//                 </section>
//             </div>
//         </div>
