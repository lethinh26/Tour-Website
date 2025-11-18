import React from "react";
import {
    Alert,
    Card,
    QRCode,
    Typography,
    Divider,
} from "antd";
import {
    LeftOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
});

const QRPaymentPage: React.FC = () => {
    const countdown = "35:20"; // chỉ UI, không đếm ngược thật
    const amount = 485423;

    return (
        <div className="min-h-screen max-w-[1200px] mx-auto ">
            {/* Thanh điều hướng nhỏ phía trên */}
            <header className="mx-auto flex max-w-6xl items-center px-4 py-3">
                <button className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700">
                    <LeftOutlined />
                    <span>Hủy</span>
                </button>
            </header>

            {/* Banner giữ giá + đếm ngược */}
            

            {/* Nội dung chính */}
            <main className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    
                    {/* Cột trái */}
                    <section className="space-y-4 lg:col-span-2">
                        <div className="border-y border-slate-200 bg-sky-500">
                            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm text-white">
                                <span>
                                    Chúng tôi đang giữ giá này cho bạn! Hãy hoàn tất thanh toán trong
                                </span>
                                <span className="rounded-full bg-lime-400 px-3 py-0.5 text-xs font-semibold text-slate-900">
                                    {countdown}
                                </span>
                            </div>
                        </div>
                        <Card className="shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <Title level={4} className="mb-0!">
                                    Quét mã QR để thanh toán
                                </Title>
                            </div>

                            {/* Thông báo màu vàng */}
                            <Alert
                                type="warning"
                                showIcon
                                icon={<InfoCircleOutlined />}
                                message={
                                    <div className="text-xs sm:text-sm">
                                        Vui lòng hoàn tất thanh toán trước thời gian quy định.
                                        <br />
                                        Nếu không, giao dịch sẽ được tự động hoàn trả trong vòng
                                        10 ngày làm việc.
                                    </div>
                                }
                                className="mb-4 bg-amber-50"
                            />

                            {/* Thẻ QR VietQR */}
                            <div className="rounded-lg border my-2 border-slate-200 bg-white p-4 sm:p-5">
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {/* <div className="h-6 w-16 rounded bg-red-500" /> */}
                                        <Text className="text-sm font-semibold text-slate-700">
                                            VietQR
                                        </Text>
                                    </div>
                                    
                                </div>

                                <Divider className="my-3!" />

                                <div className="flex flex-col items-center gap-3">
                                    <Text className="text-sm font-medium text-slate-700">
                                        Traveloka Việt Nam
                                    </Text>

                                    <QRCode value="demo-vietqr://payment" size={180} />

                                    <Text type="secondary" className="text-xs sm:text-sm">
                                        Thanh toán trước:{" "}
                                        <span className="font-medium text-slate-700">
                                            15:59, 08/11/2025
                                        </span>
                                    </Text>
                                </div>
                            </div>
                        </Card>

                        {/* Hướng dẫn thanh toán */}
                        <Card className="shadow-sm mt-2!">
                            <Title level={5} className="mt-0!">
                                Hướng dẫn thanh toán QR
                            </Title>
                            <ol className="mt-2 space-y-2 text-sm text-slate-700">
                                <li>
                                    1. Mở Ví điện tử hoặc Ứng dụng ngân hàng hỗ trợ thanh toán QR
                                    bằng VietQR, sau đó quét mã QR bên trên.
                                </li>
                                <li>
                                    2. Vui lòng kiểm tra và đảm bảo số tiền và thông tin thanh
                                    toán khớp với thông tin đơn hàng, sau đó xác nhận để hoàn tất
                                    thanh toán.
                                </li>
                                <li>
                                    3. Không đóng trình duyệt hoặc ứng dụng cho đến khi nhận thông
                                    báo thanh toán thành công. Bạn sẽ nhận được email và trạng
                                    thái đơn trên trang Đặt chỗ.
                                </li>
                            </ol>
                        </Card>

                        <div className="mt-2 text-center text-xs text-slate-400">
                            Giải pháp thanh toán được cung cấp bởi{" "}
                            <span className="font-semibold text-sky-600">SePay</span>
                        </div>
                    </section>

                    {/* Cột phải: Chi tiết đơn */}
                    <aside className="lg:col-span-1">
                        <Card className="shadow-sm p-0">
                            <div className="rounded-t-md bg-sky-400 px-4 py-3 text-white">
                                <div className="text-sm font-semibold">Chi tiết</div>
                                <div className="mt-1 text-[11px]">
                                    Mã thanh toán: <span className="font-mono">1290955138</span>
                                </div>
                            </div>

                            <div className="space-y-3 px-4 py-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">Số tiền</span>
                                    <span className="font-semibold text-slate-800">
                                        {VND.format(amount)}
                                    </span>
                                </div>

                                <Divider className="my-3!" />

                                <div className="text-xs text-slate-500">
                                    Sau khi thanh toán thành công, hệ thống sẽ tự động cập nhật
                                    trạng thái đơn hàng của bạn.
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default QRPaymentPage;
