import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 border-b border-gray-200 shadow-xl fixed top-0 w-full z-50 px-8 py-4" data-theme="light">
        {/* Brand + Menu grouped on left */}
            <div className="flex items-center gap-6 ">
                {/* Brand */}
                <a className="text-2xl font-extrabold cursor-pointer text-primary">
                    Siri Constructions
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4 items-center">
                    {/* About */}
                    <Link
                        to="/siri-constructions-ui/"
                        className="px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all"
                    >
                        About
                    </Link>

                    {/* Services Dropdown */}
                    <div className="dropdown dropdown-hover relative">
                        <label
                            tabIndex={2}
                            className="px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all"
                        >
                            Services
                        </label>
                        <ul
                            tabIndex={2}
                            className="dropdown-content menu p-3 shadow-xl bg-base-100 rounded-lg w-52 text-base mt-1.5"
                        >
                            <li><Link to="/siri-constructions-ui/services/todo">Todo</Link></li>
                            <li><Link to="/siri-constructions-ui/services/edit">Edit</Link></li>
                        </ul>
                    </div>

                    {/* Projects Dropdown */}
                    <div className="dropdown dropdown-hover relative">
                        <label
                            tabIndex={3}
                            className="px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all"
                        >
                            Projects
                        </label>
                        <ul
                            tabIndex={3}
                            className="dropdown-content menu p-3 shadow-xl bg-base-100 rounded-lg w-52 text-base mt-1.5"
                        >
                            <li><Link to="/siri-constructions-ui/projects/current">Current Projects</Link></li>
                            <li><Link to="/siri-constructions-ui/projects/previous">Previous Projects</Link></li>
                            <li><Link to="/siri-constructions-ui/projects/edit">Edit Projects</Link></li>
                        </ul>
                    </div>

                    {/* Clients Dropdown */}
                    <div className="dropdown dropdown-hover relative">
                        <label
                            tabIndex={4}
                            className="px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all"
                        >
                            Clients
                        </label>
                        <ul
                            tabIndex={4}
                            className="dropdown-content menu p-3 shadow-xl bg-base-100 rounded-lg w-52 text-base mt-1.5"
                        >
                            <li><Link to="/siri-constructions-ui/clients/prestigious">Prestigious Clients</Link></li>
                            <li><Link to="/siri-constructions-ui/clients/edit">Edit Clients</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <Link
                        to="/siri-constructions-ui/contact"
                        className="px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all"
                    >
                        Contact
                    </Link>

                    {/* Employees Dropdown */}
                    <div className="dropdown dropdown-hover relative">
                        <label
                            tabIndex={6}
                            className="px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all"
                        >
                            Employees
                        </label>
                        <ul
                            tabIndex={6}
                            className="dropdown-content menu p-3 shadow-xl bg-base-100 rounded-lg w-52 text-base mt-1.5"
                        >
                            <li><Link to="/siri-constructions-ui/employees/view">View Employees</Link></li>
                            <li><Link to="/siri-constructions-ui/employees/timesheets">View Timesheets</Link></li>
                            <li><Link to="/siri-constructions-ui/employees/edit">Edit Timesheets</Link></li>
                        </ul>
                    </div>

                    {/* Login */}
                    <Link
                        to="/siri-constructions-ui/login"
                        className="px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
