import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, StoreType } from "../../stores";
import { useEffect, useState } from "react";
import { fetchDataPromotion } from "../../stores/slides/promotion.slice";
import { Button, Pagination, notification } from "antd";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import type { Promotion } from "../../types/types";

export default function PromotionMain() {
    const [api, contextHolder] = notification.useNotification();
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const pageSize = 6
    const [currentPage, setCurrentPage] = useState(1)
    const [userPromotions, setUserPromotions] = useState<Promotion[]>([])
    const formatDateToString = (stringData: string) => {
        const date = new Date(stringData)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const checkExpiry = (startDate : string, endDate: string) => {
        if(!endDate){
            return true
        }
        const date1 = new Date(startDate)
        const date2 = new Date(endDate)
        const now = new Date()
        return date1.getTime() < now.getTime() && date2.getTime() > now.getTime()
    }

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchDataPromotion())
        
        if (token) {
            axios.get(`${import.meta.env.VITE_API_URL}/promotions/token/${token}`)
                .then(res => setUserPromotions(res.data.promotion || []))
                .catch(() => setUserPromotions([]));
        }
    }, [dispatch, token])
    const { promotions } = useSelector((state: StoreType) => state.promotionReducer)

    const userPromotionIds = userPromotions.map(p => p.id);
    
    const pro = Array.isArray(promotions) ? promotions
        .filter(item => !userPromotionIds.includes(item.id)) 
        .map(item => {
            return {
                id: item.id,
                type: item.type,
                name: item.name,
                startAt: item.startAt,
                endAt: item.endAt,
                color: "blue",
                description: item.description,
                code: item.code,
            }
        }) : []
    
    const handleSavePromotion = async (promotionId: number) => {
        const token = localStorage.getItem('token')
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/promotions/token`, {
                token, promotionId
            })
            
            if (res.status === 200) {
                api.success({
                    message: 'Lưu khuyến mãi thành công',
                    description: 'Khuyến mãi đã được thêm vào kho của bạn',
                    placement: 'topRight',
                });
                
                const savedPromotion = promotions.find(p => p.id === promotionId);
                if (savedPromotion) {
                    setUserPromotions(prev => [...prev, savedPromotion]);
                }
            }
            
            return res.status
        } catch (error: AxiosError | any) {
            api.error({
                message: 'Lưu khuyến mãi thất bại',
                description: error.response?.data?.message || 'Có lỗi xảy ra',
                placement: 'topRight',
            });
            return error.response?.data?.message
        }
    }
    
    
    return (
        <>
            {contextHolder}
            <div className="min-h-screen bg-gray-50">
                <div className="bg-linear-to-r from-blue-500 to-blue-400 text-white px-[150px] pb-8 pt-2 rounded-b-3xl">
                <h1 className="text-2xl font-bold mb-2">
                    Mã giảm giá Triploka ở đây chứ đâu xa!
                </h1>
                <p className="text-blue-100 text-sm">Nhận hết mọi ưu đãi hôm nay</p>
            </div>

            <div className="bg-white shadow-sm top-0 px-[150px] flex justify-between">
                <div className="flex items-center justify-between py-3">
                    <h2 className="font-semibold flex items-center gap-2">
                        <button className="text-xl">🏷️</button>
                        Phiếu giảm giá
                    </h2>
                </div>
                {token && (
                    <div className="flex items-center justify-between py-3">
                        <Button color="primary" variant="solid" onClick={() => {
                            navigate('/settings/promotion')
                        }}>Kho Khuyến Mãi</Button>
                    </div>
                )}
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-[150px]">
                {pro.filter(item => checkExpiry(item.startAt, item.endAt)).length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <div className="text-6xl mb-4">🎫</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Không có khuyến mãi</h3>
                        <p className="text-gray-500">Hiện tại chưa có khuyến mãi nào khả dụng</p>
                    </div>
                ) : pro.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .filter(item => checkExpiry(item.startAt, item.endAt))
                    .map((promo, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div
                                className={`${promo.color === "blue"
                                    ? "bg-linear-to-r from-blue-600 to-blue-500"
                                    : "bg-linear-to-r from-red-500 to-pink-500"
                                    } p-4 text-white relative`}
                            >
                                {token && <div className="absolute top-2 right-2">
                                    <button className="text-xl bg-none hover:text-2xl cursor-pointer"
                                        onClick={() => {
                                            handleSavePromotion(promo.id)
                                        }}
                                    >🏷️</button>
                                </div>}
                                <div className="text-sm font-semibold mb-1">{promo.name}</div>
                            </div>
                            <div className="p-4">
                                <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                    <span>📅</span>
                                    {/* <span>Người dùng Mới tại</span> */}
                                    {promo.endAt ? <span className="font-medium">
                                        {formatDateToString(promo.startAt)}
                                        {" - "}
                                        {formatDateToString(promo.endAt)}
                                    </span> : <span className="font-medium">Forever</span>}
                                </div>
                                {/* <div className="text-sm text-gray-600 mb-3">{promo.location}</div> */}
                                <div className="text-xs text-gray-500 mb-3" dangerouslySetInnerHTML={{ __html: promo.description }}></div>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 flex-1">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600">🏷️</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-500">Mã giảm giá</div>
                                            <div className="font-mono text-sm font-semibold text-gray-800">
                                                {promo.code}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {/* pagination */}
            <div className="flex justify-center items-center gap-2 py-6">
                <Pagination 
                align="center" 
                defaultCurrent={currentPage} 
                total={pro.length} 
                onChange={setCurrentPage}
                pageSize={pageSize}
                />
            </div>
            </div>
        </>
    );
}
