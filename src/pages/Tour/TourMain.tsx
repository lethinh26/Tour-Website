import FilterTour from "./components/FilterTour"
import FilterPrice from "./components/FilterPrice"
import FilterMore from "./components/FilterMore"
import SortComponent from "./components/SortComponent"
import ListCard from "./components/ListCard"
import Introduce from "./components/Introduce"
import ListInfomation from "./components/ListInfomation"

export const TourMain = () => {
    return (
        <>
            <div className="py-10 border-t border-b border-gray-400">
                <h1 className="text-4xl font-bold text-center">Tour Main Page</h1>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center w-full px-10">
                <div className="w-7xl flex gap-10">
                    <div className="flex flex-col w-85 gap-5">
                        <FilterPrice/>
                        <FilterTour/>
                        <FilterMore/>
                    </div>
                    <div className="w-215 flex flex-col gap-5">
                        <SortComponent/>
                        <ListCard/>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-20">
                <Introduce/>
            </div>
            <div className="w-full flex justify-center mt-20">
                <ListInfomation/>
            </div>
        </>
    )
}
