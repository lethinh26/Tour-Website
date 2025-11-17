import React, { useState } from "react";
import triploka from "../../../assets/logos/logo_tripoka.png";
import promotion_icon from "../../../assets/icons/icon_promotion.png";
import register from "../../../assets/logos/logo_register.png";

const Header = () => {
  const [currency, setCurrency] = useState("VND");
  const [language, setLanguage] = useState("VI");
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="bg-gray-100 border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-6">
              <img src={triploka} alt="Triploka" width={30} />
              <a
                href="#"
                className="text-2xl font-bold text-gray-800 tracking-wider pl-2"
              >
                Triploka
              </a>
            </div>

            {/* Menu */}
            <div className="flex items-center space-x-6 relative">
              {/* Currency & Language trigger */}
              <div
                className="flex items-center space-x-1 text-gray-700 cursor-pointer text-sm hover:text-blue-500"
                onClick={() => setShowModal((p) => !p)}
              >
                <span>{currency} | {language}</span>
              </div>

              {/* other header buttons */}
              <a className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-600">
                <img src={promotion_icon} alt="promotion" className="w-6 mr-1" />
                Khuyến mãi
              </a>

              <div className="text-sm font-medium text-gray-700 hover:text-blue-500 cursor-pointer">
                Hỗ trợ
              </div>

              <a className="text-sm font-medium text-gray-700 hover:text-blue-500">
                Đặt chỗ của tôi
              </a>

              <a className="px-4 py-2 border border-blue-500 text-sm font-medium rounded-lg text-blue-500 hover:bg-blue-50">
                Đăng Nhập
              </a>
              <a className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600">
                Đăng Ký
              </a>

              {/* DROPDOWN */}
              {showModal && (
                <div className="absolute right-0 top-10 mt-2 w-[720px] bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="flex">

                    {/* TIỀN TỆ */}
                    <div className="flex-1 border-r border-gray-200 px-6 py-4">
                      <p className="text-sm font-semibold mb-4">Chọn đơn vị tiền tệ</p>

                      <div className="space-y-2 text-sm">
                        {/* USD */}
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

                          {currency === "USD" && (
                            <span className="text-green-600 font-bold text-lg">✓</span>
                          )}
                        </button>

                        {/* VND */}
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

                          {currency === "VND" && (
                            <span className="text-green-600 font-bold text-lg">✓</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* NGÔN NGỮ */}
                    <div className="flex-1 px-6 py-4">
                      <p className="text-sm font-semibold mb-4">Chọn ngôn ngữ</p>

                      <div className="space-y-2 text-sm">

                        {/* Vietnamese */}
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
                          {language === "VI" && (
                            <span className="text-green-600 font-bold text-lg">✓</span>
                          )}
                        </button>

                        {/* English */}
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
                          {language === "EN" && (
                            <span className="text-green-600 font-bold text-lg">✓</span>
                          )}
                        </button>

                      </div>
                    </div>
                  </div>

                  {/* XONG */}
                  <div className="flex justify-end px-6 py-3 border-t border-gray-200">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Xong
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </nav>

      {/* FORM ĐĂNG KÝ */}
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative w-full h-28">
            <img src={register} alt="header" className="absolute bottom-0 left-0 w-full" />
            <h2 className="absolute top-4 left-4 text-2xl font-bold text-gray-800">Đăng ký</h2>
          </div>

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

            <button className="w-full py-3 bg-blue-400 rounded-xl font-semibold text-white hover:bg-blue-500">
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
