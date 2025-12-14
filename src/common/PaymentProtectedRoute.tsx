import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';
import { authAPI, paymentAPI } from '../services/api';

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

                const userData = await authAPI.getUser(token);
                console.log(userData.data);
                // debugger;
                
                // console.log("gooodaaaa");

                if (!userData.data || !userData.data.id) {                    
                    setIsAuthorized(false);
                    localStorage.removeItem('token');
                    navigate('/');
                    return;
                }
                // console.log("goood");

                const currentUserId = userData.data.id;
                console.log(currentUserId);
                
                if (!id) {
                    setIsAuthorized(false);
                    navigate('/');
                    return;
                }
                
                const paymentResponse = await paymentAPI.getById(id);
                

                if (!paymentResponse) {
                    setIsAuthorized(false);
                    navigate('/');
                    return;
                }

                if (paymentResponse.userId !== currentUserId) {
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
