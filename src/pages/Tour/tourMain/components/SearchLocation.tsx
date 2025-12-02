import { Input, Select } from "antd";
import type { StoreType } from "../../../../stores";
import { useSelector } from "react-redux";
import { useState } from "react";

const locationRender = [
    { label: "Toàn quốc", value: "all" },
];

export default function SearchLocation({ setInputData, setLocation }: { setInputData: (value: string) => void, setLocation : (value: string) => void }) {
    const [inputLocation, setInputLocation] =  useState('')
    const { locations } = useSelector((state: StoreType) => state.tourReducer);
    locations.forEach(item => {
        locationRender.push({label : item.name, value: item.name})
    })
    console.log(locationRender);
    
    return (
        <div className="flex gap-3 w-full mb-6">
            <Select
                options={locationRender}
                placeholder="Chọn vị trí"
                className="min-w-[150px]"
                size="large"
                defaultValue="all"
                onChange={setInputLocation}
            />
            <Input.Search placeholder="Tìm kiếm tour, hoạt động..." allowClear enterButton="Tìm kiếm" size="large" className="w-600" 
                onSearch={(value) => {setInputData(value)
                    setLocation(inputLocation === 'all' ? '' : inputLocation)
                }}
                />
        </div>
    );
}
