import { useState } from "react";
import { Pagination } from "antd";
import TravelCard, { type TravelCardProps } from "./TravelCard";



function ListCard({ dataTour, isLogin }: { dataTour: TravelCardProps[], isLogin: boolean }) {
    const pageSize = 6;
    const [current, setCurrent] = useState(1);



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dataTour.slice((current - 1) * pageSize, current * pageSize)
                    .map((item) => (
                        <TravelCard propTravel={item} key={item.title + item.price} isLogin={isLogin}/>
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
