import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, notification, App, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { locationAPI } from "../../../services/api";

interface Location {
  id: number;
  name: string;
}

const LocationManager = () => {
  const { modal } = App.useApp();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await locationAPI.getAll();
      const locations = Array.isArray(response.data) ? response.data : [];
      setLocations(locations);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách địa điểm',
        placement: 'topRight',
      });
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

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
    modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa địa điểm "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        try {
          await locationAPI.delete(record.id);
          notification.success({
            message: 'Xóa thành công',
            description: `Địa điểm "${record.name}" đã được xóa khỏi hệ thống.`,
            placement: 'topRight',
          });
          fetchLocations();
        } catch (error: any) {
          notification.error({
            message: 'Xóa thất bại',
            description: error.response?.data?.message || 'Có lỗi xảy ra khi xóa địa điểm',
            placement: 'topRight',
          });
        }
      },
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingLocation) {
        await locationAPI.update(editingLocation.id, values);
        notification.success({
          message: 'Cập nhật thành công',
          description: `Địa điểm "${values.name}" đã được cập nhật.`,
          placement: 'topRight',
        });
      } else {
        await locationAPI.create(values);
        notification.success({
          message: 'Thêm thành công',
          description: `Địa điểm "${values.name}" đã được thêm vào hệ thống.`,
          placement: 'topRight',
        });
      }
      
      setIsModalOpen(false);
      form.resetFields();
      fetchLocations();
    } catch (error: any) {
      notification.error({
        message: editingLocation ? 'Cập nhật thất bại' : 'Thêm thất bại',
        description: error.response?.data?.message || 'Có lỗi xảy ra',
        placement: 'topRight',
      });
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

      <Spin spinning={loading}>
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
      </Spin>

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

const LocationManagerWrapper = () => {
  return (
    <App>
      <LocationManager />
    </App>
  );
};

export default LocationManagerWrapper;
