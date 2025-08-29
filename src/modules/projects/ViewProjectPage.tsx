import {useEffect, useState} from "react";
import type {Image} from "../../model/Image.ts";
import type {Project} from "../../model/Project.ts";
import {projectClient} from "../../client/ProjectClient.ts";
import type {AlertsProps} from "../../model/Props.ts";
import {imageClient} from "../../client/ImageClient.ts";
import ImagePreview from "../ImagePreview.tsx";

export default function ViewProjectPage({setAlerts}: AlertsProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsFilter, setProjectsFilter] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [images, setImages] = useState<Map<string, Image[]>>(new Map());
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        projectClient.getProjects()
            .then(response => {
                setProjects(response);
                setProjectsFilter(response);
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

    const handleAllClicked = () => {
       setIsDropdownOpen(false);
        setProjectsFilter(projects);
    }

    const handleCurrentClicked = () => {
        setIsDropdownOpen(false);
        setProjectsFilter(projects.filter(data => data.current));
    }

    const handleCompletedClicked = () => {
        setIsDropdownOpen(false);
        setProjectsFilter(projects.filter(data => !data.current));
    }

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

            <main className="container mx-auto px-6 py-12 md:py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-800">
                    Our Projects
                </h1>
                <p className="text-lg md:text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
                    Explore our portfolio of successful projects across various sectors,
                    showcasing our expertise in MEP and structural engineering.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Project List Column */}
                    <div
                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col overflow-y-auto max-h-[80vh]">
                        <div className="relative mb-6">
                            <button
                                className="w-full text-left text-2xl font-bold text-gray-800 px-4 py-2 flex justify-between items-center rounded-lg bg-gray-100 border border-gray-200"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                Projects
                                <svg
                                    className={`w-5 h-5 ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
                                    <li>
                                        <button onClick={handleAllClicked}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100">All
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleCurrentClicked}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100">Current
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleCompletedClicked}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100">Completed
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <ul className="space-y-4">
                            {projectsFilter.map((project) => (
                                <li
                                    key={project.id}
                                    className={`
                    p-5 rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer
                    hover:bg-gray-50 hover:transform hover:shadow-md
                    ${selectedProject?.id === project.id ? "bg-blue-50 border-blue-500 shadow-md scale-[1.02]" : "bg-white border-transparent"}
                  `}
                                    onClick={() => handleOnProjectClick(project)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.clientName}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Project Details Column */}
                    <section
                        className="md:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col max-h-[80vh] overflow-y-auto">
                        {selectedProject ? (
                            <>
                                <header className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedProject.clientName}</h2>
                                    <p className="text-gray-500 mt-1">{selectedProject.description}</p>
                                </header>

                                <div className="flex-1 flex flex-col lg:flex-row gap-6 items-start">
                                    <div
                                        className="w-full lg:w-1/2 flex justify-center items-center rounded-xl overflow-hidden shadow-inner">
                                        <ImagePreview image={images.get(selectedProject?.id)?.[pageIndex]}/>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            {images.get(selectedProject?.id)?.[pageIndex]?.description || ""}
                                        </p>
                                    </div>
                                </div>

                                <footer className="mt-6 flex justify-center">
                                    <div className="inline-flex rounded-lg shadow-sm overflow-hidden border">
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                                            onClick={handlePageLeft}
                                            disabled={pageIndex === 0}
                                        >
                                            «
                                        </button>
                                        <span className="px-4 py-2 font-bold text-gray-800 bg-gray-100">
                      {pageIndex + 1} / {images.get(selectedProject.id)?.length}
                    </span>
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                                            onClick={handlePageRight}
                                            disabled={pageIndex === (images.get(selectedProject?.id)?.length ?? pageIndex + 1) - 1}
                                        >
                                            »
                                        </button>
                                    </div>
                                </footer>
                            </>
                        ) : (
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
            </main>

            <footer className="bg-gray-800 text-white py-8 text-center mt-12">
                <div className="container mx-auto px-6">
                    <p>&copy; 2024 Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
