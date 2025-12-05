import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Spin } from "antd";
import axios from "axios";

interface UserResponse {
    role: "ADMIN" | "TOUR_MANAGER" | "USER";
    name: string;
    email: string;
}

interface AuthProps {
    children: React.ReactNode;
    allowedRoles?: ("ADMIN" | "TOUR_MANAGER")[];
}

export const Auth = ({ children, allowedRoles }: AuthProps) => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/");
                    return;
                }

                const res = await axios.post<UserResponse>("http://localhost:3000/api/auth/getUser", { token });
                const userData = res.data;

                if (userData.role === "USER") {
                    navigate("/");
                    return;
                }

                setUser(userData);
                if (!allowedRoles!.includes(userData.role)) {
                    if (userData.role === "TOUR_MANAGER") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                    return;
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [location.pathname, navigate, allowedRoles]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Spin size="large" tip="Đang kiểm tra quyền truy cập..." />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
};

export default Auth;
