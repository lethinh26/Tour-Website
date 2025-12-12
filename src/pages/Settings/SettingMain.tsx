import { Input, Button, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../../services/api";
import FileTextOutlined from "@ant-design/icons/lib/icons/FileTextOutlined";
import ScheduleOutlined from "@ant-design/icons/lib/icons/ScheduleOutlined";
import { PoweroffOutlined, SettingOutlined } from "@ant-design/icons";

export default function AccountSettings() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            if (userData) {
                setUser(userData);
            }
        };
        fetchUser();
    }, []);

    const openNotification = (placement: NotificationPlacement, status: "error" | 'warning' | 'success', message: string) => {
        api[status]({
            message,
            placement
        }
        )
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handle = async () => {
        const token = localStorage.getItem('token')
        if(newPassword.length < 6 || oldPassword.length < 6){
            openNotification('topRight', 'warning', 'Mật khẩu mới phải có ít nhất 6 ký tự')
            return
        }
        try{
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/changepass`, {
                token,
                oldPassword,
                newPassword 
            })
            openNotification('topRight', 'success', res.data.message)
        }catch(err: unknown){
            const error = err as { response?: { data?: { message?: string } } };
            console.log(error.response?.data?.message);
            openNotification('topRight', 'error', error.response?.data?.message || 'Có lỗi xảy ra')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="w-full flex items-center bg-white  justify-center">
            {contextHolder}
            <div className="bg-white rounded-2xl w-full h-full p-6 flex gap-6 max-w-7xl py-15">
                <div className="w-1/4 border-r pr-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold">
                            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <span className="text-lg font-semibold">{user?.name || 'User'}</span>
                    </div>
                    <ul className="space-y-3">
                        <li onClick={() => handleNavigation('/settings/bookings')} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200">
                            <FileTextOutlined style={{ fontSize: 20, color: '#007AFF'}} /> Đặt chỗ của tôi
                        </li>
                        <li onClick={() => handleNavigation('/settings/transactions')} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200">
                            <ScheduleOutlined style={{ fontSize: 20, color: '#007AFF' }} /> Danh sách giao dịch
                        </li>
                        <li className="flex items-center gap-2 p-2 rounded-lg bg-blue-600 text-white font-semibold">
                            <SettingOutlined style={{ fontSize: 20, color: '#007AFF'}} /> Tài khoản
                        </li>
                        <li onClick={handleLogout} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200">
                            <PoweroffOutlined style={{ fontSize: 20, color: '#007AFF' }} /> Đăng xuất
                        </li>
                    </ul>
                </div>

                <div className="w-3/4">
                    <h2 className="text-2xl font-bold mb-6">Cài đặt</h2>

                    <div className="flex gap-6 pb-2 mb-6">
                        <button className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">
                            Mật khẩu & Bảo mật
                        </button>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-6">
                        <h3 className="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Input.Password placeholder="Mật khẩu cũ" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                            <Input.Password placeholder="Mật khẩu mới" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <Button type="primary" className="rounded-lg px-8" onClick={handle}>
                            Lưu
                        </Button>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">Xóa tài khoản</h3>
                            <p className="text-gray-500 text-sm mt-1 max-w-lg">
                                Sau khi tài khoản của bạn bị xóa, bạn sẽ không thể phục hồi tài khoản hoặc dữ liệu của mình.
                            </p>
                        </div>
                        <Button danger type="primary" className="rounded-lg">
                            Xóa
                        </Button>
                    </div>
                </div>
            </div>
        
        </div>
    );
}