import { Input, Select } from "antd";
import type { StoreType } from "../../../../stores";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function SearchLocation({ setInputData, setLocation }: { setInputData: (value: string) => void, setLocation : (value: string) => void }) {
    const { locations } = useSelector((state: StoreType) => state.tourReducer);
    
    const locationRender = useMemo(() => {
        const options = [{ label: "Toàn quốc", value: "all" }];
        if (Array.isArray(locations)) {
            locations.forEach(item => {
                options.push({ label: item.name, value: item.name });
            });
        }
        return options;
    }, [locations])
    
    return (
        <div className="flex gap-3 w-full mb-6">
            <Select
                options={locationRender}
                placeholder="Chọn vị trí"
                className="min-w-[150px]"
                size="large"
                defaultValue="all"
                onChange={(value) => setLocation(value === 'all' ? '' : value)}
            />
            <Input.Search 
                placeholder="Tìm kiếm tour, hoạt động..." 
                allowClear 
                enterButton="Tìm kiếm" 
                size="large" 
                className="w-600" 
                onSearch={setInputData}
            />
        </div>
    );
}
