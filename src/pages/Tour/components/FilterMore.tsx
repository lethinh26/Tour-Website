import React, { useState } from "react";

interface FilterOption {
    id: string;
    label: string;
    checked?: boolean;
}

const FilterBox: React.FC = () => {
    const [filters, setFilters] = useState<FilterOption[]>([
        { id: "11.11", label: "11.11", checked: true },
        { id: "landmark", label: "Famous Landmark 🔍", checked: true },
        { id: "promo1", label: "Special Promo 💥" },
        { id: "entertainment", label: "Entertainment ✨" },
        { id: "pick", label: "Traveloka's Pick" },
        { id: "promo2", label: "Special Promo" },
    ]);

    const [expanded, setExpanded] = useState(false);

    const toggleCheck = (id: string) => {
        setFilters((prev) =>
            prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
        );
    };

    const resetFilters = () => {
        setFilters((prev) => prev.map((f) => ({ ...f, checked: false })));
    };

    return (
        <div className="w-full border border-gray-200 rounded-xl shadow-sm bg-white p-3">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-gray-700">Thêm bộ lọc</h2>
                <button
                    onClick={resetFilters}
                    className="text-blue-500 text-xs font-medium hover:underline"
                >
                    Đặt lại
                </button>
            </div>

            <div className="space-y-2">
                {filters
                    .slice(0, expanded ? filters.length : 5)
                    .map((filter) => (
                        <label
                            key={filter.id}
                            className="flex items-center space-x-2 cursor-pointer select-none"
                        >
                            <input
                                type="checkbox"
                                checked={!!filter.checked}
                                onChange={() => toggleCheck(filter.id)}
                                className="accent-blue-500 w-4 h-4 rounded"
                            />
                            <span className="text-sm text-gray-700">{filter.label}</span>
                        </label>
                    ))}
            </div>

            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full mt-3 text-sm text-blue-500 bg-blue-50 hover:bg-blue-100 font-medium rounded-lg py-1 flex justify-center items-center"
            >
                {expanded ? (
                    <>
                        Thu gọn <span className="ml-1">˄</span>
                    </>
                ) : (
                    <>
                        Đọc thêm <span className="ml-1">˅</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default FilterBox;
