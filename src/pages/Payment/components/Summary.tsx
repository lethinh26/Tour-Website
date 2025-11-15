import React from "react";
import { Button, Collapse, Space } from "antd";

const { Panel } = Collapse;

const Summary = () => {
    return (
        <Space direction="vertical" size="small" className="w-full">
            <h3 className="text-2xl font-bold pb-4">Tóm tắt</h3>
            <Collapse bordered={false} expandIconPosition="end" className="bg-white! shadow-md">
                <Panel
                    header={
                        <div className="flex justify-between items-center pr-3">
                            <h3 className="text-lg font-semibold">Giá bạn trả</h3>
                            <span className="font-bold text-[#ff5e1f] text-lg">809.038 VND</span>
                        </div>
                    }
                    key="1"
                >
                    <Space direction="vertical" size="small" className="w-full">
                        <div className="font-semibold flex justify-between">
                            <span>ADULT (x1):</span>
                            <span>485.423 VND</span>
                        </div>
                        <div className="font-semibold flex justify-between ">
                            <span>CHILD (x1):</span>
                            <span>323.615 VND</span>
                        </div>
                    </Space>
                </Panel>
            </Collapse>
            <div className="flex justify-end">
                <button className="bg-orange-500! text-white rounded-md px-4 py-2 w-1/3 font-bold cursor-pointer">Tiếp tục</button>
            </div>
        </Space>
    );
};

export default Summary;
