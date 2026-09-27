import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="brand-group">
                <Link to="/" className="logo">
                    🩸 BloodLife
                </Link>

                {user && (
                    <span
                        className={`role-badge role-${user.role}`}
                        aria-label={`Signed in as ${user.role === "user" ? user.name : user.role}`}
                        title={user.role === "user" ? user.name : user.role}
                    >
                        {user.role === "user" ? user.name : user.role}
                    </span>
                )}
            </div>

            <div className="nav-links">
                <NavLink to="/" end>Home</NavLink>

                <NavLink to="/find-donors">
                    Find Donors
                </NavLink>

                <NavLink to="/donor">
                    Donor Profile
                </NavLink>

                {user && (
                    <>
                        {["staff", "admin"].includes(user.role) && (
                            <NavLink to="/staff/requests">
                                Blood Requests
                            </NavLink>
                        )}

                        {["user", "staff", "admin"].includes(user.role) && (
                            <NavLink to="/blood-request">
                                {user.role === "user" ? "Blood Request" : "Create Request"}
                            </NavLink>
                        )}

                        {user.role === "admin" && (
                            <NavLink to="/admin">
                                Admin Dashboard
                            </NavLink>
                        )}
                    </>
                )}

                {!user ? (
                    <>
                        <NavLink to="/login">
                            Login
                        </NavLink>

                        <NavLink to="/register">
                            Register
                        </NavLink>
                    </>
                ) : (
                    <button
                        className="nav-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;