import { useState, type JSX } from "react";
import {
    Alert,
    Button,
    Card,
    Divider,
    Input,
    List,
    Modal,
    QRCode,
    Radio,
    Space,
    Tag,
    Tooltip,
    Typography,
} from "antd";
import {

    DollarOutlined,

    InfoCircleOutlined,
} from "@ant-design/icons";

import iconVietQR from '../../../assets/icons/iconVietQR.png'

const { Title, Text } = Typography;

type PaymentKey =
    | "vietqr"
    | "tienmat"


const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
});



export default function PaymentCardMain() {
    // mock dữ liệu đơn hàng
    const total = 2310986;

    const [method, setMethod] = useState<PaymentKey>("vietqr");
    const [voucher, setVoucher] = useState("");
    const [applyLoading, setApplyLoading] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const methods: {
        key: PaymentKey;
        label: string;
        image?: string
        icon?: JSX.Element ;
        extra?: React.ReactNode;
    }[] = [
            {
                key: "vietqr",
                label: "VietQR",
                image: iconVietQR,
                extra: (
                    <div className="flex flex-wrap gap-2">
                        <Tag>VietQR</Tag>
                        <Tag>24/7</Tag>
                        <Tag color="green">Khuyến nghị</Tag>
                    </div>
                ),
            },
            {
                key: "tienmat",
                label: "Thanh toán tiền mặt",
                icon: <DollarOutlined />,
            },


        ];

    function handleApplyVoucher() {
        setApplyLoading(true);
        setTimeout(() => {
            setApplyLoading(false);
            Modal.success({
                title: "Áp dụng mã giảm giá",
                content:
                    voucher.trim() === ""
                        ? "Bạn chưa nhập mã."
                        : `Mã ${voucher} đã được áp dụng (demo).`,
            });
        }, 600);
    }

    return (
        <div className="min-h-screen max-w-[1200px] mx-auto ">


            <div className=" px-4 py-6 lg:py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Card
                            title={
                                <div className="flex items-center justify-between">
                                    <span>Bạn muốn thanh toán thế nào?</span>
                                    <Tooltip title="Thanh toán nhanh & an toàn qua các phương thức hỗ trợ">
                                        <InfoCircleOutlined className="text-slate-400" />
                                    </Tooltip>
                                </div>
                            }
                            className="shadow-sm"
                        >
                            <div className="space-y-3">
                                <Radio.Group
                                    className="w-full"
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                >
                                    <List
                                        split={true}
                                        dataSource={methods}
                                        renderItem={(item) => (
                                            <List.Item className="px-0!">
                                                <div className="w-full">
                                                    <label
                                                        className={`
  flex w-full cursor-pointer items-start gap-3 rounded-md p-3 transition
  ${method === item.key
                                                                ? "bg-blue-50 ring-1 ring-blue-200"
                                                                : "hover:bg-slate-50"
                                                            }
`}
                                                    >
                                                        <Radio value={item.key} className="mt-1" />
                                                        <div className="flex-1">
                                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                                <Space size={8}>
                                                                    { item.image && <img src={item.image} alt="" />}
                                                                    { item.icon && <span className="text-base">{item.icon}</span>}
                                                                    <Text className="font-medium">
                                                                        {item.label}
                                                                    </Text>
                                                                </Space>
                                                                {item.extra}
                                                            </div>

                                                            {method === "vietqr" && item.key === "vietqr" && (
                                                                <div className="mt-3 space-y-3">
                                                                    <Alert
                                                                        type="success"
                                                                        message={
                                                                            <div className="space-y-1 text-[13px]">
                                                                                <div>
                                                                                    • Quét mã VietQR và xác nhận trong
                                                                                    ứng dụng ngân hàng.
                                                                                </div>
                                                                                <div>
                                                                                    • QR có hiệu lực trong{" "}
                                                                                    <strong>15 phút</strong>. Chúng tôi
                                                                                    sẽ tự động xác nhận thanh toán trong
                                                                                    vài giây.
                                                                                </div>
                                                                                <div>
                                                                                    • Nếu không quét được, bạn có thể
                                                                                    <Text underline className="ml-1">
                                                                                        chuyển khoản thủ công
                                                                                    </Text>
                                                                                    .
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        showIcon={false}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                </Radio.Group>
                            </div>

                            <Divider className="my-6!" />
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="text-sm font-medium text-slate-700">
                                    Thêm mã giảm
                                </div>
                                <div className="flex flex-1 gap-2">
                                    <Input
                                        placeholder="Nhập mã khuyến mãi…"
                                        value={voucher}
                                        onChange={(e) => setVoucher(e.target.value)}
                                    />
                                    <Button
                                        loading={applyLoading}
                                        onClick={handleApplyVoucher}
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                                <Button type="link" className="text-slate-500">
                                    Thêm mã
                                </Button>
                            </div>

                            <Divider />
                            <div className="flex flex-col p-2 text-center">
                                <div className="flex justify-between w-full">
                                    <h2 className="font-bold text-2xl" >Tổng giá tiền</h2>
                                    <h2 className="font-bold text-2xl" >{VND.format(total)}</h2>
                                </div>

                                <Button color="danger" variant="solid" className="my-4 font-bold! text-xl! p-2!">
                                    Thanh toán
                                </Button>

                                <p>Bằng cách tiếp tục thanh toán, bạn đã đồng ý <span className="text-blue-500 font-bold">Điều khoản & Điều kiên</span> và <span className="text-blue-500 font-bold">Chính sách quyền riêng tư</span>.  </p>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <Title level={5} className="mb-1! mt-0!">
                                        Tóm tắt vé
                                    </Title>
                                    <Text type="secondary">Mã đặt chỗ: C6J 6C9</Text>
                                </div>

                            </div>

                            <Divider className="my-4!" />

                            <div className="space-y-3 text-sm">
                                <div className="font-medium">
                                    Vé tham quan Bảo tàng Vatican & Nhà nguyện Sistine
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="text-slate-500">Ngày</div>
                                    <div className="col-span-2">Th 7, 19 thg 8, 2025</div>

                                    <div className="text-slate-500">Suất</div>
                                    <div className="col-span-2">11:00</div>

                                    <div className="text-slate-500">Khách</div>
                                    <div className="col-span-2">1 người lớn</div>

                                </div>

                                <Divider className="my-4!" />
                                <div className="flex items-center justify-between">
                                    <Text type="secondary">Tạm tính</Text>
                                    <Text strong>{VND.format(total)}</Text>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Text type="secondary">Giảm giá</Text>
                                    <Text>- {VND.format(0)}</Text>
                                </div>
                                <Divider className="my-3!" />
                                <div className="flex items-center justify-between text-base">
                                    <span className="font-semibold">Tổng cộng</span>
                                    <span className="font-semibold">
                                        {VND.format(total)}
                                    </span>
                                </div>

                                <Alert
                                    className="mt-4"
                                    type="info"
                                    showIcon
                                    message="Sau khi thanh toán thành công, bạn sẽ nhận vé điện tử qua email."
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <Modal
                open={showQR}
                onCancel={() => setShowQR(false)}
                footer={null}
                title="Quét mã để thanh toán"
            >
                <div className="flex flex-col items-center gap-3">
                    <QRCode value="demo-vietqr://C6J6C9/2310986VND" />
                    <Text type="secondary" className="text-center">
                        Sử dụng ứng dụng ngân hàng bất kỳ để quét VietQR và xác nhận.
                    </Text>
                    <Button type="primary" onClick={() => setShowQR(false)}>
                        Tôi đã thanh toán
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
