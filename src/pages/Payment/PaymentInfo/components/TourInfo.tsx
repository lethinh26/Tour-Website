import React from "react";
import { Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const TourInfo = () => {
  return (
    <Card
      title={<h3 className="text-lg font-bold">Tóm tắt đặt chỗ</h3>}
      className="shadow-md w-full"
    >
      <div className="flex items-center mb-4">
        <img
          src="https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2001485599955/Phu-Quoc-Sunset-Viewing-and-Night-Squid-Fishing---Half-Day-Tour-01a5365d-bd73-4b4a-bb74-203490ac9e86.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-64,q-60,w-64"
          alt="Tour"
          className="rounded-md mr-4"
        />
        <div>
          <h4 className="text-base font-semibold">Tour xe buýt mui trần FunVee</h4>
          <p className="text-sm text-gray-500">Vé (ngày 1 tháng 9 năm 2025 - ngày 31 tháng 3 năm 2026)</p>
        </div>
      </div>
      <div className="text-sm text-gray-700 mb-4">
        <p>Ngày tham quan: <span className="font-bold">CN, 9 thg 11 2025</span></p>
        <p>Áp dụng cho: <span className="font-bold">ADULT: 1, CHILD: 1</span></p>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <p><InfoCircleOutlined className="mr-2" /> Có hiệu lực vào 09 thg 11 2025</p>
      </div>
      <p className="text-sm text-blue-500 text-center cursor-pointer">
        Để biết thêm chi tiết của vé này, <span className="underline">vui lòng xem tại đây</span>
      </p>
    </Card>
  );
};

export default TourInfo;
