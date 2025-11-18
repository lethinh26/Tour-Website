import React from "react";
import { Card, Form, Input, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";

const titleJSX = (
  <div className="flex justify-between">
    <h3 className="text-lg font-bold">Lê Phú Thịnh</h3>
    <Button type="link" className="text-blue-500 font-bold!" icon={<EditOutlined />}>
        Chỉnh sửa
    </Button>
  </div>
);

const ContactInfo = () => {
    return (
        <Space direction="vertical" size={"small"} className="w-full">
            <h3 className="text-2xl font-bold pb-4">Thông tin liên hệ</h3>
            <Card title={titleJSX} className="mb-4 shadow-md w-full">
                <Form layout="vertical" className="flex justify-between px-6!">
                    <Form.Item label={<h3 className="text-[#687176]! font-semibold">Số điện thoại</h3>}>
                        <Input placeholder="Nhập số điện thoại" className="rounded-md font-bold" disabled value="+84 123 456 789" />
                        {/* <Input placeholder="Nhập số điện thoại" className="rounded-md" /> */}
                    </Form.Item>
                    <Form.Item label={<h3 className="text-[#687176]! font-semibold">Email</h3>}>
                        <Input placeholder="Nhập email" className="rounded-md font-bold" disabled value="bruh@gmail.com" />
                        {/* <Input placeholder="Nhập email" className="rounded-md" /> */}
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
};

export default ContactInfo;
