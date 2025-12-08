import InfoHeader from "./components/InfoHeader";
import Section from "./components/Section";
import HeadT from "./components/HeadT";
import "react-day-picker/style.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { fetchDataTourDetail } from "../../../stores/slides/tourDetail.slice";
import type { AppDispatch, StoreType } from "../../../stores";
import ShowMore from "./components/ShowMore";
import FullPageLoader from "../../../common/Loading";
import ReviewCard from "./components/ReviewCard";

export default function TourDetailMain() {
    const id = Number(useParams().id)
    
    const dispatch = useDispatch<AppDispatch>()
    useEffect( () => {
        dispatch(fetchDataTourDetail(id))
    },[dispatch, id])
    
    const {tour, images, reviews, averageRating, totalReviews, status} = useSelector((state: StoreType) => state.tourDetailReducer)
    const htmlObjectDesciption = { __html: tour?.description || ""};
    const htmlObjectInfomation = { __html: tour?.information || ""};
    if(status == 'loading'){
        return <FullPageLoader/>
    }
    else return (
        <div className="min-h-screen">
            <HeadT images={images}/>
            <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-[1200px] px-2 md:px-6 py-10">
                    <InfoHeader tour={tour}/>
                    <Section title={`Về ${tour?.name}`}>
                        <div dangerouslySetInnerHTML={htmlObjectDesciption}/>
                        
                    </Section>
                    
                    
                    <Section title="Thông tin chung">
                        
                        <div className="w-full mx-auto">
                            <ShowMore
                                content={htmlObjectInfomation}
                                maxHeightClass="max-h-36"
                                truncateText="... Xem chi tiết"
                                expandText="Thu gọn"
                            />
                        </div>
                        
                    </Section>

                    <ReviewCard 
                        reviews={reviews} 
                        averageRating={averageRating} 
                        totalReviews={totalReviews} 
                    />
                </div>
            </div>
        </div>
    )
}
