import React from 'react';
import { Card, Typography, Result } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router';

const { Text } = Typography;

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const orderInvoice = searchParams.get('order_invoice_number');
  const amount = searchParams.get('amount');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <Card className="max-w-md w-full shadow-lg">
        <Result
          status="success"
          icon={<CheckCircleOutlined className="text-green-500" />}
          title="Thanh toán thành công!"
          subTitle={
            <div className="space-y-2">
              {orderInvoice && (
                <Text>Mã đơn hàng: <Text strong>{orderInvoice}</Text></Text>
              )}
              {amount && (
                <div>
                  <Text>Số tiền: <Text strong className="text-lg">{Number(amount).toLocaleString('vi-VN')} VND</Text></Text>
                </div>
              )}
              <div className="mt-4">
                <Text type="secondary">
                  Cảm ơn bạn đã thanh toán. Chúng tôi đã nhận được thanh toán của bạn.
                </Text>
              </div>
            </div>
          }
          extra={[
            <button
              key="home"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              onClick={() => navigate('/')}
            >
              Về trang chủ
            </button>,
            <button
              key="test"
              className="ml-3 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
              onClick={() => navigate('/test-sepay')}
            >
              Test lại
            </button>
          ]}
        />
      </Card>
    </div>
  );
};

export default PaymentSuccess;
