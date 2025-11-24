import React from 'react';
import { Card } from 'antd';

const LocationInfo = () => {
  return (
    <Card title={<h3 className="text-lg font-bold">Thông tin đưa đón & địa điểm</h3>} className="mb-4 shadow-md">
      <div className="text-center">
        <button className="btn btn-primary bg-blue-500 text-white rounded-md px-4 py-2">Xem bản đồ</button>
      </div>
    </Card>
  );
};

export default LocationInfo;