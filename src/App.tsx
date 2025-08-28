import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./modules/NavBar.tsx";
import AboutPage from "./modules/about/AboutPage.tsx";
import ContactPage from "./modules/contact/ContactPage.tsx";
import LoginPage from "./modules/login/LoginPage.tsx";
import EditServicePage from "./modules/service/EditServicePage.tsx";
import ToastBar from "./modules/ToastBar.tsx";
import {useState} from "react";
import type {AlertToast} from "./model/AlertToast.ts";
import ViewServicePage from "./modules/service/ViewServicePage.tsx";
import ViewEmployeePage from "./modules/employees/ViewEmployeePage.tsx";
import EditEmployeePage from "./modules/employees/EditEmployeePage.tsx";
import EditProjectPage from "./modules/projects/EditProjectPage.tsx";
import ViewProjectPage from "./modules/projects/ViewProjectPage.tsx";

// Import other pages as needed

export default function App() {
    const [alerts, setAlerts] = useState<AlertToast[]>([])

    return (
        <Router>
            <div data-theme="light" className="min-h-screen bg-base-100">
                <Navbar/>
                <Routes>
                    <Route path="/siri-constructions-ui" element={<AboutPage/>}/>
                    <Route path="/siri-constructions-ui/contact" element={<ContactPage/>}/>
                    <Route path="/siri-constructions-ui/services/edit"
                           element={<EditServicePage alerts={alerts} setAlerts={setAlerts}/>}/>
                    <Route path="/siri-constructions-ui/services"
                           element={<ViewServicePage alerts={alerts} setAlerts={setAlerts}/>}/>
                    <Route path="/siri-constructions-ui/login"
                           element={<LoginPage alerts={alerts} setAlerts={setAlerts}/>}/>
                    <Route path="/siri-constructions-ui/employees"
                           element={<ViewEmployeePage alerts={alerts} setAlerts={setAlerts}/>}/>
                    <Route path="/siri-constructions-ui/employees/edit"
                           element={<EditEmployeePage alerts={alerts} setAlerts={setAlerts}/>}/>
                    <Route path="/siri-constructions-ui/projects"
                           element={<ViewProjectPage alerts={alerts} setAlerts={setAlerts}/>}/>
                    <Route path="/siri-constructions-ui/projects/edit"
                           element={<EditProjectPage alerts={alerts} setAlerts={setAlerts}/>}/>
                </Routes>
                <ToastBar alerts={alerts} setAlerts={setAlerts}/>
            </div>
        </Router>
    );
}
