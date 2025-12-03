import React, { useState } from "react";
import { Modal, Drawer } from "antd";
import triploka from "../../../assets/logos/logo_tripoka.png";
import promotion_icon from "../../../assets/icons/icon_promotion.png";
import { useNavigate } from "react-router";

const Header = () => {
    const [currency, setCurrency] = useState("VND");
    const [language, setLanguage] = useState("VI");
    const [showModal, setShowModal] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const navigate = useNavigate();

    const navItems = (
        <>
            <div
                className="flex items-center space-x-1 text-gray-700 cursor-pointer text-sm hover:text-blue-500"
                onClick={() => setShowModal((p) => !p)}
            >
                <span>
                    {currency} | {language}
                </span>
            </div>
            <a className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 cursor-pointer">
                <img src={promotion_icon} alt="promotion" className="w-6 mr-1" />
                Khuyến mãi
            </a>
            <div className="text-sm font-medium text-gray-700 hover:text-blue-500 cursor-pointer">Hỗ trợ</div>
            <a className="text-sm font-medium text-gray-700 hover:text-blue-500 cursor-pointer">Đặt chỗ của tôi</a>
            <a className="text-sm font-medium text-amber-500 hover:text-amber-700 cursor-pointer" onClick={() => navigate("/favorite-tour")}>Tour yêu thích</a>
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
    );

    return (
        <div className="mb-26">
            <nav className="bg-gray-100 border-b border-gray-200 fixed top-0 left-0 right-0 w-full z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <img src={triploka} alt="Triploka" width={30} />
                            <span onClick={() => navigate("/")} className="text-xl md:text-2xl font-bold text-gray-800 tracking-wider pl-2 cursor-pointer">
                                Triploka
                            </span>
                        </div>
                        <div className="hidden md:flex relative w-full md:w-auto">
                            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end space-x-2 md:space-x-6 cursor-pointer">
                                {navItems}
                            </div>
                        </div>
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
            <Drawer
                placement="right"
                open={showMobileMenu}
                onClose={() => setShowMobileMenu(false)}
                width={280}
            >
                <div className="flex flex-col gap-6">{navItems}</div>
            </Drawer>
            <Modal
                open={showRegister}
                onCancel={() => setShowRegister(false)}
                footer={null}
                centered
                width={400}
            >
                <div className="w-full bg-white rounded-3xl overflow-hidden">
                    <h2 className="text-center w-full text-3xl font-bold text-gray-800">Đăng ký</h2>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input type="password" className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input type="password" className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300" />
                        </div>
                        <p className="text-xs text-center text-gray-500 px-4">
                            Bằng cách tiếp tục, bạn đồng ý với
                            <span className="text-blue-500"> Điều khoản và Điều kiện </span>
                            và bạn đã đọc thông báo về
                            <span className="text-blue-500"> Chính sách bảo vệ dữ liệu</span>.
                        </p>
                        <button className="w-full py-3 bg-blue-400 rounded-xl font-semibold text-white hover:bg-blue-500">Đăng Ký</button>
                    </div>
                </div>
            </Modal>
            <Modal
                open={showLogin}
                onCancel={() => setShowLogin(false)}
                footer={null}
                centered
                width={400}
            >
                <div className="w-full bg-white rounded-3xl overflow-hidden">
                    <h2 className="text-center text-3xl font-bold text-gray-800">Đăng nhập</h2>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input type="password" className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300" />
                        </div>
                        <p className="text-xs text-center text-gray-500 px-4">
                            Bằng cách tiếp tục, bạn đồng ý với
                            <span className="text-blue-500"> Điều khoản và Điều kiện </span>
                            và bạn đã đọc thông báo về
                            <span className="text-blue-500"> Chính sách bảo vệ dữ liệu</span>.
                        </p>
                        <button className="w-full py-3 bg-blue-400 rounded-xl font-semibold text-white hover:bg-blue-500">Đăng Nhập</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Header;
