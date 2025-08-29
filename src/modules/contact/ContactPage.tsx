
export default function ContactPage() {
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

            <main className="container mx-auto px-6 py-12 md:py-20">
                <section id="contact-info" className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
                        Contact Us
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Office Address Card */}
                        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Office Address</h2>
                            <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                Siri Constructions<br />
                                26-48-3, Chaitanya Nagar, Gajuwaka<br />
                                Visakhapatnam, Andhra Pradesh, India<br />
                                PIN: 530026
                            </p>
                        </div>

                        {/* Emails Card */}
                        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Email Us</h2>
                            <ul className="text-base md:text-lg leading-relaxed space-y-2 text-gray-700">
                                <li>
                                    General Enquiries: <a href="mailto:siricons.mep@gmail.com" className="text-orange-500 hover:underline transition-colors">siricons.mep@gmail.com</a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Persons Card */}
                        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Key Contacts</h2>
                            <ul className="text-base md:text-lg leading-relaxed space-y-4 text-gray-700">
                                <li>
                                    <strong className="text-gray-900">Mr. S. Venkateswara Rao</strong> – Proprietor<br />
                                    Phone: <a href="tel:+919963111350" className="text-orange-500 hover:underline transition-colors">+91 9963111350</a><br />
                                    Email: <a href="mailto:siricons.mep@gmail.com" className="text-orange-500 hover:underline transition-colors">siricons.mep@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Google Maps Section */}
                <section id="location" className="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">Our Location</h2>
                    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden border border-gray-300 shadow-inner">
                        <iframe
                            title="Siri Constructions Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.3090000000004!2d83.210499!3d17.686815999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a49280a9d0263f3%3A0x6b297b4c6e91f093!2sVisakhapatnam%2C%20Andhra%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1625478492015!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            className="border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8 text-center mt-12">
                <div className="container mx-auto px-6">
                    <p>&copy; 2024 Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
