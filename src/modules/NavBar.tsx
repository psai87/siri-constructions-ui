import {Link} from "react-router-dom";
import type {Menu} from "../model/Menu.ts";
import {type JSX, useState} from "react";
import {AuthState} from "../model/Constants.ts";
import {authenticateClient} from "../client/AuthenticateClient.ts";
import type {AlertsProps} from "../model/Props.ts";

const navItems: Menu[] = [
    {name: "About", path: "/"} as Menu,
    {name: "Contact", path: "/contact"} as Menu,
    {name: "Services", path: "/services"} as Menu,
    {
        name: "Projects",
        path: "/projects",
    } as Menu,
    {
        name: "Admin",
        submenu: [
            {name: "Login"}
        ] as Menu[],
    } as Menu,
];


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
                {item.name === "Login" ? (
                    // Use a button to open the modal
                    <button
                        onClick={() => {
                            handleLinkClick();
                            (document?.getElementById('login_modal') as HTMLDialogElement)?.showModal();
                        }}
                    >
                        {item.name}
                    </button>
                ) : (
                    // Regular link for other items
                    <Link to={item.path ?? ""} onClick={handleLinkClick}>{item.name}</Link>
                )}
            </li>
        )
    );
}

// Function to handle link clicks and close the drawer
const handleLinkClick = () => {
    // Find the checkbox element by its ID and uncheck it
    const drawerCheckbox = document.getElementById('my-drawer-3') as HTMLInputElement;
    if (drawerCheckbox) {
        drawerCheckbox.checked = false;
    }
};


export default function Navbar({setAlerts}: AlertsProps) {

    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const navAdminItems: Menu[] = authenticated ? navItems.slice(0, -1)
        .concat({
            name: "Admin",
            submenu: [
                {name: "Login"},
                {
                    name: "Services",
                    submenu: [{name: "Edit Service", path: "/services/edit"}] as Menu[],
                } as Menu,
                {
                    name: "Projects",
                    submenu: [{name: "Edit Project", path: "/projects/edit"}] as Menu[],
                } as Menu,
                {
                    name: "Employees",
                    submenu: [{name: "View Employee", path: "/employees"}, {
                        name: "Edit Employee",
                        path: "/employees/edit"
                    }] as Menu[],
                } as Menu,
                {
                    name: "Timesheets",
                    submenu: [{name: "Edit Timesheet", path: "/timesheets/edit"}] as Menu[],
                } as Menu
            ] as Menu[],
        } as Menu) : navItems;

    function handleTokenChange(value: string) {
        AuthState.token = value;
    }

    function handleAuthenticate() {
        authenticateClient.authenticate()
            .then(() => {
                console.log("Authentication Successful")
                setAuthenticated(true);
                showAlert("success", "Authentication Successful");
                (document.getElementById('login_modal') as HTMLDialogElement)?.close();
            })
            .catch(err => {
                setAuthenticated(false);
                console.log(err)
                showAlert("error", "Authentication Failed");
            });
    }

    const showAlert = (type: "success" | "error", message: string) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, {id, type, message}]);
    };

    return (
        <>
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
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col">

                    <div
                        className="navbar bg-white border-b border-gray-200 shadow-lg fixed top-0 w-full z-50 px-4 md:px-8 py-4"
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

                        <div className="avatar min-w-60 w-60 h-10">
                            <img src="/siri-constructions-ui/sirilogo2.svg" alt="logo"/>
                        </div>


                        {/* Desktop Menu */}
                        <div className="hidden md:flex gap-4 items-center">
                            {navItems.map((item: Menu, idx: number) =>
                                item.submenu ? (
                                    <div key={idx} className="dropdown dropdown-hover relative">
                                        <label
                                            tabIndex={idx}
                                            className="px-4 py-2.5 text-lg font-semibold rounded-lg cursor-pointer hover:bg-gray-200  transition-all"
                                        >
                                            {item.name}
                                        </label>
                                        <ul
                                            tabIndex={idx}
                                            className="dropdown-content menu p-3 shadow-lg bg-white rounded-lg w-52 text-base mt-1.5"
                                        >
                                            {item.submenu.map((sub: Menu, subIdx: number) => (
                                                <li key={subIdx}>
                                                    {sub.name === "Login" ? (
                                                        // Use a button to open the modal
                                                        <button
                                                            onClick={() => (document?.getElementById('login_modal') as HTMLDialogElement)?.showModal()}
                                                        >
                                                            {sub.name}
                                                        </button>
                                                    ) : (
                                                        // Regular link for other items
                                                        <Link className={"px-4 py-2 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-all"} to={sub.path ?? "/"}>{sub.name}</Link>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <Link
                                        key={idx}
                                        to={item.path ?? ""}
                                        className="px-4 py-2 text-lg font-semibold rounded-lg hover:bg-gray-200  transition-all"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </div>

                    </div>
                </div>

                <div className="drawer-side pt-19 z-15">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu shadow-lg bg-white rounded-box min-h-full w-80 p-4 text-lg"
                    >
                        {renderMenuItems(navAdminItems)}
                    </ul>
                </div>
            </div>


            <dialog id="login_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
                            👋 Admin Login
                        </h1>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Enter password..."
                                onChange={(e) => handleTokenChange(e.target.value)}
                                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={handleAuthenticate}
                                className="w-full py-3 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                            >
                                Authenticate
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
