
import { Card, Form, Input, Space } from "antd";

interface ContactInfoProps {
    user?: any;
}

const ContactInfo = ({ user }: ContactInfoProps) => {
    const titleJSX = (
        <div className="flex justify-between">
            <h3 className="text-lg font-bold">{user?.name || 'Khách hàng'}</h3>
        </div>
    );

    return (
        <Space direction="vertical" size={"small"} className="w-full">
            <h3 className="text-2xl font-bold pb-4">Thông tin liên hệ</h3>
            <Card title={titleJSX} className="mb-4 shadow-md w-full">
                <Form layout="vertical" className="flex justify-between px-6!">
                    <Form.Item label={<h3 className="text-[#687176]! font-semibold">Số điện thoại</h3>}>
                        <Input placeholder="Nhập số điện thoại" className="rounded-md font-bold" disabled value={user?.phoneNumber || 'Chưa cập nhật'} />
                    </Form.Item>
                    <Form.Item label={<h3 className="text-[#687176]! font-semibold">Email</h3>}>
                        <Input placeholder="Nhập email" className="rounded-md font-bold" disabled value={user?.email || ''} />
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
};

export default ContactInfo;
