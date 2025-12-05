import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, App, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { categoryAPI } from "../../../services/api";

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt?: string;
}

const CategoryManager = () => {
  const { modal, notification } = App.useApp();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách danh mục',
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }
  };

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
      async onOk() {
        try {
          await categoryAPI.delete(record.id);
          notification.success({
            message: 'Xóa thành công',
            description: `Danh mục "${record.name}" đã được xóa khỏi hệ thống.`,
            placement: 'topRight',
          });
          fetchCategories();
        } catch (error: any) {
          notification.error({
            message: 'Xóa thất bại',
            description: error.response?.data?.message || 'Có lỗi xảy ra khi xóa danh mục',
            placement: 'topRight',
          });
        }
      },
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingCategory) {
        await categoryAPI.update(editingCategory.id, values);
        notification.success({
          message: 'Cập nhật thành công',
          description: `Danh mục "${values.name}" đã được cập nhật.`,
          placement: 'topRight',
        });
      } else {
        await categoryAPI.create(values);
        notification.success({
          message: 'Thêm thành công',
          description: `Danh mục "${values.name}" đã được thêm vào hệ thống.`,
          placement: 'topRight',
        });
      }
      
      setIsModalOpen(false);
      form.resetFields();
      fetchCategories();
    } catch (error: any) {
      notification.error({
        message: editingCategory ? 'Cập nhật thất bại' : 'Thêm thất bại',
        description: error.response?.data?.message || 'Có lỗi xảy ra',
        placement: 'topRight',
      });
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

      <Spin spinning={loading}>
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
      </Spin>

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
