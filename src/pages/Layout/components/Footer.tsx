import React from "react";
import triploka from "../../../assets/logos/logo_tripoka.png";
import vietqr from "../../../assets/logos/logo_vietqr.png";
import casso from "../../../assets/logos/logo_casso.png";

const Footer = () => {
    return (
        <footer className="bg-[#111827] text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-x-8">
                    <div className="col-span-1">
                        <div className="flex items-center mb-4">
                            <img src={triploka} alt="Triploka" width={30}/>
                            <span className="text-3xl font-bold text-gray-100 tracking-wider pl-2">Triploka</span>
                        </div>

                        <h4 className="font-semibold text-gray-100 mb-4">Đối tác thanh toán</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <img
                                src={vietqr}
                                alt="vietqr"
                                className="h-[60px] rounded"
                            />
                            <img
                                src={casso}
                                alt="casso"
                                className="h-[60px] rounded"
                            />

                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100 mb-4">Về Triploka</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:underline">
                                    Cách đặt chỗ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Liên hệ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Trợ giúp
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Về chúng tôi
                                </a>
                            </li>
                        </ul>
                        <h4 className="font-semibold text-gray-100 mt-6 mb-4">Theo dõi chúng tôi trên</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.496v-9.294H9.692V10.37h3.129V7.712c0-3.111 1.893-4.814 4.659-4.814 1.325 0 2.463.099 2.795.143v3.24l-1.916.001c-1.503 0-1.795.715-1.795 1.763v2.313h3.587l-.503 3.684h-3.084V24h6.115c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                                </svg>{" "}
                                Facebook
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100 mb-4">Sản phẩm</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:underline">
                                    Tour du lịch
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100 mb-4">Khác</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:underline">
                                    Khuyến mãi
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Chính sách Quyền Riêng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Điều khoản & Điều kiện
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-xs">
                    <p>Công ty TNHH Triploka Việt Nam, TP.HCM</p>
                    <p className="mt-1">Copyright © 2025 Triploka. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
