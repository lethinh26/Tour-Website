import { Card } from "antd";
import img_user1 from "../assets/user1.png";
import frame from "../assets/frame.png";
import { CaretLeftFilled, CaretRightFilled, StarFilled } from "@ant-design/icons";

const ReviewSection = () => (
    <div className="py-12 min-h-screen flex flex-col justify-center ">
        <h4 className="text-[#1eaafa] font-bold tracking-widest mb-4 text-2xl text-center">ĐÁNH GIÁ</h4>
        <h2 className="text-4xl font-bold mb-20 text-center">Khách hàng nói gì về chúng tôi?</h2>
        <Card className="shadow-xl mb-4 py-4 text-xl border-0! relative rounded-3xl!">
            <img src={frame} alt="Frame" className="mx-auto mb-8 absolute top-0 left-0" />

            <div className="flex flex-col text-center justify-center items-center gap-5">
                {/* <div className="w-24 h-24 bg-gray-200 rounded-full" /> */}
                <img src={img_user1} alt="Lê Phú Thịnh" className="w-24 h-24 rounded-full" />
                <div>
                    <h3 className="font-semibold text-xl">Lê Phú Thịnh</h3>
                    <p className="text-gray-500">Người đam mê du lịch</p>
                </div>
                <div className="flex gap-2">
                    <StarFilled className="text-3xl text-amber-300!" />
                    <StarFilled className="text-3xl text-amber-300!" />
                    <StarFilled className="text-3xl text-amber-300!" />
                    <StarFilled className="text-3xl text-amber-300!" />
                    <StarFilled className="text-3xl text-amber-300!" />
                </div>
                <p className="mt-4 text-gray-500 text-lg">
                    Tôi rất hài lòng với Travelo. Đây là nơi tuyệt vời nhất để đặt vé và tìm kiếm chuyến du lịch mơ ước của bạn. Dịch vụ nhanh chóng,
                    tiện lợi và luôn hỗ trợ tận tâm.
                </p>
            </div>
        </Card>
        <div className="flex justify-center gap-8 mt-8">
            <button className="bg-[#1eaafa] text-white text-xl p-4 rounded-full w-16 h-16 cursor-pointer hover:bg-[#17b0f5]"><CaretLeftFilled className="text-3xl!"/></button>
            <button className="bg-[#1eaafa] text-white text-xl p-4 rounded-full w-16 h-16 cursor-pointer hover:bg-[#17b0f5]"><CaretRightFilled className="text-3xl!"/></button>
        </div>
        
    </div>
);

export default ReviewSection;
