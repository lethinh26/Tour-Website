import { useState } from "react";
import { Collapse, Button, Radio } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { StoreType } from "../../../../stores";

const { Panel } = Collapse;

export default function FilterTour({setIdCategory} : {setIdCategory: (id : number) => void}) {
    
    const [collapsed, setCollapsed] = useState(false);
    const { categories } = useSelector((state: StoreType) => state.tourReducer);
    const options = categories.map(cat => cat.name);

    const panels = [
        {
            key: "tour",
            label: <span className="font-medium">Tour</span>,
            color: "green",
            options: options,
        },
    ];

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base flex items-center gap-2">
                    <FilterOutlined /> Tour & Hoạt động
                </h3>
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
                            <Radio.Group className="flex flex-col gap-2 pl-2"
                            onChange={(e) => {setIdCategory(categories.find(cat => cat.name === e.target.value)!.id || 0)}}>
                                {panel.options.map(opt => (
                                    <Radio key={opt} value={opt} className={`accent-${panel.color}-500`}>{opt} </Radio>
                                ))}
                            </Radio.Group>
                        </Panel>
                    ))}
                </Collapse>
            )}
        </div>
    );
}
