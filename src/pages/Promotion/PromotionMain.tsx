import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, StoreType } from "../../stores";
import { useEffect, useState } from "react";
import { fetchDataPromotion } from "../../stores/slides/promotion.slice";
import { Button, Pagination } from "antd";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";

export default function PromotionMain() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const pageSize = 6
    const [currentPage, setCurrentPage] = useState(1)
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
    }, [dispatch])
    const { promotions } = useSelector((state: StoreType) => state.promotionReducer)

    const pro = promotions.map(item => {
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
    })
    
    const handleSavePromotion = async (promotionId: number) => {
        const token = localStorage.getItem('token')
        try {
            console.log(token, promotionId);
            
            const res = await axios.post('http://localhost:3000/api/promotions/token', {
                token, promotionId
            })
            
            return res.status
        } catch (error: AxiosError | any) {
            return error.response.data.message
        }
    }
    
    
    return (
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
                <div className="flex items-center justify-between py-3">
                    <Button color="primary" variant="solid" onClick={() => {
                        navigate('/setting/promotion')
                    }}>Kho Khuyến Mãi</Button>
                </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-[150px]">
                {pro.slice((currentPage - 1) * pageSize, currentPage * pageSize)
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
                                <div className="text-xs text-gray-500 mb-3">{promo.description}</div>
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
    );
}
