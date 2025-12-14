import { Layout, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ContactInfo from './components/ContactInfo';
import LocationInfo from './components/LocationInfo';
import PromotionCode from './components/PromotionCode';
import Summary from './components/Summary';
import TourInfo from './components/TourInfo';
import { paymentAPI } from '../../../services/api';

const { Content } = Layout;

export const PaymentMain = () => {
  const { id } = useParams<{ id: string }>();
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await paymentAPI.getById(id);
        setPayment(data);
      } catch (error) {
        console.error('payment error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  if (loading) {
    return (
      <Layout className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Spin size="large" />
      </Layout>
    );
  }

  if (!payment) {
    return (
      <Layout className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-700">Không tìm thấy thông tin thanh toán</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-100 relative mb-4">
      <Content className="mx-auto w-3/4 py-8 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Space direction="vertical" size={[40, 40]} style={{ display: 'flex' }}>
            <Space direction="vertical" size="small"> 
              <h3 className='text-2xl font-bold'>Đặt chỗ của tôi</h3>
              <p className='font-semibold text-[#687176]'>Điền thông tin và xem lại đặt chỗ</p>
            </Space>
            <ContactInfo user={payment?.user} />
            <LocationInfo tour={payment?.order?.items?.[0]?.departure?.tour} />
            <PromotionCode 
              payment={payment}
              onPromotionChange={setSelectedPromotion}
            />
            <Summary payment={payment} selectedPromotion={selectedPromotion} />
          </Space>
        </div>
        <div className='top-63 w-full right-35 sticky h-fit'>
          <TourInfo payment={payment} />
        </div>
      </Content>
    </Layout>
  );
};
