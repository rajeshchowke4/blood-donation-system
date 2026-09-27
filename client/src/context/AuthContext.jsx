import {
    useEffect,
    useState
} from "react";

import { AuthContext } from "./AuthContextValue";
import {
    getCurrentUser
} from "../services/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(() =>
        Boolean(localStorage.getItem("token"))
    );

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        let isActive = true;

        getCurrentUser()
            .then((data) => {
                if (isActive) {
                    setUser(data);
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
            })
            .finally(() => {
                if (isActive) {
                    setLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, []);

    const login = (data) => {
        localStorage.setItem("token", data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};