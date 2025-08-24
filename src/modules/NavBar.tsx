import {Link} from "react-router-dom";

const navItems = [
    {name: "About", path: "/siri-constructions-ui/"},
    {name: "Contact", path: "/siri-constructions-ui/contact"},
    {
        name: "Services"
    },
    {
        name: "Projects",
        submenu: [
            {name: "Current Projects", path: "/siri-constructions-ui/projects/current"},
            {name: "Previous Projects", path: "/siri-constructions-ui/projects/previous"}
        ],
    },
    {
        name: "Employees",
        submenu: [
            {name: "View Employees", path: "/siri-constructions-ui/employees/view"}
        ],
    },
    {
        name: "Admin",
        submenu: [
            {name: "Login", path: "/siri-constructions-ui/login"},
            {name: "Edit", path: "/siri-constructions-ui/edit"}
        ],
    },
];

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 border-b border-gray-200 shadow-xl fixed top-0 w-full z-50 px-4 md:px-8 py-4"
             data-theme="light">
            {/* Brand */}
            <div className="flex-1 flex items-center gap-6">
                <a className="text-2xl font-extrabold text-primary">
                    Siri Constructions
                </a>
            </div>

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

            {/* Mobile Hamburger */}
            <div className="md:hidden dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-56 mt-4"
                >
                    {navItems.map((item, idx) =>
                        item.submenu ? (
                            <li key={idx} className="dropdown dropdown-end">
                                <details>
                                    <summary className="cursor-pointer">{item.name}</summary>
                                    <ul className="pl-4 mt-2 space-y-1">
                                        {item.submenu.map((sub, subIdx) => (
                                            <li key={subIdx}>
                                                <Link to={sub.path}>{sub.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                        ) : (
                            <li key={idx}>
                                <Link to={item.path}>{item.name}</Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}
