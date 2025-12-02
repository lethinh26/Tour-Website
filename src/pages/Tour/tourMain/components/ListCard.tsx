import { useState } from "react";
import { Pagination } from "antd";
import TravelCard, { type TravelCardProps } from "./TravelCard";



function ListCard({ dataTour }: { dataTour: TravelCardProps[] }) {
    



    // const data = [
    //     {
    //         id: 1,
    //         image: "https://example.com/mollyfantasy.jpg",
    //         title: "Mollyfantasy AEON Deltamas",
    //         location: "Cikarang Pusat, Bekasi",
    //         rating: 4.6,
    //         reviews: 8,
    //         price: 15762,
    //     },
    //     {
    //         id: 2,
    //         image: "https://example.com/skuter.jpg",
    //         title: "SKUTER IN SURABAYA",
    //         location: "Surabaya, Surabaya",
    //         rating: 4.8,
    //         reviews: 6,
    //         price: 18914,
    //     },
    //     {
    //         image: "https://example.com/jjpark.jpg",
    //         title: "JJ PARK AND PLAY",
    //         location: "Boja, Kendal",
    //         rating: 4.9,
    //         reviews: 10,
    //         price: 1000000,
    //         oldPrice: 15000000,
    //     },
    //     {
    //         id: 3,
    //         image: "https://example.com/mollyfantasy.jpg",
    //         title: "Mollyfantasy AEON Deltamas",
    //         location: "Cikarang Pusat, Bekasi",
    //         rating: 4.6,
    //         reviews: 8,
    //         price: 15762,
    //     },
    //     {
    //         id: 4,
    //         image: "https://example.com/skuter.jpg",
    //         title: "SKUTER IN SURABAYA",
    //         location: "Surabaya, Surabaya",
    //         rating: 4.8,
    //         reviews: 6,
    //         price: 18914,
    //     },
    //     {
    //         id: 5,
    //         image: "https://example.com/jjpark.jpg",
    //         title: "JJ PARK AND PLAY",
    //         location: "Boja, Kendal",
    //         rating: 4.9,
    //         reviews: 10,
    //         price: 28371,
    //         oldPrice: 31200,
    //     },
    //     {
    //         id: 6,
    //         image: "https://example.com/mollyfantasy.jpg",
    //         title: "Mollyfantasy AEON Deltamas",
    //         location: "Cikarang Pusat, Bekasi",
    //         rating: 4.6,
    //         reviews: 8,
    //         price: 15762,
    //     },
    //     {
    //         id: 7,
    //         image: "https://example.com/skuter.jpg",
    //         title: "SKUTER IN SURABAYA",
    //         location: "Surabaya, Surabaya",
    //         rating: 4.8,
    //         reviews: 6,
    //         price: 18914,
    //     },
    //     {
    //         id: 8,
    //         image: "https://example.com/jjpark.jpg",
    //         title: "JJ PARK AND PLAY",
    //         location: "Boja, Kendal",
    //         rating: 4.9,
    //         reviews: 10,
    //         price: 28371,
    //         oldPrice: 31200,
    //     },
    //     {
    //         id: 9,
    //         image: "https://example.com/mollyfantasy.jpg",
    //         title: "Mollyfantasy AEON Deltamas",
    //         location: "Cikarang Pusat, Bekasi",
    //         rating: 4.6,
    //         reviews: 8,
    //         price: 15762,
    //     },
    //     {
    //         id: 10,
    //         image: "https://example.com/skuter.jpg",
    //         title: "SKUTER IN SURABAYA",
    //         location: "Surabaya, Surabaya",
    //         rating: 4.8,
    //         reviews: 6,
    //         price: 18914,
    //     },
    //     {
    //         id: 11,
    //         image: "https://example.com/jjpark.jpg",
    //         title: "JJ PARK AND PLAY",
    //         location: "Boja, Kendal",
    //         rating: 4.9,
    //         reviews: 10,
    //         price: 28371,
    //         oldPrice: 31200,
    //     },
    // ];
    const pageSize = 6;
    const [current, setCurrent] = useState(1);



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dataTour.slice((current - 1) * pageSize, current * pageSize)
                    .map((item) => (
                        <TravelCard propTravel={item} key={item.title + item.price} />
                    ))}
            </div>
            <div className="flex justify-center mt-6">
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={dataTour.length}
                    onChange={setCurrent}
                    showSizeChanger={false}
                />
            </div>
        </>
    );
}

export default ListCard;
