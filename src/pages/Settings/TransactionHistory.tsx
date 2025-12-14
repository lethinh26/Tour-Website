import { useState, useEffect } from "react";
import { Table, Tag, Button, Space, Modal, Descriptions } from "antd";
import { EyeOutlined, LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router";

interface Payment {
    id: string;
    amount: string;
    status: string;
    method: string;
    description?: string;
    createdAt: string;
    orderId: number;
    userId: number;
    order: {
        id: number;
        status: string;
        totalAmount: string;
        createdAt: string;
        items: Array<{
            id: number;
            quantity: number;
            unitPrice: string;
            departure: {
                departureDate: string;
                tour: {
                    name: string;
                    location: {
                        name: string;
                    };
                };
            };
        }>;
    };
}

const TransactionHistory = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const userRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/getUser`, { token });
            const userId = userRes.data.id;

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments`);

            // Filter by userId and ensure order items exist
            const userPayments = Array.isArray(response.data)
                ? response.data.filter(
                      (payment: Payment) => payment.userId === userId && payment.order?.items?.length > 0 && payment.orderId !== undefined
                  )
                : [];

            setPayments(userPayments);
        } catch (error) {
            console.error("Error fetching payments:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusTag = (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
            PENDING: { color: "gold", text: "Chờ thanh toán" },
            SUCCESS: { color: "green", text: "Thành công" },
            FAILED: { color: "red", text: "Thất bại" },
            CANCELLED: { color: "default", text: "Đã hủy" },
        };
        return <Tag color={statusMap[status]?.color || "default"}>{statusMap[status]?.text || status}</Tag>;
    };

    const getMethodTag = (method: string) => {
        const methodMap: Record<string, { color: string; text: string }> = {
            CASH: { color: "orange", text: "Tiền mặt" },
            BANK_TRANSFER: { color: "blue", text: "Chuyển khoản" },
            CREDIT_CARD: { color: "purple", text: "Thẻ tín dụng" },
        };
        return <Tag color={methodMap[method]?.color || "default"}>{methodMap[method]?.text || method}</Tag>;
    };

    const columns = [
        {
            title: "Mã giao dịch",
            dataIndex: "id",
            key: "id",
            render: (id: string) => <span className="font-mono text-xs">{id.substring(0, 8)}...</span>,
        },
        {
            title: "Tour/Dịch vụ",
            key: "tour",
            render: (_: unknown, record: Payment) => (
                <div>
                    {record.order?.items?.[0]?.departure?.tour ? (
                        <>
                            <div className="font-semibold">{record.order.items[0].departure.tour.name}</div>
                            <div className="text-sm text-gray-500">{record.order.items[0].departure.tour.location?.name || "N/A"}</div>
                        </>
                    ) : (
                        <span className="text-gray-400">Không có thông tin</span>
                    )}
                </div>
            ),
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            render: (amount: string) => <span className="font-semibold">{Number(amount).toLocaleString("vi-VN")} VNĐ</span>,
        },
        {
            title: "Phương thức",
            dataIndex: "method",
            key: "method",
            render: (method: string) => getMethodTag(method),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => getStatusTag(status),
        },
        {
            title: "Ngày giao dịch",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => new Date(date).toLocaleString("vi-VN"),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_: unknown, record: Payment) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedPayment(record);
                            setDetailVisible(true);
                        }}
                    >
                        Chi tiết
                    </Button>
                    {record.status === "PENDING" && (
                        <Button
                            type="default"
                            onClick={() => navigate(`/payment/${record.id}`)}
                        >
                            Thanh toán
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm py-4 px-6 mb-6">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <Button icon={<LeftOutlined />} onClick={() => navigate("/settings")} type="text" style={{marginTop: 30}}>
                        Quay lại
                    </Button>
                    <h1 className="text-2xl font-bold">Danh sách giao dịch</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <Table
                        columns={columns}
                        dataSource={payments}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Tổng ${total} giao dịch`,
                        }}
                    />
                </div>
            </div>

            <Modal
                title="Chi tiết giao dịch"
                open={detailVisible}
                onCancel={() => setDetailVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={700}
            >
                {selectedPayment && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Mã giao dịch">
                            <span className="font-mono">{selectedPayment.id}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mã đơn hàng">#{selectedPayment.orderId}</Descriptions.Item>
                        {selectedPayment.order?.items?.[0]?.departure?.tour && (
                            <>
                                <Descriptions.Item label="Tour">{selectedPayment.order.items[0].departure.tour.name}</Descriptions.Item>
                                <Descriptions.Item label="Địa điểm">
                                    {selectedPayment.order.items[0].departure.tour.location?.name || "N/A"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày khởi hành">
                                    {new Date(selectedPayment.order.items[0].departure.departureDate).toLocaleDateString("vi-VN")}
                                </Descriptions.Item>
                                <Descriptions.Item label="Số lượng">{selectedPayment.order.items[0].quantity} người</Descriptions.Item>
                            </>
                        )}
                        <Descriptions.Item label="Số tiền">
                            <span className="text-lg font-semibold text-red-600">{Number(selectedPayment.amount).toLocaleString("vi-VN")} VNĐ</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán">{getMethodTag(selectedPayment.method)}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">{getStatusTag(selectedPayment.status)}</Descriptions.Item>
                        {selectedPayment.description && (
                            <Descriptions.Item label="Nội dung chuyển khoản">
                                <span className="font-mono text-sm">{selectedPayment.description}</span>
                            </Descriptions.Item>
                        )}
                        <Descriptions.Item label="Ngày giao dịch">{new Date(selectedPayment.createdAt).toLocaleString("vi-VN")}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default TransactionHistory;
