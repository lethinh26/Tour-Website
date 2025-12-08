import { useState, useEffect } from "react";
import { Card, Select, Table, Tag, Spin, App } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { bookingAPI, getUser } from "../../../services/api";
import icon_bus from "../../../assets/icons/icon_bus.png";
import icon_person from "../../../assets/icons/icon_person.png";
import icon_schedule from "../../../assets/icons/icon_schedule.png";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'TOUR_MANAGER' | 'USER';
}

interface TopTour {
  key: string;
  rank: number;
  tourName: string;
  location: string;
  bookingCount: number;
}

const Dashboard = () => {
  const { notification } = App.useApp();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [viewType, setViewType] = useState<"month" | "quarter">("month");

  const [customerCount, setCustomerCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [tourCount, setTourCount] = useState(0);
  const [topTours, setTopTours] = useState<TopTour[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchStatistics();
    }
  }, [user, selectedYear]);



  const fetchUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể lấy thông tin người dùng',
        placement: 'topRight',
      });
    }
  };

  const fetchStatistics = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const isAdmin = user.role === 'ADMIN';

      const customerRes = isAdmin 
        ? await bookingAPI.countAllCustomers()
        : await bookingAPI.countCustomers();
      setCustomerCount(customerRes.count);

      const bookingRes = isAdmin
        ? await bookingAPI.countAllBookingsSuccess()
        : await bookingAPI.countBookingSuccess();
      setBookingCount(bookingRes.count);

      const tourRes = await bookingAPI.countTours();
      setTourCount(tourRes.count);

      const topToursRes = isAdmin
        ? await bookingAPI.topTourAll(10)
        : await bookingAPI.topTour(10);
      
      const formattedTours: TopTour[] = topToursRes.map((tour: any, index: number) => ({
        key: tour.tourId.toString(),
        rank: index + 1,
        tourName: tour.tourName,
        location: tour.location || 'N/A',
        bookingCount: tour.bookingCount,
      }));
      setTopTours(formattedTours);

      const revenuePromises = Array.from({ length: 12 }, (_, i) => 
        isAdmin 
          ? bookingAPI.monthlyRevenueAll(i + 1, selectedYear)
          : bookingAPI.monthlyRevenue(i + 1, selectedYear)
      );
      const revenueResults = await Promise.all(revenuePromises);
      const revenues = revenueResults.map(res => res.totalRevenue);
      setMonthlyRevenue(revenues);

    } catch (error: any) {
      notification.error({
        message: 'Lỗi',
        description: error.response?.data?.message || 'Không thể tải thống kê',
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      icon: icon_bus,
      count: `${tourCount}`,
      label: "Tour",
    },
    {
      icon: icon_person,
      count: `${customerCount}`,
      label: "Khách hàng",
    },
    {
      icon: icon_schedule,
      count: `${bookingCount}`,
      label: "Đơn đặt tour",
    },
  ];

  const quarterlyRevenue = [
    monthlyRevenue[0] + monthlyRevenue[1] + monthlyRevenue[2],
    monthlyRevenue[3] + monthlyRevenue[4] + monthlyRevenue[5],
    monthlyRevenue[6] + monthlyRevenue[7] + monthlyRevenue[8],
    monthlyRevenue[9] + monthlyRevenue[10] + monthlyRevenue[11],
  ];

  const chartData = {
    labels: viewType === "month"
      ? ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
      : ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
    datasets: [
      {
        label: `Doanh thu năm ${selectedYear}`,
        data: viewType === "month" ? monthlyRevenue : quarterlyRevenue,
        backgroundColor: "#4bc0c0",
        borderColor: "#4bc0c0",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Thống kê doanh thu ${user?.role === 'ADMIN' ? '(Toàn hệ thống)' : '(Tour của bạn)'}`,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
          }
        }
      },
    },
  };

  const topToursColumns: ColumnsType<TopTour> = [
    {
      title: "Top",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      align: "center",
      render: (rank: number) => (
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-base text-white mx-auto"
          style={{ backgroundColor: rank <= 3 ? "#FFD700" : "#E0E0E0", color: rank <= 3 ? "#FFF" : "#333" }}
        >
          {rank}
        </div>
      ),
    },
    {
      title: "Tour",
      dataIndex: "tourName",
      key: "tourName",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Lượt đặt",
      dataIndex: "bookingCount",
      key: "bookingCount",
      align: "center",
      render: (count: number) => (
        <Tag color="blue" className="text-sm font-medium">
          {count}
        </Tag>
      ),
    },
  ];

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">
        Dashboard {user?.role === 'ADMIN' ? '- ADMIN' : '- Tour Manager'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className="rounded-lg shadow-md text-center"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl! font-bold m-0 text-blue-500!">{card.count}</p>
                <p className="text-base text-gray-500 m-0">{card.label}</p>
              </div>
              <img src={card.icon} alt={card.label} className="w-15 h-15" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
          <h2 className="text-lg font-bold">Biểu đồ doanh thu</h2>
          <div className="flex gap-2">
            <Select
              value={viewType}
              onChange={(value) => setViewType(value)}
              className="w-36"
              options={[
                { label: "Theo tháng", value: "month" },
                { label: "Theo quý", value: "quarter" },
              ]}
            />
            <Select
              value={selectedYear}
              onChange={(value) => setSelectedYear(value)}
              className="w-28"
              options={[
                { label: "2024", value: 2024 },
                { label: "2025", value: 2025 },
              ]}
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </Card>

      <Card className="rounded-lg shadow-md mt-8!">
        <h2 className="text-lg font-bold mb-5">
          Top Tour phổ biến {user?.role === 'ADMIN' ? '(Toàn hệ thống)' : '(Của bạn)'}
        </h2>
        <Table
          columns={topToursColumns}
          dataSource={topTours}
          pagination={{ pageSize: 10 }}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
