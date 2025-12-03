import { Card, Button, Empty, Tooltip } from "antd";
import { HeartFilled, EnvironmentOutlined, TagOutlined } from "@ant-design/icons";

interface FavoriteItem {
    id: number;
    title: string;
    subtitle: string;
    location: string;
    price: string;
    image: string;
    tag?: string;
}

const FavoritesPage = () => {
    const favorites: FavoriteItem[] = [
        {
            id: 1,
            title: "Thẻ Thông Hành Đường Sắt Châu Âu Eurail Global Pass",
            subtitle: "Hoạt động & Vui chơi",
            location: "Panaczeew",
            price: "8.723.431 VND",
            image: "",
        },
        {
            id: 2,
            title: "Vé tham quan Bảo tàng Vatican và Nhà nguyện Sistine",
            subtitle: "Hoạt động & Vui chơi",
            location: "Thành phố Vatican",
            price: "2.310.986 VND",
            image: "",
        },
    ];

    const handleRemoveFavorite = (id: number) => {
        console.log("Remove favorite:", id);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Danh sách đã lưu</h1>
                    <p className="text-gray-600 mt-2">Nội lưu giữ những sản phẩm yêu thích của bạn!</p>
                </div>

                {favorites.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12">
                        <Empty description="Chưa có sản phẩm yêu thích nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {favorites.map((item) => (
                            <div className="flex flex-col gap-8">
                                <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="relative md:w-48 h-48 md:h-auto">
                                            <div className="w-full h-full bg-gray-200 rounded-l-lg overflow-hidden">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                        </div>

                                        <div className="flex-1 p-6">
                                            <div className="flex flex-col h-full justify-between">
                                                <div>
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-500 mb-1">{item.subtitle}</p>
                                                            <h2 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h2>
                                                        </div>
                                                        <Tooltip title="Yêu thích">
                                                            <div className="bg-white bg-opacity-80 rounded-full p-1 w-8 h-8 flex justify-center items-center cursor-pointer ">
                                                                <TagOutlined className="text-gray-400 text-lg" />
                                                            </div>
                                                        </Tooltip>
                                                    </div>

                                                    <div className="flex items-center text-gray-600 mb-3">
                                                        <EnvironmentOutlined className="mr-1" />
                                                        <span className="text-sm">{item.location}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t">
                                                    <div>
                                                        <p className="text-2xl font-bold text-red-500">{item.price}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button type="default" onClick={() => handleRemoveFavorite(item.id)}>
                                                            Xóa
                                                        </Button>
                                                        <Button type="primary">Xem chi tiết</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
