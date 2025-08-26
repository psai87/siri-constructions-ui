import {Link} from "react-router-dom";
import type {Menu} from "../model/Menu.ts";
import type {JSX} from "react";

const navItems: Menu[] = [
    {name: "About", path: "/siri-constructions-ui"} as Menu,
    {name: "Contact", path: "/siri-constructions-ui/contact"} as Menu,
    {name: "Services", path: "/siri-constructions-ui/services"} as Menu,
    {
        name: "Projects",
        submenu: [
            {name: "Current Projects", path: "/siri-constructions-ui/projects/current"},
            {name: "Previous Projects", path: "/siri-constructions-ui/projects/previous"}
        ] as Menu[],
    } as Menu,
    {
        name: "Employees", path: "/siri-constructions-ui/employees"
    } as Menu,
    {
        name: "Admin",
        submenu: [
            {name: "Login", path: "/siri-constructions-ui/login"}
        ] as Menu[],
    } as Menu,
];

const navAdminItems: Menu[] = navItems.slice(0, -1)
    .concat({
        name: "Admin",
        submenu: [
            {name: "Login", path: "/siri-constructions-ui/login"},
            {
                name: "Services",
                submenu: [{name: "Edit Service", path: "/siri-constructions-ui/services/edit"}] as Menu[],
            } as Menu,
            {
                name: "Projects",
                submenu: [{name: "Edit Project", path: "/siri-constructions-ui/projects/edit"}] as Menu[],
            } as Menu,
            {
                name: "Employees",
                submenu: [{name: "Edit Employee", path: "/siri-constructions-ui/employees/edit"}] as Menu[],
            } as Menu,
            {
                name: "Timesheets",
                submenu: [{name: "View Timesheet", path: "/siri-constructions-ui/timesheets/view"},
                    {name: "Edit Timesheet", path: "/siri-constructions-ui/timesheets/edit"}] as Menu[],
            } as Menu
        ] as Menu[],
    } as Menu)

function renderMenuItems(items: Menu[]): JSX.Element[] {
    return items.map((item, idx) =>
        item.submenu ? (
            <li key={idx}>
                <details className="w-full">
                    <summary className="cursor-pointer">{item.name}</summary>
                    <ul className="pl-4 mt-2 space-y-1">
                        {renderMenuItems(item.submenu)}
                    </ul>
                </details>
            </li>
        ) : (
            <li key={idx}>
                <Link to={item.path ?? ""}>{item.name}</Link>
            </li>
        )
    );
}


export default function Navbar() {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">

                /* Nav bar*/
                <div
                    className="navbar bg-base-100 border-b border-gray-200 shadow-xl fixed top-0 w-full z-50 px-4 md:px-8 py-4"
                    data-theme="light">

                    <div className="flex-none">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>

                    {/* Brand */}
                    <div className="flex-1 flex items-center gap-6 pl-1">
                        <a className="text-2xl font-extrabold text-primary ">
                            Siri Constructions
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-4 items-center">
                        {navItems.map((item: Menu, idx: number) =>
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
                                        {item.submenu.map((sub: Menu, subIdx: number) => (
                                            <li key={subIdx}>
                                                <Link to={sub.path ?? "/siri-constructions-ui/"}>{sub.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <Link
                                    key={idx}
                                    to={item.path ?? ""}
                                    className="px-4 py-2 text-lg font-semibold rounded-lg hover:bg-primary hover:text-white transition-all"
                                >
                                    {item.name}
                                </Link>
                            )
                        )}
                    </div>

                </div>
            </div>

            <div className="drawer-side pt-19">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu shadow-xl bg-base-100 rounded-box min-h-full w-80 p-4 text-lg"
                >
                    {renderMenuItems(navAdminItems)}
                </ul>
            </div>
        </div>
    );
}
