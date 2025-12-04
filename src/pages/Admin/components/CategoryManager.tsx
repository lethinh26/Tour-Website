import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, App } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface Category {
  id: number;
  name: string;
  description: string;
}

const CategoryManager = () => {
  const { modal, notification } = App.useApp();
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Du lịch biển", description: "Các tour du lịch biển đảo" },
    { id: 2, name: "Du lịch núi", description: "Các tour leo núi, trekking" },
    { id: 3, name: "Du lịch văn hóa", description: "Khám phá văn hóa địa phương" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Category) => {
    setEditingCategory(record);
    form.setFieldsValue({ name: record.name, description: record.description });
    setIsModalOpen(true);
  };

  const handleDelete = (record: Category) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa danh mục "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== record.id));
        notification.success({
          message: 'Xóa thành công',
          description: `Danh mục "${record.name}" đã được xóa khỏi hệ thống.`,
          placement: 'topRight',
        });
      },
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        setCategories(
          categories.map((cat) =>
            cat.id === editingCategory.id
              ? { ...cat, name: values.name, description: values.description }
              : cat
          )
        );
        notification.success({
          message: 'Cập nhật thành công',
          description: `Danh mục "${values.name}" đã được cập nhật.`,
          placement: 'topRight',
        });
      } else {
        const newCategory: Category = {
          id: Math.max(...categories.map((c) => c.id), 0) + 1,
          name: values.name,
          description: values.description,
        };
        setCategories([...categories, newCategory]);
        notification.success({
          message: 'Thêm thành công',
          description: `Danh mục "${values.name}" đã được thêm vào hệ thống.`,
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

  const columns: ColumnsType<Category> = [
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            className="text-blue-500 hover:text-blue-600"
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
        <h1 className="text-2xl font-bold text-gray-800">Category Manager</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
        >
          Add Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        className="bg-white rounded-lg shadow"
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingCategory ? "Update" : "Add"}
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
              { required: true, message: "Vui lòng nhập tên danh mục!" },
              { max: 50, message: "Tên danh mục không được dài quá 50 ký tự!" },
            ]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả!" },
              { max: 100, message: "Mô tả không được dài quá 100 ký tự!" },
            ]}
          >
            <Input.TextArea
              placeholder="Nhập mô tả danh mục"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManager;
