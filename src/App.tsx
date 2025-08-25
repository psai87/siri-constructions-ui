import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./modules/NavBar.tsx";
import AboutPage from "./modules/about/AboutPage.tsx";
import ContactPage from "./modules/contact/ContactPage.tsx";
import LoginPage from "./modules/login/LoginPage.tsx";
import EditServicePage from "./modules/service/EditServicePage.tsx";

// Import other pages as needed

export default function App() {
    return (
        <Router>
            <div data-theme="light" className="min-h-screen bg-base-100">
                <Navbar/>
                <Routes>
                    <Route path="/siri-constructions-ui/" element={<AboutPage/>}/>
                    <Route path="/siri-constructions-ui/contact" element={<ContactPage/>}/>
                    {<Route path="/siri-constructions-ui/service/edit" element={<EditServicePage/>}/>}
                    {/*<Route path="/projects/current" element={<div>Current Projects</div>} />*/}
                    {/*<Route path="/projects/previous" element={<div>Previous Projects</div>} />*/}
                    {/*<Route path="/projects/edit" element={<div>Edit Projects</div>} />*/}
                    {/*<Route path="/clients/prestigious" element={<div>Prestigious Clients</div>} />*/}
                    {/*<Route path="/clients/edit" element={<div>Edit Clients</div>} />*/}
                    {/*<Route path="/contact" element={<ContactPage />} />*/}
                    {/*<Route path="/employees/view" element={<div>View Employees</div>} />*/}
                    {/*<Route path="/employees/timesheets" element={<div>View Timesheets</div>} />*/}
                    {/*<Route path="/employees/edit" element={<div>Edit Timesheets</div>} />*/}
                    <Route path="/siri-constructions-ui/login" element={<LoginPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}
