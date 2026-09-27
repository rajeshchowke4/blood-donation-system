import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
    registerUser
} from "../services/api";

import useAuth from "../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [form, setForm] = useState({
        name: "",
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
            const data = await registerUser(form);

            login(data);

            navigate(location.state?.from || "/", { replace: true });
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
                <h1>Create Account</h1>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

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
                    minLength="6"
                    required
                />

                <button type="submit">
                    Register
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/login" state={location.state}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;