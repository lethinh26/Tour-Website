import FilterTour from "./components/FilterTour";
import FilterPrice from "./components/FilterPrice";
import SortComponent from "./components/SortComponent";
import ListCard from "./components/ListCard";
import SearchLocation from "./components/SearchLocation";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../stores/slides/tour.slide";
import { useEffect } from "react";
import type { AppDispatch, StoreType } from "../../../stores";

export const TourMain = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tourStore = useSelector((state: StoreType) => state.dataReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    console.log(tourStore);
    
    return (
        <div className="mx-auto w-full max-w-[1200px] px-2 md:px-6">
            <div className="mt-10 flex flex-col items-center justify-center w-full">
                <div className="w-full flex flex-col lg:flex-row gap-6 items-start lg:relative">
                    <div className="flex flex-col gap-5 w-full lg:w-[320px] min-w-[280px] mb-6 lg:mb-0 lg:sticky lg:top-10">
                        <FilterPrice />
                        <FilterTour />
                    </div>
                    <div className="flex-1 flex flex-col gap-5 sticky top-4">
                        <SearchLocation />
                        <SortComponent />
                        <ListCard />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-20"></div>
            <div className="w-full flex justify-center mt-20"></div>
        </div>
    );
};
