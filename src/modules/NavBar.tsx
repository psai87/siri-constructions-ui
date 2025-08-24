import { Link } from "react-router-dom";

const navItems = [
    { name: "About", path: "/siri-constructions-ui/" },
    {
        name: "Services",
        submenu: [
            { name: "Todo", path: "/siri-constructions-ui/services/todo" },
            { name: "Edit", path: "/siri-constructions-ui/services/edit" },
        ],
    },
    {
        name: "Projects",
        submenu: [
            { name: "Current Projects", path: "/siri-constructions-ui/projects/current" },
            { name: "Previous Projects", path: "/siri-constructions-ui/projects/previous" },
            { name: "Edit Projects", path: "/siri-constructions-ui/projects/edit" },
        ],
    },
    {
        name: "Clients",
        submenu: [
            { name: "Prestigious Clients", path: "/siri-constructions-ui/clients/prestigious" },
            { name: "Edit Clients", path: "/siri-constructions-ui/clients/edit" },
        ],
    },
    { name: "Contact", path: "/siri-constructions-ui/contact" },
    {
        name: "Employees",
        submenu: [
            { name: "View Employees", path: "/siri-constructions-ui/employees/view" },
            { name: "View Timesheets", path: "/siri-constructions-ui/employees/timesheets" },
            { name: "Edit Timesheets", path: "/siri-constructions-ui/employees/edit" },
        ],
    },
    { name: "Login", path: "/siri-constructions-ui/login" },
];

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 border-b border-gray-200 shadow-xl fixed top-0 w-full z-50 px-4 md:px-8 py-4" data-theme="light">
            {/* Brand + Menu aligned left */}
            <div className="flex items-center gap-6">
                <Link to="/" className="text-2xl font-extrabold text-primary">
                    Siri Constructions
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4 items-center">
                    {navItems.map((item, idx) =>
                        item.submenu ? (
                            <div key={idx} className="dropdown dropdown-hover relative">
                                <label
                                    tabIndex={idx}
                                    className="px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all"
                                >
                                    {item.name}
                                </label>
                                <ul
                                    tabIndex={idx}
                                    className="dropdown-content menu p-3 shadow-xl bg-base-100 rounded-lg w-52 text-base mt-1.5"
                                >
                                    {item.submenu.map((sub, subIdx) => (
                                        <li key={subIdx}>
                                            <Link to={sub.path}>{sub.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <Link
                                key={idx}
                                to={item.path}
                                className="px-4 py-2 text-lg font-semibold rounded-lg hover:bg-primary hover:text-white transition-all"
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="flex flex-col md:hidden gap-2 mt-2">
                {navItems.map((item, idx) =>
                    item.submenu ? (
                        <details key={idx} className="dropdown">
                            <summary className="px-4 py-2 text-lg font-semibold rounded-lg hover:bg-primary hover:text-white cursor-pointer transition-all">
                                {item.name}
                            </summary>
                            <ul className="pl-4 mt-2 space-y-1">
                                {item.submenu.map((sub, subIdx) => (
                                    <li key={subIdx}>
                                        <Link to={sub.path}>{sub.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ) : (
                        <Link
                            key={idx}
                            to={item.path}
                            className="px-4 py-2 text-lg font-semibold rounded-lg hover:bg-primary hover:text-white transition-all"
                        >
                            {item.name}
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
