import { Card } from "antd";

export interface MapSectionProps{
    price: number | undefined
    departureDate: string | undefined
    address: string | undefined
}

export default function MapSection({prop} : {prop: MapSectionProps}) {


    return (
        <div className="w-full mb-8">
            <h3 className="font-bold text-xl mb-3 text-blue-900">Thông tin chung</h3>
            <Card className="rounded-xl shadow p-6 bg-white">
                <div className="mb-4">
                    <span className="font-semibold">Giá vé:</span> Giá từ {prop.price} VND<br />
                    <span className="font-semibold">Ngày khởi hành:</span> {prop.departureDate}<br />
                    <span className="font-semibold">Địa chỉ:</span> {prop.address}<br />
                    <span className="font-semibold">Đánh giá:</span> Đẹp, nên tham quan
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Điểm tham quan</span>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Bản đồ</span>
                    <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center mt-2">Map Placeholder</div>
                </div>
                {/* <div>
                    <span className="font-semibold">Chỉ dẫn cách đi</span>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        <li>Xe buýt đưa đón Phát Hoàng Lâm - dành cho khách mua vé đi ngày</li>
                        <li>Xe buýt đưa đón Sun World Ba Na Hills - dành cho khách mua vé combo Ba Na By Night</li>
                    </ul>
                </div> */}
            </Card>
        </div>
    );
}
