import { Card } from "antd";
import icon_location from "../assets/icons/location.png";
import icon_schedule from "../assets/icons/schedule.png";
import icon_discount from "../assets/icons/promo.png";
import temp_bg6 from "../assets/temp_bg6.png";

const FeaturesSection = () => (
    <div className="py-12 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-16 items-center justify-center">
        <div>
            <h4 className="text-[#38b5fc] font-bold tracking-widest mb-4 text-2xl">TÍNH NĂNG CHÍNH</h4>
            <h2 className="text-4xl font-bold mb-4">Chúng tôi mang đến trải nghiệm du lịch trọn vẹn nhất</h2>
            <p className="text-gray-500 mb-4 text-lg">
                Travelo cam kết mang lại sự tiện lợi, nhanh chóng và dễ dàng cho hành trình của bạn. Chọn điểm đến, đặt lịch và tiết kiệm - mọi thứ
                đều trong tầm tay.
            </p>
            <div className="grid grid-cols-1 gap-4">
                <Card className="py-8 border-0!" hoverable>
                    <div className="flex items-center gap-8 text-xl">
                        <div className="w-20 h-20 bg-[#872BFF] rounded-2xl flex justify-center items-center">
                            <img src={icon_location} alt="Location Icon" className="w-8" />
                        </div>

                        <div>
                            <h3 className="font-semibold">Nhiều điểm đến lựa chọn</h3>
                            <p className="text-gray-500">Hàng trăm địa điểm du lịch cực đẹp.</p>
                        </div>
                    </div>
                </Card>
                <Card className="py-8 border-0!" hoverable>
                    <div className="flex items-center gap-8 text-xl">
                        <div className="w-20 h-20 bg-[#FF8126] rounded-2xl flex justify-center items-center">
                            <img src={icon_schedule} alt="Schedule Icon" className="w-8" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Sắp xếp lịch trình linh hoạt</h3>
                            <p className="text-gray-500">Chọn ngày giờ theo ý muốn.</p>
                        </div>
                    </div>
                </Card>
                <Card className="py-8 border-0!" hoverable>
                    <div className="flex items-center gap-8 text-xl">
                        <div className="w-20 h-20 bg-[#F411CF] rounded-2xl flex justify-center items-center">
                            <img src={icon_discount} alt="Discount Icon" className="w-8" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Giảm giá cho mọi dịch vụ</h3>
                            <p className="text-gray-500">Nhiều ưu đãi dành riêng cho bạn.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        <img src={temp_bg6} alt="Key Features" className="w-full" />
    </div>
);

export default FeaturesSection;
