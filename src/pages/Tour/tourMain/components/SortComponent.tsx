import { useState } from "react";

export default function SortComponent() {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    return (
        <div className="flex justify-between font-bold text-gray-600">
            <p>Về 48 kết quả</p>
            <div className="flex gap-3 items-center justify-center">
                Xếp theo:
                <div className="w-50 relative">
                    <button className="absolute top-2 right-0" onClick={toggleOptions}>
                        <span>🔽</span>
                    </button>
                    <div className="border border-gray-400 rounded-md p-2">Mặc định</div>
                    {showOptions && <div className="absolute top-10 left-0 w-full border border-gray-400 rounded-md bg-white z-10">
                        <div className="p-1 hover:bg-gray-200 cursor-pointer">Mặc định</div>
                        <div className="p-1 hover:bg-gray-200 cursor-pointer">Giá thấp đến cao</div>
                        <div className="p-1 hover:bg-gray-200 cursor-pointer">Giá cao đến thấp</div>
                        <div className="p-1 hover:bg-gray-200 cursor-pointer">Đánh giá cao đến thấp</div>
                        <div className="p-1 hover:bg-gray-200 cursor-pointer">Đánh giá thấp đến cao</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}
