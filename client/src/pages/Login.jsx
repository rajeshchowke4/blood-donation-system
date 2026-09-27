import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
    loginUser
} from "../services/api";

import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(form);

            login(data);

            navigate(
                location.state?.from ||
                    (data.user.role === "admin"
                        ? "/"
                        : data.user.role === "staff"
                            ? "/staff/requests"
                            : "/"),
                { replace: true }
            );
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >
                <h1>Login</h1>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register" state={location.state}>
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;