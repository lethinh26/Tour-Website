export interface TravelCardProps {
    image: string;
    title: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
}

function TravelCard({propTravel}: {propTravel: TravelCardProps}) {
    const { image, title, location, rating, reviews, price, oldPrice } = propTravel;
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition border border-gray-200 w-72">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-3 space-y-2">
                <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500 flex items-center">
                    📍 <span className="ml-1">{location}</span>
                </p>
                <p className="text-xs text-blue-500 font-medium">
                    ⭐ {rating.toFixed(1)} ({reviews} đánh giá)
                </p>

                <div className="flex items-center space-x-1 text-xs text-green-600 font-medium">
                    <span>✔️ Easy Refund</span>
                </div>

                <div className="pt-1">
                    <p className="text-xs text-gray-500">Starting from</p>
                    <div className="flex items-baseline space-x-2">
                        <p className="text-orange-600 font-bold text-base">
                            {price.toLocaleString()} VND
                        </p>
                        {oldPrice && (
                            <p className="text-xs text-gray-400 line-through">
                                {oldPrice.toLocaleString()} VND
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelCard;
