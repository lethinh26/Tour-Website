import { Input, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { locationAPI } from "../../../../services/api";

export default function SearchLocation({ setInputData, setLocation }: { setInputData: (value: string) => void, setLocation : (value: string) => void }) {
    const [locations, setLocations] = useState<Array<{id: number, name: string}>>([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await locationAPI.getAll();
                setLocations(res.data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
        fetchLocations();
    }, []);
    
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
                onChange={(value) => {
                    setLocation(value === 'all' ? '' : value);
                }}
            />
            <Input.Search 
                placeholder="Tìm kiếm tour, hoạt động..." 
                allowClear 
                enterButton="Tìm kiếm" 
                size="large" 
                className="w-600"
                value={searchValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchValue(value);

                    if (value === '') {
                        setInputData('');
                    }
                }}
                onSearch={(value) => {
                    setInputData(value);
                }}
            />
        </div>
    );
}
