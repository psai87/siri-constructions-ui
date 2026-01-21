
import { useRef } from "react";

export default function AboutPage() {
    const middleSectionRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="antialiased min-h-screen bg-gray-50 font-outfit">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
                
                body {
                    font-family: 'Outfit', sans-serif;
                }
                
                .text-gradient {
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-image: linear-gradient(to right, #f97316, #ea580c);
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                .animate-delay-100 { animation-delay: 0.1s; }
                .animate-delay-200 { animation-delay: 0.2s; }
                .animate-delay-300 { animation-delay: 0.3s; }
                `}
            </style>

            {/* Hero Section */}
            <header id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/siri-constructions-ui/hero_construction.png"
                        alt="Modern construction site"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900/90 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto opacity-0 animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-semibold tracking-wider mb-6 backdrop-blur-md uppercase">
                            Excellence since 1992
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-2xl">
                            Building the Future, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                Restoring the Past
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light mb-10 text-gray-200 drop-shadow-md max-w-2xl mx-auto opacity-0 animate-fade-in-up animate-delay-200">
                            Premier MEP Contractor delivering high-quality Mechanical, Electrical, and Air Conditioning projects for over 30 years.
                        </p>
                        <div className="opacity-0 animate-fade-in-up animate-delay-300">
                            <button
                                onClick={() => middleSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-orange-500/40 hover:bg-orange-500 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >
                                <span className="relative z-10">Discover Our Quality</span>
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-500/50"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                    </svg>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-16 -mt-20 relative z-20">
                {/* About Us Section */}
                <section id="about" ref={middleSectionRef}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 max-w-6xl mx-auto mb-20 scroll-mt-24 border-t-8 border-orange-500">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">About <span className="text-orange-600">Siri</span> Constructions</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light text-justify">
                            <p>
                                <strong className="text-gray-900 font-semibold">Siri Constructions</strong> is a premier MEP contractor specializing in Mechanical, Electrical, and Air
                                Conditioning projects. With over three decades of expertise, we have earned a reputation for
                                delivering high-quality work and exceeding client expectations.
                            </p>
                            <p>
                                Our team consists of highly skilled technical professionals with 10–15 years of experience in
                                their respective domains. Supported by 15 supervisory staff and over 200 skilled and
                                semi-skilled personnel, we are fully equipped with modern tools to meet any project requirement.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-orange-100 rounded-full opacity-50 blur-xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-32 h-32 bg-orange-100 rounded-full opacity-50 blur-xl"></div>
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-inner relative z-10">
                                <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Why Choose Us?</h3>
                                <ul className="space-y-4">
                                    {['30+ Years Experience', 'Skilled Professional Team', 'Modern Equipment', 'Timely Delivery', 'Quality Assurance'].map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-4 text-orange-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="my-24 scroll-mt-24">
                    <div className="text-center mb-16">
                        <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">What We Do</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900">Our Core Services</h2>
                        <div className="mt-4 max-w-2xl mx-auto text-gray-600">Comprehensive solutions for all construction and maintenance needs</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Core Services Cards */}
                        {[
                            { title: "HVAC Systems", desc: "Supply, installation, testing, and commissioning for optimal climate control.", icon: "❄️" },
                            { title: "Electrical & Instrumentation", desc: "Comprehensive systems for power distribution and process control.", icon: "⚡" },
                            { title: "Fire Protection Systems", desc: "Advanced solutions to ensure safety and compliance.", icon: "🔥" },
                            { title: "Plumbing & ELV Systems", desc: "Efficient plumbing solutions and Extra-Low Voltage systems.", icon: "💧" },
                            { title: "Medical Gas Systems", desc: "Specialized pipeline systems for healthcare facilities.", icon: "🏥" },
                            { title: "Operation & Maintenance", desc: "Annual O&M services for utility equipment and facilities.", icon: "🛠️" }
                        ].map((service, idx) => (
                            <div key={idx}
                                className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-orange-200 flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
                                        {service.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Company Overview Section */}
                <section id="overview" className="my-24 bg-white rounded-3xl shadow-xl overflow-hidden scroll-mt-24 border border-gray-100">
                    <div className="grid md:grid-cols-2">
                        <div className="p-10 md:p-14 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <h2 className="text-3xl font-bold mb-10 relative z-10">Company at a Glance</h2>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start">
                                    <span className="text-3xl mr-4">🗓️</span>
                                    <div>
                                        <p className="text-white/60 text-sm font-light uppercase tracking-wider">Established</p>
                                        <p className="text-xl font-semibold">1992</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-3xl mr-4">👷</span>
                                    <div>
                                        <p className="text-white/60 text-sm font-light uppercase tracking-wider">Proprietor</p>
                                        <p className="text-xl font-semibold">Mr. S. Venkateswara Rao</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-3xl mr-4">📍</span>
                                    <div>
                                        <p className="text-white/60 text-sm font-light uppercase tracking-wider">Headquarters</p>
                                        <p className="text-xl font-semibold">Visakhapatnam, AP</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-3xl mr-4">💪</span>
                                    <div>
                                        <p className="text-white/60 text-sm font-light uppercase tracking-wider">Team Strength</p>
                                        <p className="text-xl font-semibold">105+ Personnel</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 md:p-14 flex flex-col justify-center bg-orange-50/50">
                            <h3 className="text-2xl font-bold mb-8 text-gray-800">Core Competencies</h3>
                            <div className="space-y-4">
                                {[
                                    { title: "MEP Works", desc: "Specialized Mechanical, Electrical, Plumbing" },
                                    { title: "Structural Engineering", desc: "Robust and sustainable layouts" },
                                    { title: "Utility O&M Services", desc: "Reliable maintenance operations" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                                        <div className="bg-orange-500 text-white p-2 rounded-lg mr-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="my-24 text-center scroll-mt-24">
                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl p-12 md:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Premium Product Offerings</h2>
                            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
                                Proud suppliers of HVAC solutions from industry leaders, delivering reliable
                                performance and cutting-edge technology.
                            </p>
                            <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                                <div className="text-center group">
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">Panasonic</div>
                                    <div className="h-1 w-0 group-hover:w-full bg-orange-500 transition-all duration-500 mx-auto"></div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">Hitachi</div>
                                    <div className="h-1 w-0 group-hover:w-full bg-orange-500 transition-all duration-500 mx-auto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-8 font-bold text-2xl tracking-tight">
                        <span className="text-orange-500">Siri</span> Constructions
                    </div>
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
