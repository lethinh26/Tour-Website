import { useState } from "react";
import { Pagination } from "antd";
import TravelCard from "./TravelCard";

function ListCard() {
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
            price: 1000000,
            oldPrice: 15000000,
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
    const pageSize = 6;
    const [current, setCurrent] = useState(1);
    const paginatedData = data.slice((current - 1) * pageSize, current * pageSize);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedData.map((item) => (
                    <TravelCard propTravel={item} key={item.title + item.price} />
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={data.length}
                    onChange={setCurrent}
                    showSizeChanger={false}
                />
            </div>
        </>
    );
}

export default ListCard;
