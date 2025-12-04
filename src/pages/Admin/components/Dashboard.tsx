import React, { useState, useMemo } from "react";
import { Card, Select, Table, Tag } from "antd";
import { HeartOutlined, ShoppingOutlined, ShoppingCartOutlined, TrophyOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import icon_achievement from "../../../assets/icons/icon_achievement.png"
import icon_bus from "../../../assets/icons/icon_bus.png"
import icon_person from "../../../assets/icons/icon_person.png"
import icon_schedule from "../../../assets/icons/icon_schedule.png"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Dashboard = () => {
    const [selectedYear, setSelectedYear] = useState<number>(2025);
    const [viewType, setViewType] = useState<"month" | "quarter">("month");

    const statsCards = [
        {
            icon: icon_bus,
            count: "178+",
            label: "Tours",
        },
        {
            icon: icon_person,
            count: "20+",
            label: "Customers",
        },
        {
            icon: icon_schedule,
            count: "190+",
            label: "Booking",
        },
    ];

    const revenueDataByMonth = {
        2024: [120000000, 150000000, 180000000, 200000000, 220000000, 250000000, 280000000, 260000000, 240000000, 300000000, 320000000, 350000000],
        2025: [160000000, 180000000, 210000000, 240000000, 270000000, 300000000, 320000000, 310000000, 290000000, 340000000, 360000000, 380000000],
    };

    const revenueDataByQuarter = {
        2024: [450000000, 670000000, 780000000, 970000000],
        2025: [550000000, 810000000, 920000000, 1080000000],
    };

    interface TopTour {
        key: string;
        rank: number;
        tourName: string;
        location: string;
        bookings: number;
    }

    const topTours: TopTour[] = [
        {
            key: "1",
            rank: 1,
            tourName: "Du lịch Hạ Long - Ninh Bình 3N2Đ",
            location: "Quảng Ninh",
            bookings: 156,
        },
        {
            key: "2",
            rank: 2,
            tourName: "Phú Quốc - Đảo Ngọc 4N3Đ",
            location: "Kiên Giang",
            bookings: 142,
        },
        {
            key: "3",
            rank: 3,
            tourName: "Đà Nẵng - Hội An - Huế 5N4Đ",
            location: "Đà Nẵng",
            bookings: 128,
        },
        {
            key: "4",
            rank: 4,
            tourName: "Nha Trang - Vinpearl 3N2Đ",
            location: "Khánh Hòa",
            bookings: 115,
        },
        {
            key: "5",
            rank: 5,
            tourName: "Sapa - Fansipan 3N2Đ",
            location: "Lào Cai",
            bookings: 98,
        },
        {
            key: "6",
            rank: 6,
            tourName: "Đà Lạt - Thành phố Ngàn Hoa 4N3Đ",
            location: "Lâm Đồng",
            bookings: 87,
        },
        {
            key: "7",
            rank: 7,
            tourName: "Mũi Né - Phan Thiết 2N1Đ",
            location: "Bình Thuận",
            bookings: 76,
        },
        {
            key: "8",
            rank: 8,
            tourName: "Cần Thơ - Miệt Vườn 3N2Đ",
            location: "Cần Thơ",
            bookings: 65,
        },
    ];

    const topToursColumns: ColumnsType<TopTour> = [
        {
            title: "Rank",
            dataIndex: "rank",
            key: "rank",
            width: 80,
            render: (rank: number) => (
                <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                        rank === 1 ? "bg-yellow-500" : rank === 2 ? "bg-gray-400" : rank === 3 ? "bg-orange-600" : "bg-blue-500"
                    }`}
                >
                    {rank}
                </div>
            ),
        },
        {
            title: "Tour Name",
            dataIndex: "tourName",
            key: "tourName",
            render: (text: string) => <span className="font-medium text-gray-800">{text}</span>,
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            width: 150,
            render: (text: string) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: "Bookings",
            dataIndex: "bookings",
            key: "bookings",
            width: 120,
            render: (bookings: number) => <span className="font-semibold text-blue-600">{bookings}</span>,
        },
    ];

    const chartData = useMemo(() => {
        const labels =
            viewType === "month" ? ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"] : ["Quý 1", "Quý 2", "Quý 3", "Quý 4"];

        const data =
            viewType === "month"
                ? revenueDataByMonth[selectedYear as keyof typeof revenueDataByMonth] || []
                : revenueDataByQuarter[selectedYear as keyof typeof revenueDataByQuarter] || [];

        return {
            labels,
            datasets: [
                {
                    label: "Doanh thu (VNĐ)",
                    data,
                    backgroundColor: "#60A5FA",
                    borderColor: "#3B82F6",
                    borderWidth: 1,
                    borderRadius: 6,
                    barThickness: viewType === "month" ? 30 : 60,
                },
            ],
        };
    }, [selectedYear, viewType]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
                backgroundColor: "#1F2937",
                padding: 12,
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#374151",
                borderWidth: 1,
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || "";
                        if (label) {
                            label += ": ";
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#6B7280",
                    font: {
                        size: 12,
                        weight: 500,
                    },
                },
            },
            y: {
                grid: {
                    color: "#F3F4F6",
                    drawBorder: false,
                },
                ticks: {
                    color: "#6B7280",
                    font: {
                        size: 11,
                    },
                    callback: function (value: any) {
                        return (value / 1000000).toFixed(0) + "M";
                    },
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statsCards.map((stat, index) => (
                    <Card key={index} className="rounded-xl border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                              <img src={stat.icon} alt="" width={36}/>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{stat.count}</h3>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Báo cáo doanh thu</h2>
                    <div className="flex gap-3">
                        <Select
                            value={viewType}
                            onChange={setViewType}
                            style={{ width: 120 }}
                            options={[
                                { value: "month", label: "Theo tháng" },
                                { value: "quarter", label: "Theo quý" },
                            ]}
                        />
                        <Select
                            value={selectedYear}
                            onChange={setSelectedYear}
                            style={{ width: 100 }}
                            options={[
                                { value: 2024, label: "2024" },
                                { value: 2025, label: "2025" },
                            ]}
                        />
                    </div>
                </div>

                <div className="h-80">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </Card>

            <Card className="mt-8!">
                <div className="flex items-center gap-2 mb-6">
                              <img src={icon_achievement} alt="" width={36}/>
                  
                    <h2 className="text-lg font-semibold text-gray-800">Top Tour Bán Chạy</h2>
                </div>

                <Table columns={topToursColumns} dataSource={topTours} pagination={false} scroll={{ x: 800 }} />
            </Card>
        </div>
    );
};

export default Dashboard;
