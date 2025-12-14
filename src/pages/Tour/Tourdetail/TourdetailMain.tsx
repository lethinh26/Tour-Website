import InfoHeader from "./components/InfoHeader";
import Section from "./components/Section";
import HeadT from "./components/HeadT";
import "react-day-picker/style.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShowMore from "./components/ShowMore";
import FullPageLoader from "../../../common/Loading";
import ReviewCard from "./components/ReviewCard";
import { tourAPI, tourImageAPI, reviewAPI } from "../../../services/api";
import type { Tour, TourImage } from "../../../types/types";

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export default function TourDetailMain() {
    const id = Number(useParams().id)
    const [tour, setTour] = useState<Tour | null>(null);
    const [images, setImages] = useState<TourImage[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchTourDetail();
    }, [id]);

    const fetchTourDetail = async () => {
        setLoading(true);
        try {
            const [tourRes, imagesData, reviewsData] = await Promise.all([
                tourAPI.getById(id),
                tourImageAPI.getByTourId(id),
                reviewAPI.getByTourId(id)
            ]);

            setTour(tourRes.data);
            setImages(imagesData.data);
            setReviews(reviewsData.data);
            
            if (reviewsData.data && reviewsData.data.length > 0) {
                const totalRating = reviewsData.data.reduce((sum: number, review: any) => sum + review.rating, 0);
                setAverageRating(Number((totalRating / reviewsData.data.length).toFixed(1)));
                setTotalReviews(reviewsData.data.length);
            }
        } catch (error) {
            console.error('Error fetching tour detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const htmlObjectDesciption = { __html: tour?.description || ""};
    const htmlObjectInfomation = { __html: tour?.information || ""};
    
    if(loading){
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
