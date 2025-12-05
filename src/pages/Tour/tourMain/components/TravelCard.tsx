import { Card, Tooltip } from "antd";
import { TagOutlined } from "@ant-design/icons";
import logo_triploka from "../../../../assets/logos/logo_tripoka.png";
import icon_location from "../../../../assets/icons/icon_location.png";
import icon_promotion from "../../../../assets/icons/icon_promotion.png";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export interface TravelCardProps {
    id: number;
    image: string;
    title: string;
    address: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
    categoryId: number;
    location: string;
}


function TravelCard({ propTravel }: { propTravel: TravelCardProps }) {
    const { id, image, title, address: location, rating, reviews, price, oldPrice } = propTravel;
    const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : null;
    
    const navigate = useNavigate();
    const [token] = useState(() => { 
        return localStorage.getItem('token')
    })
    const handleSaveFavorite = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/favoriteTours', {
                token,
                tourId: id
            })
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card
            hoverable
            className="rounded-xl overflow-hidden shadow border border-gray-200 w-full max-w-sm p-0"
            cover={
                <div className="relative">
                    <img src={image} alt={title} className="w-full h-56 object-cover" />
                    {token && <Tooltip title="Yêu thích"
                    >
                        <div
                            className="absolute top-3 hover:w-10 hover:h-10 hover:z-10 active:z-10 right-3 bg-white bg-opacity-80 rounded-full p-1 w-8 h-8 flex justify-center items-center cursor-pointer "
                            // THAY ĐỔI Ở ĐÂY: Thêm tham số 'e' (sự kiện)
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSaveFavorite();
                            }}
                        >
                            <TagOutlined className="text-gray-400 text-lg" />
                        </div>
                    </Tooltip>}
                </div>
            }
            // Sự kiện này chỉ được kích hoạt nếu không bị chặn từ bên trong
            onClick={() => navigate(`/tour/${id}`)}
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
                <p className="text-sm text-gray-500 mb-1!">Bắt đầu từ</p>
                <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-orange-600 font-bold text-[16px]">{price.toLocaleString()} VND</span>
                    {oldPrice && <span className="text-[12px] text-gray-400 line-through">{oldPrice.toLocaleString()} VND</span>}
                    {discount != 0 && <span className="bg-red-100 text-red-600 text-[12px] font-semibold px-2 py-0.5 rounded">{discount}%</span>}
                </div>
            </div>
        </Card>
    );
}

export default TravelCard;
