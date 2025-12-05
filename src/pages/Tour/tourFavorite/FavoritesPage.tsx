import { Card, Button, Empty, Tooltip, Pagination } from "antd";
import { EnvironmentOutlined, TagFilled, TagOutlined } from "@ant-design/icons";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { Tour } from "../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, StoreType } from "../../../stores";
import { fetchData } from "../../../stores/slides/tour.slide";
import { useNavigate } from "react-router";


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
    const dispatch = useDispatch<AppDispatch>()

    const [dataFavorite, setDataFavorite] = useState<Tour[]>([])
    const [token] = useState(localStorage.getItem('token'))
    const { images, categories } = useSelector((state: StoreType) => state.tourReducer)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 3
    const [favoriteItem, setFavoriteItem] = useState<FavoriteItem[]>([])

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    useEffect(() => {
        getDataFavoriteTours().then((data) => {
            // setDataFavorite(data.tourFavorited)

            setFavoriteItem(() => {
                return data.tourFavorited.map(item => {
                    return {
                        id: item.id,
                        title: item.name,
                        image: images.filter(img => img.tourId == item.id)[0].url,
                        price: item.basePrice,
                        location: item.address,
                        subtitle: categories.find(cate => cate.id == item.categoryId)?.name,
                        tagActive: true
                    }
                })
            })
        }).catch((error) => {
            setDataFavorite([])
        })
    }, [images, categories])
    const getDataFavoriteTours = async () => {
        try {
            // const res = await axios.get(`http://localhost:3000/api/favoriteTours/${token}`)
            const res = await axios.get(`http://localhost:3000/api/favoriteTours/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY0ODUzODY2LCJleHAiOjE3NjQ5NDAyNjZ9.b8FnWCR3Mk5zmRkKWR5mJ1pv1zWxKy1-Dvwq_e3hNaQ`)
            return res.data
        } catch (error: AxiosError | any) {
            return error.response.message
        }
    }

    

    const favorites: FavoriteItem[] = dataFavorite ? dataFavorite.map((item) => {
        return {
            id: item.id,
            title: item.name,
            image: images.filter(img => img.tourId == item.id)[0].url,
            price: item.basePrice,
            location: item.address,
            subtitle: categories.find(cate => cate.id == item.categoryId)?.name,
            tagActive: true
        }
    }) : []

    const handleUnFavorite = async (tourId: number) => {
        if (!token) {
            return
        }
        return axios.delete('http://localhost:3000/api/favoriteTours', {
            data: {
                token,
                tourId
            }
        })
    }

    const handleSaveFavorite = async (id: number) => {
        try {
            const res = await axios.post('http://localhost:3000/api/favoriteTours', {
                token,
                tourId: id
            })
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
                                                            <p className="text-2xl font-bold text-red-500">{item.price} VND</p>
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
                        total={Math.ceil(favorites.length)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
