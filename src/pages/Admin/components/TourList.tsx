import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select, Steps, App } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Editor } from "@tinymce/tinymce-react";

interface Tour {
  id: number;
  name: string;
  basePrice: number;
  discount: number;
  location: string;
  category: string;
  description: string;
  information: string;
}

const TourList = () => {
  const { modal, notification } = App.useApp();
  const [tours, setTours] = useState<Tour[]>([
    { 
      id: 1, 
      name: "Du lịch Hà Nội", 
      basePrice: 5000000, 
      discount: 10, 
      location: "Hà Nội", 
      category: "Tour trong nước",
      description: "<p>Khám phá thủ đô Hà Nội</p>",
      information: "<p>Thông tin chi tiết tour</p>"
    },
    { 
      id: 2, 
      name: "Du lịch Đà Nẵng", 
      basePrice: 7000000, 
      discount: 15, 
      location: "Đà Nẵng", 
      category: "Tour trong nước",
      description: "<p>Khám phá thành phố biển</p>",
      information: "<p>Thông tin chi tiết tour</p>"
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const steps = [
    { title: "Thông tin cơ bản" },
    { title: "Giới thiệu & Thông tin" },
  ];

  const handleAdd = () => {
    setEditingTour(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Tour) => {
    setEditingTour(record);
    setCurrentStep(0);
    form.setFieldsValue({
      name: record.name,
      basePrice: record.basePrice,
      discount: record.discount,
      location: record.location,
      category: record.category,
      description: record.description,
      information: record.information,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (record: Tour) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa tour "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setTours((prevTours) => prevTours.filter((tour) => tour.id !== record.id));
        notification.success({
          message: 'Xóa thành công',
          description: `Tour "${record.name}" đã được xóa khỏi hệ thống.`,
          placement: 'topRight',
        });
      },
    });
  };

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(['name', 'basePrice', 'discount', 'location', 'category']);
        setCurrentStep(1);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(0);
  };

  const handleFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      if (editingTour) {
        setTours((prevTours) =>
          prevTours.map((tour) =>
            tour.id === editingTour.id 
              ? { 
                  ...tour, 
                  name: values.name,
                  basePrice: Number(values.basePrice),
                  discount: Number(values.discount),
                  location: values.location,
                  category: values.category,
                  description: values.description,
                  information: values.information,
                } 
              : tour
          )
        );
        notification.success({
          message: 'Cập nhật thành công',
          description: `Tour "${values.name}" đã được cập nhật.`,
          placement: 'topRight',
        });
      } else {
        const newTour: Tour = {
          id: Math.max(...tours.map((t) => t.id), 0) + 1,
          name: values.name,
          basePrice: Number(values.basePrice),
          discount: Number(values.discount),
          location: values.location,
          category: values.category,
          description: values.description,
          information: values.information,
        };
        setTours((prevTours) => [...prevTours, newTour]);
        notification.success({
          message: 'Thêm thành công',
          description: `Tour "${values.name}" đã được thêm vào hệ thống.`,
          placement: 'topRight',
        });
      }
      setIsModalOpen(false);
      setCurrentStep(0);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentStep(0);
    form.resetFields();
  };

  const columns: ColumnsType<Tour> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
    },
    {
      title: "Base Price",
      dataIndex: "basePrice",
      key: "basePrice",
      width: 150,
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      width: 120,
      render: (discount) => `${discount}%`,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tour Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
        >
          Add Tour
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tours}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <Modal
        title={editingTour ? "Edit Tour" : "Add Tour"}
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <div className="pt-4">
          <Steps current={currentStep} items={steps} className="mb-6" />
          
          <Form form={form} layout="vertical">
            {/* Step 1: Thông tin cơ bản */}
            <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
              <Form.Item
                name="name"
                label="Tên Tour"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tour!" },
                  { max: 200, message: "Tên tour không được dài quá 200 ký tự!" },
                ]}
              >
                <Input placeholder="Nhập tên tour" />
              </Form.Item>

              <div className="flex gap-4">
                <Form.Item
                  name="basePrice"
                  label="Giá gốc"
                  className="flex-1"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá gốc!" },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập giá gốc"
                    className="w-full"
                    min={0}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    addonAfter="VNĐ"
                  />
                </Form.Item>

                <Form.Item
                  name="discount"
                  label="Giảm giá (%)"
                  className="flex-1"
                  rules={[
                    { required: true, message: "Vui lòng nhập giảm giá!" },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập % giảm giá"
                    className="w-full"
                    min={0}
                    max={100}
                    addonAfter="%"
                  />
                </Form.Item>
              </div>

              <div className="flex gap-4">
                <Form.Item
                  name="location"
                  label="Địa điểm"
                  className="flex-1"
                  rules={[
                    { required: true, message: "Vui lòng chọn địa điểm!" },
                  ]}
                >
                  <Select placeholder="Chọn địa điểm">
                    <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                    <Select.Option value="Hồ Chí Minh">Hồ Chí Minh</Select.Option>
                    <Select.Option value="Đà Nẵng">Đà Nẵng</Select.Option>
                    <Select.Option value="Nha Trang">Nha Trang</Select.Option>
                    <Select.Option value="Phú Quốc">Phú Quốc</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Danh mục"
                  className="flex-1"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục!" },
                  ]}
                >
                  <Select placeholder="Chọn danh mục">
                    <Select.Option value="Tour trong nước">Tour trong nước</Select.Option>
                    <Select.Option value="Tour nước ngoài">Tour nước ngoài</Select.Option>
                    <Select.Option value="Tour biển">Tour biển</Select.Option>
                    <Select.Option value="Tour núi">Tour núi</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            {/* Step 2: Giới thiệu & Thông tin */}
            <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
              <Form.Item
                name="description"
                label="Giới thiệu chuyến đi"
                rules={[
                  { required: true, message: "Vui lòng nhập giới thiệu!" },
                ]}
              >
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  value={form.getFieldValue('description')}
                  onEditorChange={(content) => {
                    form.setFieldValue('description', content);
                  }}
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

              <Form.Item
                name="information"
                label="Thông tin chuyến đi"
                rules={[
                  { required: true, message: "Vui lòng nhập thông tin!" },
                ]}
              >
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  value={form.getFieldValue('information')}
                  onEditorChange={(content) => {
                    form.setFieldValue('information', content);
                  }}
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
          </Form>

          <div className="flex justify-between mt-6 pt-4 border-t">
            {currentStep > 0 && (
              <Button onClick={handlePrev}>
                Quay lại
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext} className="ml-auto">
                Tiếp theo
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleFinish} className="ml-auto">
                {editingTour ? "Cập nhật" : "Thêm mới"}
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TourList;
