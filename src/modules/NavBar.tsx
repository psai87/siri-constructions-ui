import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthState } from "../model/Constants.ts";
import { authenticateClient } from "../client/AuthenticateClient.ts";
import type { AlertsProps } from "../model/Props.ts";
import type { Menu } from "../model/Menu.ts";

const navItems: Menu[] = [
    { name: "About", path: "/" } as Menu,
    { name: "Contact", path: "/contact" } as Menu,
    { name: "Services", path: "/services" } as Menu,
    {
        name: "Projects",
        path: "/projects",
    } as Menu,
    { name: "Login" } as Menu,
];





export default function Navbar({ setAlerts, alerts }: AlertsProps) {

    const [authenticated, setAuthenticated] = useState<boolean>(!!AuthState.token);
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const navAdminItems: Menu[] = authenticated ? navItems.slice(0, -1)
        .concat(
            { name: "Edit Service", path: "/services/edit" } as Menu,
            { name: "Edit Project", path: "/projects/edit" } as Menu,
            { name: "Login" } as Menu) : navItems;

    function handleGenerateOtp() {
        if (!email) {
            showAlert("error", "Please enter your email");
            return;
        }
        authenticateClient.generateOtp(email)
            .then(() => {
                console.log("OTP Generated Successfully");
                showAlert("success", "OTP sent to your email");
            })
            .catch(err => {
                console.log(err);
                showAlert("error", "Failed to generate OTP");
            });
    }

    function handleAuthenticate() {
        if (!email || !otp) {
            showAlert("error", "Please enter email and OTP");
            return;
        }
        authenticateClient.validateOtp(email, otp)
            .then((response) => {
                if (response.token) {
                    console.log("Authentication Successful");
                    setAuthenticated(true);
                    AuthState.token = response.token;
                    showAlert("success", "Authentication Successful");
                    (document.getElementById('login_modal') as HTMLDialogElement)?.close();
                    // Reset state
                    setEmail("");
                    setOtp("");
                } else {
                    showAlert("error", "Authentication Failed");
                }
            })
            .catch(err => {
                setAuthenticated(false);
                console.log(err);
                showAlert("error", "Authentication Failed");
            });
    }

    const showAlert = (type: "success" | "error", message: string) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, { id, type, message }]);
    };

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
                    
                    body {
                        font-family: 'Outfit', sans-serif;
                    }
                    
                    .nav-link {
                        position: relative;
                    }
                    
                    .nav-link::after {
                        content: '';
                        position: absolute;
                        width: 0;
                        height: 2px;
                        bottom: -4px;
                        left: 0;
                        background-color: #f97316;
                        transition: width 0.3s ease;
                    }
                    
                    .nav-link:hover::after {
                        width: 100%;
                    }
                    `}
            </style>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">

                    <nav
                        className="fixed top-4 inset-x-4 md:inset-x-8 max-w-7xl mx-auto z-50 transition-all duration-300">
                        <div
                            className="navbar bg-slate-100/95 backdrop-blur-2xl border border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl flex justify-between items-center w-full px-4 md:px-6 lg:px-8">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar"
                                    className="btn btn-square btn-ghost text-gray-600 hover:text-orange-600 hover:bg-orange-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-6 w-6 stroke-current">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2">
                                <Link to="/" className="flex items-center gap-3 group">
                                    <img src="/siri-constructions-ui/sirilogo.svg" alt="logo" className="h-10 w-10 object-contain" />
                                    <div className="font-bold text-2xl tracking-tight text-gray-800">
                                        <span className="text-orange-600">Siri</span> Constructions
                                    </div>
                                </Link>
                            </div>
                            <div className="hidden lg:flex flex-none">
                                <ul className="menu menu-horizontal px-1 gap-1">
                                    {navAdminItems.map((item) => (
                                        <li key={item.name} className="relative group">
                                            {!item.submenu ? (
                                                item.name === "Login" ? (
                                                    <button
                                                        className="btn border-none bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                                                        onClick={() => (document.getElementById('login_modal') as HTMLDialogElement)?.showModal()}>
                                                        Login
                                                    </button>
                                                ) : (
                                                    <Link to={item.path!}
                                                        className="px-4 py-2 font-semibold text-gray-600 hover:text-orange-600 transition-colors duration-300 nav-link bg-transparent">
                                                        {item.name}
                                                    </Link>
                                                )
                                            ) : (
                                                <div className="dropdown dropdown-end dropdown-hover group">
                                                    <div tabIndex={0} role="button"
                                                        className="px-4 py-2 font-semibold text-gray-600 hover:text-orange-600 transition-colors duration-300 flex items-center gap-1 bg-transparent group-hover:bg-transparent focus:bg-transparent active:bg-transparent">
                                                        {item.name}
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                                            className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    </div>
                                                    <ul tabIndex={0}
                                                        className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white/95 backdrop-blur-xl rounded-2xl w-52 mt-4 border border-gray-100 transform origin-top-right transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 visible">
                                                        {item.submenu.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <Link to={subItem.path || "#"}
                                                                    className="py-2.5 px-4 rounded-xl hover:bg-orange-50 hover:text-orange-600 text-gray-600 transition-colors font-medium"
                                                                    onClick={() => {
                                                                        if (subItem.name === "Login") {
                                                                            (document.getElementById('login_modal') as HTMLDialogElement)?.showModal();
                                                                        }
                                                                    }}
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </nav>
                    {/* Content */}
                    <dialog id="login_modal" className="modal backdrop-blur-sm">
                        <div className="modal-box bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-t-8 border-orange-500">
                            <form method="dialog">
                                <button
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50">✕
                                </button>
                            </form>
                            <h3 className="font-bold text-3xl mb-2 text-gray-800 text-center">Welcome Back</h3>
                            <p className="text-gray-500 text-center mb-8">Sign in to access admin features</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">One-Time Password</label>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP..."
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                    />
                                </div>

                                <div className="pt-4 flex flex-col gap-3">
                                    <button
                                        onClick={handleGenerateOtp}
                                        className="w-full py-3.5 text-base font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
                                    >
                                        Generate OTP
                                    </button>
                                    <button
                                        onClick={handleAuthenticate}
                                        className="w-full py-3.5 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </dialog>

                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay bg-black/40 backdrop-blur-sm"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-white/90 backdrop-blur-2xl text-gray-800 relative border-r border-white/20">
                        <div className="absolute top-0 right-0 p-4">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar"
                                className="btn btn-circle btn-ghost text-gray-400 hover:text-orange-600 hover:bg-orange-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </label>
                        </div>


                        <div className="divider px-4 opacity-50 text-xs uppercase tracking-widest font-bold text-gray-400">Menu</div>

                        {navAdminItems.map((item) => (
                            <li key={item.name} className="mb-1">
                                {item.name === "Login" ? (
                                    <div className="mt-4 px-4">
                                        <button
                                            className="btn w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none rounded-2xl shadow-lg shadow-orange-500/25"
                                            onClick={() => {
                                                const drawer = document.getElementById('my-drawer-3') as HTMLInputElement;
                                                if (drawer) drawer.checked = false;
                                                (document.getElementById('login_modal') as HTMLDialogElement)?.showModal();
                                            }}>
                                            Login
                                        </button>
                                    </div>
                                ) : !item.submenu ? (
                                    <Link to={item.path!} className="py-3 px-4 text-lg font-semibold text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-2xl active:bg-orange-100 transition-colors">
                                        {item.name}
                                    </Link>
                                ) : (
                                    <details className="group">
                                        <summary className="py-3 px-4 text-lg font-semibold text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-2xl transition-colors">{item.name}</summary>
                                        <ul className="bg-gray-50/50 rounded-2xl mt-1">
                                            {item.submenu.map((subItem) => (
                                                <li key={subItem.name}>
                                                    <Link to={subItem.path || "#"} className="py-2.5 pl-8 text-gray-500 hover:text-orange-600 hover:bg-transparent font-medium">
                                                        {subItem.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="toast toast-end">
                {alerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className={`alert shadow-lg border-l-4 ${alert.type === 'success'
                        ? 'alert-success bg-white border-green-500 text-green-700'
                        : 'alert-error bg-white border-red-500 text-red-700'
                        }`}>
                        {alert.type === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                        <span className="font-medium">{alert.message}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
