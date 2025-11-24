import InfoHeader from "./components/InfoHeader";
import Section from "./components/Section";
import MapSection from "./components/MapSection";
import HeadT from "./components/HeadT";

import "react-day-picker/style.css"

export default function TourDetailMain() {
    return (
        <div className="min-h-screen">
            <HeadT />
            <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-[1200px] px-2 md:px-6 py-10">
                    <InfoHeader />
                    <Section title="Về Sun World Ba Na Hills tại Đà Nẵng">
                        <p>
                            Bà Nà Hills nổi tiếng với khí hậu mát mẻ, cảnh quan tuyệt đẹp và các hoạt động giải trí đa dạng. Đây là điểm đến lý tưởng cho du khách muốn trải nghiệm không khí trong lành và các dịch vụ cao cấp.
                        </p>
                        <img src="https://cdn1.vietnambooking.com/wp-content/uploads/2022/03/du-lich-ba-na-hills-1.jpg" alt="Ba Na Hills" className="rounded-xl my-4 w-full max-w-md" />
                        <p>
                            Công viên có rất nhiều festival cho bạn khám phá, cùng tham gia vào các trò chơi cực vui tại công viên nhé!
                        </p>
                        <img src="https://cdn1.vietnambooking.com/wp-content/uploads/2022/03/du-lich-ba-na-hills-2.jpg" alt="Festival" className="rounded-xl my-4 w-full max-w-md" />
                        <button className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold">Đọc thêm</button>
                    </Section>
                    <Section title="Điều bạn cũng nên biết">
                        <ul className="list-disc ml-6 text-gray-700">
                            <li>Xem đầy đủ danh sách dịch vụ: <a href="#" className="text-blue-500">Xem buffet trưa</a></li>
                            <li>Giờ hoạt động: 15:00, 17:00, 18:00 (Đường vào khu vui chơi vào đúng 15:00, 18:00 và 19:00)</li>
                            <li>Tour Ba Na By Night: 19:30 đến 22:30</li>
                        </ul>
                        <img src="https://cdn1.vietnambooking.com/wp-content/uploads/2022/03/du-lich-ba-na-hills-3.jpg" alt="Tour Ba Na By Night" className="rounded-xl my-4 w-full max-w-md" />
                    </Section>
                    <MapSection />
                    <Section title="Tìm hiểu thêm về Bà Na Hills">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <ul className="list-disc ml-6 text-gray-700 mb-4">
                                    <li>Khám phá Fantasy Park</li>
                                    <li>Cầu Vàng</li>
                                    <li>Làng Pháp</li>
                                    <li>Vườn hoa Le Jardin D’Amour</li>
                                </ul>
                                <p>
                                    Sun World Ba Na Hills là một điểm đến lý tưởng cho gia đình và nhóm bạn. Không chỉ có cảnh đẹp mà còn có nhiều hoạt động giải trí hấp dẫn.
                                </p>
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                                <img src="https://cdn1.vietnambooking.com/wp-content/uploads/2022/03/du-lich-ba-na-hills-4.jpg" alt="Ba Na Hills" className="rounded-xl w-full" />
                                <img src="https://cdn1.vietnambooking.com/wp-content/uploads/2022/03/du-lich-ba-na-hills-5.jpg" alt="Ba Na Hills" className="rounded-xl w-full" />
                            </div>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold">Đọc thêm</button>
                    </Section>
                </div>
            </div>
        </div>
    )
}
