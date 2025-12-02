import { TagOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router";
import type { Tour, TourDeparture } from "../../../../types/types";

const dateToString = (date: Date) => {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}

export default function InfoHeader({tour, departure} : {tour: Tour | null, departure: TourDeparture | null}) {
    const navigate = useNavigate();
    const id = useParams().id
    const date = new Date(departure?.departure || "")
    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 mb-6">
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center">
                    <h2 className="font-bold text-3xl mb-4 md:mb-0">{tour?.name}</h2>
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
            </div>
            <div className="rounded-2xl shadow px-8 py-6 flex flex-col items-center min-w-[220px] mt-4 md:mt-0">
                <span className="text-gray-500 font-semibold mb-1">Bắt đầu từ {dateToString(date)}</span>
                <span className="text-orange-600 font-bold text-2xl mb-4">{departure?.price} VND</span>
                <Button type="primary" size="large" className="rounded-full! py-5! px-10!" onClick={() => navigate(`/ticket/${id}`)}>
                    Tìm vé
                </Button>
            </div>
        </div>
    );
}

