import { Input, Select } from "antd";

const locations = [
    { label: "Toàn quốc", value: "all" },
    { label: "Hà Nội", value: "hanoi" },
    { label: "Hồ Chí Minh", value: "hcm" },
    { label: "Đà Nẵng", value: "danang" },
    { label: "Nha Trang", value: "nhatrang" },
    { label: "Phú Quốc", value: "phuquoc" },
];

export default function SearchLocation() {
    return (
        <div className="flex gap-3 w-full mb-6">
            <Select
                options={locations}
                placeholder="Chọn vị trí"
                className="min-w-[150px]"
                size="large"
                defaultValue="all"
            />
            <Input.Search placeholder="Tìm kiếm tour, hoạt động..." allowClear enterButton="Tìm kiếm" size="large" className="w-600" />
        </div>
    );
}
