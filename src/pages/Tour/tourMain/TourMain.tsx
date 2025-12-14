import FilterTour from "./components/FilterTour";
import FilterPrice from "./components/FilterPrice";
import SortComponent from "./components/SortComponent";
import ListCard from "./components/ListCard";
import SearchLocation from "./components/SearchLocation";
import { useCallback, useEffect, useState } from "react";
import type { TravelCardProps } from "./components/TravelCard";
import FullPageLoader from "../../../common/Loading";
import { getUser, tourAPI, tourImageAPI, tourDepartureAPI } from "../../../services/api";

export const TourMain = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [dataTour, setDataTour] = useState<TravelCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 6, total: 0, totalPages: 0 });
    
    const [range, setRange] = useState([0, 4000000]);
    const [inputData, setInputData] = useState("");
    const [idCategory, setIdCategory] = useState(0);
    const [wayToSort, setWayToSort] = useState(0);
    const [location, setLocation] = useState('');
    
    const fetchUser = useCallback(async () => {
        try {
            const res = await getUser();
            // console.log("af",res);
            
            if (res) setIsLogin(true)
        } catch (err) {
            setIsLogin(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const sortMapping: { [key: number]: { sortBy: string, sortOrder: 'asc' | 'desc' } } = {
        1: { sortBy: 'basePrice', sortOrder: 'asc' },
        2: { sortBy: 'basePrice', sortOrder: 'desc' },
        3: { sortBy: 'rating', sortOrder: 'desc' },
        4: { sortBy: 'rating', sortOrder: 'asc' },
    };

    const fetchTours = useCallback(async (page: number = 1) => {
        setLoading(true);
        try {
            const params: any = {
                page,
                pageSize: 6,
            };

            if (idCategory !== 0) params.categoryId = idCategory;
            if (inputData) params.search = inputData;
            if (location) params.location = location;
            if (range[0] > 0) params.minPrice = range[0];
            if (range[1] < 4000000) params.maxPrice = range[1];
            
            // Chỉ gửi sortBy/sortOrder cho backend nếu sort theo price
            if (wayToSort !== 0 && sortMapping[wayToSort] && wayToSort <= 2) {
                params.sortBy = sortMapping[wayToSort].sortBy;
                params.sortOrder = sortMapping[wayToSort].sortOrder;
            }

            const response = await tourAPI.getPaginated(params);
            
            if (!response || !response.data) {
                console.error('Invalid response:', response);
                setDataTour([]);
                setPagination({ page: 1, pageSize: 6, total: 0, totalPages: 0 });
                return;
            }

            // const tourIds = response.data.map((tour: any) => tour.id);
            const [imagesData, departuresData] = await Promise.all([
                tourImageAPI.getAll(),
                tourDepartureAPI.getAll()
            ]);
let mappedTours: TravelCardProps[] = (response.data || []).map((item: any) => ({
                id: item.id,
                image: imagesData.data.find((img: any) => img.tourId === item.id)?.url || '',
                title: item.name,
                address: item.address,
                rating: item.averageRating || 0,
                reviews: item.totalReviews || 0,
                price: departuresData.data.find((dep: any) => dep.tourId === item.id)?.price || item.basePrice,
                oldPrice: item.basePrice,
                categoryId: item.categoryId,
                location: item.address,
            }));

            if (wayToSort === 3) {
                mappedTours.sort((a, b) => b.rating - a.rating);
            } else if (wayToSort === 4) {
                mappedTours.sort((a, b) => a.rating - b.rating);
            }

            setDataTour(mappedTours);
            setPagination(response.pagination || { page: 1, pageSize: 6, total: 0, totalPages: 0 });
        } catch (error) {
            console.error('Error fetching tours:', error);
            setDataTour([]);
        } finally {
            setLoading(false);
        }
    }, [idCategory, inputData, location, range, wayToSort]);

    useEffect(() => {
        fetchTours(1);
    }, [fetchTours]);

    if (loading && dataTour.length === 0) {
        return <FullPageLoader />;
    }

    return (
        <div className="mx-auto w-full max-w-[1200px] px-2 md:px-6 mt-25">
            <div className="mt-10 flex flex-col items-center justify-center w-full">
                <div className="w-full flex flex-col lg:flex-row gap-6 items-start lg:relative">
                    <div className="flex flex-col gap-5 lg:w-[320px] min-w-[280px] mx-auto mb-6 lg:mb-0 lg:sticky lg:top-25">
                        <FilterPrice range={range} setRange={setRange}/>
                        <FilterTour setIdCategory={setIdCategory}/>
                    </div>
                    <div className="flex-1 flex flex-col gap-5 sticky top-4">
                        <SearchLocation setInputData={setInputData} setLocation={setLocation}/>
                        <SortComponent setWayToSort={setWayToSort} tourLength={pagination.total}/>
                        <ListCard 
                            dataTour={dataTour} 
                            isLogin={isLogin}
                            pagination={pagination}
                            loading={loading}
                            onPageChange={(page) => fetchTours(page)}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-20"></div>
            <div className="w-full flex justify-center mt-20"></div>
        </div>
    );
};
