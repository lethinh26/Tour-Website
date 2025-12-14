import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Spin } from 'antd';

interface PaymentProtectedRouteProps {
    children: React.ReactNode;
}

const PaymentProtectedRoute = ({ children }: PaymentProtectedRouteProps) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setIsAuthorized(false);
                    navigate('/');
                    return;
                }

                const userResponse = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/getUser`,
                    { token }
                );

                if (!userResponse.data || !userResponse.data.id) {
                    setIsAuthorized(false);
                    localStorage.removeItem('token');
                    navigate('/');
                    return;
                }

                const currentUserId = userResponse.data.id;

                const paymentResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/payments/${id}`
                );

                if (!paymentResponse.data) {
                    setIsAuthorized(false);
                    navigate('/');
                    return;
                }

                if (paymentResponse.data.userId !== currentUserId) {
                    setIsAuthorized(false);
                    navigate('/');
                    return;
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error('Authorization error:', error);
                setIsAuthorized(false);
                navigate('/');
            }
        };

        checkAuthorization();
    }, [navigate, id]);

    if (isAuthorized === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (isAuthorized === false) {
        return null;
    }

    return <>{children}</>;
};

export default PaymentProtectedRoute;
