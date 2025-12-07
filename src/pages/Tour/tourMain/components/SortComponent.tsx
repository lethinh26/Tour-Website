import { Select } from "antd";

export default function SortComponent({setWayToSort, tourLength}: {setWayToSort: (value: number) => void, tourLength: number}) {


    return (
        <div className="flex justify-between items-center font-bold text-gray-600">
            <p>Tìm thấy {tourLength} kết quả</p>

            <div className="flex gap-3 items-center justify-center">
                <span>Xếp theo:</span>

                <Select
                    defaultValue={0}
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