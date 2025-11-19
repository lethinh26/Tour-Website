import { Card, Tooltip } from "antd";
import { TagOutlined } from "@ant-design/icons";
import image_test from "../assets/image.png";
import logo_triploka from "../../../../assets/logos/logo_tripoka.png";
import icon_location from "../../../../assets/icons/icon_location.png";
import icon_promotion from "../../../../assets/icons/icon_promotion.png";

export interface TravelCardProps {
    image: string;
    title: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
}

function TravelCard({ propTravel }: { propTravel: TravelCardProps }) {
    const { image, title, location, rating, reviews, price, oldPrice } = propTravel;
    const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : null;
    return (
        <Card
            hoverable
            className="rounded-xl overflow-hidden shadow border border-gray-200 w-full max-w-sm p-0"
            cover={
                <div className="relative">
                    <img src={image_test} alt={title} className="w-full h-56 object-cover" />
                    <Tooltip title="Yêu thích">
                        <div className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-1 w-8 h-8 flex justify-center items-center cursor-pointer ">
                            <TagOutlined className="text-gray-400 text-lg" />
                        </div>
                    </Tooltip>
                </div>
            }
        >
            <h3 className="font-bold text-base text-gray-900 mb-1 leading-5 line-clamp-2">{title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
                <img src={icon_location} alt="Location Icon" className="w-4 mr-1" />
                <span>{location}</span>
            </div>
            <div className="flex items-center text-sm mb-2">
                <img src={logo_triploka} alt="Triploka" className="w-4 h-4 mr-1" />
                <span className="text-blue-600 font-semibold mr-1">{rating.toFixed(1)}</span>
                <span className="text-gray-500">({reviews} đánh giá)</span>
            </div>
            <div className="border-t pt-3 mt-2">
                <div className="flex items-center text-sm text-cyan-500 font-medium mb-2">
                    <div className="border border-gray-300 rounded-2xl px-2 py-1 flex items-center transition bg-white hover:bg-cyan-50 hover:border-cyan-400 cursor-pointer group">
                        <img src={icon_promotion} alt="Promotion Icon" className="w-5 mr-1 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-cyan-600 transition">Khuyến mãi</span>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mb-1">Bắt đầu từ</p>
                <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-orange-600 font-bold text-[16px]">{price.toLocaleString()} VND</span>
                    {oldPrice && <span className="text-[12px] text-gray-400 line-through">{oldPrice.toLocaleString()} VND</span>}
                    {discount && <span className="bg-red-100 text-red-600 text-[12px] font-semibold px-2 py-0.5 rounded">-{discount}%</span>}
                </div>
            </div>
        </Card>
    );
}

export default TravelCard;
