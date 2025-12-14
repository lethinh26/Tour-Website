import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useNavigate, useParams } from "react-router";
import ModalShowInfo from "./components/ModalShowInfo";
import FullPageLoader from "../../../common/Loading";
import { Empty, Modal, notification } from "antd";
import { orderAPI, paymentAPI, getUser, tourAPI, tourImageAPI, tourDepartureAPI } from "../../../services/api";
import type { Tour, TourImage, TourDeparture } from "../../../types/types";

const formatVND = (n: number) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n) + " VND";
const getDMY = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
const getTime = (date: Date) => {
    return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
}

export default function TourTikket() {
    const id = Number(useParams().id)
    const [tour, setTour] = useState<Tour | null>(null);
    const [images, setImages] = useState<TourImage[]>([]);
    const [departures, setDepartures] = useState<TourDeparture[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<Date>();
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreatingPayment, setIsCreatingPayment] = useState(false);

    useEffect(() => {
        fetchTourData();
    }, [id]);

    const fetchTourData = async () => {
        setLoading(true);
        try {
            const [tourRes, imagesData, departuresData] = await Promise.all([
                tourAPI.getById(id),
                tourImageAPI.getByTourId(id),
                tourDepartureAPI.getByTourId(id)
            ]);

            setTour(tourRes.data);
            setImages(imagesData.data);
            setDepartures(departuresData.data);
        } catch (error) {
            console.error('Error fetching tour data:', error);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate()


    const times: string[] = Array.isArray(departures) && departures.length && selected ? departures.filter((item) => {
        return getDMY(new Date(item.departure)) === getDMY(selected)
    }).map(item => getTime(new Date(item.departure)))
        : ['--:--']
    const [numberTicket, setNumberTicket] = useState(0)

    const [selectedTime, setSelectedTime] = useState(times[0]); // ngay thang daypicked


    const departureFind = Array.isArray(departures) ? departures.find(item =>
        selected && getDMY(new Date(item.departure)) == getDMY(selected) && getTime(new Date(item.departure)) == selectedTime
    ) : undefined
    const total = departureFind?.price ? numberTicket * departureFind?.price : 0

    const handleConfirmBooking = async () => {
        setIsCreatingPayment(true);
        try {
            const userResponse = await getUser();
            if (!userResponse) {
                api.error({
                    message: 'Lỗi',
                    description: 'Vui lòng đăng nhập để đặt vé',
                });
                setIsCreatingPayment(false);
                setIsModalOpen(false);
                return;
            }

            if (!departureFind) {
                api.error({
                    message: 'Lỗi',
                    description: 'Vui lòng chọn lịch khởi hành',
                });
                setIsCreatingPayment(false);
                setIsModalOpen(false);
                return;
            }

            const orderData = {
                userId: userResponse.id,
                items: [{
                    quantity: numberTicket,
                    unitPrice: Number(departureFind.price),
                    tourDepartureId: departureFind.id
                }],
                totalAmount: Number(total),
                status: 'PENDING' as const
            };
            const order = await orderAPI.create(orderData);

            const paymentData = {
                orderId: order.id,
                userId: userResponse.id,
                amount: Number(total),
                method: 'BANK_TRANSFER' as const,
                status: 'PENDING' as const
            };
            const payment = await paymentAPI.create(paymentData);

            api.success({
                message: 'Thành công',
                description: 'Đã tạo đơn đặt vé. Chuyển đến trang thanh toán...',
            });

            setTimeout(() => {
                navigate(`/payment/${payment.id}`);
            }, 1000);

        } catch (error: any) {
            console.error('Create payment error:', error);
            api.error({
                message: 'Lỗi',
                description: error?.response?.data?.message || 'Không thể tạo đơn đặt vé. Vui lòng thử lại.',
            });
            setIsCreatingPayment(false);
            setIsModalOpen(false);
        }
    };

    if (loading){
        return <FullPageLoader/>
    }
    
    return (
        <div className="w-full min-h-screen bg-gray-50">
            {contextHolder}
            <Modal
                title="Xác nhận đặt vé"
                open={isModalOpen}
                onOk={handleConfirmBooking}
                onCancel={() => setIsModalOpen(false)}
                okText="Xác nhận"
                cancelText="Hủy"
                confirmLoading={isCreatingPayment}
            >
                <div className="space-y-3">
                    <p><strong>Tour:</strong> {tour?.name}</p>
                    <p><strong>Ngày khởi hành:</strong> {selected ? getDMY(selected) : ''} {selectedTime}</p>
                    <p><strong>Số lượng vé:</strong> {numberTicket}</p>
                    <p><strong>Tổng tiền:</strong> <span className="text-orange-600 font-bold">{formatVND(total)}</span></p>
                </div>
            </Modal>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
                <button type="button" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:font-extrabold hover:text-[18px]"
                    onClick={() => {
                        navigate(`/tour/${id}`)
                    }}
                >

                    <span className="text-xl">←</span>
                    <span className="font-medium">Tìm phiếu dịch vụ khác</span>
                </button>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <aside className="lg:col-span-3">
                        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                            <div className="aspect-4/3 bg-gray-200">
                                <img
                                    className="h-full w-full object-cover"
                                    alt="Tour thumbnail"
                                    src={images[0]?.url}
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="text-[15px] font-semibold text-gray-800">
                                    {tour?.name}
                                </h3>
                                {/* <p className="mt-2 text-sm text-gray-600">Explore two historic sites with an expert guide</p> */}

                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">
                                        <span>🗓️</span> Không thể đổi lịch
                                    </div>
                                    <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">
                                        <span>↩️</span> Không thể hoàn tiền
                                    </div>
                                </div>
                                <ModalShowInfo prop={tour?.information || ''} />
                                {/* <button
                                    type="button"
                                    className="mt-4 w-full rounded-lg border border-sky-500 bg-white px-4 py-2 text-sky-600 font-medium hover:bg-sky-50"
                                >
                                    Xem Thông tin vé
                                </button> */}
                            </div>
                        </div>
                    </aside>

                    <main className="lg:col-span-9">
                        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
                            <div className="flex items-center justify-center">
                                <DayPicker mode="single" selected={selected} onSelect={setSelected} />
                            </div>

                            <div className="mt-6 text-center">
                                <h4 className="text-lg font-semibold text-gray-800">Chọn thời gian ưu tiên</h4>
                                <p className="mt-1 text-sm text-gray-500">Hãy chắc chắn chọn thời gian chính xác trước khi đặt chỗ.</p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {times.map((t) => {
                                        const selected = t === selectedTime;
                                        return (
                                            <button
                                                key={t}
                                                onClick={() => setSelectedTime(t)}
                                                className={`rounded-lg border px-4 py-2 text-sm font-medium transition
                          ${selected
                                                        ? "border-sky-300 bg-sky-50 text-sky-700 ring-2 ring-sky-400"
                                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>


                            {(departureFind && selectedTime && times.length && !times[0].includes('--:--')) ?
                                <>
                                    <div className="mt-6 space-y-6">
                                        <div className="pt-5 border-t border-gray-200">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0">
                                                    <h5 className="text-[17px] font-semibold text-gray-800">{tour?.name}</h5>

                                                    <div className="mt-1 text-2xl font-extrabold text-gray-900">{formatVND(departureFind?.price)}</div>
                                                </div>

                                                <div className="sm:text-right">
                                                    <div className="inline-flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            disabled={numberTicket === 0}
                                                            className="h-8 w-8 rounded-md border text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                                                            aria-label="Giảm số lượng"
                                                            onClick={() => { setNumberTicket((prev) => prev - 1) }}
                                                        >
                                                            –
                                                        </button>

                                                        <input
                                                            type="number"
                                                            min={0}
                                                            max={departureFind.availableSeats}
                                                            onChange={(e) => {
                                                                const value = Number(e.target.value)
                                                                if(value <= departureFind.availableSeats && value >= 0){
                                                                    setNumberTicket(Number(e.target.value))}
                                                                }
                                                            }
                                                            value={numberTicket}
                                                            className="h-8 w-12 rounded-md border text-center text-sm"
                                                            aria-label="Số lượng"
                                                        />

                                                        <button
                                                            type="button"
                                                            disabled={numberTicket >= departureFind.availableSeats}
                                                            className="h-8 w-8 rounded-md border text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                                                            aria-label="Tăng số lượng"
                                                            onClick={() => { setNumberTicket((prev) => prev + 1) }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="mt-2 text-sm text-red-600">{departureFind.availableSeats} vé còn lại</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 border-t border-gray-200 pt-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 font-semibold">Tổng giá tiền</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600">
                                                    {total === 0 ? "0 VND" : formatVND(total)}
                                                </span>
                                                <span className="text-gray-400">▾</span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={total === 0}
                                            className={`rounded-lg px-6 py-3 font-semibold transition
                    ${total === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-sky-500 text-white hover:bg-sky-600"}`}
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            Đặt ngay
                                        </button>
                                    </div>
                                </>
                                : <Empty description="Hãy chọn lịch"></Empty>
                            }


                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}
