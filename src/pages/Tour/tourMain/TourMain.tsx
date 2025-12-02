import FilterTour from "./components/FilterTour";
import FilterPrice from "./components/FilterPrice";
import SortComponent from "./components/SortComponent";
import ListCard from "./components/ListCard";
import SearchLocation from "./components/SearchLocation";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../stores/slides/tour.slide";
import { useEffect, useState } from "react";
import type { AppDispatch, StoreType } from "../../../stores";
import type { TravelCardProps } from "./components/TravelCard";
import FullPageLoader from "../../../common/Loading";

export const TourMain = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    
    
    const { tours, images, departures, status } = useSelector((state: StoreType) => state.tourReducer);

    

    const dataTour: TravelCardProps[] = tours.map(item => {
        return {
            id: item.id,
            image: images.find(img => img.tourId === item.id)?.url || '',
            title: item.name,
            address: item.address,
            rating: 5.0,
            reviews: 5,
            price: departures.find(dep => dep.tourId === item.id)?.price || item.basePrice,
            oldPrice: item.basePrice,
            categoryId: item.categoryId,
            location: item.address,
        }
    })
    const [range, setRange] = useState([0, 4000000]);
    const [inputData, setInputData] = useState("");
    const [idCategory, setIdCategory] = useState(0)
    const [wayToSort, setWayToSort] = useState(0)
    const [location, setLocation] = useState('')    

    const sortFunctions: { [key: string]: (a: TravelCardProps, b: TravelCardProps) => number } = {
        1: (a, b) => Number(a.price) - Number(b.price), // Giá thấp đến cao
        2: (a, b) => Number(b.price) - Number(a.price), // Giá cao đến thấp
        3: (a, b) => b.rating - a.rating,               // Đánh giá cao đến thấp
        4: (a, b) => a.rating - b.rating,               // Đánh giá thấp đến cao
    };
    if (status == 'loading'){
        return <>
            <FullPageLoader/>
        </>
    }
    else

    return (
        <div className="mx-auto w-full max-w-[1200px] px-2 md:px-6">
            <div className="mt-10 flex flex-col items-center justify-center w-full">
                <div className="w-full flex flex-col lg:flex-row gap-6 items-start lg:relative">
                    <div className="flex flex-col gap-5 w-full lg:w-[320px] min-w-[280px] mb-6 lg:mb-0 lg:sticky lg:top-10">
                        <FilterPrice range={range} setRange={setRange}/>
                        <FilterTour setIdCategory={setIdCategory}/>
                    </div>
                    <div className="flex-1 flex flex-col gap-5 sticky top-4">
                        <SearchLocation setInputData={setInputData} setLocation={setLocation}/>
                        <SortComponent setWayToSort={setWayToSort}/>
                        <ListCard dataTour={dataTour
                        .sort(wayToSort !== 0 ? sortFunctions[wayToSort] : () => 0)
                        .filter(item => location === '' ? true : item.address.toLowerCase().includes(location.toLowerCase()))
                        .filter(item => item.title.toLowerCase().includes(inputData.toLowerCase()))
                        .filter(item => idCategory == 0 ? true : item.categoryId === idCategory)
                        .filter(item => {
                            if (range[1] === 4000000){
                                return Number(item.price) >= range[0]
                            }else{
                                return Number(item.price) >= range[0] && Number(item.price) <= range[1]
                            } 
                        })} />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-20"></div>
            <div className="w-full flex justify-center mt-20"></div>
        </div>
    );
};
