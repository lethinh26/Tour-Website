import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Spin } from 'antd';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setIsAuthenticated(false);
                    navigate('/');
                    return;
                }

                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/getUser`,
                    { token }
                );

                if (response.data && response.data.id) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                    navigate('/');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        checkAuth();
    }, [navigate]);

    if (isAuthenticated === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (isAuthenticated === false) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
