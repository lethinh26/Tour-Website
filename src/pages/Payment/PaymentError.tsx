import React from 'react';
import { Card, Typography, Result } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Text } = Typography;

const PaymentError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <Card className="max-w-md w-full shadow-lg">
        <Result
          status="error"
          icon={<CloseCircleOutlined className="text-red-500" />}
          title="Thanh toán thất bại!"
          subTitle={
            <div className="space-y-2">
              <Text type="secondary">
                Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
              </Text>
            </div>
          }
          extra={[
            <button
              key="retry"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              onClick={() => navigate('/test-sepay')}
            >
              Thử lại
            </button>,
            <button
              key="home"
              className="ml-3 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
              onClick={() => navigate('/')}
            >
              Về trang chủ
            </button>
          ]}
        />
      </Card>
    </div>
  );
};

export default PaymentError;
