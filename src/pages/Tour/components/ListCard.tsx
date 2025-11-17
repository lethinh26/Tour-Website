import TravelCard from "./TravelCard";

function ListCard(){
    const data = [
        {
            image: "https://example.com/mollyfantasy.jpg",
            title: "Mollyfantasy AEON Deltamas",
            location: "Cikarang Pusat, Bekasi",
            rating: 4.6,
            reviews: 8,
            price: 15762,
        },
        {
            image: "https://example.com/skuter.jpg",
            title: "SKUTER IN SURABAYA",
            location: "Surabaya, Surabaya",
            rating: 4.8,
            reviews: 6,
            price: 18914,
        },
        {
            image: "https://example.com/jjpark.jpg",
            title: "JJ PARK AND PLAY",
            location: "Boja, Kendal",
            rating: 4.9,
            reviews: 10,
            price: 28371,
            oldPrice: 31200,
        },
        {
            image: "https://example.com/mollyfantasy.jpg",
            title: "Mollyfantasy AEON Deltamas",
            location: "Cikarang Pusat, Bekasi",
            rating: 4.6,
            reviews: 8,
            price: 15762,
        },
        {
            image: "https://example.com/skuter.jpg",
            title: "SKUTER IN SURABAYA",
            location: "Surabaya, Surabaya",
            rating: 4.8,
            reviews: 6,
            price: 18914,
        },
        {
            image: "https://example.com/jjpark.jpg",
            title: "JJ PARK AND PLAY",
            location: "Boja, Kendal",
            rating: 4.9,
            reviews: 10,
            price: 28371,
            oldPrice: 31200,
        },
        {
            image: "https://example.com/mollyfantasy.jpg",
            title: "Mollyfantasy AEON Deltamas",
            location: "Cikarang Pusat, Bekasi",
            rating: 4.6,
            reviews: 8,
            price: 15762,
        },
        {
            image: "https://example.com/skuter.jpg",
            title: "SKUTER IN SURABAYA",
            location: "Surabaya, Surabaya",
            rating: 4.8,
            reviews: 6,
            price: 18914,
        },
        {
            image: "https://example.com/jjpark.jpg",
            title: "JJ PARK AND PLAY",
            location: "Boja, Kendal",
            rating: 4.9,
            reviews: 10,
            price: 28371,
            oldPrice: 31200,
        },
        {
            image: "https://example.com/mollyfantasy.jpg",
            title: "Mollyfantasy AEON Deltamas",
            location: "Cikarang Pusat, Bekasi",
            rating: 4.6,
            reviews: 8,
            price: 15762,
        },
        {
            image: "https://example.com/skuter.jpg",
            title: "SKUTER IN SURABAYA",
            location: "Surabaya, Surabaya",
            rating: 4.8,
            reviews: 6,
            price: 18914,
        },
        {
            image: "https://example.com/jjpark.jpg",
            title: "JJ PARK AND PLAY",
            location: "Boja, Kendal",
            rating: 4.9,
            reviews: 10,
            price: 28371,
            oldPrice: 31200,
        },
    ];

    return (
        <>
        <div className="grid grid-cols-3 gap-5">
            {data.map((item) => (
                <TravelCard propTravel={item} key={item.title} />
            ))}
        </div>
            <div className="text-end">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Trang tiếp
                </button>
            </div>
            </>
    );
};

export default ListCard;
