import React from 'react';


const Footer = () => {
    return (
        <footer className="bg-[#111827] text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-x-8">
             
                    <div className="col-span-1">
                                                <div className="flex items-center mb-4">
                            <svg className="w-8 h-8 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.982 17.502c-1.127.18-2.028-.466-2.028-.466s-1.045-.632-.191-1.89c.854-1.258 2.053-1.082 2.053-1.082L10.982 17.502zM12 21.364s-4.225-2.094-6.49-5.118C3.245 12.247 2 7.632 2 7.632S1.026 3.193 4.28 2.016c3.254-1.177 5.72-.51 5.72-.51s2.217.373 4.673 2.19c2.456 1.817 3.528 4.204 3.528 4.204s.88 2.76.012 5.093c-.868 2.333-3.66 4.71-3.66 4.71s-2.062 1.353-4.553 1.09zM16.92 10.513c-.027-.373-.396-.71-1.396-.864-1.001-.154-2.185.006-2.185.006l-1.066 1.55c0 0 .723.107 1.48.067.757-.04 1.493-.326 1.493-.326s.896-.464 1.764-.326c.868.138.647-.097-.089-.097zM16.324 12.396c-.305-.152-.77-.28-1.34-.336-.57-.056-1.15-.028-1.15-.028s-.937 1.41-1.107 2.02c-.17.61.356 1.258.356 1.258s.937.16 1.637-.09c.7-.25 1.454-.78 1.454-.78s.772-.37-.002-2.044z"/>
                            </svg>
                            <span className="text-3xl font-bold text-gray-100 tracking-wider">traveloka</span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <img src="data:image/webp;base64,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" alt="IATA" className="w-24 h-auto" />
                            <img src="https://th.bing.com/th/id/OIP.gHKTkiIyRrcaLzhSD5gOMQHaHt?w=167&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="KEMENPAR" className="w-24 h-auto" />
                            <img src="https://th.bing.com/th/id/OIP.KCfy7WKnTXvnUARUTNX_owHaCQ?w=339&h=106&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="ISO" className="w-24 h-auto" />
                        </div>

                        

                        <button className="flex items-center justify-center px-4 py-2 border border-gray-600 text-white text-sm font-medium rounded-lg w-full hover:bg-gray-700 transition duration-150 ease-in-out mb-8">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            Hợp tác với Traveloka
                        </button>

                        <h4 className="font-semibold text-gray-100 mb-4">Đối tác thanh toán</h4>
                        <div className="grid grid-cols-3 gap-2">
                           
                            <img src="data:image/webp;base64,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" alt="VISA" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.5JQOKnSWaJLCnmsdS-fHVQHaE8?w=240&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="Mastercard" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.qgSqaP1s_zJ9Rs7xidSY6wHaHa?w=180&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="AMEX" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIF.UkjIzCC2vfMCzZWUC8WcNQ?w=186&h=77&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="VietQR" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.UxNKJTgn2QjNX-U7weBm7QAAAA?w=316&h=64&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="VNPay" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.mmX5pIwTjihVKp1za5E9AQHaHa?w=178&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="VPBank" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.fQ6Fx2uN-K9ztq1Umv7cTAHaHa?w=175&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="VIB" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.OYIiMpA8BbvcgIo6x7_UEQHaHa?w=178&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="Vietcombank" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.NENAUMsuLaqeJhnYT4rDBgHaDZ?w=345&h=160&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="OnePay" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.AjU4UDhQvwPk2PtlOkXS6AHaEK?w=290&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="HSBC" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.2UMwVoG_D1MvvUlXkYEMRwHaEk?w=288&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="ACB" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.nDpLTnou2Q4kJSAcDn8iLgHaFk?w=204&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="TPBank" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.9VTWgfh9aqw5RNe6-Io4gQHaDP?w=327&h=152&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="Vietinbank" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.RiS-VkOB0aM_060XZRcdLgHaHa?w=158&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="BIDV" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.HQW1GVvO3lDI1GWTQWmkvgHaEK?w=354&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="Citibank" className="w-full h-auto rounded" />
                            <img src="https://th.bing.com/th/id/OIP.cCmTEqQea3HHf2URfETtDwHaE8?w=213&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="AlePay" className="w-full h-auto rounded" />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100 mb-4">Về Traveloka</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Cách đặt chỗ</a></li>
                            <li><a href="#" className="hover:underline">Liên hệ chúng tôi</a></li>
                            <li><a href="#" className="hover:underline">Trợ giúp</a></li>
                            <li><a href="#" className="hover:underline">Tuyển dụng</a></li>
                            <li><a href="#" className="hover:underline">Về chúng tôi</a></li>
                        </ul>
                        <h4 className="font-semibold text-gray-100 mt-6 mb-4">Theo dõi chúng tôi trên</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.496v-9.294H9.692V10.37h3.129V7.712c0-3.111 1.893-4.814 4.659-4.814 1.325 0 2.463.099 2.795.143v3.24l-1.916.001c-1.503 0-1.795.715-1.795 1.763v2.313h3.587l-.503 3.684h-3.084V24h6.115c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg> Facebook</li>
                            <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M7.812 0C3.497 0 0 3.497 0 7.812v8.375C0 20.503 3.497 24 7.812 24h8.375C20.503 24 24 20.503 24 16.188V7.812C24 3.497 20.503 0 16.188 0H7.812zm8.376 2.651c.524 0 .977.425.977.977v8.375c0 .552-.453.977-.977.977H7.812c-.524 0-.977-.425-.977-.977V3.628c0-.552.453-.977.977-.977h8.376zm-8.376 0c.524 0 .977.425.977.977v8.375c0 .552-.453.977-.977.977H7.812c-.524 0-.977-.425-.977-.977V3.628c0-.552.453-.977.977-.977zM12 5.868c-3.38 0-6.132 2.752-6.132 6.132s2.752 6.132 6.132 6.132 6.132-2.752 6.132-6.132-2.752-6.132-6.132-6.132zm0 10.233c-2.26 0-4.101-1.841-4.101-4.101S9.74 7.899 12 7.899s4.101 1.841 4.101 4.101-1.841 4.101-4.101 4.101zM18.847 3.967c-.645 0-1.168.523-1.168 1.168s.523 1.168 1.168 1.168 1.168-.523 1.168-1.168-.523-1.168-1.168-1.168z"/></svg> Instagram</li>
                            <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.143 8.356c.21-.08.41-.17.6-.264-.53-.16-1.07-.31-1.61-.45-.44-.12-.88-.23-1.32-.35-.08.38-.16.76-.24 1.14-.14.63-.29 1.26-.43 1.89-1.25-.09-2.5-.18-3.75-.27-1.19-.08-2.38-.17-3.57-.25-.08-.38-.16-.76-.24-1.14-.14-.63-.29-1.26-.43-1.89-.44.12-.88.23-1.32.35-1.61.45-3.22.89-4.83 1.33-.21.08-.41.17-.6.26-.06.32-.12.64-.18.96-.21.1-.42.21-.63.31-.22-.1-.44-.21-.66-.31-.06-.32-.12-.64-.18-.96-.44.12-.88.23-1.32.35-1.61.45-3.22.89-4.83 1.33-.21.08-.41.17-.6.26-.08-.38-.16-.76-.24-1.14-.14-.63-.29-1.26-.43-1.89.44-.12.88-.23 1.32-.35 1.61-.45 3.22-.89 4.83-1.33.21-.08.41-.17.6-.26.08-.38.16-.76.24-1.14.14-.63.29-1.26.43-1.89.44-.12.88-.23 1.32-.35 1.61-.45 3.22-.89 4.83-1.33.21-.08.41-.17.6-.26.06-.32.12-.64.18-.96.21-.1.42-.21.63-.31.22.1.44.21.66.31.06-.32.12-.64.18-.96z"/></svg> Tiktok</li>
                            <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.143 8.356c-.146-.576-.577-.93-1.15-.972-.51-.038-.99-.07-1.47-.105-1.5-.11-2.99-.22-4.49-.33-.07-.46-.14-.92-.22-1.38-.3-.02-.6-.04-.9-.06-.11.45-.22.9-.33 1.35-1.5-.11-2.99-.22-4.49-.33-.07-.46-.14-.92-.22-1.38-.3-.02-.6-.04-.9-.06-.11.45-.22.9-.33 1.35-1.5-.11-2.99-.22-4.49-.33-.07-.46-.14-.92-.22-1.38-.3-.02-.6-.04-.9-.06-.11.45-.22.9-.33 1.35-.51-.038-.99-.07-1.47-.105-.57-.042-1-.396-1.15-.972-.11.45-.22.9-.33 1.35-.51-.038-.99-.07-1.47-.105-.57-.042-1-.396-1.15-.972-.11.45-.22.9-.33 1.35-.51-.038-.99-.07-1.47-.105-.57-.042-1-.396-1.15-.972-.11.45-.22.9-.33 1.35-.51-.038-.99-.07-1.47-.105-.57-.042-1-.396-1.15-.972-.11.45-.22.9-.33 1.35.51-.038.99.07 1.47.105.57-.042 1 .396 1.15.972.11-.45.22-.9.33-1.35.51.038.99.07 1.47.105.57-.042 1 .396 1.15.972.11-.45.22-.9.33-1.35.51.038.99.07 1.47.105.57-.042 1 .396 1.15.972z"/></svg> Telegram</li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100 mb-4">Sản phẩm</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Khách sạn</a></li>
                            <li><a href="#" className="hover:underline">Vé máy bay</a></li>
                            <li><a href="#" className="hover:underline">Vé xe khách</a></li>
                            <li><a href="#" className="hover:underline">Dura đón sân bay</a></li>
                            <li><a href="#" className="hover:underline">Cho thuê xe</a></li>
                            <li><a href="#" className="hover:underline">Hoạt động & Vui chơi</a></li>
                            <li><a href="#" className="hover:underline">Du thuyền</a></li>
                            <li><a href="#" className="hover:underline">Biệt thự</a></li>
                            <li><a href="#" className="hover:underline">Căn hộ</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100 mb-4">Khác</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Traveloka Affiliate</a></li>
                            <li><a href="#" className="hover:underline">Traveloka Blog</a></li>
                            <li><a href="#" className="hover:underline">Chính sách Quyền Riêng</a></li>
                            <li><a href="#" className="hover:underline">Điều khoản & Điều kiện</a></li>
                            <li><a href="#" className="hover:underline">Đăng ký nơi nghỉ của bạn</a></li>
                            <li><a href="#" className="hover:underline">Đăng ký doanh nghiệp hoạt động du lịch của bạn</a></li>
                            <li><a href="#" className="hover:underline">Khu vực bảo trì</a></li>
                            <li><a href="#" className="hover:underline">Quy chế hoạt động</a></li>
                            <li><a href="#" className="hover:underline">Vulnerability Disclosure Program</a></li>
                            <li><a href="#" className="hover:underline">APAC Travel Insights</a></li>
                        </ul>
                        <h4 className="font-semibold text-gray-100 mt-6 mb-4">Tải ứng dụng Traveloka</h4>
                        <div className="space-y-3">
                            <img src="https://th.bing.com/th/id/OIP.NQg5NB45ibvnFuftQgupMQHaCg?w=339&h=118&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="Google Play" className="w-36 h-auto" />
                            <img src="https://th.bing.com/th/id/OIP.hfINhDVvjUq6SzvyM9XNBQHaCg?w=340&h=118&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="App Store" className="w-36 h-auto" />
                        </div>
                    </div>

                </div>

                <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-xs">
                    <p>Công ty TNHH Traveloka Việt Nam, Mã số ĐN: 0313581779. Tòa nhà An Phú, 117-119 Lý Chính Thắng, Phường Xuarua Hòa, TP.HCM</p>
                    <p className="mt-1">Copyright © 2025 Traveloka. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;