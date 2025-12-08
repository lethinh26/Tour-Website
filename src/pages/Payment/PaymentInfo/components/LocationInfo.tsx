import { useState } from 'react';
import { Card, Modal } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

interface LocationInfoProps {
  tour?: any;
}

const LocationInfo = ({ tour }: LocationInfoProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const address = tour?.address || '';
  const tourName = tour?.name || '';

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card title={<h3 className="text-lg font-bold">Thông tin đưa đón & địa điểm</h3>} className="mb-4 shadow-md">
        <div className="space-y-3">
          <div className="flex items-start">
            <EnvironmentOutlined className="text-blue-500 mt-1 mr-2" />
            <div>
              <p className="font-semibold text-gray-800">{tourName}</p>
              <p className="text-sm text-gray-600">{address}</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <button 
              onClick={showModal}
              className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600 transition"
            >
              Xem bản đồ
            </button>
          </div>
        </div>
      </Card>

      <Modal
        title="Vị trí tour"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div className="mb-3">
          <p className="font-semibold">{tourName}</p>
          <p className="text-sm text-gray-600">{address}</p>
        </div>
        <div className="w-full h-96">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Modal>
    </>
  );
};

export default LocationInfo;