import React from "react";
import triploka from "../../../assets/logos/logo_tripoka.png";
import promotion_icon from "../../../assets/icons/icon_promotion.png";

const Header = () => {
    return (
        <div>
            <nav className="bg-gray-100 border-b border-gray-200">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        <div className="shrink-0 flex items-center space-x-6">
                            
                            <div className="flex items-center">
                                <img src={triploka} alt="Triploka" width={30}/>
                                <a href="#" className="text-2xl font-bold text-gray-800 tracking-wider pl-2">Triploka</a>
                            </div>

                        
                        </div>

                        <div className="flex items-center space-x-6">
                            
                            <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 cursor-pointer text-sm">
                                
                                <div className="relative w-6 h-4 flex items-center justify-center bg-[#C8102E] rounded-sm shadow-sm overflow-hidden shrink-0">
                                    <div className="star w-2 h-2" style={{
                                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 67% 57%, 79% 91%, 50% 70%, 21% 91%, 33% 57%, 2% 35%, 39% 35%)',
                                        backgroundColor: '#FFCD00',
                                    }}></div>
                                </div>
                                
                                <span>VND | VI</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>

                            <a href="#" className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-600">
                                <img src={promotion_icon} alt="promotion" className="w-6 mr-1"/>
                                Khuyến mãi
                            </a>
                            
                            <div className="relative group cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-500">
                                <span className="flex items-center">
                                    Hỗ trợ
                                </span>
                            </div>
                            
                            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-500">Đặt chỗ của tôi</a>

                            <a href="#" className="px-4 py-2 border border-blue-500 text-sm font-medium rounded-lg text-blue-500 hover:bg-blue-50 transition duration-150 ease-in-out flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Đăng Nhập
                            </a>
                            
                            <a href="#" className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out">
                                Đăng Ký
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

          
        </div>
    )
};

export default Header;