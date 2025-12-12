import { Card } from "antd";
import frame from "../assets/frame.png";
import { CaretLeftFilled, CaretRightFilled, StarFilled } from "@ant-design/icons";
import { useState } from "react";

const reviews = [
    {
        id: 1,
        name: "Lê Phú Thịnh",
        role: "Người đam mê du lịch",
        rating: 5,
        comment: "Tôi rất hài lòng với Travelo. Đây là nơi tuyệt vời nhất để đặt vé và tìm kiếm chuyến du lịch mơ ước của bạn. Dịch vụ nhanh chóng, tiện lợi và luôn hỗ trợ tận tâm.",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
        id: 2,
        name: "Nguyễn Minh Anh",
        role: "Du khách thường xuyên",
        rating: 5,
        comment: "Trải nghiệm tuyệt vời! Website dễ sử dụng, giá cả hợp lý và tour được tổ chức chuyên nghiệp. Tôi đã có những chuyến đi đáng nhớ nhờ Travelo.",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        id: 3,
        name: "Trần Văn Hùng",
        role: "Blogger du lịch",
        rating: 4,
        comment: "Dịch vụ tốt, đội ngũ hỗ trợ nhiệt tình. Các tour được thiết kế đa dạng phù hợp với nhiều đối tượng. Chắc chắn sẽ quay lại sử dụng dịch vụ!",
        avatar: "https://i.pravatar.cc/150?img=33"
    }
];

const ReviewSection = () => {
    const [currentReview, setCurrentReview] = useState(0);

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const review = reviews[currentReview];

    return (
        <div className="py-12 min-h-screen flex flex-col justify-center ">
            <h4 className="text-[#1eaafa] font-bold tracking-widest mb-4 text-2xl text-center">ĐÁNH GIÁ</h4>
            <h2 className="text-4xl font-bold mb-20 text-center">Khách hàng nói gì về chúng tôi?</h2>
            <Card className="shadow-xl mb-4 py-4 text-xl border-0! relative rounded-3xl!">
                <img src={frame} alt="Frame" className="mx-auto mb-8 absolute top-0 left-0" />

                <div className="flex flex-col text-center justify-center items-center gap-5">
                    <img src={review.avatar} alt={review.name} className="w-24 h-24 rounded-full" />
                    <div>
                        <h3 className="font-semibold text-xl">{review.name}</h3>
                        <p className="text-gray-500">{review.role}</p>
                    </div>
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, index) => (
                            <StarFilled 
                                key={index}
                                className={`text-3xl ${index < review.rating ? 'text-amber-300!' : 'text-gray-300!'}`}
                            />
                        ))}
                    </div>
                    <p className="mt-4 text-gray-500 text-lg">
                        {review.comment}
                    </p>
                </div>
            </Card>
            <div className="flex justify-center gap-8 mt-8">
                <button 
                    className="bg-[#1eaafa] text-white text-xl p-4 rounded-full w-16 h-16 cursor-pointer hover:bg-[#17b0f5]"
                    onClick={prevReview}
                >
                    <CaretLeftFilled className="text-3xl!"/>
                </button>
                <button 
                    className="bg-[#1eaafa] text-white text-xl p-4 rounded-full w-16 h-16 cursor-pointer hover:bg-[#17b0f5]"
                    onClick={nextReview}
                >
                    <CaretRightFilled className="text-3xl!"/>
                </button>
            </div>
        </div>
    );
};

export default ReviewSection;
