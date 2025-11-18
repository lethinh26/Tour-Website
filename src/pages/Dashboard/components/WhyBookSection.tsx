import { Card } from "antd";
import icon_bus from "../../../assets/icons/icon_bus.png";
import icon_payment from "../../../assets/icons/icon_payment.png";
import icon_schedule from "../../../assets/icons/icon_schedule.png";

const WhyBookSection = () => (
    <div className="pb-12 min-h-screen flex flex-col justify-center">
        <h4 className="text-[#1eaafa] font-extrabold tracking-widest mb-4 text-2xl">DỊCH VỤ</h4>
        <h2 className="text-4xl font-bold mb-12">Tại sao lại chọn chúng tôi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="flex flex-col items-center py-16 shadow-md text-xl text-center border-0! ">
                <div className="bg-gray-200 w-16 h-16 rounded-full mb-6 flex mx-auto items-center justify-center">
                    <img src={icon_bus} alt="icon bus" className="w-12" />
                </div>
                <h3 className="font-semibold mb-4 text-xl">Có mọi thứ bạn cần</h3>
                <p className="text-gray-500 text-center text-[16px]">Từ vé máy bay, lưu trú đến tham quan, chúng tôi mang đến giải pháp du lịch trọn gói, tinh gọn và đẳng cấp cho mọi hành trình của bạn.</p>
            </Card>
            <Card className="flex flex-col items-center py-16 shadow-md text-xl text-center border-0!">
                <div className="bg-gray-200 w-16 h-16 rounded-full mb-6 flex mx-auto items-center justify-center">
                    <img src={icon_schedule} alt="icon schedule" className="w-10" />
                </div>
                <h3 className="font-semibold mb-4 text-xl">Đặt chỗ linh hoạt</h3>
                <p className="text-gray-500 text-center text-[16px]">Tự do điều chỉnh kế hoạch với hệ thống đặt chỗ linh hoạt, đảm bảo tiện lợi và phù hợp với lịch trình thay đổi của bạn.</p>
            </Card>
            <Card className="flex flex-col items-center py-16 shadow-md text-xl text-center border-0!">
                <div className="bg-gray-200 w-16 h-16 rounded-full mb-6 flex mx-auto items-center justify-center">
                    <img src={icon_payment} alt="icon payment" className="w-10" />
                </div>
                <h3 className="font-semibold mb-4 text-xl">Thanh toán an toàn</h3>
                <p className="text-gray-500 text-center text-[16px]">Thanh toán nhanh chóng và bảo mật cao, chuẩn quốc tế—mang đến sự yên tâm tuyệt đối trong mọi giao dịch.</p>
            </Card>
        </div>
    </div>
);

export default WhyBookSection;
