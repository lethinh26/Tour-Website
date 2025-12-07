import React, { useEffect, useState } from "react";
import { Alert, Card, Typography, Divider, Radio, Modal, Spin, message } from "antd";
import { LeftOutlined, InfoCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { paymentAPI } from "../../../services/api";

const { Title, Text } = Typography;

const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
});

const QRPaymentPage: React.FC = () => {
    const [modal, contextHolder] = Modal.useModal();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [payment, setPayment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState<"CASH" | "BANK_TRANSFER">("BANK_TRANSFER");
    const [processing, setProcessing] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        const fetchPayment = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await paymentAPI.getById(id);
                setPayment(data);
            } catch (error) {
                console.error("Fetch payment error:", error);
                message.error("Không thể tải thông tin thanh toán");
            } finally {
                setLoading(false);
            }
        };
        fetchPayment();
    }, [id]);

    // Polling để check payment status
    useEffect(() => {
        if (!payment || payment.status === 'SUCCESS') return;

        const intervalId = setInterval(async () => {
            try {
                setChecking(true);
                const response = await paymentAPI.getById(payment.id);
                
                if (response.status === 'SUCCESS') {
                    setPayment(response);
                    message.success('Thanh toán thành công!');
                    clearInterval(intervalId);
                    
                    // Hiển thị modal thành công
                    Modal.success({
                        title: "Thanh toán thành công!",
                        content: (
                            <div className="text-center">
                                <CheckCircleOutlined className="text-green-500 text-5xl mb-3" />
                                <p>Đơn hàng của bạn đã được xác nhận.</p>
                                <p className="text-sm text-gray-500">Cảm ơn bạn đã sử dụng dịch vụ.</p>
                            </div>
                        ),
                        onOk: () => {
                            navigate("/");
                        },
                    });
                }
            } catch (error) {
                console.error('Check payment error:', error);
            } finally {
                setChecking(false);
            }
        }, 3000); // Check mỗi 3 giây

        return () => clearInterval(intervalId);
    }, [payment, navigate]);

    const handlePaymentMethodChange = (e: any) => {
        const method = e.target.value;
        setPaymentMethod(method);

        if (method === "CASH") {
            modal.confirm({
                title: "Xác nhận thanh toán tiền mặt",
                content: (
                    <div>
                        <p>Bạn xác nhận thanh toán bằng tiền mặt số tiền:</p>
                        <p className="text-orange-600 font-bold text-lg mt-2">{VND.format(Number(payment?.amount || 0))}</p>
                        <p className="text-sm text-gray-500 mt-2">Vui lòng thanh toán tiền mặt khi nhận vé tại văn phòng.</p>
                    </div>
                ),
                okText: "Xác nhận",
                cancelText: "Hủy",
                onOk: async () => {
                    try {
                        setProcessing(true);
                        // Cập nhật payment status và method
                        await paymentAPI.update(payment.id, {
                            method: "CASH",
                            status: "SUCCESS",
                        });

                        Modal.success({
                            title: "Thanh toán thành công!",
                            content: (
                                <div className="text-center">
                                    <CheckCircleOutlined className="text-green-500 text-5xl mb-3" />
                                    <p>Đơn hàng của bạn đã được xác nhận.</p>
                                    <p className="text-sm text-gray-500">Vui lòng mang theo giấy tờ tùy thân khi nhận vé.</p>
                                </div>
                            ),
                            onOk: () => {
                                navigate("/");
                            },
                        });
                    } catch (error: any) {
                        console.error("Payment error:", error);
                        message.error("Có lỗi xảy ra, vui lòng thử lại");
                    } finally {
                        setProcessing(false);
                    }
                },
                onCancel: () => {
                    setPaymentMethod("BANK_TRANSFER");
                },
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!payment) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-700">Không tìm thấy thông tin thanh toán</h3>
                </div>
            </div>
        );
    }

    const amount = Number(payment.amount || 0);
    const countdown = "35:20";

    return (
        <>
            {contextHolder}
            <div className="min-h-screen max-w-[1200px] mx-auto ">
                <header className="mx-auto flex max-w-6xl items-center px-4 py-3">
                    <button className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700" onClick={() => navigate("/")}>
                        <LeftOutlined />
                        <span>Hủy</span>
                    </button>
                </header>

                <main className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <section className="space-y-4 lg:col-span-2">
                            <Card className="shadow-sm">
                                <Title level={5} className="mt-0 mb-4">
                                    Chọn phương thức thanh toán
                                </Title>
                                <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange} className="w-full">
                                    <div className="space-y-3">
                                        <Radio value="BANK_TRANSFER" className="w-full">
                                            <div className="flex items-center">
                                                <span className="font-medium">Chuyển khoản ngân hàng (VietQR)</span>
                                            </div>
                                        </Radio>
                                        <Radio value="CASH" className="w-full">
                                            <div className="flex items-center">
                                                <span className="font-medium">Thanh toán tiền mặt</span>
                                                <span className="ml-2 text-xs text-gray-500">(Thanh toán khi nhận vé)</span>
                                            </div>
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </Card>

                            {paymentMethod === "BANK_TRANSFER" && (
                                <>
                                    <div className="border-y border-slate-200 bg-sky-500">
                                        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm text-white">
                                            <span>Chúng tôi đang giữ giá này cho bạn! Hãy hoàn tất thanh toán trong</span>
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
                                            {checking && (
                                                <Text type="secondary" className="text-sm">
                                                    <Spin size="small" className="mr-2" />
                                                    Đang kiểm tra...
                                                </Text>
                                            )}
                                        </div>

                                        <Alert
                                            type="warning"
                                            showIcon
                                            icon={<InfoCircleOutlined />}
                                            message={
                                                <div className="text-xs sm:text-sm">
                                                    Vui lòng hoàn tất thanh toán trước thời gian quy định.
                                                    <br />
                                                    Nếu không, giao dịch sẽ được tự động hoàn trả trong vòng 10 ngày làm việc.
                                                </div>
                                            }
                                            className="mb-4 bg-amber-50"
                                        />

                                        <div className="rounded-lg border my-2 border-slate-200 bg-white p-4 sm:p-5">
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Text className="text-sm font-semibold text-slate-700">SePay - Thanh toán nhanh</Text>
                                                </div>
                                            </div>

                                            <Divider className="my-3!" />

                                            <div className="flex flex-col items-center gap-3">
                                                <Title level={5} className="text-center mb-2">Quét mã QR để thanh toán</Title>
                                                
                                                <img 
                                                    src={`https://qr.sepay.vn/img?acc=VQRQAFSUQ3652&bank=MBBank&amount=${payment.amount}&des=${encodeURIComponent(payment.description || '')}`}
                                                    alt="QR Payment"
                                                    className="w-64 h-64 border-4 border-white shadow-lg rounded-lg"
                                                />

                                                <div className="text-center space-y-1 mt-3">
                                                    <Text className="block text-sm">Ngân hàng: <strong>MBBank</strong></Text>
                                                    <Text className="block text-sm">Số tài khoản: <strong>VQRQAFSUQ3652</strong></Text>
                                                    <Text className="block text-sm">Số tiền: <strong className="text-red-600">{VND.format(amount)}</strong></Text>
                                                    <Text className="block text-sm">Nội dung: <strong className="text-blue-600 font-mono">{payment.description}</strong></Text>
                                                </div>
                                            </div>
                                        </div>

                                        <Alert
                                            type="info"
                                            showIcon
                                            message={
                                                <div className="text-xs sm:text-sm">
                                                    <strong>Lưu ý quan trọng:</strong>
                                                    <ul className="mt-2 ml-4 list-disc space-y-1">
                                                        <li>Chuyển khoản <strong>ĐÚNG số tiền</strong>: {VND.format(amount)}</li>
                                                        <li>Nhập <strong>ĐÚNG nội dung</strong>: <span className="font-mono text-blue-600">{payment.description}</span></li>
                                                        <li>Hệ thống sẽ tự động xác nhận trong vòng <strong>5-30 giây</strong></li>
                                                    </ul>
                                                </div>
                                            }
                                            className="mt-4 bg-blue-50"
                                        />
                                    </Card>

                                    <Card className="shadow-sm mt-2!">
                                        <Title level={5} className="mt-0!">
                                            Hướng dẫn thanh toán QR
                                        </Title>
                                        <ol className="mt-2 space-y-2 text-sm text-slate-700">
                                            <li>
                                                1. Mở Ví điện tử hoặc Ứng dụng ngân hàng hỗ trợ thanh toán QR bằng VietQR, sau đó quét mã QR bên trên.
                                            </li>
                                            <li>
                                                2. Vui lòng kiểm tra và đảm bảo số tiền và <strong>nội dung chuyển khoản</strong> khớp với thông tin đơn hàng, sau đó
                                                xác nhận để hoàn tất thanh toán.
                                            </li>
                                            <li>
                                                3. Không đóng trình duyệt hoặc ứng dụng cho đến khi nhận thông báo thanh toán thành công. Bạn sẽ nhận
                                                được email và trạng thái đơn trên trang Đặt chỗ.
                                            </li>
                                            <li>
                                                4. Sau khi chuyển khoản thành công, hệ thống sẽ tự động xác nhận trong vòng 5-30 giây.
                                            </li>
                                        </ol>
                                    </Card>

                                    <div className="mt-2 text-center text-xs text-slate-400">
                                        Giải pháp thanh toán được cung cấp bởi <span className="font-semibold text-sky-600">SePay</span>
                                    </div>
                                </>
                            )}
                        </section>

                        <aside className="lg:col-span-1">
                            <Card className="shadow-sm p-0">
                                <div className="rounded-t-md bg-sky-400 px-4 py-3 text-white">
                                    <div className="text-sm font-semibold">Chi tiết</div>
                                    <div className="mt-1 text-[11px]">
                                        Mã thanh toán: <span className="font-mono">{payment.id}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 px-4 py-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Số tiền</span>
                                        <span className="font-semibold text-slate-800">{VND.format(amount)}</span>
                                    </div>

                                    <Divider className="my-3!" />

                                    <div className="text-xs text-slate-500">
                                        Sau khi thanh toán thành công, hệ thống sẽ tự động cập nhật trạng thái đơn hàng của bạn.
                                    </div>
                                </div>
                            </Card>
                        </aside>
                    </div>
                </main>
            </div>
        </>
    );
};

export default QRPaymentPage;
