import  { useState } from 'react';
import { Avatar, Pagination } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// 1. Dữ liệu mẫu (Mock Data) giống trong ảnh
const reviews = [
    {
        id: 1,
        name: 'Do N. M.',
        rating: 10.0,
        time: 'Đánh giá cách đây 105 tuần',
        content: 'Khu vực này không quá đông đúc, là lựa chọn tốt cho những ai muốn có chuyến đi yên bình đến Phú Quốc'
    },
    {
        id: 2,
        name: 'Trinh X. P.',
        rating: 10.0,
        time: 'Đánh giá cách đây 110 tuần',
        content: 'Chuyến đi cáp treo rất êm và quang cảnh từ trên đó thực sự tuyệt đẹp. Hòn Thơm cũng đẹp với làn nước trong vắt 🌊'
    }
];

const ReviewComponent = () => {
    // const [pageSize, setPageSize] = useState(20);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white font-sans text-gray-700">

            {/* --- PHẦN 1: TỔNG QUAN ĐIỂM SỐ --- */}
            <div className="flex items-start gap-4 mb-8">
                {/* Hộp điểm số */}
                <div className="bg-blue-50 px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-[100px]">
                    <span className="text-4xl font-bold text-blue-500">10,0</span>
                </div>

                {/* Thông tin chi tiết */}
                <div className="flex flex-col justify-center h-full pt-1">
                    <h2 className="text-blue-500 font-bold text-lg m-0">Xuất sắc</h2>
                    <p className="text-gray-600 text-sm mt-1 mb-1 font-medium">
                        Từ 25 đánh giá
                    </p>
                    <p className="text-gray-400 text-xs">
                        Bởi khách du lịch trong traveloka <span className="text-blue-400 text-[10px]">🕊️</span>
                    </p>
                </div>
            </div>

            {/* --- PHẦN 2: TIÊU ĐỀ --- */}
            <h3 className="text-xl font-bold text-gray-800 mb-6">
                Đánh giá của khách hàng
            </h3>

            {/* --- PHẦN 3: DANH SÁCH REVIEW --- */}
            <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="border border-gray-100 rounded-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-sm transition-shadow"
                    >
                        {/* Cột trái: Avatar + Tên */}
                        <div className="md:w-1/4 flex flex-row md:flex-col items-center md:items-start gap-3">
                            <Avatar size={48} icon={<UserOutlined />} className="bg-gray-100 text-gray-300" />
                            <span className="font-bold text-gray-800">{review.name}</span>
                        </div>

                        {/* Cột phải: Nội dung */}
                        <div className="flex-1">
                            {/* Header của review: Điểm + Thời gian */}
                            <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                                    {/* Icon cánh chim tượng trưng */}
                                    <span className="text-blue-500 text-sm">🕊️</span>
                                    <span className="text-blue-500 font-bold">10,0 / 10</span>
                                </div>
                                <span className="text-gray-400 text-sm">{review.time}</span>
                            </div>

                            {/* Nội dung text */}
                            <p className="text-gray-700 leading-relaxed">
                                {review.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- PHẦN 4: PHÂN TRANG (PAGINATION) --- */}
            <div className="flex justify-end items-center gap-4 mt-8">
                <span className="text-gray-600 font-medium">Số lượng đánh giá trên mỗi trang</span>
                <Pagination  defaultCurrent={1} total={40} pageSize={6} className="ml-2" />

                {/* Nút chọn số lượng custom để giống ảnh */}
                <div className="flex gap-2">
                    
                </div>

            </div>

        </div>
    );
};

export default ReviewComponent;