import { TagOutlined, TagFilled } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router";
import type { Tour } from "../../../../types/types";
import { useState } from "react";
import axios from "axios";

export default function InfoHeader({tour} : {tour: Tour | null}) {
    const navigate = useNavigate();
    const id = useParams().id
    const [token] = useState(() => localStorage.getItem('token'));
    const [tagActive, setTagActive] = useState(false);
    const [loading, setLoading] = useState(false);

    useState(() => {
        const fetchFavoriteTours = async () => {
            if (!token) return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/favoriteTours/${token}`);
                const favorited = res.data?.tourFavorited || [];
                const isFavorited = favorited.some((tour: any) => tour.id === Number(id));
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
                tourId: Number(id)
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
                    tourId: Number(id)
                }
            });
            setTagActive(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    const formatVND = (value: number | string  | undefined) => {
        const num = typeof value === 'string'? parseInt(value) : value;
        return typeof num === "number" && !isNaN(num) ? num.toLocaleString('vi-VN') : ""
    }
    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 mb-6">
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center">
                    <h2 className="font-bold text-3xl mb-4 md:mb-0">{tour?.name}</h2>
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                        {token && (
                            <Tooltip title={tagActive ? "Huỷ Yêu Thích" : "Lưu vào danh sách yêu thích"}>
                                <Button
                                    shape="circle"
                                    size="large"
                                    className={`border-none shadow ${tagActive ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'} ${loading ? 'opacity-60 pointer-events-none' : ''}`}
                                    icon={tagActive ? <TagFilled /> : <TagOutlined />}
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (loading) return;
                                        if (tagActive) {
                                            handleUnFavorite();
                                        } else {
                                            handleSaveFavorite();
                                        }
                                    }}
                                />
                            </Tooltip>
                        )}
                    </div>
                </div>
            </div>
            <div className="rounded-2xl shadow px-8 py-6 flex flex-col items-center min-w-[220px] mt-4 md:mt-0">
                <span className="text-gray-500 font-semibold mb-1">Bắt đầu từ</span>
                <span className="text-orange-600 font-bold text-2xl mb-4">{formatVND(tour?.basePrice)} VND</span>
                <Button type="primary" size="large" className="rounded-full! py-5! px-10!" onClick={() => navigate(`/ticket/${id}`)}>
                    Tìm vé
                </Button>
            </div>
        </div>
    );
}

