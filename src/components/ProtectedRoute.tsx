import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [valid, setValid] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setValid(false);
            return;
        }

        // Optional: verify token with backend
        fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setValid(res.ok))
            .catch(() => setValid(false));
    }, []);

    if (valid === null) return null; // loading state if needed
    if (!valid) return <Navigate to="/login" replace />;
    return <>{children}</>;
};

export default ProtectedRoute;
