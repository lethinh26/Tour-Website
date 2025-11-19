import { useState } from "react";
import { Slider } from "antd";

const marks = {
    0: "0 VND",
    1000000: "1tr",
    2000000: "2tr",
    3000000: "3tr",
    4000000: "4tr+",
};

export default function FilterPrice() {
    const [isOpen, setIsOpen] = useState(true);
    const [range, setRange] = useState([0, 4000000]);

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between cursor-pointer select-none focus:outline-none"
                aria-expanded={isOpen}
            >
                <h3 className="font-semibold text-gray-700 text-left">Giá</h3>
                <span className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>

            <div
                className={`mt-4 overflow-hidden transition-[max-height,opacity] duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="space-y-3 pb-2 ">
                    <div className="px-4">
                        <Slider
                            range
                            min={0}
                            max={4000000}
                            step={100000}
                            marks={marks}
                            value={range}
                            onChange={setRange}
                            tipFormatter={(value) => `${value.toLocaleString()} VND`}
                        />
                    </div>

                    <div className="flex gap-2 items-center justify-between text-base font-semibold text-gray-700 bg-gray-50 rounded-lg px-4 py-2 mt-2 border border-gray-200 whitespace-nowrap">
                        <span className="flex items-center gap-1 whitespace-nowrap">
                            <span className="text-cyan-500 text-[12px]">Từ</span>
                            <span className="text-gray-900 text-[12px]">{range[0].toLocaleString()} VND</span>
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                            <span className="text-cyan-500 text-[12px]">Đến</span>
                            <span className="text-gray-900 text-[12px]">{range[1].toLocaleString()} VND</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
