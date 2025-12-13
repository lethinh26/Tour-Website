import {
    FileTextOutlined,
    ScheduleOutlined,
    SettingOutlined,
    PoweroffOutlined,
    DownOutlined,
    UserOutlined,
    HeartOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../stores/slides/userLoginRegister.slice';
import type { AppDispatch } from '../../../stores';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getUser } from '../../../services/api';

const PRIMARY_COLOR = '#007AFF';

export default function Account() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            if (userData) {
                setUser(userData);
            }
        };
        fetchUser();
    }, []);
    const menuItems = [
        {
            id: 'favorite-tour',
            label: 'Tour yêu thích',
            icon: <HeartOutlined style={{ fontSize: 20, color: PRIMARY_COLOR }} />,
        },
        {
            id: 'transactions',
            label: 'Danh sách giao dịch',
            icon: <FileTextOutlined style={{ fontSize: 20, color: PRIMARY_COLOR }} />,
        },
        {
            id: 'bookings',
            label: 'Đặt chỗ của tôi',
            icon: <ScheduleOutlined style={{ fontSize: 20, color: PRIMARY_COLOR }} />,
        },
        { id: 'divider' },
        {
            id: 'account',
            label: 'Tài khoản',
            icon: <SettingOutlined style={{ fontSize: 20, color: PRIMARY_COLOR }} />,
        },
        {
            id: 'logout',
            label: 'Đăng xuất',
            icon: <PoweroffOutlined style={{ fontSize: 20, color: "#ff6647" }} />,
        },
    ];
    
    const handleClick = (event: string) => {
        switch(event){
            case ('logout'):{
                dispatch(userLogout())
                localStorage.removeItem("token");
                window.location.reload();
                break
            }
            case ('account'):{
                navigate('/settings')
                break;
            }
            case ('favorite-tour'): {
                navigate("/favorite-tour")
                break;
            }
            case ('transactions'): {
                navigate('/settings/transactions')
                break;
            }
            case ('bookings'): {
                navigate('/settings/bookings')
                break;
            }
        }
    }

    return (
        <div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
                flex items-center gap-2 pl-1 pr-3 py-1 rounded-full transition-all duration-200 outline-none
                ${isOpen ? 'bg-blue-50 ring-2 ring-blue-100' : 'bg-gray-100 hover:bg-gray-200'}
            `}
                    >
                        <div className="relative w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white">
                            <UserOutlined style={{ fontSize: 18 }} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>

                        <span className="text-[#007AFF] font-bold text-sm tracking-wide ml-1">
                            {user?.name || 'User'}
                        </span>

                        <DownOutlined
                            style={{ fontSize: 12 }}
                            className={`text-[#007AFF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isOpen && (
                            <div className="absolute right-0 mt-2 w-[280px] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 py-2 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                                <ul className="flex flex-col">
                                    {menuItems.map((item, index) => {
                                        if (item.id === 'divider') {
                                            return <li key={index} className="h-px bg-gray-200 my-1 mx-2" />;
                                        }
    
                                        const newLocal = "flex-shrink-0 group-hover:scale-110 transition-transform";
                                        return (
                                            <li key={item.id}>
                                                <button
                                                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                                                    onClick={() => handleClick(item.id)}
                                                >
                                                    <span className={newLocal}>
                                                        {item.icon}
                                                    </span>
                                                    <span className="font-medium text-[15px] text-gray-700">
                                                        {item.label}
                                                    </span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            
                    )}
            { isOpen &&
                <div className='w-screen h-screen fixed top-0 left-0 x-10' onClick={() => {
                    setIsOpen(false)
                }}></div>
            }
        </div>
    );
}