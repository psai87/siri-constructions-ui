import { useEffect, useState } from "react";
import type { Image } from "../../model/Image.ts";
import type { Project } from "../../model/Project.ts";
import { projectClient } from "../../client/ProjectClient.ts";
import type { AlertsProps } from "../../model/Props.ts";
import { imageClient } from "../../client/ImageClient.ts";
import ImagePreview from "../ImagePreview.tsx";

export default function ViewProjectPage({ setAlerts }: AlertsProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState<'all' | 'current' | 'completed'>('all');
    const [images, setImages] = useState<Map<string, Image[]>>(new Map());
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [pageIndex, setPageIndex] = useState<number>(0);

    useEffect(() => {
        projectClient.getProjects()
            .then(response => {
                setProjects(response);
                console.log("Projects loaded");
            })
            .catch(error => {
                console.log(error)
                if (error.message) showAlert("error", error.message)
            })
    }, []);

    const showAlert = (type: "success" | "error", message: string) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, { id, type, message }]);
    };

    const handleProjectClick = (project: Project) => {
        if (selectedProject?.id === project.id) {
            setSelectedProject(null);
        } else {
            setSelectedProject(project);
            setPageIndex(0);
            if (!images.get(project.id)) {
                imageClient.getImages([project.id])
                    .then(response => {
                        setImages(oldMap => new Map(oldMap).set(project.id, response));
                    })
                    .catch(error => {
                        console.log(error);
                        if (error.message) showAlert("error", error.message);
                    });
            }
        }
    };

    const handlePageLeft = () => {
        setPageIndex((index) => Math.max(0, index - 1));
    };

    const handlePageRight = () => {
        setPageIndex((index) => {
            return selectedProject?.id
                ? Math.min((images.get(selectedProject.id)?.length ?? 0) - 1, index + 1)
                : 0;
        });
    };

    const filteredProjects = projects.filter(project => {
        if (filter === 'all') return true;
        if (filter === 'current') return project.current;
        if (filter === 'completed') return !project.current;
        return true;
    });

    return (
        <div className="antialiased min-h-screen bg-gray-50 font-outfit">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
                
                body {
                    font-family: 'Outfit', sans-serif;
                }
                `}
            </style>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 pt-24 md:pt-32">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our <span className="text-orange-600">Projects</span></h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
                    <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
                        Explore our portfolio of successful projects across various sectors.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center flex-wrap mb-10 gap-2">
                    {(['all', 'current', 'completed'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => {
                                setFilter(f);
                                setSelectedProject(null);
                            }}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${filter === f
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                                : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Project Cards - Single Column */}
                <div className="max-w-5xl mx-auto space-y-6">
                    {filteredProjects.map((project) => {
                        const isExpanded = selectedProject?.id === project.id;

                        return (
                            <div
                                key={project.id}
                                className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 ${isExpanded ? 'shadow-2xl border-orange-200' : 'hover:shadow-xl'
                                    }`}
                            >
                                {/* Card Header - Always Visible */}
                                <button
                                    onClick={() => handleProjectClick(project)}
                                    className="w-full p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <div className="space-y-3">
                                        {/* Title row with badge and icon */}
                                        <div className="flex items-start justify-between gap-3 md:gap-4">
                                            <h3 className={`text-xl md:text-2xl font-bold transition-colors flex-1 min-w-0 ${isExpanded ? "text-orange-600" : "text-gray-800"
                                                }`}>
                                                {project.clientName}
                                            </h3>

                                            <div className="flex items-start gap-2 md:gap-3 flex-shrink-0">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap ${project.current
                                                    ? "bg-green-100 text-green-700 border border-green-200"
                                                    : "bg-blue-100 text-blue-700 border border-blue-200"
                                                    }`}>
                                                    {project.current ? 'Current' : 'Completed'}
                                                </span>

                                                {/* Expand/Collapse Icon */}
                                                <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${isExpanded ? 'bg-orange-500 text-white rotate-180' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description row - full width */}
                                        <p className="text-gray-600 leading-relaxed">{project.description}</p>
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="border-t border-gray-100 bg-gray-50 p-4 md:p-6 animate-fade-in-up">
                                        {images.get(project.id) && images.get(project.id)!.length > 0 ? (
                                            <div className="space-y-6">
                                                {/* Main Image */}
                                                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                                                    <div className="aspect-video flex items-center justify-center">
                                                        <ImagePreview image={images.get(project.id)?.[pageIndex]} />
                                                    </div>

                                                    {/* Navigation Overlay */}
                                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2">
                                                        <button
                                                            onClick={handlePageLeft}
                                                            disabled={pageIndex === 0}
                                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-all transform hover:scale-110 disabled:hover:scale-100"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                        </button>
                                                        <span className="px-4 py-1 text-white font-semibold text-sm whitespace-nowrap">
                                                            {pageIndex + 1} / {images.get(project.id)?.length || 0}
                                                        </span>
                                                        <button
                                                            onClick={handlePageRight}
                                                            disabled={pageIndex === (images.get(project.id)?.length ?? pageIndex + 1) - 1}
                                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-all transform hover:scale-110 disabled:hover:scale-100"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Image Description */}
                                                <div className="bg-white border-l-4 border-orange-500 rounded-lg p-6 shadow-sm">
                                                    <h4 className="text-sm font-bold text-orange-900 uppercase tracking-wide mb-2">Image Description</h4>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {images.get(project.id)?.[pageIndex]?.description || "No description available for this image."}
                                                    </p>
                                                </div>

                                                {/* Thumbnail Strip */}
                                                {images.get(project.id)!.length > 1 && (
                                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">All Images ({images.get(project.id)!.length})</h4>
                                                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                                            {images.get(project.id)!.map((img, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => setPageIndex(idx)}
                                                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${idx === pageIndex
                                                                        ? 'border-orange-500 ring-2 ring-orange-200 scale-105'
                                                                        : 'border-gray-200 hover:border-orange-300 opacity-70 hover:opacity-100'
                                                                        }`}
                                                                >
                                                                    <ImagePreview image={img} />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : images.get(project.id) ? (
                                            <div className="text-center py-12 bg-white rounded-lg">
                                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-gray-600 font-medium text-lg">No images available for this project</p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-white rounded-lg">
                                                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                                                    <svg className="w-8 h-8 text-orange-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                                <p className="text-gray-500 font-medium">Loading images...</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-xl text-gray-600">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-gray-900 text-white py-12 border-t border-gray-800 mt-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-8 font-bold text-2xl tracking-tight">
                        <span className="text-orange-500">Siri</span> Constructions
                    </div>
                    <div className="flex justify-center space-x-8 mb-8 text-gray-400">
                        {['About', 'Services', 'Projects', 'Contact'].map(link => (
                            <span key={link} className="hover:text-orange-500 cursor-pointer transition-colors">{link}</span>
                        ))}
                    </div>
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
