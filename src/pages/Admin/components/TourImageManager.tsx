import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Select, Upload, App, Image } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, UploadOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile, UploadProps } from "antd/es/upload";
import { tourAPI, tourImageAPI, getUser } from "../../../services/api";

interface TourImage {
  id: number;
  tourId: number;
  tourTitle: string;
  imageUrl: string;
  position: number;
}

interface TourImageGroup {
  tourId: number;
  tourTitle: string;
  images: TourImage[];
  imageCount: number;
}

interface Tour {
  id: number;
  name: string;
  createdBy?: number;
}

const TourImageManager = () => {
  const { modal, notification } = App.useApp();
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [tourImages, setTourImages] = useState<TourImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<{ tourId: number; tourTitle: string } | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; position: number; id?: number }>>([]);

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

      const allImages: TourImage[] = [];
      for (const tour of toursRes.data) {
        const imagesRes = await tourImageAPI.getByTourId(tour.id);
        imagesRes.data.forEach((img: any) => {
          allImages.push({
            id: img.id,
            tourId: tour.id,
            tourTitle: tour.name,
            imageUrl: img.url,
            position: img.position,
          });
        });
      }
      setTourImages(allImages);
    } catch (error: any) {
      notification.error({
        message: 'Lỗi tải dữ liệu',
        description: error.response?.data?.message || 'Không thể tải danh sách ảnh',
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }
  };

  const getGroupedTours = (): TourImageGroup[] => {
    const grouped = new Map<number, TourImageGroup>();
    
    tourImages.forEach(img => {
      if (!grouped.has(img.tourId)) {
        grouped.set(img.tourId, {
          tourId: img.tourId,
          tourTitle: img.tourTitle,
          images: [],
          imageCount: 0,
        });
      }
      const group = grouped.get(img.tourId)!;
      group.images.push(img);
      group.imageCount++;
    });
    
    return Array.from(grouped.values());
  };

  const handleAdd = () => {
    setEditingTour(null);
    form.resetFields();
    setFileList([]);
    setUploadedImages([]);
    setIsModalOpen(true);
  };

  const handleEdit = (record: TourImageGroup) => {
    const tour = tours.find(t => t.id === record.tourId);
    if (user?.role === 'TOUR_MANAGER' && tour?.createdBy !== user.id) {
      notification.error({
        message: 'Không có quyền',
        description: 'Bạn chỉ có thể chỉnh sửa ảnh của tour do mình tạo ra!',
        placement: 'topRight',
      });
      return;
    }

    setEditingTour({ tourId: record.tourId, tourTitle: record.tourTitle });
    form.setFieldsValue({
      tourId: record.tourId,
    });
    
    const existingImages = record.images.map(img => ({
      url: img.imageUrl,
      position: img.position,
      id: img.id,
    }));
    setUploadedImages(existingImages);
    
    setFileList(
      record.images.map((img, index) => ({
        uid: `${img.id}`,
        name: `image-${index + 1}.png`,
        status: 'done',
        url: img.imageUrl,
      }))
    );
    setIsModalOpen(true);
  };

  const handleDelete = async (record: TourImageGroup) => {
    const tour = tours.find(t => t.id === record.tourId);
    if (user?.role === 'TOUR_MANAGER' && tour?.createdBy !== user.id) {
      notification.error({
        message: 'Không có quyền',
        description: 'Bạn chỉ có thể xóa ảnh của tour do mình tạo ra!',
        placement: 'topRight',
      });
      return;
    }

    modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa tất cả ${record.imageCount} ảnh của tour "${record.tourTitle}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        try {
          await Promise.all(
            record.images.map(img => tourImageAPI.delete(img.id))
          );
          notification.success({
            message: 'Xóa thành công',
            description: `Đã xóa tất cả ảnh của tour "${record.tourTitle}".`,
            placement: 'topRight',
          });
          fetchData();
        } catch (error: any) {
          notification.error({
            message: 'Xóa thất bại',
            description: error.response?.data?.message || 'Không thể xóa ảnh',
            placement: 'topRight',
          });
        }
      },
    });
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      
      setUploadedImages(prev => prev.filter(img => img.url !== file.url));
    },
    beforeUpload: async (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        notification.error({
          message: 'Lỗi',
          description: 'Bạn chỉ có thể upload file ảnh!',
          placement: 'topRight',
        });
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        notification.error({
          message: 'Lỗi',
          description: 'Ảnh phải nhỏ hơn 5MB!',
          placement: 'topRight',
        });
        return false;
      }

      setUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        
        setUploadedImages(prev => {
          const newPosition = prev.length + 1;
          return [...prev, { url, position: newPosition }];
        });
        
        setFileList(prev => [
          ...prev,
          {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: url,
          },
        ]);
        notification.success({
          message: 'Upload thành công',
          description: 'Ảnh đã được tải lên Cloudinary.',
          placement: 'topRight',
        });
      } catch {
        notification.error({
          message: 'Upload thất bại',
          description: 'Không thể tải ảnh lên. Vui lòng thử lại.',
          placement: 'topRight',
        });
      } finally {
        setUploading(false);
      }

      return false;
    },
    fileList,
    multiple: true,
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (uploadedImages.length === 0) {
        notification.error({
          message: 'Lỗi',
          description: 'Vui lòng upload ít nhất 1 ảnh!',
          placement: 'topRight',
        });
        return;
      }

      const targetTourId = editingTour ? editingTour.tourId : values.tourId;
      const selectedTour = tours.find(tour => tour.id === targetTourId);
      
      if (editingTour) {
        const oldImages = tourImages.filter(img => img.tourId === editingTour.tourId);
        await Promise.all(
          oldImages.map(img => tourImageAPI.delete(img.id))
        );

        await Promise.all(
          uploadedImages.map(img =>
            tourImageAPI.create({
              tourId: editingTour.tourId,
              url: img.url,
              position: img.position,
            })
          )
        );
        
        notification.success({
          message: 'Cập nhật thành công',
          description: `Đã cập nhật ${uploadedImages.length} ảnh cho tour "${editingTour.tourTitle}".`,
          placement: 'topRight',
        });
      } else {
        await Promise.all(
          uploadedImages.map(img =>
            tourImageAPI.create({
              tourId: values.tourId,
              url: img.url,
              position: img.position,
            })
          )
        );
        
        notification.success({
          message: 'Thêm thành công',
          description: `Đã thêm ${uploadedImages.length} ảnh cho tour "${selectedTour?.name}".`,
          placement: 'topRight',
        });
      }

      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      setUploadedImages([]);
      setEditingTour(null);
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
    form.resetFields();
    setFileList([]);
    setUploadedImages([]);
    setEditingTour(null);
  };

  const moveImagePosition = (index: number, direction: 'up' | 'down') => {
    const newImages = [...uploadedImages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    
    newImages.forEach((img, i) => {
      img.position = i + 1;
    });
    
    setUploadedImages(newImages);
    
    const newFileList = [...fileList];
    [newFileList[index], newFileList[targetIndex]] = [newFileList[targetIndex], newFileList[index]];
    setFileList(newFileList);
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    newImages.forEach((img, i) => {
      img.position = i + 1;
    });
    setUploadedImages(newImages);
    
    const newFileList = fileList.filter((_, i) => i !== index);
    setFileList(newFileList);
    
    notification.info({
      message: 'Đã xóa ảnh',
      description: 'Ảnh đã được xóa khỏi danh sách.',
      placement: 'topRight',
    });
  };

  const columns: ColumnsType<TourImageGroup> = [
    {
      title: "ID",
      dataIndex: "tourId",
      key: "tourId",
      width: 100,
    },
    {
      title: "Tour Title",
      dataIndex: "tourTitle",
      key: "tourTitle",
    },
    {
      title: "Images Count",
      dataIndex: "imageCount",
      key: "imageCount",
      width: 150,
      render: (count: number) => (
        <span className="font-semibold text-blue-600">{count} ảnh</span>
      ),
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
        <h1 className="text-2xl font-bold text-gray-800">Tour Image Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
        >
          Add Image
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={getGroupedTours()}
        rowKey="tourId"
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <Modal
        title={editingTour ? `Edit Images - ${editingTour.tourTitle}` : "Add Tour Images"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingTour ? "Update" : "Add"}
        cancelText="Cancel"
        width={600}
        confirmLoading={uploading}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="tourId"
            label="Select Tour"
            rules={[{ required: true, message: "Vui lòng chọn tour!" }]}
          >
            <Select
              showSearch
              placeholder="Tìm kiếm và chọn tour"
              optionFilterProp="children"
              disabled={!!editingTour}
              loading={loading}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={tours && tours.map(tour => ({
                value: tour.id,
                label: tour.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Upload Images"
            required
          >
            <Upload
              {...uploadProps}
              listType="picture-card"
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <p className="text-xs text-gray-500 mt-2">
              Chỉ chấp nhận file ảnh (PNG, JPG, JPEG). Tối đa 5MB mỗi ảnh. Có thể upload nhiều ảnh.
            </p>
          </Form.Item>

          {uploadedImages.length > 0 && (
            <Form.Item label="Sắp xếp thứ tự ảnh">
              <div className="space-y-2">
                {uploadedImages.map((img, index) => (
                  <div key={img.url} className="flex items-center gap-2 p-2 border rounded">
                    <Image
                      src={img.url}
                      alt={`Position ${img.position}`}
                      width={60}
                      height={60}
                      className="object-cover rounded"
                    />
                    <span className="flex-1 text-sm font-medium">Vị trí: #{img.position}</span>
                    <div className="flex gap-1">
                      <Button
                        size="small"
                        icon={<ArrowUpOutlined />}
                        disabled={index === 0}
                        onClick={() => moveImagePosition(index, 'up')}
                        title="Di chuyển lên"
                      />
                      <Button
                        size="small"
                        icon={<ArrowDownOutlined />}
                        disabled={index === uploadedImages.length - 1}
                        onClick={() => moveImagePosition(index, 'down')}
                        title="Di chuyển xuống"
                      />
                      <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeImage(index)}
                        title="Xóa ảnh"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};


export default TourImageManager