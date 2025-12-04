import { useEffect, useState } from "react";
import { Modal, Drawer, Form, Input, Button } from "antd";
import triploka from "../../../assets/logos/logo_tripoka.png";
import promotion_icon from "../../../assets/icons/icon_promotion.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, StoreType } from "../../../stores";
import { userLogin, userRegister } from "../../../stores/slides/userLoginRegister.slice";
import Account from "./Account";
import { useNavigate } from "react-router";

const Header = () => {
    const [currency] = useState("VND");
    const [language] = useState("VI");
    const { status, token } = useSelector((state: StoreType) => state.userReducer)
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [formLogin] = Form.useForm();
    const [formRegister] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = (values: { email: string, password: string }) => {
        dispatch(userLogin(values))        
        setShowLogin(false);
        formLogin.resetFields();
    const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState({
    email: "",
    password: "",
  });
const validateCheckRegister = ()=>{
     const newError = {
             email:"",

      password: "",
      confirm: "",
    };

    const handleRegister = (values: { name: string, email: string, password: string }) => {
        console.log('Register values:', values);
        dispatch(userRegister(values))
        setShowRegister(false);
        formRegister.resetFields();
    };

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [status, token])

    const navItems = (
        <>
            <div
                className="flex items-center space-x-1 text-gray-700 cursor-pointer text-sm hover:text-blue-500"
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
            <a className="text-sm font-medium text-gray-700 hover:text-blue-500">Đặt chỗ của tôi</a>
            {status !== 'success' ? <>
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
            </> :
                <>
                    <Account />
                </>
            }
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
                        {/* form register */}
                        <Form
                            form={formRegister}
                            onFinish={handleRegister}
                            layout="vertical"
                            className="px-6 pb-6"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    { required: true, message: 'Không được để trống email' },
                                    { type: 'string', message: 'Email phải đúng định dạng' }
                                ]}
                            >
                                <Input
                                    type="name"
                                    placeholder="Nhập name"
                                    className="p-3 rounded-xl"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Không được để trống email' },
                                    { type: 'email', message: 'Email phải đúng định dạng' }
                                ]}
                            >
                                <Input
                                    type="email"
                                    placeholder="Nhập email"
                                    className="p-3 rounded-xl"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: 'Không được để trống mật khẩu' },
                                    { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }
                                ]}
                            >
                                <Input.Password
                                    placeholder="Nhập mật khẩu"
                                    className="p-3 rounded-xl"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="confirm"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không trùng nhau'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="Xác nhận mật khẩu"
                                    className="p-3 rounded-xl"
                                />
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
                        <Form
                            form={formLogin}
                            onFinish={handleLogin}
                            layout="vertical"
                            className="px-6 pb-6"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Không được để trống email' },
                                    { type: 'email', message: 'Email phải đúng định dạng' }
                                ]}
                            >
                                <Input
                                    type="email"
                                    placeholder="Nhập email"
                                    className="p-3 rounded-xl"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: 'Không được để trống mật khẩu' },
                                    { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }
                                ]}
                            >
                                <Input.Password
                                    placeholder="Nhập mật khẩu"
                                    className="p-3 rounded-xl"
                                />
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
