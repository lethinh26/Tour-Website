import { Pagination } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface ReviewCardProps {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
}

export default function ReviewCard({ reviews, averageRating, totalReviews }: ReviewCardProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedReviews = reviews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getDaysAgo = (createdAt: string) => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffTime = Math.abs(now.getTime() - created.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        return diffWeeks > 0 ? `${diffWeeks} tuần` : `${diffDays} ngày`;
    };

    if (!reviews || reviews.length === 0) {
        return (
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mt-6">
                <h3 className="text-xl font-bold mb-4">Đánh giá của khách hàng</h3>
                <p className="text-gray-500 text-center py-8">Chưa có đánh giá nào</p>
            </div>
        );
    }

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mt-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                    {averageRating >= 9 ? "Xuất sắc" : averageRating >= 7 ? "Tốt" : "Bình thường"}
                </h2>
                <div className="flex items-center gap-4">
                    <div className="bg-blue-50 rounded-lg px-6 py-4">
                        <span className="text-5xl font-bold text-blue-600">
                            {averageRating.toFixed(1)}
                        </span>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Từ {totalReviews} đánh giá</p>
                        <p className="text-gray-600 flex items-center gap-1">
                            Bởi khách du lịch trong <span className="font-semibold">triploka</span>
                            <StarFilled className="text-blue-500!" />
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold mb-6">Đánh giá của khách hàng</h3>
                <div className="space-y-6">
                    {paginatedReviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                    <span className="text-gray-600 font-semibold text-lg">
                                        {review.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-semibold text-base">{review.user.name}</h4>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex items-center gap-2">
                                            <StarFilled className="text-blue-500! text-lg!" />
                                            <span className="font-bold text-blue-600">
                                                {review.rating.toFixed(1)}
                                            </span>
                                            <span className="text-gray-400">/10</span>
                                        </div>
                                        <span className="text-gray-500 text-sm">
                                            Đánh giá cách đây {getDaysAgo(review.createdAt)}
                                        </span>
                                    </div>
                                    
                                    {review.comment && (
                                        <p className="text-gray-700 leading-relaxed">
                                            {review.comment}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {totalReviews > itemsPerPage && (
                <div className="flex items-center justify-center gap-4 pt-4">
                    <span className="text-gray-600">Số lượng đánh giá trên mỗi trang</span>
                    <Pagination 
                        current={currentPage}
                        total={totalReviews} 
                        pageSize={itemsPerPage}
                        showSizeChanger={false}
                        onChange={setCurrentPage}
                        className="custom-pagination"
                    />
                </div>
            )}
        </div>
    );
}
