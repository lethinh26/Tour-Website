import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select, Steps, App, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Editor } from "@tinymce/tinymce-react";
import { tourAPI, categoryAPI, locationAPI, getUser } from "../../../services/api";

interface Tour {
  id: number;
  name: string;
  basePrice: number;
  discount: number;
  locationId: number;
  locationName?: string;
  categoryId: number;
  categoryName?: string;
  description: string;
  information: string;
  createdBy?: number;
}

interface Category {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
}

const TourList = () => {
  const { modal, notification } = App.useApp();
  const [tours, setTours] = useState<Tour[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const descriptionEditorRef = useRef<any>(null);
  const informationEditorRef = useRef<any>(null);

  const steps = [
    { title: "Thông tin cơ bản" },
    { title: "Giới thiệu & Thông tin" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const currentUser = await getUser();
      setUser(currentUser);

      const [categoriesRes, locationsRes] = await Promise.all([
        categoryAPI.getAll(),
        locationAPI.getAll(),
      ]);
      setCategories(categoriesRes.data);
      setLocations(locationsRes.data);

      const userId = currentUser?.role === 'TOUR_MANAGER' ? currentUser.id : undefined;
      const toursRes = await tourAPI.getAll(userId);
      
      const toursWithNames = toursRes.data.map((tour: any) => ({
        ...tour,
        locationName: locationsRes.data.find((l: Location) => l.id === tour.locationId)?.name,
        categoryName: categoriesRes.data.find((c: Category) => c.id === tour.categoryId)?.name,
      }));
      
      setTours(toursWithNames);
    } catch (error: any) {
      notification.error({
        message: 'Lỗi tải dữ liệu',
        description: error.response?.data?.message || 'Không thể tải danh sách tour',
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingTour(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Tour) => {
    if (user?.role === 'TOUR_MANAGER' && record.createdBy !== user.id) {
      notification.error({
        message: 'Không có quyền',
        description: 'Bạn chỉ có thể chỉnh sửa tour do mình tạo ra!',
        placement: 'topRight',
      });
      return;
    }

    setEditingTour(record);
    setCurrentStep(0);
    form.setFieldsValue({
      name: record.name,
      basePrice: record.basePrice,
      discount: record.discount,
      locationId: record.locationId,
      categoryId: record.categoryId,
      description: record.description,
      information: record.information,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (record: Tour) => {
    if (user?.role === 'TOUR_MANAGER' && record.createdBy !== user.id) {
      notification.error({
        message: 'Không có quyền',
        description: 'Bạn chỉ có thể xóa tour do mình tạo ra!',
        placement: 'topRight',
      });
      return;
    }

    modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa tour "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        try {
          await tourAPI.delete(record.id);
          notification.success({
            message: 'Xóa thành công',
            description: `Tour "${record.name}" đã được xóa khỏi hệ thống.`,
            placement: 'topRight',
          });
          fetchData();
        } catch (error: any) {
          notification.error({
            message: 'Xóa thất bại',
            description: error.response?.data?.message || 'Không thể xóa tour',
            placement: 'topRight',
          });
        }
      },
    });
  };

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(['name', 'basePrice', 'discount', 'locationId', 'categoryId']);
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
      if (descriptionEditorRef.current) {
        form.setFieldsValue({ description: descriptionEditorRef.current.getContent() });
      }
      if (informationEditorRef.current) {
        form.setFieldsValue({ information: informationEditorRef.current.getContent() });
      }

      await form.validateFields();
      const values = form.getFieldsValue();

      const tourData = {
        name: values.name,
        basePrice: Number(values.basePrice),
        discount: Number(values.discount),
        locationId: Number(values.locationId),
        categoryId: Number(values.categoryId),
        description: values.description,
        information: values.information,
      };

      if (editingTour) {
        await tourAPI.update(editingTour.id, tourData);
        notification.success({
          message: 'Cập nhật thành công',
          description: `Tour "${values.name}" đã được cập nhật.`,
          placement: 'topRight',
        });
      } else {
        await tourAPI.create(tourData);
        notification.success({
          message: 'Thêm thành công',
          description: `Tour "${values.name}" đã được thêm vào hệ thống.`,
          placement: 'topRight',
        });
      }
      
      setIsModalOpen(false);
      setCurrentStep(0);
      form.resetFields();
      fetchData();
    } catch (error: any) {
      notification.error({
        message: editingTour ? 'Cập nhật thất bại' : 'Thêm thất bại',
        description: error.response?.data?.message || 'Có lỗi xảy ra',
        placement: 'topRight',
      });
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
      dataIndex: "locationName",
      key: "locationName",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
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
        loading={loading}
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
                  name="locationId"
                  label="Địa điểm"
                  className="flex-1"
                  rules={[
                    { required: true, message: "Vui lòng chọn địa điểm!" },
                  ]}
                >
                  <Select placeholder="Chọn địa điểm" loading={loading}>
                    {locations && locations.map((location) => (
                      <Select.Option key={location.id} value={location.id}>
                        {location.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="categoryId"
                  label="Danh mục"
                  className="flex-1"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục!" },
                  ]}
                >
                  <Select placeholder="Chọn danh mục" loading={loading}>
                    {categories && categories.map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

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

              <Form.Item
                name="information"
                label="Thông tin chuyến đi"
                rules={[
                  { required: true, message: "Vui lòng nhập thông tin!" },
                ]}
              >
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  onInit={(_evt, editor) => {
                    informationEditorRef.current = editor;
                  }}
                  initialValue={form.getFieldValue('information') || ''}
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
