import { Button, Radio } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { StoreType } from "../../../../stores";

export default function FilterTour({setIdCategory} : {setIdCategory: (id : number) => void}) {
    
    const { categories } = useSelector((state: StoreType) => state.tourReducer);
    const options = categories.map(cat => cat.name);

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base flex items-center gap-2">
                    <FilterOutlined /> Tour & Hoạt động
                </h3>
                <Button
                    type="link"
                    icon={<ReloadOutlined />}
                    size="small"
                    onClick={() => window.location.reload()}
                    className="text-blue-500"
                >
                    Đặt lại
                </Button>
            </div>
            <div className="mt-4">
                <Radio.Group className="flex flex-col gap-2 pl-2"
                onChange={(e) => {setIdCategory(categories.find(cat => cat.name === e.target.value)!.id || 0)}}>
                    {options.map(opt => (
                        <Radio key={opt} value={opt}>{opt}</Radio>
                    ))}
                </Radio.Group>
            </div>
        </div>
    );
}
