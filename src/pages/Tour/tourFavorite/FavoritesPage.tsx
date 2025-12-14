import { Card, Button, Empty, Tooltip, Pagination } from "antd";
import { EnvironmentOutlined, TagFilled, TagOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { favoriteTourAPI, tourImageAPI, categoryAPI } from "../../../services/api";


interface FavoriteItem {
    id: number;
    title: string;
    image: string;
    price: number;
    location: string;
    subtitle: string | undefined;
    tagActive: boolean
}

const FavoritesPage = () => {
    const [token] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 3
    const [favoriteItem, setFavoriteItem] = useState<FavoriteItem[]>([])

    useEffect(() => {
        fetchFavorites();
    }, [token])

    const fetchFavorites = async () => {
        if (!token) return;
        
        try {
            const [favData, imagesRes, categoriesRes] = await Promise.all([
                favoriteTourAPI.getByToken(token),
                tourImageAPI.getAll(),
                categoryAPI.getAll()
            ]);

            const items = Array.isArray(favData.data?.tourFavorited) ? favData.data.tourFavorited.map((item: any) => {
                const imgObj = imagesRes.data.find((img: any) => img.tourId == item.id);
                return {
                    id: item.id,
                    title: item.name,
                    image: imgObj?.url || '',
                    price: item.basePrice,
                    location: item.address,
                    subtitle: categoriesRes.data.find((cate: any) => cate.id == item.categoryId)?.name,
                    tagActive: true
                }
            }) : [];

            setFavoriteItem(items);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setFavoriteItem([]);
        }
    }

    const handleUnFavorite = async (tourId: number) => {
        if (!token) return;
        return favoriteTourAPI.remove(token, tourId);
    }

    const handleSaveFavorite = async (id: number) => {
        if (!token) return;
        try {
            const res = await favoriteTourAPI.add(token, id);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeTag = (tourId: number) => {
        setFavoriteItem((prev) => {
            return prev.map(item => { return { ...item, tagActive: item.id == tourId ? !item.tagActive : item.tagActive } })
        })
    }



    return (
        <div className="min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Danh sách đã lưu</h1>
                    <p className="text-gray-600 mt-2">Nội lưu giữ những sản phẩm yêu thích của bạn!</p>
                </div>
                {favoriteItem.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12">
                        <Empty description="Chưa có sản phẩm yêu thích nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {favoriteItem.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                            .map((item) => (
                                <div className="flex flex-col gap-8" key={item.id}>
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
                                                            <Tooltip title={item.tagActive ? "Huỷ Yêu Thích" : "Yêu Thích"}>
                                                                <div className="bg-white bg-opacity-80 rounded-full p-1 w-8 h-8 flex justify-center items-center cursor-pointer "
                                                                    onClick={() => {
                                                                        handleChangeTag(item.id)
                                                                        if (item.tagActive) { handleUnFavorite(item.id) } else { handleSaveFavorite(item.id) }

                                                                    }}
                                                                >
                                                                    {item.tagActive ? <TagFilled className="text-gray-400 text-lg hover:text-2xl" />
                                                                        : <TagOutlined className="text-gray-400 text-lg hover:text-2xl" />}
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
                                                            <p className="text-2xl font-bold text-red-600!">{item.price} VND</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button type="primary" onClick={() => {
                                                                navigate(`/tour/${item.id}`
                                                                )
                                                            }}
                                                            >Xem chi tiết</Button>
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
                <div className="mt-10">
                    <Pagination align="center"
                        defaultCurrent={1}
                        pageSize={pageSize}
                        onChange={setCurrentPage}
                        total={favoriteItem.length}
                    />
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
