
export default function AboutPage() {
    return (
        <div className="min-h-screen bg-base-100 text-base-content pt-24" data-theme="light">
            {/* Hero Section */}
            <section className="px-8 py-16 max-w-6xl mx-auto">
                <h1 className="text-5xl font-extrabold mb-8 text-primary">About Us</h1>
                <p className="text-lg mb-6 leading-relaxed">
                    Siri Constructions is a premier MEP contractor specializing in Mechanical, Electrical, and Air Conditioning projects.
                    With over three decades of expertise, we have earned a reputation for delivering high-quality work and exceeding client expectations.
                </p>
                <p className="text-lg mb-6 leading-relaxed">
                    Our team consists of highly skilled technical professionals with 10–15 years of experience in their respective domains.
                    Supported by 15 supervisory staff and over 200 skilled and semi-skilled personnel, we also collaborate with expert consultants for project design and planning.
                </p>
                <p className="text-lg mb-6 leading-relaxed">
                    We are fully equipped with modern tools and construction equipment and can arrange specialized machinery on short notice to meet project requirements.
                </p>
            </section>

            {/* Services Section */}
            <section className="px-8 py-16 bg-base-200">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6 text-primary">Our Services</h2>
                    <ul className="list-disc pl-6 space-y-3 text-lg">
                        <li>HVAC systems – supply, installation, testing, and commissioning</li>
                        <li>Electrical and instrumentation systems</li>
                        <li>Fire protection systems</li>
                        <li>ELV systems</li>
                        <li>Plumbing systems</li>
                        <li>Medical gas systems</li>
                    </ul>
                    <p className="mt-6 text-lg leading-relaxed">
                        We also provide annual operation and maintenance services for utility equipment including HVAC systems, hydrogen plants, elevators, fire hydrants, sprinkler systems, and general facility maintenance.
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="px-8 py-16 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-6 text-primary">Our Product Offerings</h2>
                <p className="text-lg leading-relaxed">
                    We are proud suppliers of premium HVAC solutions from Johnson Controls and Hitachi Air Conditioning India Ltd.,
                    delivering reliable performance and cutting-edge technology.
                </p>
            </section>

            {/* Company Overview */}
            <section className="px-8 py-16 bg-base-200 rounded-lg max-w-6xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-6 text-primary">Company Overview</h2>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                    <li><strong>Established:</strong> 1992</li>
                    <li><strong>Business Type:</strong> Proprietary</li>
                    <li><strong>Proprietor:</strong> Mr. S. Venkateswara Rao</li>
                    <li><strong>Headquarters:</strong> Visakhapatnam, Andhra Pradesh</li>
                    <li><strong>Team Strength:</strong>
                        <ul className="list-disc pl-6 mt-1 space-y-1">
                            <li>On-roll Employees: 105</li>
                            <li>Outsourced Personnel: 20</li>
                            <li>Day-to-day manpower: As per project scale</li>
                        </ul>
                    </li>
                </ul>
            </section>

            {/* Expertise & Core Competencies */}
            <section className="px-8 py-16 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-primary">Expertise & Core Competencies</h2>
                <p className="text-lg mb-6 leading-relaxed">
                    Over the past 30+ years, Siri Constructions has developed unmatched expertise in delivering high-quality, reliable projects across commercial, hospitality, and industrial sectors.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                    <li>MEP (Mechanical, Electrical & Plumbing) Works</li>
                    <li>Structural Engineering Projects</li>
                    <li>Operation & Maintenance (O&M) of Utility Services</li>
                </ul>
                <p className="mt-6 text-lg leading-relaxed">
                    Our commitment to excellence ensures that every project is executed with precision, quality, and complete client satisfaction.
                </p>
            </section>
        </div>
    );
}
