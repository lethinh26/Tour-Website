import React, { useState, useEffect } from "react";
import { Table, Select, Card, App, Tag, Descriptions, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { tourAPI, tourDepartureAPI } from "../../../services/api";
import axios from "axios";

interface Tour {
    id: number;
    name: string;
}

interface Departure {
    id: number;
    departure: string;
    price: number;
    capacity: number;
    availableSeats: number;
}

interface BookingItem {
    id: number;
    quantity: number;
    departure: {
        id: number;
        departure: string;
        price: number;
        tour: {
            id: number;
            name: string;
        };
    };
}

interface Booking {
    id: number;
    code: string;
    status: string;
    createdAt: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    items: BookingItem[];
    totalAmount: number;
    totalQuantity: number;
}

const BookingManager = () => {
    const { notification } = App.useApp();
    const [tours, setTours] = useState<Tour[]>([]);
    const [departures, setDepartures] = useState<Departure[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
    const [selectedDepartureId, setSelectedDepartureId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingDepartures, setLoadingDepartures] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            setLoading(true);
            const response = await tourAPI.getAll();
            const toursList = Array.isArray(response.data) ? response.data : [];
            setTours(toursList);
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể tải danh sách tour',
                placement: 'topRight',
            });
            setTours([]);
        } finally {
            setLoading(false);
        }
    };

    const handleTourChange = async (tourId: number) => {
        setSelectedTourId(tourId);
        setSelectedDepartureId(null);
        setBookings([]);
        
        try {
            setLoadingDepartures(true);
            const response = await tourDepartureAPI.getByTourId(tourId);
            const departuresList = Array.isArray(response.data) ? response.data : [];
            setDepartures(departuresList);
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể tải danh sách lịch khởi hành',
                placement: 'topRight',
            });
            setDepartures([]);
        } finally {
            setLoadingDepartures(false);
        }
    };

    const handleDepartureChange = async (departureId: number) => {
        setSelectedDepartureId(departureId);
        
        try {
            setLoadingBookings(true);
            const response = await axios.get(`http://160.191.236.178:3000/api/orders/departure/${departureId}`);
            
            // Transform data to match Booking interface
            const ordersData = Array.isArray(response.data) ? response.data : [];
            const transformedBookings: Booking[] = ordersData.map((order: any) => ({
                id: order.id,
                code: order.code,
                status: order.status,
                createdAt: order.createdAt,
                user: {
                    id: order.user.id,
                    name: order.user.name,
                    email: order.user.email,
                    phone: order.user.phone,
                },
                items: order.items || [],
                totalAmount: order.items?.reduce((sum: number, item: any) => 
                    sum + (item.departure.price * item.quantity), 0) || 0,
                totalQuantity: order.items?.reduce((sum: number, item: any) => 
                    sum + item.quantity, 0) || 0,
            }));
            
            setBookings(transformedBookings);
        } catch (error: any) {
            notification.error({
                message: 'Lỗi',
                description: error.response?.data?.message || 'Không thể tải danh sách đặt chỗ',
                placement: 'topRight',
            });
            setBookings([]);
        } finally {
            setLoadingBookings(false);
        }
    };

    const formatVND = (amount: number) => {
        return amount.toLocaleString('vi-VN') + ' VNĐ';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'green';
            case 'PENDING':
                return 'orange';
            case 'CANCELLED':
                return 'red';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'Đã thanh toán';
            case 'PENDING':
                return 'Chờ thanh toán';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const columns: ColumnsType<Booking> = [
        {
            title: "Mã đặt chỗ",
            dataIndex: "code",
            key: "code",
            width: 150,
            render: (code: string) => <span className="font-semibold text-blue-600">{code}</span>,
        },
        {
            title: "Người đặt",
            key: "user",
            width: 200,
            render: (_, record) => (
                <div>
                    <div className="font-medium">{record.user.name}</div>
                    <div className="text-xs text-gray-500">{record.user.email}</div>
                </div>
            ),
        },
        {
            title: "Ngày đặt",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 150,
            render: (date: string) => formatDate(date),
        },
        {
            title: "Số lượng",
            dataIndex: "totalQuantity",
            key: "totalQuantity",
            width: 100,
            align: "center",
            render: (quantity: number) => <span className="font-semibold">{quantity} người</span>,
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            width: 150,
            render: (amount: number) => (
                <span className="font-semibold text-green-600">{formatVND(amount)}</span>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 130,
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
            ),
        },
    ];

    const selectedTour = tours.find(t => t.id === selectedTourId);
    const selectedDeparture = departures.find(d => d.id === selectedDepartureId);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking Manager</h1>

            <Card className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Chọn Tour</label>
                        <Select
                            showSearch
                            placeholder="Tìm kiếm và chọn tour"
                            optionFilterProp="children"
                            className="w-full"
                            size="large"
                            loading={loading}
                            value={selectedTourId}
                            onChange={handleTourChange}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={tours.map((tour) => ({
                                value: tour.id,
                                label: tour.name,
                            }))}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Chọn lịch khởi hành</label>
                        <Select
                            placeholder="Chọn lịch khởi hành"
                            className="w-full"
                            size="large"
                            loading={loadingDepartures}
                            disabled={!selectedTourId}
                            value={selectedDepartureId}
                            onChange={handleDepartureChange}
                            options={departures.map((dep) => ({
                                value: dep.id,
                                label: `${new Date(dep.departure).toLocaleDateString('vi-VN')} - ${formatVND(dep.price)} (${dep.availableSeats}/${dep.capacity} chỗ)`,
                            }))}
                        />
                    </div>
                </div>

                {selectedTour && selectedDeparture && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <Descriptions column={2} size="small">
                            <Descriptions.Item label="Tour" span={2}>
                                <span className="font-semibold">{selectedTour.name}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày khởi hành">
                                {new Date(selectedDeparture.departure).toLocaleDateString('vi-VN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </Descriptions.Item>
                            <Descriptions.Item label="Giá">
                                {formatVND(selectedDeparture.price)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Sức chứa">
                                {selectedDeparture.capacity} người
                            </Descriptions.Item>
                            <Descriptions.Item label="Còn trống">
                                <span className={selectedDeparture.availableSeats > 0 ? 'text-green-600' : 'text-red-600'}>
                                    {selectedDeparture.availableSeats} chỗ
                                </span>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Card>

            {selectedDepartureId && (
                <Card 
                    title={
                        <div className="flex justify-between items-center">
                            <span>Danh sách đặt chỗ</span>
                            <Tag color="blue">{bookings.length} đơn đặt</Tag>
                        </div>
                    }
                >
                    <Spin spinning={loadingBookings}>
                        <Table
                            columns={columns}
                            dataSource={bookings}
                            rowKey="id"
                            pagination={{
                                defaultPageSize: 10,
                                showSizeChanger: true,
                                pageSizeOptions: ["5", "10", "20", "50"],
                                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đơn đặt`,
                            }}
                            locale={{
                                emptyText: "Chưa có đơn đặt chỗ nào cho lịch khởi hành này"
                            }}
                        />
                    </Spin>
                </Card>
            )}
        </div>
    );
};

const BookingManagerWrapper = () => {
    return (
        <App>
            <BookingManager />
        </App>
    );
};

export default BookingManagerWrapper;
