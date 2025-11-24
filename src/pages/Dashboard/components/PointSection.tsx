import { Card } from "antd";
import temp_bg5 from "../assets/temp_bg5.png";

const PointSection = () => (
      <div className="py-12 min-h-screen flex flex-col md:flex-row items-center justify-center">
        <img src={temp_bg5} alt="" className="w-1/2 hidden md:block -translate-x-58"/>
        <div className="flex flex-row items-center justify-center">
            <div>
                <h4 className="text-[#1eaafa] font-bold tracking-widest mb-4 text-2xl">SỐ LIỆU NỔI BẬT</h4>
                <h2 className="text-4xl font-bold mb-8">Thành tựu chúng tôi đã đạt được</h2>
                <p className="text-gray-500 mb-8 text-lg">
                    Triploka tự hào mang đến dịch vụ chất lượng, được minh chứng bằng các số liệu thực tế từ khách hàng và đối tác trên toàn quốc.
                </p>
                <div className="grid grid-cols-3 gap-8 mb-4">
                    <Card className="text-center py-8 shadow-md text-xl">
                        <div className="font-bold text-2xl text-[#1eaafa]">200+</div>
                        <div className="text-gray-500">Điểm đến phong phú</div>
                    </Card>
                    <Card className="text-center py-8 shadow-md text-xl">
                        <div className="font-bold text-2xl text-[#1eaafa]">450+</div>
                        <div className="text-gray-500">Đối tác chất lượng</div>
                    </Card>
                    <Card className="text-center py-8 shadow-md text-xl">
                        <div className="font-bold text-2xl text-[#1eaafa]">12k+</div>
                        <div className="text-gray-500">Khách hàng hài lòng</div>
                    </Card>
                </div>
            </div>
        </div>
    </div>
);

export default PointSection;
