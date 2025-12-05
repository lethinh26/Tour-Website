import { useEffect, useState, useCallback } from "react";
import { Modal, Drawer, Form, Input, Button } from "antd";
import triploka from "../../../assets/logos/logo_tripoka.png";
import promotion_icon from "../../../assets/icons/icon_promotion.png";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../stores";
import { userLogin, userRegister } from "../../../stores/slides/userLoginRegister.slice";
import Account from "./Account";
import axios from "axios";

const Header = () => {
    const [currency, setCurrency] = useState("VND");
    const [language, setLanguage] = useState("VI");
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [formLogin] = Form.useForm();
    const [formRegister] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const [showModalSet, setShowModalSet] = useState(false);

    const handleLogin = (values: { email: string, password: string }) => {
        console.log('Login values:', values);
        dispatch(userLogin(values))
        setShowLogin(false);
        formLogin.resetFields();
    };


    const getUser = useCallback(async () => {
        try {
            const tokenUser = localStorage.getItem("token");
            if (!tokenUser) {
                setUser(null);
                return;
            }
            const res = await axios.post("http://localhost:3000/api/auth/getUser", { token: tokenUser });
            setUser(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Failed to get user:", error);
            setUser(null);
        }
    }, []);

    const handleLogin = useCallback(
        async (values: { email: string; password: string }) => {
            await dispatch(userLogin(values));
            setShowLogin(false);
            formLogin.resetFields();
            getUser();
        },
        [dispatch, formLogin, getUser]
    );

    const handleRegister = useCallback(
        async (values: { name: string; email: string; password: string }) => {
            await dispatch(userRegister(values));
            setShowRegister(false);
            formRegister.resetFields();
            getUser();
        },
        [dispatch, formRegister, getUser]
    );

    useEffect(() => {
        getUser();
    }, [getUser]);

    const navItems = (
        <>
            <div className="flex items-center space-x-1 text-gray-700 cursor-pointer text-sm hover:text-blue-500">
                <span onClick={() => setShowModalSet(!showModalSet)}>
                    {currency} | {language}
                </span>
            </div>
            <a className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-600">
                <img src={promotion_icon} alt="promotion" className="w-6 mr-1" />
                Khuyến mãi
            </a>
            <div className="text-sm font-medium text-gray-700 hover:text-blue-500 cursor-pointer">Hỗ trợ</div>
            <a className="text-sm font-medium text-gray-700 hover:text-blue-500">Đặt chỗ của tôi</a>
            {!user ? (
                <>
                    <button
                        className="px-3 py-2 border border-blue-500 text-sm font-medium rounded-lg text-blue-500 hover:bg-blue-50"
                        onClick={() => setShowLogin(true)}
                    >
                        Đăng Nhập
                    </button>
                    <button
                        className="px-3 py-2 text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600"
                        onClick={() => setShowRegister(true)}
                    >
                        Đăng Ký
                    </button>
                </>
            ) : (
                <Account />
            )}
        </>
    );
    return (
        <div>
            <nav className="bg-gray-100 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 relative">
                        <div className="flex items-center">
                            <img src={triploka} alt="Triploka" width={30} />
                            <a href="#" className="text-xl md:text-2xl font-bold text-gray-800 tracking-wider pl-2">
                                Triploka
                            </a>
                        </div>
                        <div className="hidden md:flex relative w-full md:w-auto">
                            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end space-x-2 md:space-x-6">
                                {navItems}
                            </div>
                        </div>

                        {showModalSet && (
                            <div className="absolute right-0 top-10 mt-2 w-[720px] bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                <div className="flex">
                                    <div className="flex-1 border-r border-gray-200 px-6 py-4">
                                        <p className="text-sm font-semibold mb-4">Chọn đơn vị tiền tệ</p>

                                        <div className="space-y-2 text-sm">
                                            <button
                                                onClick={() => setCurrency("USD")}
                                                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border 
                            ${
                                currency === "USD"
                                    ? "bg-green-50 border-green-500 text-green-700 font-semibold"
                                    : "bg-white border-gray-300 hover:bg-green-50 hover:border-green-400"
                            }`}
                                            >
                                                <span className="flex flex-col text-left">
                                                    <span className="font-semibold">USD</span>
                                                    <span className="text-xs opacity-70">Đô la Mỹ (USD)</span>
                                                </span>

                                                {currency === "USD" && <span className="text-green-600 font-bold text-lg">✓</span>}
                                            </button>

                                            <button
                                                onClick={() => setCurrency("VND")}
                                                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border 
                            ${
                                currency === "VND"
                                    ? "bg-green-50 border-green-500 text-green-700 font-semibold"
                                    : "bg-white border-gray-300 hover:bg-green-50 hover:border-green-400"
                            }`}
                                            >
                                                <span className="flex flex-col text-left">
                                                    <span className="font-semibold">VND</span>
                                                    <span className="text-xs opacity-70">Đồng Việt Nam (VND)</span>
                                                </span>

                                                {currency === "VND" && <span className="text-green-600 font-bold text-lg">✓</span>}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex-1 px-6 py-4">
                                        <p className="text-sm font-semibold mb-4">Chọn ngôn ngữ</p>

                                        <div className="space-y-2 text-sm">
                                            <button
                                                onClick={() => setLanguage("VI")}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border 
                            ${
                                language === "VI"
                                    ? "bg-green-50 border-green-500 text-green-700 font-semibold"
                                    : "bg-white border-gray-300 hover:bg-green-50 hover:border-green-400"
                            }`}
                                            >
                                                <span>Tiếng Việt</span>
                                                {language === "VI" && <span className="text-green-600 font-bold text-lg">✓</span>}
                                            </button>

                                            <button
                                                onClick={() => setLanguage("EN")}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border 
                            ${
                                language === "EN"
                                    ? "bg-green-50 border-green-500 text-green-700 font-semibold"
                                    : "bg-white border-gray-300 hover:bg-green-50 hover:border-green-400"
                            }`}
                                            >
                                                <span>English</span>
                                                {language === "EN" && <span className="text-green-600 font-bold text-lg">✓</span>}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end px-6 py-3 border-t border-gray-200">
                                    <button
                                        onClick={() => setShowModalSet(false)}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Xong
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="md:hidden">
                            <button
                                className="p-2 rounded-lg text-gray-700 hover:bg-gray-200"
                                onClick={() => setShowMobileMenu(true)}
                                aria-label="Mở menu"
                            >
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <Drawer placement="right" open={showMobileMenu} onClose={() => setShowMobileMenu(false)} width={280}>
                <div className="flex flex-col gap-6">{navItems}</div>
            </Drawer>

            {/* modalLoginRegister */}
            <>
                <Modal
                    open={showRegister}
                    onCancel={() => {
                        setShowRegister(false);
                        formRegister.resetFields();
                    }}
                    footer={null}
                    centered
                    width={400}
                >
                    <div className="w-full bg-white rounded-3xl overflow-hidden">
                        <h2 className="text-center w-full text-3xl font-bold text-gray-800 mb-6">Đăng ký</h2>
                        <Form form={formRegister} onFinish={handleRegister} layout="vertical" className="px-6 pb-6">
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    { required: true, message: "Không được để trống email" },
                                    { type: "string", message: "Email phải đúng định dạng" },
                                ]}
                            >
                                <Input type="name" placeholder="Nhập name" className="p-3 rounded-xl" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Không được để trống email" },
                                    { type: "email", message: "Email phải đúng định dạng" },
                                ]}
                            >
                                <Input type="email" placeholder="Nhập email" className="p-3 rounded-xl" />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: "Không được để trống mật khẩu" },
                                    { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu" className="p-3 rounded-xl" />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="confirm"
                                dependencies={["password"]}
                                rules={[
                                    { required: true, message: "Vui lòng xác nhận mật khẩu" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Mật khẩu không trùng nhau"));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu" className="p-3 rounded-xl" />
                            </Form.Item>
                            <p className="text-xs text-center text-gray-500 px-4 mb-4">
                                Bằng cách tiếp tục, bạn đồng ý với
                                <span className="text-blue-500"> Điều khoản và Điều kiện </span>
                                và bạn đã đọc thông báo về
                                <span className="text-blue-500"> Chính sách bảo vệ dữ liệu</span>.
                            </p>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full h-12 bg-blue-400 rounded-xl font-semibold text-white hover:bg-blue-500"
                                >
                                    Đăng Ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
                <Modal
                    open={showLogin}
                    onCancel={() => {
                        setShowLogin(false);
                        formLogin.resetFields();
                    }}
                    footer={null}
                    centered
                    width={400}
                >
                    <div className="w-full bg-white rounded-3xl overflow-hidden">
                        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Đăng nhập</h2>
                        <Form form={formLogin} onFinish={handleLogin} layout="vertical" className="px-6 pb-6">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Không được để trống email" },
                                    { type: "email", message: "Email phải đúng định dạng" },
                                ]}
                            >
                                <Input type="email" placeholder="Nhập email" className="p-3 rounded-xl" />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: "Không được để trống mật khẩu" },
                                    { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu" className="p-3 rounded-xl" />
                            </Form.Item>
                            <p className="text-xs text-center text-gray-500 px-4 mb-4 mt-8">
                                Bằng cách tiếp tục, bạn đồng ý với
                                <span className="text-blue-500"> Điều khoản và Điều kiện </span>
                                và bạn đã đọc thông báo về
                                <span className="text-blue-500"> Chính sách bảo vệ dữ liệu</span>.
                            </p>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full h-12 bg-blue-400 rounded-xl font-semibold text-white hover:bg-blue-500"
                                >
                                    Đăng Nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </>
        </div>
    );
};

export default Header;
