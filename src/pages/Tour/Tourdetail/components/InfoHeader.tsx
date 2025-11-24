import { TagOutlined } from "@ant-design/icons";
import { Card, Button, Tooltip } from "antd";
import location_icon from "../../../../assets/icons/icon_location.png";
import { useNavigate } from "react-router";

export default function InfoHeader() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-6 mb-6">
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h2 className="font-bold text-3xl mb-4 md:mb-0">Sun World Ba Na Hills tại Đà Nẵng</h2>
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                        <Tooltip title="Lưu vào danh sách yêu thích">
                            <Button
                                shape="circle"
                                size="large"
                                className="bg-blue-100 text-blue-500 border-none shadow"
                                icon={<TagOutlined />}
                            ></Button>
                        </Tooltip>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                    <div className="rounded-xl shadow flex-row flex items-center gap-2 py-2 bg-gray-50 px-4">
                        <img src={location_icon} alt="Location Icon" className="w-4" />
                        <span className="font-semibold">2/9 Street, Hoa Cuong Ward, Da Nang</span>
                        <a href="#" className="text-blue-500 font-semibold ml-2">
                            Xem bản đồ
                        </a>
                    </div>
                    <div className="rounded-xl shadow flex-row flex items-center gap-2 py-2 bg-gray-50 px-4">
                        <span className="font-semibold">Giờ hoạt động: 08:00-22:00</span>
                        <a href="#" className="text-blue-500 font-semibold ml-2">
                            Xem Giờ làm việc
                        </a>
                    </div>
                    <div className="rounded-xl shadow flex-row flex items-center gap-2 py-2 bg-gray-50 px-4">
                        <span className="font-semibold">Thông tin liên hệ, Tiện ích, Dịch vụ ng...</span>
                        <a href="#" className="text-blue-500 font-semibold ml-2">
                            Xem chi tiết
                            
                        </a>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl shadow px-8 py-6 flex flex-col items-center min-w-[220px] mt-4 md:mt-0">
                <span className="text-gray-500 font-semibold mb-1">Bắt đầu từ</span>
                <span className="text-orange-600 font-bold text-2xl mb-4">100.000 VND</span>
                <Button type="primary" size="large" className="rounded-full! py-5! px-10!" onClick={() => navigate(`/tour/ticket/123`)}>
                    Tìm vé
                </Button>
            </div>
        </div>
    );
}
