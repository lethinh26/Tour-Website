import { useState } from "react";

export default function FilterTour() {
    // trạng thái mở/đóng cho từng nhóm
    const [open, setOpen] = useState({
        tour: true,
        kids: false,
        spa: false,
        food: false,
    });

    // trạng thái thu/hiện toàn bộ component
    const [collapsed, setCollapsed] = useState(false);

    const toggleGroup = (key: keyof typeof open) => setOpen((p) => ({ ...p, [key]: !p[key] }));
    const resetAll = () => {
        // reset trạng thái nhóm (nếu muốn reset checkbox thì cần quản lý checked trong state)
        setOpen({
            tour: true,
            kids: false,
            spa: false,
            food: false,
        });
        // (nếu bạn muốn reset các checkbox, quản lý chúng bằng useState)
    };

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-3 shadow-sm text-gray-700">
            {/* Header: tiêu đề + nút Đặt lại + nút thu toàn bộ */}
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm">Tour & Hoạt động</h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={resetAll}
                        className="text-blue-500 text-sm hover:underline focus:outline-none"
                        aria-label="Đặt lại bộ lọc"
                    >
                        Đặt lại
                    </button>

                    {/* Toggle toàn bộ component */}
                    <button
                        onClick={() => setCollapsed((c) => !c)}
                        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                        aria-expanded={!collapsed}
                        aria-label={collapsed ? "Mở bộ lọc" : "Thu gọn bộ lọc"}
                        title={collapsed ? "Mở bộ lọc" : "Thu gọn bộ lọc"}
                    >
                        <span
                            className={`inline-block transform transition-transform duration-200 ${collapsed ? "rotate-180" : "rotate-0"
                                }`}
                            aria-hidden="true"
                        >
                            {/* mũi tên hướng xuống */}
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="block text-gray-500"
                            >
                                <path
                                    d="M6 9l6 6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            {/* Toàn bộ nội dung card (ẩn khi collapsed = true) */}
            <div
                className={`mt-3 overflow-hidden transition-[max-height,opacity,padding] duration-300 ${collapsed ? "max-h-0 opacity-0 p-0" : "max-h-[1000px] opacity-100 p-0"
                    }`}
                // thêm role để dễ nhận biết cho screen reader
                role="region"
                aria-hidden={collapsed}
            >
                <div className="space-y-4 p-3">
                    {/* Tour */}
                    <div>
                        <button
                            onClick={() => toggleGroup("tour")}
                            className="flex w-full items-center justify-between font-medium"
                        >
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="accent-green-500 w-4 h-4" defaultChecked />
                                <span>Tour</span>
                            </label>
                            <span className={`transition-transform ${open.tour ? "rotate-180" : "rotate-0"}`}>
                                ▾
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${open.tour ? "max-h-40 mt-2" : "max-h-0"
                                }`}
                        >
                            <div className="pl-6 flex flex-col gap-2 text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-green-500 w-4 h-4" defaultChecked />
                                    Tour ngắm cảnh
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-green-500 w-4 h-4" defaultChecked />
                                    Tour theo chủ đề
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-green-500 w-4 h-4" defaultChecked />
                                    Tham quan các đảo
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Khu vui chơi cho trẻ em */}
                    <div>
                        <button
                            onClick={() => toggleGroup("kids")}
                            className="flex w-full items-center justify-between font-medium"
                        >
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="accent-blue-500 w-4 h-4" />
                                <span>Khu vui chơi cho trẻ em</span>
                            </label>
                            <span className={`transition-transform ${open.kids ? "rotate-180" : "rotate-0"}`}>
                                ▾
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${open.kids ? "max-h-40 mt-2" : "max-h-0"
                                }`}
                        >
                            <div className="pl-6 flex flex-col gap-2 text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-blue-500 w-4 h-4" /> Trò chơi Arcade
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-blue-500 w-4 h-4" /> Sân chơi trẻ em
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-blue-500 w-4 h-4" /> Trò chơi trốn thoát
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-blue-500 w-4 h-4" /> Các khu vui chơi khác
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Các nhóm khác (ví dụ Spa, Ẩm thực) */}
                    <div>
                        <button
                            onClick={() => toggleGroup("spa")}
                            className="flex w-full items-center justify-between font-medium"
                        >
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="accent-purple-500 w-4 h-4" />
                                <span>Spa & thư giãn</span>
                            </label>
                            <span className={`transition-transform ${open.spa ? "rotate-180" : "rotate-0"}`}>
                                ▾
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${open.spa ? "max-h-40 mt-2" : "max-h-0"
                                }`}
                        >
                            <div className="pl-6 flex flex-col gap-2 text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-purple-500 w-4 h-4" /> Massage
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-purple-500 w-4 h-4" /> Xông hơi
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ... bạn copy đoạn trên để thêm các nhóm khác ... */}
                </div>
            </div>
        </div>
    );
}
