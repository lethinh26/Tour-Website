import { useState } from "react";

export default function FilterPrice () {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            {/* Header */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between cursor-pointer select-none focus:outline-none"
                aria-expanded={isOpen}
            >
                <h3 className="font-semibold text-gray-700 text-left">Giá</h3>

                {/* Inline SVG arrow — không cần thư viện */}
                <span
                    className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    aria-hidden="true"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="block"
                    >
                        <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>

            {/* Nội dung toggle */}
            <div
                className={`mt-4 overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-3 pb-2">
                    <div className="relative h-2 bg-gray-200 rounded-full">
                        <div className="absolute left-0 right-0 h-2 bg-lime-400 rounded-full"></div>
                        {/* thumb giả (chủ yếu để hiển thị) */}
                        <div className="absolute -top-2 left-[0%] h-6 w-6 rounded-full bg-white border border-gray-200 shadow-sm"></div>
                        <div className="absolute -top-2 right-[0%] h-6 w-6 rounded-full bg-white border border-gray-200 shadow-sm"></div>
                    </div>

                    {/* Giá trị */}
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>0 VND</span>
                        <span>4.000.000 VND+</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
