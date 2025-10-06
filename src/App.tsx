import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import CleaningServices from "./pages/CleaningServices";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";   //  login page
import ProtectedRoute from "./components/ProtectedRoute";
import Contact from './pages/Contact';
import Workforce from './pages/Workforce';


function Layout() {
    const location = useLocation();

    // Hide header on login + admin dashboard
    const hideHeader =
        location.pathname === "/login" ||   // exact /login
        location.pathname === "/admin";     // exact /admin

    return (
        <div className="min-h-screen bg-gray-50">
            {!hideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/cleaning-services" element={<CleaningServices />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/workforce" element={<Workforce/>}/>
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<AdminLogin />} />   {/* login route */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
