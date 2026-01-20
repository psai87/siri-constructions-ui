import { Link } from "react-router-dom";
import { useRef } from "react";

export default function AboutPage() {
    const middleSectionRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="antialiased font-inter">
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

            {/* Hero Section */}
            <header id="home"
                className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white text-center px-4">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img src="/siri-constructions-ui/hero_construction.png"
                    alt="Modern construction site" className="absolute inset-0 w-full h-full object-cover" />
                <div className="relative z-20 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-orange-500">Building the
                        Future, Restoring the Past</h1>
                    <p className="text-lg md:text-xl font-light mb-8 drop-shadow-md max-w-2xl mx-auto">
                        A premier MEP contractor with over 30 years of expertise in delivering high-quality Mechanical,
                        Electrical, and Air Conditioning projects.
                    </p>
                    <Link to={"/"} onClick={() => {
                        if (middleSectionRef.current) {
                            middleSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 text-lg">
                        Discover More
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                {/* About Us Section */}
                <section id="about" ref={middleSectionRef}
                    className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto my-16 scroll-mt-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">About Siri
                        Constructions</h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        Siri Constructions is a premier MEP contractor specializing in Mechanical, Electrical, and Air
                        Conditioning projects. With over three decades of expertise, we have earned a reputation for
                        delivering high-quality work and exceeding client expectations.
                    </p>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        Our team consists of highly skilled technical professionals with 10–15 years of experience in
                        their respective domains. Supported by 15 supervisory staff and over 200 skilled and
                        semi-skilled personnel, we also collaborate with expert consultants for project design and
                        planning. We are fully equipped with modern tools and construction equipment to meet any project
                        requirement.
                    </p>
                </section>

                {/* Services Section */}
                <section id="services" className="my-20 scroll-mt-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Core
                        Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div
                            className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">HVAC Systems</h3>
                            <p className="text-gray-700">Supply, installation, testing, and commissioning for optimal
                                climate control.</p>
                        </div>
                        <div
                            className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">Electrical & Instrumentation</h3>
                            <p className="text-gray-700">Comprehensive systems for power distribution and process
                                control.</p>
                        </div>
                        <div
                            className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">Fire Protection Systems</h3>
                            <p className="text-gray-700">Advanced solutions to ensure safety and compliance.</p>
                        </div>
                        <div
                            className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">Plumbing & ELV Systems</h3>
                            <p className="text-gray-700">Efficient plumbing solutions and Extra-Low Voltage systems.</p>
                        </div>
                        <div
                            className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">Medical Gas Systems</h3>
                            <p className="text-gray-700">Specialized pipeline systems for healthcare facilities.</p>
                        </div>
                        <div
                            className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">Operation & Maintenance</h3>
                            <p className="text-gray-700">Annual O&M services for utility equipment and facilities.</p>
                        </div>
                    </div>
                </section>

                {/* Company Overview Section */}
                <section id="overview" className="my-20 bg-white rounded-xl shadow-lg p-8 md:p-12 scroll-mt-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Company at a
                        Glance</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Information</h3>
                            <div className="space-y-4 text-lg">
                                <div className="flex items-center"><span
                                    className="text-orange-500 mr-4 text-2xl">🗓️</span><strong
                                        className="text-gray-800 w-32 inline-block">Established:</strong> 1992
                                </div>
                                <div className="flex items-center"><span
                                    className="text-orange-500 mr-4 text-2xl">👷</span><strong
                                        className="text-gray-800 w-32 inline-block">Proprietor:</strong> Mr. S. Venkateswara
                                    Rao
                                </div>
                                <div className="flex items-center"><span
                                    className="text-orange-500 mr-4 text-2xl">🏢</span><strong
                                        className="text-gray-800 w-32 inline-block">Business Type:</strong> Proprietary
                                </div>
                                <div className="flex items-center"><span
                                    className="text-orange-500 mr-4 text-2xl">📍</span><strong
                                        className="text-gray-800 w-32 inline-block">Headquarters:</strong> Visakhapatnam, AP
                                </div>
                                <div className="flex items-center"><span
                                    className="text-orange-500 mr-4 text-2xl">💪</span><strong
                                        className="text-gray-800 w-32 inline-block">Team Strength:</strong> 105 on-roll, 20
                                    outsourced, with day-to-day manpower as per project scale.
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Core Competencies</h3>
                            <ul className="list-none space-y-3 text-lg text-gray-700">
                                <li className="flex items-center"><span
                                    className="text-orange-500 mr-3 text-2xl">&#10003;</span> MEP Works
                                </li>
                                <li className="flex items-center"><span
                                    className="text-orange-500 mr-3 text-2xl">&#10003;</span> Structural Engineering
                                </li>
                                <li className="flex items-center"><span
                                    className="text-orange-500 mr-3 text-2xl">&#10003;</span> Utility O&M Services
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="my-20 text-center scroll-mt-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Premium Product Offerings</h2>
                    <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-700">
                        We are proud suppliers of premium HVAC solutions from industry leaders, delivering reliable
                        performance and cutting-edge technology for your projects.
                    </p>
                    <div className="flex justify-center items-center space-x-8 md:space-x-16 mt-8">
                        <p className="text-2xl font-semibold text-gray-600 font-oswald">Johnson Controls</p>
                        <p className="text-2xl font-semibold text-gray-600 font-oswald">Hitachi</p>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8 text-center">
                <div className="container mx-auto px-6">
                    <p>&copy; 2024 Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
