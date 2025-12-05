import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { App, Layout, Menu } from "antd";
import {
    DashboardOutlined,
    EnvironmentOutlined,
    AppstoreOutlined,
    CalendarOutlined,
    UserOutlined,
    CarOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import logo_triploka from "../../assets/logos/logo_tripoka.png";
import axios from "axios";
const { Sider, Content } = Layout;  

interface UserResponse {
    role: string;
  name: string;
  email: string;
}

const AdminLayout = () => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const getUser = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }

            const res = await axios.post<UserResponse>("http://localhost:3000/api/auth/getUser", { token });

            if (res.data.role === "USER") {
                navigate("/");
                return;
            }
                  
            setUser(res.data);
            
        } catch {
            navigate("/");
        }
    }, [navigate]);    useEffect(() => {
        getUser();
    }, [getUser])

    const menuItems = user?.role === "TOUR_MANAGER" 
        ? [
            { key: "/admin", icon: <DashboardOutlined />, label: "Dashboard" },
            {
                key: "/admin/tour-manager",
                icon: <CarOutlined />,
                label: "Tour Management",
                children: [
                    { key: "/admin/tour-manager/tours", label: "Tour" },
                    { key: "/admin/tour-manager/departure", label: "Departure" },
                    { key: "/admin/tour-manager/image", label: "Image" },
                ],
            },
        ]
        : [
            { key: "/admin", icon: <DashboardOutlined />, label: "Dashboard" },
            {
                key: "/admin/tour-manager",
                icon: <CarOutlined />,
                label: "Tour Management",
                children: [
                    { key: "/admin/tour-manager/tours", label: "Tour" },
                    { key: "/admin/tour-manager/departure", label: "Departure" },
                    { key: "/admin/tour-manager/image", label: "Image" },
                ],
            },
            { key: "/admin/category-manager", icon: <AppstoreOutlined />, label: "Category Manager" },
            { key: "/admin/location-manager", icon: <EnvironmentOutlined />, label: "Location Manager" },
            { key: "/admin/booking-manager", icon: <CalendarOutlined />, label: "Booking Manager" },
            { key: "/admin/promotion-manager", icon: <CalendarOutlined />, label: "Promotion Manager" },
        ];

    return (
        <App>
            <Layout className="min-h-screen relative">
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    theme="light"
                    width={256}
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <img src={logo_triploka} alt="Triploka" width={30} />
                            {!collapsed && <span className="text-2xl font-bold text-gray-800">Triploka</span>}
                        </div>
                    </div>

                    <Menu
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        onClick={({ key }) => navigate(key)}
                        className="border-0 mt-4"
                    />

                    {!collapsed && (
                        <div className="absolute bottom-10 left-0 right-0 p-4 border-t border-gray-200 bg-white">
                            <div className="flex items-center gap-3 px-2 justify-between">
                                <div className="flex justify-center items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <UserOutlined className="text-gray-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                                </div>
                                <LogoutOutlined className="text-red-400! text-xl! font-bold! cursor-pointer!" />
                            </div>
                        </div>
                    )}
                </Sider>

                <Layout style={{ marginLeft: collapsed ? 80 : 256, transition: "margin-left 0.2s", height: "100%" }}>
                    <Content className="bg-gray-50">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </App>
    );
};

export default AdminLayout;
