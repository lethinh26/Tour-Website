import React from "react";
import { Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const formatVND = (n: number) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n) + " VND";

const TourInfo = ({ payment }: { payment?: any }) => {
  const orderItems = payment?.order?.items || [];
  const firstItem = orderItems[0];
  const tourDeparture = firstItem?.departure;
  const tour = tourDeparture?.tour;
  const tourImage = tour?.images?.[0]?.url || 'https://via.placeholder.com/150';
  const departureDate = tourDeparture?.departure ? formatDate(tourDeparture.departure) : '';
  const totalQuantity = Array.isArray(orderItems) ? orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0) : 0;
  const location = tour?.location?.name || '';
  const unitPrice = firstItem?.unitPrice || 0;

  return (
    <Card
      title={<h3 className="text-lg font-bold">Tóm tắt đặt chỗ</h3>}
      className="shadow-md w-full"
    >
      <div className="flex items-start mb-4">
        <img
          src={tourImage}
          alt="Tour"
          className="rounded-md mr-4 w-20 h-20 object-cover"
        />
        <div className="flex-1">
          <h4 className="text-base font-semibold mb-1">{tour?.name || 'Tour'}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      
      <div className="border-t pt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Ngày khởi hành:</span>
          <span className="font-semibold">{departureDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Số lượng vé:</span>
          <span className="font-semibold">{totalQuantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Giá vé:</span>
          <span className="font-semibold text-orange-600">{formatVND(Number(unitPrice))}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-xs text-gray-600 flex items-start">
          <InfoCircleOutlined className="mr-2 mt-0.5" />
          <span>Vé có hiệu lực vào {departureDate}. Vui lòng mang theo giấy tờ tùy thân khi tham gia tour.</span>
        </p>
      </div>
    </Card>
  );
};

export default TourInfo;
