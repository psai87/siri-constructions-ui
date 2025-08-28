
export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-12 md:p-12 py-20">
            <section className="max-w-7xl mx-auto py-8 md:py-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 md:mb-12 text-center text-blue-600">Contact Us</h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {/* Office Address Card */}
                    <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">Office Address</h2>
                        <p className="text-base md:text-lg leading-relaxed text-gray-600">
                            Siri Constructions<br />
                            26-48-3, Chaitanya Nagar, Gajuwaka<br />
                            Visakhapatnam, Andhra Pradesh, India<br />
                            PIN: 530026
                        </p>
                    </div>

                    {/* Emails Card */}
                    <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">Email Us</h2>
                        <ul className="text-base md:text-lg leading-relaxed space-y-2 text-gray-600">
                            <li>
                                General Enquiries: <a href="mailto:siricons.mep@gmail.com" className="text-blue-600 hover:underline transition-colors">siricons.mep@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Persons Card */}
                    <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">Key Contacts</h2>
                        <ul className="text-base md:text-lg leading-relaxed space-y-4 text-gray-600">
                            <li>
                                <strong className="text-gray-800">Mr. S. Venkateswara Rao</strong> – Proprietor<br />
                                Phone: <a href="tel:+919963111350" className="text-blue-600 hover:underline transition-colors">+91 9963111350</a><br />
                                Email: <a href="mailto:siricons.mep@gmail.com" className="text-blue-600 hover:underline transition-colors">siricons.mep@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Google Maps Card */}
                    <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">Our Location</h2>
                        <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden border border-gray-300">
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
                    </div>
                </div>
            </section>
        </div>
    );
}
