import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Select, InputNumber, App, Empty, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { tourAPI, tourDepartureAPI, getUser } from "../../../services/api";
import icon_person from "../../../assets/icons/icon_person.png"
import icon_currency from "../../../assets/icons/icon_currency.png"
import icon_schedule from "../../../assets/icons/icon_schedule.png"

interface Departure {
    id: number;
    date: Date;
    price: number;
    capacity: number;
}

interface TourSchedule {
    tourId: number;
    tourTitle: string;
    departures: Departure[];
}

interface TourScheduleGroup {
    id: number;
    tourId: number;
    tourTitle: string;
    departureCount: number;
    departures: Departure[];
}

interface Tour {
    id: number;
    name: string;
    createdBy?: number;
}

const TourScheduleManager = () => {
    const { modal, notification } = App.useApp();

    const [tours, setTours] = useState<Tour[]>([]);
    const [schedules, setSchedules] = useState<TourSchedule[]>([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<{ tourId: number; tourTitle: string } | null>(null);
    const [form] = Form.useForm();
    const [departures, setDepartures] = useState<Departure[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const currentUser = await getUser();
            setUser(currentUser);

            const userId = currentUser?.role === 'TOUR_MANAGER' ? currentUser.id : undefined;
            const toursRes = await tourAPI.getAll(userId);
            setTours(toursRes.data);

            const allSchedules: TourSchedule[] = [];
            for (const tour of toursRes.data) {
                const departuresRes = await tourDepartureAPI.getByTourId(tour.id);
                if (departuresRes.data.length > 0) {
                    allSchedules.push({
                        tourId: tour.id,
                        tourTitle: tour.name,
                        departures: departuresRes.data.map((dep: any) => ({
                            id: dep.id,
                            date: new Date(dep.departure),
                            price: dep.price,
                            capacity: dep.capacity,
                        })),
                    });
                }
            }
            setSchedules(allSchedules);
        } catch (error: any) {
            notification.error({
                message: 'Lỗi tải dữ liệu',
                description: error.response?.data?.message || 'Không thể tải danh sách lịch khởi hành',
                placement: 'topRight',
            });
        } finally {
            setLoading(false);
        }
    };

    const getGroupedSchedules = (): TourScheduleGroup[] => {
        return schedules.map((schedule, index) => ({
            id: index + 1,
            tourId: schedule.tourId,
            tourTitle: schedule.tourTitle,
            departureCount: schedule.departures.length,
            departures: schedule.departures,
        }));
    };

    const handleAdd = () => {
        setEditingSchedule(null);
        form.resetFields();
        setDepartures([]);
        setSelectedDate(undefined);
        setShowDatePicker(false);
        setIsModalOpen(true);
    };

    const handleEdit = (record: TourScheduleGroup) => {
        const tour = tours.find(t => t.id === record.tourId);
        if (user?.role === 'TOUR_MANAGER' && tour?.createdBy !== user.id) {
            notification.error({
                message: 'Không có quyền',
                description: 'Bạn chỉ có thể chỉnh sửa lịch khởi hành của tour do mình tạo ra!',
                placement: 'topRight',
            });
            return;
        }

        setEditingSchedule({ tourId: record.tourId, tourTitle: record.tourTitle });
        form.setFieldsValue({
            tourId: record.tourId,
        });
        setDepartures(record.departures);
        setSelectedDate(undefined);
        setShowDatePicker(false);
        setIsModalOpen(true);
    };

    const handleDelete = async (record: TourScheduleGroup) => {
        const tour = tours.find(t => t.id === record.tourId);
        if (user?.role === 'TOUR_MANAGER' && tour?.createdBy !== user.id) {
            notification.error({
                message: 'Không có quyền',
                description: 'Bạn chỉ có thể xóa lịch khởi hành của tour do mình tạo ra!',
                placement: 'topRight',
            });
            return;
        }

        modal.confirm({
            title: "Xác nhận xóa",
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa tất cả ${record.departureCount} lịch khởi hành của tour "${record.tourTitle}"?`,
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            async onOk() {
                try {
                    await Promise.all(
                        record.departures.map(dep => tourDepartureAPI.delete(dep.id))
                    );
                    notification.success({
                        message: "Xóa thành công",
                        description: `Đã xóa tất cả lịch khởi hành của tour "${record.tourTitle}".`,
                        placement: "topRight",
                    });
                    fetchData();
                } catch (error: any) {
                    notification.error({
                        message: 'Xóa thất bại',
                        description: error.response?.data?.message || 'Không thể xóa lịch khởi hành',
                        placement: 'topRight',
                    });
                }
            },
        });
    };

    const handleAddDeparture = () => {
        if (!selectedDate) {
            notification.error({
                message: "Lỗi",
                description: "Vui lòng chọn ngày khởi hành!",
                placement: "topRight",
            });
            return;
        }

        const values = form.getFieldsValue(["price", "capacity"]);

        if (!values.price || !values.capacity) {
            notification.error({
                message: "Lỗi",
                description: "Vui lòng nhập đầy đủ giá và sức chứa!",
                placement: "topRight",
            });
            return;
        }

        const maxId = Math.max(...departures.map((d) => d.id), 0);
        const newDeparture: Departure = {
            id: maxId + 1,
            date: selectedDate,
            price: values.price,
            capacity: values.capacity,
        };

        setDepartures([...departures, newDeparture]);
        setSelectedDate(undefined);
        form.setFieldsValue({ price: undefined, capacity: undefined });
        setShowDatePicker(false);

        notification.success({
            message: "Đã thêm",
            description: "Đã thêm lịch khởi hành vào danh sách.",
            placement: "topRight",
        });
    };

    const handleRemoveDeparture = (departureId: number) => {
        setDepartures(departures.filter((d) => d.id !== departureId));
        notification.info({
            message: "Đã xóa",
            description: "Đã xóa lịch khởi hành khỏi danh sách.",
            placement: "topRight",
        });
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields(["tourId"]);

            if (departures.length === 0) {
                notification.error({
                    message: "Lỗi",
                    description: "Vui lòng thêm ít nhất 1 lịch khởi hành!",
                    placement: "topRight",
                });
                return;
            }

            if (editingSchedule) {
                const oldDepartures = schedules.find(s => s.tourId === editingSchedule.tourId)?.departures || [];
                await Promise.all(
                    oldDepartures.map(dep => tourDepartureAPI.delete(dep.id))
                );

                await Promise.all(
                    departures.map(dep =>
                        tourDepartureAPI.create({
                            tourId: editingSchedule.tourId,
                            departure: dep.date.toISOString(),
                            price: dep.price,
                            capacity: dep.capacity,
                            availableSeats: dep.capacity,
                        })
                    )
                );

                notification.success({
                    message: "Cập nhật thành công",
                    description: `Đã cập nhật ${departures.length} lịch khởi hành cho tour "${editingSchedule.tourTitle}".`,
                    placement: "topRight",
                });
            } else {
                const selectedTour = tours.find((tour) => tour.id === values.tourId);
                const existingSchedule = schedules.find((s) => s.tourId === values.tourId);

                if (existingSchedule) {
                    notification.error({
                        message: "Lỗi",
                        description: `Tour "${selectedTour?.name}" đã có lịch khởi hành. Vui lòng sử dụng chức năng Edit.`,
                        placement: "topRight",
                    });
                    return;
                }

                await Promise.all(
                    departures.map(dep =>
                        tourDepartureAPI.create({
                            tourId: values.tourId,
                            departure: dep.date.toISOString(),
                            price: dep.price,
                            capacity: dep.capacity,
                            availableSeats: dep.capacity,
                        })
                    )
                );

                notification.success({
                    message: "Thêm thành công",
                    description: `Đã thêm ${departures.length} lịch khởi hành cho tour "${selectedTour?.name}".`,
                    placement: "topRight",
                });
            }

            setIsModalOpen(false);
            form.resetFields();
            setDepartures([]);
            setEditingSchedule(null);
            setSelectedDate(undefined);
            setShowDatePicker(false);
            fetchData();
        } catch (error: any) {
            notification.error({
                message: editingSchedule ? 'Cập nhật thất bại' : 'Thêm thất bại',
                description: error.response?.data?.message || 'Có lỗi xảy ra',
                placement: 'topRight',
            });
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setDepartures([]);
        setEditingSchedule(null);
        setSelectedDate(undefined);
        setShowDatePicker(false);
    };

    const columns: ColumnsType<TourScheduleGroup> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 100,
        },
        {
            title: "Tour Title",
            dataIndex: "tourTitle",
            key: "tourTitle",
        },
        {
            title: "Departure Count",
            dataIndex: "departureCount",
            key: "departureCount",
            width: 180,
            render: (count: number) => <span className="font-semibold text-blue-600">{count} lịch khởi hành</span>,
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            fixed: "right",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)}>
                        Remove
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tour Schedule Management</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
                    Add Schedule
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={getGroupedSchedules()}
                rowKey="id"
                loading={loading}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
            />

            <Modal
                title={editingSchedule ? `Edit Schedule - ${editingSchedule.tourTitle}` : "Add Tour Schedule"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={editingSchedule ? "Update" : "Add"}
                cancelText="Cancel"
                width={800}
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <Form.Item name="tourId" label="Select Tour" rules={[{ required: true, message: "Vui lòng chọn tour!" }]}>
                        <Select
                            showSearch
                            placeholder="Tìm kiếm và chọn tour"
                            optionFilterProp="children"
                            disabled={!!editingSchedule}
                            loading={loading}
                            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                            options={tours && tours.map((tour) => ({
                                value: tour.id,
                                label: tour.name,
                            }))}
                        />
                    </Form.Item>

                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Danh sách lịch khởi hành</h3>
                            <Button type="dashed" onClick={() => setShowDatePicker(!showDatePicker)}>
                                {showDatePicker ? "Ẩn" : "Add Departure"}
                            </Button>
                        </div>

                        {showDatePicker && (
                            <div className="mb-4 p-4 border rounded bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 font-medium">Chọn ngày khởi hành:</label>
                                        <DayPicker
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            disabled={{ before: new Date() }}
                                            className="border rounded p-2 bg-white"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Form.Item name="price" label="Giá (VNĐ)" className="mb-2">
                                            <InputNumber
                                                placeholder="Nhập giá"
                                                className="w-full"
                                                min={0}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            />
                                        </Form.Item>
                                        <Form.Item name="capacity" label="Sức chứa" className="mb-2">
                                            <InputNumber placeholder="Nhập số chỗ" className="w-full" min={1} />
                                        </Form.Item>
                                        <Button type="primary" onClick={handleAddDeparture} block>
                                            Thêm vào danh sách
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {departures.length > 0 ? (
                            <div className="space-y-2 mt-4">
                                {departures.map((dep) => (
                                    <div key={dep.id} className="flex items-center justify-between p-3 border rounded bg-white">
                                        <div className="flex-1">
                                            <div className="font-semibold flex gap-3">
                                                <img src={icon_schedule} alt="" width={24}/> 
                                                {dep.date.toLocaleDateString("vi-VN", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </div>
                                            <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                                <div className="flex gap-3"> <img src={icon_currency} alt="" width={24}/> Giá: {dep.price.toLocaleString()} VNĐ</div>
                                                <div className="flex gap-3"> <img src={icon_person} alt="" width={24}/> Sức chứa: {dep.capacity} người</div>
                                            </div>
                                        </div>
                                        <Button danger icon={<DeleteOutlined />} onClick={() => handleRemoveDeparture(dep.id)}>
                                            Xóa
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Empty description="Chưa có lịch khởi hành nào. Click Add Departure để thêm"/>
                        )}
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default TourScheduleManager;



