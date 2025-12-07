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
    maxHeightClass,
    truncateText = '... [Xem thêm]',
    expandText = '[Thu gọn]',
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const containerClasses = `
        relative transition-all duration-300 ease-in-out 
        ${!isExpanded ? `${maxHeightClass} overflow-hidden` : ''}
    `;


    const shouldShowButton = true;

    return (
        <div className="relative w-full">

            <div
                className={containerClasses}
                dangerouslySetInnerHTML={content}
            />

            {!isExpanded && (
                <div className={`
                    absolute inset-x-0 bottom-0 h-10 
                    bg-linear-to-t from-white to-transparent
                    pointer-events-none 
                `}></div>
            )}

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