import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Donor from "./pages/donar";
import FindDonors from "./pages/findDonars";
import BloodRequest from "./pages/bloodrequest";
import MyRequests from "./pages/myrequests";
import AdminDashboard from "./pages/AdminDashbroad";
import StaffRequests from "./pages/StaffRequests";

import useAuth from "./hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

const StaffRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!["staff", "admin"].includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/find-donors"
                    element={<FindDonors />}
                />

                <Route
                    path="/donor"
                    element={
                        <ProtectedRoute>
                            <Donor />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/blood-request"
                    element={
                        <ProtectedRoute>
                            <BloodRequest />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-requests"
                    element={
                        <ProtectedRoute>
                            <MyRequests />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/staff/requests"
                    element={
                        <StaffRoute>
                            <StaffRequests />
                        </StaffRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate to="/" />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;