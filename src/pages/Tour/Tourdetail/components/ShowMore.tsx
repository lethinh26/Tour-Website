import React, { useState } from 'react';

interface HtmlContent {
    __html: string;
}

interface ShowMoreProps {
    content: HtmlContent;
    maxHeightClass: string;
    truncateText?: string;
    expandText?: string;
}

const ShowMore: React.FC<ShowMoreProps> = ({
    content,
    maxHeightClass, // Ví dụ: 'max-h-36'
    truncateText = '... [Xem thêm]',
    expandText = '[Thu gọn]',
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // 1. Dùng state để áp dụng class Tailwind
    const containerClasses = `
        relative transition-all duration-300 ease-in-out 
        ${!isExpanded ? `${maxHeightClass} overflow-hidden` : ''}
    `;

    // 2. Logic kiểm soát hiển thị nút (Bạn nên có logic kiểm tra nội dung thực tế)
    // Giả sử luôn cần nút vì bạn đang sử dụng component này.
    const shouldShowButton = true;

    return (
        <div className="relative w-full">

            {/* CONTAINER CHỨA NỘI DUNG HTML */}
            <div
                className={containerClasses}
                dangerouslySetInnerHTML={content}
            />

            {/* LỚP PHỦ MỜ (FADE OVERLAY) - CHỈ HIỂN THỊ KHI BỊ CẮT NGẮN */}
            {!isExpanded && (
                <div className={`
                    absolute inset-x-0 bottom-0 h-10 
                    bg-linear-to-t from-white to-transparent
                    pointer-events-none 
                `}></div>
            )}

            {/* NÚT XEM THÊM / THU GỌN */}
            {shouldShowButton && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 hover:text-blue-800 font-semibold mt-1 p-0 bg-transparent border-none cursor-pointer"
                >
                    {isExpanded ? expandText : truncateText}
                </button>
            )}
        </div>
    );
};

export default ShowMore;