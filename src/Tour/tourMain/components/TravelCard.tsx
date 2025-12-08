import { Card, Tooltip } from "antd";
import { TagOutlined, TagFilled } from "@ant-design/icons";
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


function TravelCard({ propTravel, isLogin }: { propTravel: TravelCardProps, isLogin: boolean}) {
    const { id, image, title, address: location, rating, reviews, price, oldPrice } = propTravel;
    const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : null;
    const formatVND = (value: number | string | undefined) => {
        const num = typeof value === 'string' ? parseInt(value) : value;
        return typeof num === 'number' && !isNaN(num) ? num.toLocaleString('vi-VN') : '';
    };
    const navigate = useNavigate();
    const [token] = useState(() => localStorage.getItem('token'));
    const [tagActive, setTagActive] = useState(false);
    const [loading, setLoading] = useState(false);

    useState(() => {
        const fetchFavoriteTours = async () => {
            if (!token) return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/favoriteTours/${token}`);
                const favorited = res.data?.tourFavorited || [];
                const isFavorited = favorited.some((tour: any) => tour.id === id);
                setTagActive(isFavorited);
            } catch (error) {
                setTagActive(false);
            }
        };
        fetchFavoriteTours();
    });

    const handleSaveFavorite = async () => {
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/favoriteTours`, {
                token,
                tourId: id
            });
            setTagActive(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnFavorite = async () => {
        setLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/favoriteTours`, {
                data: {
                    token,
                    tourId: id
                }
            });
            setTagActive(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Card
            hoverable
            className="rounded-xl overflow-hidden shadow border border-gray-200 w-full max-w-sm p-0"
            cover={
                <div className="relative">
                    <img src={image} alt={title} className="w-full h-56 object-cover" />
                    {isLogin && (
                        <Tooltip title={tagActive ? "Huỷ Yêu Thích" : "Yêu Thích"}>
                            <div
                                className={`absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-1 w-8 h-8 flex justify-center items-center cursor-pointer ${loading ? 'opacity-60 pointer-events-none' : ''}`}
                                onClick={e => {
                                    e.stopPropagation();
                                    if (loading) return;
                                    if (tagActive) {
                                        handleUnFavorite();
                                    } else {
                                        handleSaveFavorite();
                                    }
                                }}
                            >
                                {tagActive ? <TagFilled className="text-blue-500 text-lg" /> : <TagOutlined className="text-gray-400 text-lg" />}
                            </div>
                        </Tooltip>
                    )}
                </div>
            }
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
                    <span className="text-orange-600 font-bold text-[16px]">{formatVND(price)} VND</span>
                    {oldPrice && <span className="text-[12px] text-gray-400 line-through">{formatVND(oldPrice)} VND</span>}
                    {discount && discount > 0 && <span className="bg-red-100 text-red-600 text-[12px] font-semibold px-2 py-0.5 rounded">{discount}%</span>}
                </div>
            </div>
        </Card>
    );
}

export default TravelCard;
