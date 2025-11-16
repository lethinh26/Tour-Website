import React, { useState } from "react";

export default function PromotionMain() {
  const [filter, setFilter] = useState("all");

  const promotions = [
    {
      id: 1,
      type: "discount",
      badge: "Giảm đến 200K",
      title: "Giảm đến 200K ve máy bay",
      color: "blue",
      expiry: "3 Tháng 1 - 31 Tháng 5",
      location: "Người dùng Mới tại Máy Bay",
      minSpend: "Chi tiêu tối thiểu 200.000 VNĐ",
      code: "VEMB200K1",
    },
    {
      id: 2,
      type: "hotel",
      badge: "Giảm 3% Hotel",
      title: "Giảm 3% Hotel nổi địa",
      color: "blue",
      expiry: "3 Tháng 1 - 31 Tháng 5",
      location: "Người dùng Mới tại Khách sạn",
      minSpend: "Đơn hàng tối thiểu giá trị",
      code: "WELCOMEHOTEL3",
    },
    {
      id: 3,
      type: "flash",
      badge: "Deal tặng fan GĐ",
      title: "Deal tặng fan GĐ Giảm",
      color: "red",
      expiry: "3 Tháng 1 - 31 Tháng 5",
      location: "Người dùng Mới tại Khách sạn",
      minSpend: "Đơn hàng tối thiểu",
      code: "HOTELPRESENTS",
    },
    {
      id: 4,
      type: "flash",
      badge: "Flash Sale",
      title: "Flash Sale động gia",
      color: "red",
      expiry: "3 Tháng 1 - 31 Tháng 5",
      location: "Người dùng Mới",
      minSpend: "1.000.000 VNĐ",
      code: "DINNERFLASH",
    },
    {
      id: 5,
      type: "flight",
      badge: "Đặng giá $99K",
      title: "Đặng giá $99K vé máy bay",
      color: "blue",
      expiry: "3 Tháng 1 - 31 Tháng 5",
      location: "Người dùng Mới",
      minSpend: "Đơn hàng tối thiểu",
      code: "VOUCHER0",
    },
    {
      id: 6,
      type: "flash",
      badge: "Flash Sale 111K",
      title: "Flash Sale động gia 111K",
      color: "red",
      expiry: "3 Tháng 1 - 31 Tháng 5",
      location: "Người dùng Mới",
      minSpend: "10.000.000 VNĐ",
      code: "DINNERFLASH2",
    },
    {
      id: 7,
      type: "discount",
      badge: "Giảm 200k",
      title: "Giảm đến 200k Đông Nam Á",
      color: "blue",
      expiry: "3 Tháng 1 - 31 Tháng 5",
      location: "Người dùng Mới",
      minSpend: "Đơn hàng tối thiểu",
      code: "GOISEA200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold mb-2">
          Mã giảm giá Traveloka ở gần đây chỉ dành xaỉ
        </h1>
        <p className="text-blue-100 text-sm">Nhận hết mọi ưu đãi hôm nay</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-sm top-0 px-[150px]">
        <div className="flex items-center justify-between py-3">
          <h2 className="font-semibold flex items-center gap-2">
            <span>🏷️</span>
            Phiếu giảm giá
          </h2>
          <select
            className="w-full max-w-[100px] px-4 py-2 rounded-xl border border-gray-300 bg-white
                  text-gray-700 shadow-sm outline-none transition-all duration-200
                  hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 cursor-pointer"
          >
            <option value="date">Lọc</option>
            <option value="date">Date</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-[150px]">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Card Header */}
            <div
              className={`${
                promo.color === "blue"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500"
                  : "bg-gradient-to-r from-red-500 to-pink-500"
              } p-4 text-white relative`}
            >
              <div className="absolute top-2 right-2">
                <span className="text-xl">🏷️</span>
              </div>
              <div className="text-sm font-semibold mb-1">{promo.badge}</div>
              <button className="bg-white bg-opacity-20 backdrop-blur-sm text-black text-xs px-3 py-1 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-colors">
                Sử dụng
              </button>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <span>📅</span>
                <span>Người dùng Mới tại</span>
                <span className="font-medium">
                  {promo.expiry.split(" - ")[0]} -{" "}
                  {promo.expiry.split(" - ")[1]}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-3">{promo.location}</div>

              <div className="text-xs text-gray-500 mb-3">{promo.minSpend}</div>

              {/* Code Section */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">🏷️</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Mã giảm giá</div>
                    <div className="font-mono text-sm font-semibold text-gray-800">
                      {promo.code}
                    </div>
                  </div>
                </div>
                <button className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-6">
        <button className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600">
          1
        </button>
        <button className="w-8 h-8 rounded bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300">
          2
        </button>
        <button className="w-8 h-8 rounded bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300">
          →
        </button>
      </div>
    </div>
  );
}
