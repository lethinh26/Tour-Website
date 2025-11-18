import FilterTour from "./components/FilterTour"
import FilterPrice from "./components/FilterPrice"
import SortComponent from "./components/SortComponent"
import ListCard from "./components/ListCard"
import BannerTour from "./components/BannerTour"

export const TourMain = () => {
    return (
        <>
            <div className="border-t border-b border-gray-400">
                <BannerTour/>
            </div>
        <div className="mx-auto w-3/4">
            <div className="mt-10 flex flex-col items-center justify-center w-full px-10">
                <div className="w-7xl flex gap-10">
                    <div className="flex flex-col w-85 gap-5">
                        <FilterPrice/>
                        <FilterTour/>
                    </div>
                    <div className="w-215 flex flex-col gap-5">
                        <SortComponent/>
                        <ListCard/>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-20">
            </div>
            <div className="w-full flex justify-center mt-20">
            </div>
        </div>
        </>
    )
}
