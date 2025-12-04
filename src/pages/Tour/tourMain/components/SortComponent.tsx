import { Select } from "antd";

export default function SortComponent({setWayToSort}: {setWayToSort: (value: number) => void}) {


    return (
        <div className="flex justify-between items-center font-bold text-gray-600">
            <p>Về 48 kết quả</p>

            <div className="flex gap-3 items-center justify-center">
                <span>Xếp theo:</span>

                <Select
                    defaultValue="default"
                    style={{ width: 200 }}
                    onChange={(value) => setWayToSort(Number(value))}
                    options={[
                        { value: 0, label: 'Mặc định' },
                        { value: 1, label: 'Giá thấp đến cao' },
                        { value: 2, label: 'Giá cao đến thấp' },
                        { value: 3, label: 'Đánh giá cao đến thấp' },
                        { value: 4, label: 'Đánh giá thấp đến cao' },
                    ]}
                />
            </div>
        </div>
    );
}