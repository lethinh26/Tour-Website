import { Input, Button, Modal, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../../services/api";
import FileTextOutlined from "@ant-design/icons/lib/icons/FileTextOutlined";
import ScheduleOutlined from "@ant-design/icons/lib/icons/ScheduleOutlined";
import { PoweroffOutlined, SettingOutlined, DashboardOutlined, ExclamationCircleFilled } from "@ant-design/icons";

export default function AccountSettings() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [user, setUser] = useState<{ name: string; email: string; phoneNumber: string; role?: string } | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            if (userData) {
                setUser(userData);
                setName(userData.name || "");
                setPhoneNumber(userData.phoneNumber || "");
            }
        };
        fetchUser();
    }, []);

    const openNotification = (placement: NotificationPlacement, status: "error" | "warning" | "success", message: string) => {
        api[status]({
            message,
            placement,
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleUpdateInfo = async () => {
        const token = localStorage.getItem("token");
        if (!name.trim() || !phoneNumber.trim()) {
            openNotification("topRight", "warning", "Tên và số điện thoại không được để trống");
            return;
        }
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/updateInfo`, {
                token,
                name,
                phoneNumber,
            });
            openNotification("topRight", "success", res.data.message);
            setIsEditingInfo(false);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            openNotification("topRight", "error", error.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    const handleCancelEdit = () => {
        setName(user?.name || "");
        setPhoneNumber(user?.phoneNumber || "");
        setIsEditingInfo(false);
    };

    const handle = async () => {
        const token = localStorage.getItem("token");
        if (newPassword.length < 6 || oldPassword.length < 6) {
            openNotification("topRight", "warning", "Mật khẩu mới phải có ít nhất 6 ký tự");
            return;
        }
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/changepass`, {
                token,
                oldPassword,
                newPassword,
            });
            openNotification("topRight", "success", res.data.message);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            console.log(error.response?.data?.message);
            openNotification("topRight", "error", error.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_API_URL}/auth/deleteAccount`, {
                data: { token }
            });
            
            openNotification("topRight", "success", "Tài khoản đã được xóa thành công");
            
            setTimeout(() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
            }, 1500);
            
            setIsDeleteModalOpen(false);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            openNotification("topRight", "error", error.response?.data?.message || "Không thể xóa tài khoản");
        }
    };

    return (
            <div className="w-full flex items-center bg-white  justify-center">
                {contextHolder}
                <div className="bg-white rounded-2xl w-full h-full p-6 flex gap-6 max-w-7xl py-15">
                <div className="w-1/4 border-r pr-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold">
                            {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                        </div>
                        <span className="text-lg font-semibold">{user?.name || "User"}</span>
                    </div>
                    <ul className="space-y-3">
                        <li
                            onClick={() => handleNavigation("/settings/bookings")}
                            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                        >
                            <FileTextOutlined style={{ fontSize: 20, color: "#007AFF" }} /> Đặt chỗ của tôi
                        </li>
                        <li
                            onClick={() => handleNavigation("/settings/transactions")}
                            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                        >
                            <ScheduleOutlined style={{ fontSize: 20, color: "#007AFF" }} /> Danh sách giao dịch
                        </li>
                        <li className="flex items-center gap-2 p-2 rounded-lg bg-blue-600 text-white font-semibold">
                            <SettingOutlined style={{ fontSize: 20, color: "#007AFF" }} /> Tài khoản
                        </li>
                        {(user?.role === "ADMIN" || user?.role === "TOUR_MANAGER") && (
                            <li
                                onClick={() => handleNavigation("/admin")}
                                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                            >
                                <DashboardOutlined style={{ fontSize: 20, color: "#ff6647" }} /> Quản trị
                            </li>
                        )}
                        <li onClick={handleLogout} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200">
                            <PoweroffOutlined style={{ fontSize: 20, color: "#ff6647" }} /> Đăng xuất
                        </li>
                    </ul>
                </div>

                <div className="w-3/4">
                    <h2 className="text-2xl font-bold mb-6">Cài đặt</h2>

                    <div className="flex gap-6 pb-2 mb-6">
                        <button className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Mật khẩu & Bảo mật</button>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
                            {!isEditingInfo && (
                                <Button type="link" onClick={() => setIsEditingInfo(true)}>
                                    Chỉnh sửa
                                </Button>
                            )}
                        </div>
                        {isEditingInfo ? (
                            <>
                                <div className="grid grid-cols-2 gap-1">
                                    <Input placeholder="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} />
                                    <Input placeholder="Số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="flex gap-2">
                                    <Button type="primary" className="rounded-lg px-8" onClick={handleUpdateInfo}>
                                        Lưu
                                    </Button>
                                    <Button className="rounded-lg px-8" onClick={handleCancelEdit}>
                                        Hủy
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">Họ và tên</p>
                                    <p className="font-medium">{name || "Chưa cập nhật"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">Số điện thoại</p>
                                    <p className="font-medium">{phoneNumber || "Chưa cập nhật"}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-6">
                        <h3 className="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Input.Password placeholder="Mật khẩu cũ" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            <Input.Password placeholder="Mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
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
                        <Button danger type="primary" className="rounded-lg" onClick={() => setIsDeleteModalOpen(true)}>
                            Xóa
                        </Button>
                    </div>
                </div>
            </div>

            <Modal
                title="Xác nhận xóa tài khoản"
                open={isDeleteModalOpen}
                onOk={handleDeleteAccount}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Xóa tài khoản"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <div className="flex items-start gap-3">
                    <ExclamationCircleFilled style={{ fontSize: 22, color: '#faad14' }} />
                    <p>Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác và tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.</p>
                </div>
            </Modal>
            </div>
    );
}
