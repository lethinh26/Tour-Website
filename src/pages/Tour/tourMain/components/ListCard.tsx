import { Pagination, Spin } from "antd";
import TravelCard, { type TravelCardProps } from "./TravelCard";

interface ListCardProps {
    dataTour: TravelCardProps[];
    isLogin: boolean;
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
    loading?: boolean;
    onPageChange: (page: number) => void;
}

function ListCard({ dataTour, isLogin, pagination, loading, onPageChange }: ListCardProps) {
    return (
        <>
            <Spin spinning={loading || false}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[400px]">
                    {dataTour.map((item) => (
                        <TravelCard propTravel={item} key={item.id} isLogin={isLogin}/>
                    ))}
                </div>
            </Spin>
            <div className="flex justify-center mt-6">
                <Pagination
                    current={pagination.page}
                    pageSize={pagination.pageSize}
                    total={pagination.total}
                    onChange={onPageChange}
                    showSizeChanger={false}
                />
            </div>
        </>
    );
}

export default ListCard;
