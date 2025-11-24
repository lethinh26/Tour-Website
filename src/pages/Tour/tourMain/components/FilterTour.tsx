import { useState } from "react";
import { Collapse, Checkbox, Button } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export default function FilterTour() {
    const [collapsed, setCollapsed] = useState(false);

    const panels = [
        {
            key: "tour",
            label: <span className="font-medium">Tour</span>,
            color: "green",
            options: [
                "Tour ngắm cảnh",
                "Tour theo chủ đề",
                "Tham quan các đảo",
            ],
        },
        {
            key: "kids",
            label: <span className="font-medium">Khu vui chơi cho trẻ em</span>,
            color: "blue",
            options: [
                "Trò chơi Arcade",
                "Sân chơi trẻ em",
                "Trò chơi trốn thoát",
                "Các khu vui chơi khác",
            ],
        },
        {
            key: "spa",
            label: <span className="font-medium">Spa & thư giãn</span>,
            color: "purple",
            options: [
                "Massage",
                "Xông hơi",
            ],
        },
        {
            key: "food",
            label: <span className="font-medium">Ẩm thực</span>,
            color: "orange",
            options: [
                "Nhà hàng",
                "Quán ăn",
                "Ẩm thực đường phố",
            ],
        },
    ];

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-base flex items-center gap-2">
                    <FilterOutlined /> Tour & Hoạt động
                </h2>
                <div className="flex items-center gap-2">
                    <Button
                        type="link"
                        icon={<ReloadOutlined />}
                        size="small"
                        onClick={() => window.location.reload()}
                        className="text-blue-500"
                    >
                        Đặt lại
                    </Button>
                    <Button
                        type="text"
                        shape="circle"
                        size="small"
                        onClick={() => setCollapsed((c) => !c)}
                        aria-label={collapsed ? "Mở bộ lọc" : "Thu gọn bộ lọc"}
                        title={collapsed ? "Mở bộ lọc" : "Thu gọn bộ lọc"}
                    >
                        <span className={`inline-block transform transition-transform duration-200 ${collapsed ? "rotate-180" : "rotate-0"}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block text-gray-500">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </Button>
                </div>
            </div>
            {!collapsed && (
                <Collapse defaultActiveKey={["tour"]} ghost>
                    {panels.map(panel => (
                        <Panel header={panel.label} key={panel.key} className="bg-white">
                            <Checkbox.Group className="flex flex-col gap-2 pl-2">
                                {panel.options.map(opt => (
                                    <Checkbox key={opt} value={opt} className={`accent-${panel.color}-500`}>{opt}</Checkbox>
                                ))}
                            </Checkbox.Group>
                        </Panel>
                    ))}
                </Collapse>
            )}
        </div>
    );
}
