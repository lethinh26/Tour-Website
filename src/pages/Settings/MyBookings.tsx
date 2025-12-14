import { useState, useEffect } from "react";
import { Table, Tag, Button, Space, Modal, Descriptions, Rate, Input, message } from "antd";
import { EyeOutlined, LeftOutlined, StarOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router";

interface Booking {
    id: number;
    userId: number;
    totalAmount: string;
    status: string;
    createdAt: string;
    items: Array<{
        id: number;
        quantity: number;
        unitPrice: string;
        departure: {
            id: number;
            departure: string;
            availableSeats: number;
            tour: {
                id: number;
                name: string;
                address: string;
                information: string;
                category: {
                    id: number;
                    name: string;
                };
            };
        };
    }>;
    payments: Array<{
        id: number;
        status: string;
        method: string;
    }>;
}

const MyBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [reviewVisible, setReviewVisible] = useState(false);
    const [currentAddress, setCurrentAddress] = useState("");
    const [currentInfo, setCurrentInfo] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [currentTourId, setCurrentTourId] = useState<number | null>(null);
    const [submittingReview, setSubmittingReview] = useState(false);
    const [existingReview, setExistingReview] = useState<any>(null);
    const [loadingReview, setLoadingReview] = useState(false);
    const [reviewedOrders, setReviewedOrders] = useState<Set<number>>(new Set());
    const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
        fetchReviewedOrders();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const userRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/getUser`, { token });
            const userId = userRes.data.id;

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments/orders/all`);
            const userBookings = Array.isArray(response.data)
                ? response.data.filter((booking: Booking) => booking.userId === userId && booking.status === "PAID")
                : [];
            setBookings(userBookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviewedOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const userRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/getUser`, { token });
            const userId = userRes.data.id;

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/tours/reviews`);
            const userReviews = Array.isArray(response.data)
                ? response.data.filter((review: any) => review.userId === userId)
                : [];
            
            const orderIds = new Set(userReviews.map((review: any) => review.orderId));
            setReviewedOrders(orderIds);
        } catch (error) {
            console.error("Error fetching reviewed orders:", error);
        }
    };

    const getStatusTag = (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
            PENDING: { color: "gold", text: "Chờ thanh toán" },
            PAID: { color: "green", text: "Đã thanh toán" },
            CANCELLED: { color: "red", text: "Đã hủy" },
        };
        return <Tag color={statusMap[status]?.color || "default"}>{statusMap[status]?.text || status}</Tag>;
    };

    const handleSubmitReview = async () => {
        if (!rating) {
            message.error("Vui lòng chọn số sao đánh giá");
            return;
        }

        if (!currentTourId || !currentOrderId) {
            message.error("Không tìm thấy thông tin tour hoặc đơn hàng");
            return;
        }

        setSubmittingReview(true);
        try {
            const token = localStorage.getItem("token");
            const userRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/getUser`, { token });
            const userId = userRes.data.id;

            await axios.post(`${import.meta.env.VITE_API_URL}/tours/reviews`, {
                tourId: currentTourId,
                userId: userId,
                orderId: currentOrderId,
                rating: rating,
                comment: comment || null
            });

            message.success("Đánh giá của bạn đã được gửi thành công!");
            setReviewVisible(false);
            setRating(0);
            setComment("");
            if (currentOrderId) {
                setReviewedOrders(prev => new Set([...prev, currentOrderId]));
            }
            setCurrentTourId(null);
            setCurrentOrderId(null);
            setExistingReview(null);
        } catch (error) {
            console.error("Error submitting review:", error);
            message.error("Không thể gửi đánh giá. Vui lòng thử lại!");
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleOpenReviewModal = async (tourId: number, orderId: number) => {
        setLoadingReview(true);
        try {
            const token = localStorage.getItem("token");
            const userRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/getUser`, { token });
            const userId = userRes.data.id;

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/tours/reviews/order/${orderId}/user/${userId}`
            );

            if (response.data.hasReviewed) {
                setExistingReview(response.data.review);
                setRating(response.data.review.rating);
                setComment(response.data.review.comment || "");
            } else {
                setExistingReview(null);
                setRating(0);
                setComment("");
            }

            setCurrentTourId(tourId);
            setCurrentOrderId(orderId);
            setReviewVisible(true);
        } catch (error) {
            console.error("Error fetching review:", error);
            message.error("Không thể tải thông tin đánh giá");
        } finally {
            setLoadingReview(false);
        }
    };

    const columns = [
        {
            title: "Mã đặt chỗ",
            dataIndex: "id",
            key: "id",
            render: (id: number) => `#${id}`,
        },
        {
            title: "Tour",
            key: "tour",
            render: (_: unknown, record: Booking) => {
                const firstItem = Array.isArray(record.items) && record.items.length > 0 ? record.items[0] : null;
                if (!firstItem) return "N/A";
                return (
                    <div>
                        <div className="font-semibold">{firstItem.departure.tour.name}</div>
                        <div className="text-sm text-gray-500">{firstItem.departure.tour.category?.name || "N/A"}</div>
                    </div>
                );
            },
        },
        {
            title: "Ngày khởi hành",
            key: "departureDate",
            render: (_: unknown, record: Booking) => {
                const firstItem = Array.isArray(record.items) && record.items.length > 0 ? record.items[0] : null;
                return firstItem ? new Date(firstItem.departure.departure).toLocaleDateString("vi-VN") : "N/A";
            },
        },
        {
            title: "Số lượng",
            key: "quantity",
            align: "center" as const,
            render: (_: unknown, record: Booking) => {
                const totalQuantity = Array.isArray(record.items) ? record.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
                return totalQuantity;
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (amount: string) => `${Number(amount).toLocaleString("vi-VN")} VNĐ`,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => getStatusTag(status),
        },
        {
            title: "Ngày đặt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_: unknown, record: Booking) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedBooking(record);
                            setDetailVisible(true);
                        }}
                    >
                        Chi tiết
                    </Button>
                    {(() => {
                        const firstItem = Array.isArray(record.items) && record.items.length > 0 ? record.items[0] : null;
                        const isReviewed = reviewedOrders.has(record.id);
                        return (
                            <Button
                                icon={<StarOutlined />}
                                onClick={() => {
                                    if (firstItem) {
                                        handleOpenReviewModal(firstItem.departure.tour.id, record.id);
                                    }
                                }}
                                type={isReviewed ? "default" : "primary"}
                            >
                                {isReviewed ? "Xem đánh giá" : "Đánh giá"}
                            </Button>
                        );
                    })()}
                </Space>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-4 px-6 mb-6">
                <div className="mx-auto flex items-center gap-4 max-w-7xl">
                    <Button icon={<LeftOutlined />} onClick={() => navigate("/settings")} type="text" style={{marginTop: 30}}>
                        Quay lại
                    </Button>
                    <h1 className="text-2xl font-bold">Đặt chỗ của tôi</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <Table
                        columns={columns}
                        dataSource={bookings}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Tổng ${total} đặt chỗ`,
                        }}
                    />
                </div>
            </div>

            <Modal
                title="Chi tiết đặt chỗ"
                open={detailVisible}
                onCancel={() => setDetailVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={700}
            >
                {selectedBooking &&
                    (() => {
                        const firstItem = Array.isArray(selectedBooking.items) && selectedBooking.items.length > 0 ? selectedBooking.items[0] : null;
                        const totalQuantity = Array.isArray(selectedBooking.items)
                            ? selectedBooking.items.reduce((sum, item) => sum + item.quantity, 0)
                            : 0;
                        return (
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Mã đặt chỗ">#{selectedBooking.id.toString().padStart(6, "0")}</Descriptions.Item>
                                {firstItem && (
                                    <>
                                        <Descriptions.Item label="Tour">{firstItem.departure.tour.name}</Descriptions.Item>
                                        <Descriptions.Item label="Địa điểm">
                                            <div className="flex items-center justify-between">
                                                <span>{firstItem.departure.tour.address}</span>
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    onClick={() => {
                                                        setCurrentAddress(firstItem.departure.tour.address);
                                                        setMapVisible(true);
                                                    }}
                                                >
                                                    Xem bản đồ
                                                </Button>
                                            </div>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Thông tin">
                                            <Button
                                                type="primary"
                                                size="small"
                                                onClick={() => {
                                                    setCurrentInfo(firstItem.departure.tour.information);
                                                    setInfoVisible(true);
                                                }}
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Ngày khởi hành">
                                            {new Date(firstItem.departure.departure).toLocaleDateString("vi-VN")}
                                        </Descriptions.Item>
                                    </>
                                )}
                                <Descriptions.Item label="Số lượng khách">{totalQuantity} người</Descriptions.Item>
                                <Descriptions.Item label="Tổng tiền">
                                    <span className="text-lg font-semibold text-red-600">
                                        {Number(selectedBooking.totalAmount).toLocaleString("vi-VN")} VNĐ
                                    </span>
                                </Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">{getStatusTag(selectedBooking.status)}</Descriptions.Item>
                                <Descriptions.Item label="Ngày đặt">{new Date(selectedBooking.createdAt).toLocaleString("vi-VN")}</Descriptions.Item>
                            </Descriptions>
                        );
                    })()}
            </Modal>

            <Modal
                title="Địa điểm trên bản đồ"
                open={mapVisible}
                onCancel={() => setMapVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setMapVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={800}
            >
                <iframe
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(currentAddress)}&output=embed`}
                ></iframe>
            </Modal>

            <Modal
                title="Thông tin chi tiết Tour"
                open={infoVisible}
                onCancel={() => setInfoVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setInfoVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={900}
            >
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentInfo }} />
            </Modal>

            <Modal
                title={existingReview ? "Đánh giá của bạn" : "Đánh giá Tour"}
                open={reviewVisible}
                onCancel={() => {
                    setReviewVisible(false);
                    setRating(0);
                    setComment("");
                    setCurrentTourId(null);
                    setCurrentOrderId(null);
                    setExistingReview(null);
                }}
                footer={
                    existingReview
                        ? [
                              <Button
                                  key="close"
                                  onClick={() => {
                                      setReviewVisible(false);
                                      setRating(0);
                                      setComment("");
                                      setCurrentTourId(null);
                                      setExistingReview(null);
                                  }}
                              >
                                  Đóng
                              </Button>,
                          ]
                        : [
                              <Button
                                  key="cancel"
                                  onClick={() => {
                                      setReviewVisible(false);
                                      setRating(0);
                                      setComment("");
                                      setCurrentTourId(null);
                                      setExistingReview(null);
                                  }}
                              >
                                  Hủy
                              </Button>,
                              <Button key="submit" type="primary" onClick={handleSubmitReview} loading={submittingReview}>
                                  Gửi đánh giá
                              </Button>,
                          ]
                }
                width={500}
            >
                {loadingReview ? (
                    <div className="text-center py-8">Đang tải...</div>
                ) : (
                    <div className="flex flex-col gap-4 py-4">
                        {existingReview && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                                <p className="text-sm text-blue-700">
                                    Bạn đã đánh giá tour này vào{" "}
                                    {new Date(existingReview.createdAt).toLocaleDateString("vi-VN")}
                                </p>
                            </div>
                        )}
                        <div>
                            <label className="block mb-2 font-semibold">Đánh giá của bạn (1-10 sao):</label>
                            <Rate count={10} value={rating} onChange={setRating} className="text-2xl" disabled={!!existingReview} />
                            <span className="ml-3 text-lg font-semibold text-blue-600">{rating > 0 ? `${rating}/10` : "Chưa chọn"}</span>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Nhận xét (tùy chọn):</label>
                            <Input.TextArea
                                rows={4}
                                placeholder="Chia sẻ trải nghiệm của bạn về tour này..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                maxLength={500}
                                showCount
                                disabled={!!existingReview}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyBookings;
