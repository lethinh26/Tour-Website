import React, { useState } from "react";
import { Collapse, Space, Modal, message } from "antd";
import { useNavigate } from "react-router";
import { paymentAPI, promotionAPI, getUser } from "../../../../services/api";

const { Panel } = Collapse;

const formatVND = (n: number) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n) + " VND";

const Summary = ({ payment, selectedPromotion }: { payment?: any; selectedPromotion?: any }) => {
    const [modal, contextHolder] = Modal.useModal();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const orderItems = payment?.order?.items || [];
    const originalAmount = payment?.amount || 0;

    const discount = selectedPromotion ? (originalAmount * selectedPromotion.discount) / 100 : 0;
    const finalAmount = originalAmount - discount;

    const handleContinue = async () => {
        modal.confirm({
            title: "Xác nhận thanh toán",
            content: `Bạn có chắc chắn muốn thanh toán ${formatVND(finalAmount)}?`,
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    setLoading(true);

                    if (selectedPromotion) {
                        const user = await getUser();
                        if (user) {
                            try {
                                await promotionAPI.use(selectedPromotion.code, user.id);
                            } catch (error) {
                                console.error("Use promotion error:", error);
                            }
                        }
                    }

                    if (discount > 0) {
                        await paymentAPI.update(payment.id, {
                            amount: finalAmount,
                        });
                    }

                    message.success("Đang chuyển đến trang thanh toán...");

                    setTimeout(() => {
                        navigate(`/payment-qr/${payment.id}`);
                    }, 1000);
                } catch (error: any) {
                    console.error("Payment error:", error);
                    message.error(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại");
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    return (
        <>
            {contextHolder}
            <Space direction="vertical" size="small" className="w-full">
                '<h3 className="text-2xl font-bold pb-4">Tóm tắt</h3>
                <Collapse bordered={false} expandIconPosition="end" className="bg-white! shadow-md">
                    <Panel
                        header={
                            <div className="flex justify-between items-center pr-3">
                                <h3 className="text-lg font-semibold">Giá bạn trả</h3>
                                <span className="font-bold text-[#ff5e1f] text-lg">{formatVND(finalAmount)}</span>
                            </div>
                        }
                        key="1"
                    >
                        <Space direction="vertical" size="small" className="w-full">
                            {orderItems.map((item: any, index: number) => (
                                <div key={index} className="font-semibold flex justify-between">
                                    <span>Vé (x{item.quantity}):</span>
                                    <span>{formatVND(Number(item.unitPrice) * item.quantity)}</span>
                                </div>
                            ))}
                            {selectedPromotion && (
                                <>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tạm tính:</span>
                                            <span>{formatVND(originalAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-green-600 font-semibold mt-1">
                                            <span>Giảm giá ({selectedPromotion.discount}%):</span>
                                            <span>-{formatVND(discount)}</span>
                                        </div>
                                    </div>
                                    <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                                        <span>Tổng cộng:</span>
                                        <span className="text-[#ff5e1f]">{formatVND(finalAmount)}</span>
                                    </div>
                                </>
                            )}
                        </Space>
                    </Panel>
                </Collapse>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleContinue}
                        disabled={loading}
                        className={`bg-orange-500 text-white rounded-md px-4 py-2 w-1/3 font-bold ${
                            loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-orange-600"
                        }`}
                    >
                        {loading ? "Đang xử lý..." : "Tiếp tục"}
                    </button>
                </div>
            </Space>
        </>
    );
};

export default Summary;
