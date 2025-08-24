
export default function ContactPage() {
    return (
        <div className="min-h-screen bg-base-100 text-base-content px-8" data-theme="light">
            <section className="max-w-7xl mx-auto py-16">
                <h1 className="text-5xl font-extrabold mb-12 text-primary text-center">Contact Us</h1>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Office Address Card */}
                    <div className="card bg-base-200 shadow-xl rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4 text-primary">Office Address</h2>
                        <p className="text-lg leading-relaxed">
                            Siri Constructions<br />
                            26-48-3, Chaitanya Nagar, Gajuwaka<br />
                            Visakhapatnam, Andhra Pradesh, India<br />
                            PIN: 530026
                        </p>
                    </div>

                    {/* Emails Card */}
                    <div className="card bg-base-200 shadow-xl rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4 text-primary">Email Us</h2>
                        <ul className="text-lg leading-relaxed space-y-2">
                            <li>General Enquiries: <a href="mailto:siricons@yahoo.co.in" className="text-primary underline">siricons@yahoo.co.in</a></li>
                        </ul>
                    </div>

                    {/* Contact Persons Card */}
                    <div className="card bg-base-200 shadow-xl rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4 text-primary">Key Contacts</h2>
                        <ul className="text-lg leading-relaxed space-y-4">
                            <li>
                                <strong>Mr. S. Venkateswara Rao</strong> – Proprietor<br />
                                Phone: <a href="tel:+919963111350" className="text-primary underline">+91 9963111350</a><br />
                                Email: <a href="mailto:siricons@yahoo.co.in" className="text-primary underline">siricons@yahoo.co.in</a>
                            </li>
                        </ul>
                    </div>

                    {/* Google Maps Card */}
                    <div className="card bg-base-200 shadow-xl rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4 text-primary">Our Location</h2>
                        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                title="Siri Constructions Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d197.60462856735103!2d83.20132524000337!3d17.68131936758084!2m3!1f0!2f5.2750368186769805!3f0!3m2!1i1024!2i768!4f52.905467083292!3m3!1m2!1s0x3a39690abcd16361%3A0x4bb01a797b56d1fe!2s26-48-3%2C%20Chaitanya%20Nagar%2C%20Gajuwaka%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530026%2C%20India!5e1!3m2!1sen!2sus!4v1756002393910!5m2!1sen!2sus"
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
