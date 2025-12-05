import { DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined, RightOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, Input, Select, Steps, Table, App, Modal, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import type { ColumnType } from "antd/es/table";
import { useState, useEffect, useRef } from "react";
import type { Promo } from "../../../types/types";
import { Editor } from "@tinymce/tinymce-react";
import dayjs from "dayjs";
import { promotionAPI } from "../../../services/api";

interface PromotionColumn {
    id: number;
    code: string;
    amount: number;
    startDate: string;
    endDate: string;
    discount?: number;
    name?: string;
    type?: Promo;
    title?: string;
    description?: string;
}

const PromotionManager = () => {
    const { modal, notification } = App.useApp();
    const [promotions, setPromotions] = useState<PromotionColumn[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [editingPromotion, setEditingPromotion] = useState<PromotionColumn | null>(null);
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const descriptionEditorRef = useRef<any>(null);

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            const response = await promotionAPI.getAll();
            const formattedData = response.data.map((promo: any) => ({
                id: promo.id,
                code: promo.code,
                amount: promo.discount,
                discount: promo.amount,
                startDate: promo.startAt,
                endDate: promo.endAt || "",
                type: promo.type,
                title: promo.name,
                description: promo.description
            }));
            setPromotions(formattedData);
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể tải danh sách khuyến mãi',
                placement: 'topRight',
            });
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { title: "Thông tin cơ bản", content: "abc" },
        { title: "Nội dung", content: "def" },
        { title: "Thời gian", content: "ghi" },
    ];

    const handleAdd = () => {
        setEditingPromotion(null);
        form.resetFields();
        setCurrentStep(0);
        setIsModalOpen(true);
    };

    const handleEdit = (record: PromotionColumn) => {
        setEditingPromotion(record);
        form.setFieldsValue({
            code: record.code,
            amount: record.discount,
            discount: record.amount,
            type: record.type || "ALL",
            title: record.title,
            description: record.description,
            startAt: record.startDate ? dayjs(record.startDate) : null,
            endAt: record.endDate ? dayjs(record.endDate) : null,
        });
        setCurrentStep(0);
        setIsModalOpen(true);
    };

    const handleDelete = (record: PromotionColumn) => {
        modal.confirm({
            title: "Xác nhận xóa",
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa khuyến mãi "${record.code}"?`,
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            async onOk() {
                try {
                    await promotionAPI.delete(record.id);
                    notification.success({
                        message: "Xóa thành công",
                        description: `Khuyến mãi "${record.code}" đã được xóa khỏi hệ thống.`,
                        placement: "topRight",
                    });
                    fetchPromotions();
                } catch (error: any) {
                    notification.error({
                        message: "Xóa thất bại",
                        description: error.response?.data?.message || "Có lỗi xảy ra khi xóa khuyến mãi",
                        placement: "topRight",
                    });
                }
            },
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setCurrentStep(0);
        setEditingPromotion(null);
    };

    const handleNext = async () => {
        try {
            if (currentStep === 0) {
                await form.validateFields(["code", "amount", "discount", "type"]);
            } else if (currentStep === 1) {
                await form.validateFields(["title", "description"]);
            } else if (currentStep === 2) {
                await form.validateFields(["startAt"]);
            }

            if (currentStep < 2) {
                setCurrentStep(currentStep + 1);
            } else {
                handleFinish();
            }
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const handleFinish = async () => {
        try {
            // Get content from editor before validation
            if (descriptionEditorRef.current) {
                form.setFieldsValue({ description: descriptionEditorRef.current.getContent() });
            }

            await form.validateFields([
                'code', 'amount', 'discount', 'type',
                'title', 'description',
                'startAt'
            ]);
            
            const values = form.getFieldsValue(true);
            
            const promotionData = {
                code: values.code,
                discount: Number(values.discount),
                amount: Number(values.amount),
                type: values.type,
                name: values.title,
                description: values.description,
                startAt: values.startAt ? values.startAt.format("YYYY-MM-DD") : "",
                endAt: values.endAt ? values.endAt.format("YYYY-MM-DD") : undefined,
            };

            if (editingPromotion) {
                await promotionAPI.update(editingPromotion.id, promotionData);
                notification.success({
                    message: "Cập nhật thành công",
                    description: `Khuyến mãi "${promotionData.code}" đã được cập nhật.`,
                    placement: "topRight",
                });
            } else {
                await promotionAPI.create(promotionData);
                notification.success({
                    message: "Thêm thành công",
                    description: `Khuyến mãi "${promotionData.code}" đã được thêm vào hệ thống.`,
                    placement: "topRight",
                });
            }

            handleCancel();
            fetchPromotions();
        } catch (error: unknown) {
            notification.error({
                message: editingPromotion ? "Cập nhật thất bại" : "Thêm thất bại",
                description: error.response?.data?.message || "Vui lòng kiểm tra lại thông tin đã nhập!",
                placement: "topRight",
            });
        }
    };

    const column: ColumnType<PromotionColumn>[] = [
        { title: "ID", dataIndex: "id", key: "id", width: 80 },
        { title: "Code", dataIndex: "code", key: "code" },
        { title: "Discount (%)", dataIndex: "amount", key: "amount", width: 120 },
        { title: "Amount", dataIndex: "discount", key: "discount", width: 120 },
        { title: "Start Date", dataIndex: "startDate", key: "startDate", width: 120 },
        { title: "End Date", dataIndex: "endDate", key: "endDate", width: 120 },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} className="text-blue-500 hover:text-blue-600">
                        Edit
                    </Button>
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
                        Remove
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Promotion Manager</h1>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAdd}>
                    Add Promotion
                </Button>
            </div>
            <Spin spinning={loading}>
                <Table
                    columns={column}
                    dataSource={promotions}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "50"],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    className="bg-white rounded-lg shadow"
                />
            </Spin>

            <Modal
                title={editingPromotion ? "Edit Promotion" : "Add Promotion"}
                open={isModalOpen}
                onCancel={handleCancel}
                width={600}
                footer={() => {
                    return (
                        <div className="flex justify-between items-center">
                            <Button
                                type="default"
                                size="large"
                                icon={<LeftOutlined />}
                                disabled={currentStep === 0}
                                onClick={() => setCurrentStep(currentStep - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                iconPosition="end"
                                icon={currentStep < 2 ? <RightOutlined /> : undefined}
                                onClick={handleNext}
                            >
                                {currentStep >= 2 ? (editingPromotion ? "Update" : "Add") : "Next"}
                            </Button>
                        </div>
                    );
                }}
            >
                <Divider />
                <Steps current={currentStep} items={steps}></Steps>
                <Form form={form} layout="vertical">
                    <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                        <div className="pt-5 flex justify-between items-start gap-4">
                            <Form.Item
                                label={"Code"}
                                name={"code"}
                                className="flex-1"
                                rules={[
                                    { required: true, message: "Please enter code promotion" },
                                    { max: 20, message: "Code không được dài quá 20 ký tự!" },
                                ]}
                            >
                                <Input placeholder="Enter code promotion..." />
                            </Form.Item>
                            <Form.Item
                                label={"Amount"}
                                name={"amount"}
                                className="flex-1"
                                rules={[
                                    { required: true, message: "Please enter amount" },
                                    { pattern: /^[0-9]+$/, message: "Amount phải là số!" },
                                ]}
                            >
                                <Input placeholder="Enter amount..." type="number" />
                            </Form.Item>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                            <Form.Item
                                label={"Discount"}
                                name={"discount"}
                                className="flex-1"
                                rules={[
                                    { required: true, message: "Please enter discount percent" },
                                    {
                                        validator: (_, value) => {
                                            if (value && (value < 0 || value > 100)) {
                                                return Promise.reject("Discount phải từ 0-100%");
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Input placeholder="Enter discount percent..." type="number" suffix="%" />
                            </Form.Item>
                            <Form.Item
                                label={"Type"}
                                name={"type"}
                                className="flex-1"
                                rules={[{ required: true, message: "Please choose type" }]}
                            >
                                <Select
                                    placeholder="Select type"
                                    options={[
                                        { value: "ALL", label: "Tất cả người dùng" },
                                        { value: "NEW", label: "Người dùng mới" },
                                    ]}
                                ></Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                        <div className="pt-5 flex flex-col">
                            <Form.Item
                                label={"Title"}
                                name={"title"}
                                rules={[
                                    { required: true, message: "Please enter title" },
                                    { max: 100, message: "Title không được dài quá 100 ký tự!" },
                                ]}
                            >
                                <Input placeholder="Enter title promotion..." />
                            </Form.Item>
                            <Form.Item
                                label={"Description"}
                                name={"description"}
                                rules={[{ required: true, message: "Please enter description" }]}
                            >
                                <Editor
                                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                                    onInit={(_evt, editor) => {
                                        descriptionEditorRef.current = editor;
                                    }}
                                    initialValue={form.getFieldValue('description') || ''}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins:
                                            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                        toolbar:
                                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                                    }}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                        <div className="pt-5 flex justify-between gap-4">
                            <Form.Item
                                label={"Start Date"}
                                name={"startAt"}
                                className="flex-1"
                                rules={[{ required: true, message: "Please choose start date" }]}
                            >
                                <DatePicker placeholder="Choose start date..." className="w-full" />
                            </Form.Item>
                            <Form.Item label={"End Date"} name={"endAt"} className="flex-1">
                                <DatePicker placeholder="Choose end date..." className="w-full" />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default PromotionManager;
