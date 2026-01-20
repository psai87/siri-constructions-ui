export default function ContactPage() {
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
            <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/siri-constructions-ui/hero_construction.png"
                        alt="Contact Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-gray-50 backdrop-blur-[1px]"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto opacity-0 animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-semibold tracking-wider mb-6 backdrop-blur-md uppercase">
                            Get In Touch
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-2xl">
                            We'd Love to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                Hear From You
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light mb-10 text-gray-200 drop-shadow-md max-w-2xl mx-auto opacity-0 animate-fade-in-up animate-delay-200">
                            Have a project in mind or need assistance? Reach out to our team today.
                        </p>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-16 -mt-20 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Office Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-orange-500 hover:shadow-2xl transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Visit Us</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong className="text-gray-900">Siri Constructions</strong><br />
                                        26-48-3, Chaitanya Nagar, Gajuwaka<br />
                                        Visakhapatnam, Andhra Pradesh<br />
                                        PIN: 530026, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-orange-500 hover:shadow-2xl transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Call Us</h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <span className="block text-sm text-gray-400 uppercase tracking-wide font-semibold mb-1">Proprietor</span>
                                        <strong className="text-gray-900">Mr. S. Venkateswara Rao</strong><br />
                                        <a href="tel:+919963111350" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">+91 9963111350</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-orange-500 hover:shadow-2xl transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Email Us</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        <span className="block text-sm text-gray-400 uppercase tracking-wide font-semibold mb-1">General Enquiries</span>
                                        <a href="mailto:siricons.mep@gmail.com" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">siricons.mep@gmail.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Side - Map */}
                    <div className="lg:col-span-2 h-full">
                        {/* Map */}
                        <div className="bg-white rounded-3xl shadow-2xl p-2 md:p-4 h-full border border-gray-100 min-h-[600px]">
                            <iframe
                                title="Siri Constructions Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.3090000000004!2d83.210499!3d17.686815999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a49280a9d0263f3%3A0x6b297b4c6e91f093!2sVisakhapatnam%2C%20Andhra%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1625478492015!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                className="rounded-2xl w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
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
