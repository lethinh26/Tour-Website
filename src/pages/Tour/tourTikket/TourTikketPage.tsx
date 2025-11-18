import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";

const formatVND = (n: number) =>
    new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n) + " VND";

const earnPoints = (price: number) => Math.round(price * 0.004); // tỉ lệ giả lập giống ảnh

export default function TourTikket() {

    const times = ["15:00"];
    const [selectedTime, setSelectedTime] = useState(times[0]);

    const [tickets, setTickets] = useState([
        {
            id: "adult",
            name: "Adult - Tour in English",
            price: 2310986,
            minAge: "18+",
            stockLeft: 1,
            qty: 0,
        },
        {
            id: "child",
            name: "Child - Tour in English",
            price: 2002855,
            minAge: "5 - 17",
            stockLeft: 1,
            qty: 0,
        },
    ]);
    const [selected, setSelected] = useState<Date>();

    const total = useMemo(
        () => tickets.reduce((sum, t) => sum + t.qty * t.price, 0),
        [tickets]
    );

    const setQty = (id: string, nextQty: number) =>
        setTickets((prev) =>
            prev.map((t) =>
                t.id === id
                    ? {
                        ...t,
                        qty: Math.max(0, Math.min(nextQty, t.stockLeft)),
                    }
                    : t
            )
        );


    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Header / Breadcrumb */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                    <span className="text-xl">←</span>
                    <span className="font-medium">Tìm phiếu dịch vụ khác</span>
                </button>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT SIDEBAR */}
                    <aside className="lg:col-span-3">
                        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                            <div className="aspect-4/3 bg-gray-200">
                                {/* Ảnh demo */}
                                <img
                                    className="h-full w-full object-cover"
                                    alt="Tour thumbnail"
                                    src="https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200&auto=format&fit=crop"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="text-[15px] font-semibold text-gray-800">
                                    Vatican Museums & Sistine Chapel: Fast Track Ticket + Guided Tour
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Explore two historic sites with an expert guide
                                </p>

                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">
                                        <span>🗓️</span> Không thể đổi lịch
                                    </div>
                                    <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">
                                        <span>↩️</span> Không thể hoàn tiền
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="mt-4 w-full rounded-lg border border-sky-500 bg-white px-4 py-2 text-sky-600 font-medium hover:bg-sky-50"
                                >
                                    Xem Thông tin vé
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN */}
                    <main className="lg:col-span-9">
                        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
                            
                            <DayPicker
                                                    mode="single"
                                                    selected={selected}
                                                    onSelect={setSelected}
                                                />

                            

                            {/* Time picker */}
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold text-gray-800">
                                    Chọn thời gian ưu tiên
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">
                                    Hãy chắc chắn chọn thời gian chính xác trước khi đặt chỗ.
                                </p>

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

                            {/* Tickets */}
                            <div className="mt-6 space-y-6">
                                {tickets.map((t) => (
                                    <div key={t.id} className="pt-5 border-t border-gray-200">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            {/* Left info */}
                                            <div className="min-w-0">
                                                <h5 className="text-[17px] font-semibold text-gray-800">
                                                    {t.name}
                                                </h5>

                                                <div className="mt-1 text-2xl font-extrabold text-gray-900">
                                                    {formatVND(t.price)}
                                                </div>

                                                <div className="mt-1">
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                                                        <span>🏅</span> Earn {earnPoints(t.price).toLocaleString("vi-VN")} Points
                                                    </span>
                                                </div>

                                                <p className="mt-2 text-sm text-gray-500">
                                                    Age: {t.minAge}.
                                                </p>
                                            </div>

                                            {/* Qty stepper */}
                                            <div className="sm:text-right">
                                                <div className="inline-flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setQty(t.id, t.qty - 1)}
                                                        disabled={t.qty === 0}
                                                        className="h-8 w-8 rounded-md border text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                                                        aria-label="Giảm số lượng"
                                                    >
                                                        –
                                                    </button>

                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={t.stockLeft}
                                                        value={t.qty}
                                                        onChange={(e) => setQty(t.id, Number(e.target.value))}
                                                        className="h-8 w-12 rounded-md border text-center text-sm"
                                                        aria-label="Số lượng"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => setQty(t.id, t.qty + 1)}
                                                        disabled={t.qty >= t.stockLeft}
                                                        className="h-8 w-8 rounded-md border text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                                                        aria-label="Tăng số lượng"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="mt-2 text-sm text-red-600">
                                                    {Math.max(0, t.stockLeft - t.qty)} vé còn lại
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
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
                    ${total === 0
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-sky-500 text-white hover:bg-sky-600"
                                        }`}
                                >
                                    Đặt ngay
                                </button>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}
