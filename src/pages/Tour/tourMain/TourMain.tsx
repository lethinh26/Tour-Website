import FilterTour from "./components/FilterTour";
import FilterPrice from "./components/FilterPrice";
import SortComponent from "./components/SortComponent";
import ListCard from "./components/ListCard";
import SearchLocation from "./components/SearchLocation";

export const TourMain = () => {
    return (
        <div className="mx-auto w-[1200px] ">
            <div className="mt-10 flex flex-col items-center justify-center w-full">
                <div className="w-full flex gap-6 items-start relative ">
                    <div className="flex flex-col gap-5 w-[320px] min-w-[280px] sticky top-10">
                        <FilterPrice />
                        <FilterTour />
                    </div>
                    <div className="flex-1 flex flex-col gap-5">
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
