import React from 'react';
import { Card, Typography, Result } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Text } = Typography;

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <Card className="max-w-md w-full shadow-lg">
        <Result
          status="warning"
          icon={<WarningOutlined className="text-yellow-500" />}
          title="Đã hủy thanh toán"
          subTitle={
            <div className="space-y-2">
              <Text type="secondary">
                Bạn đã hủy giao dịch thanh toán. Không có khoản tiền nào bị trừ.
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

export default PaymentCancel;
