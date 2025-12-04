import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface Location {
  id: number;
  name: string;
}

const LocationManager = () => {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Hồ Chí Minh" },
    { id: 3, name: "Đà Nẵng" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingLocation(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Location) => {
    setEditingLocation(record);
    form.setFieldsValue({ name: record.name });
    setIsModalOpen(true);
  };

  const handleDelete = (record: Location) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa địa điểm "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setLocations((prevLocations) => prevLocations.filter((loc) => loc.id !== record.id));
        notification.success({
          message: 'Xóa thành công',
          description: `Địa điểm "${record.name}" đã được xóa khỏi hệ thống.`,
          placement: 'topRight',
        });
      },
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingLocation) {
        setLocations(
          locations.map((loc) =>
            loc.id === editingLocation.id ? { ...loc, name: values.name } : loc
          )
        );
        notification.success({
          message: 'Cập nhật thành công',
          description: `Địa điểm "${values.name}" đã được cập nhật.`,
          placement: 'topRight',
        });
      } else {
        const newLocation: Location = {
          id: Math.max(...locations.map((l) => l.id), 0) + 1,
          name: values.name,
        };
        setLocations([...locations, newLocation]);
        notification.success({
          message: 'Thêm thành công',
          description: `Địa điểm "${values.name}" đã được thêm vào hệ thống.`,
          placement: 'topRight',
        });
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns: ColumnsType<Location> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
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
        <h1 className="text-2xl font-bold text-gray-800">Location Manager</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
        >
          Add Location
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={locations}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <Modal
        title={editingLocation ? "Edit Location" : "Add Location"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingLocation ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Vui lòng nhập tên địa điểm!" },
              { max: 50, message: "Tên địa điểm không được dài quá 50 ký tự!" },
            ]}
          >
            <Input placeholder="Nhập tên địa điểm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LocationManager;
