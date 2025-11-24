import { Layout, Space } from 'antd';
import ContactInfo from './components/ContactInfo';
import RequestInfo from './components/RequestInfo';
import LocationInfo from './components/LocationInfo';
import PromotionCode from './components/PromotionCode';
import Summary from './components/Summary';
import TourInfo from './components/TourInfo';

const { Content } = Layout;

export const PaymentMain = () => {
  return (
    <Layout className="min-h-screen bg-gray-100 relative mb-4">
      <Content className="mx-auto w-3/4 py-8 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Space direction="vertical" size={[40, 40]} style={{ display: 'flex' }}>
            <Space direction="vertical" size="small"> 
              <h3 className='text-2xl font-bold'>Đặt chỗ của tôi</h3>
              <p className='font-semibold text-[#687176]'>Điền thông tin và xem lại đặt chỗ</p>
            </Space>
            <ContactInfo />
            <RequestInfo />
            <LocationInfo />
            <PromotionCode />
            <Summary />
          </Space>
        </div>
        <div className='top-63 w-full right-35 sticky h-fit'>
          <TourInfo />
        </div>
      </Content>
    </Layout>
  );
};
