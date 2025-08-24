import React from "react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-base-100 text-base-content pt-24 px-8" data-theme="light">
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
                                src="https://www.google.com/maps/embed?pb=!4v1755999497276!6m8!1m7!1sW7sY2r6djSqPI9Q--ymnbA!2m2!1d17.67982067982893!2d83.19501844363816!3f193.29970465428366!4f-2.1175374648310736!5f1.1924812503605782"
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
