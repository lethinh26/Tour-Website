import { useState } from "react"

export default function ModalSchedule() {
    const [isShow, setIsShow] = useState(true)
    const toggleModal = () => setIsShow(!isShow);
    return (
        <>
            <button className="font-bold p-5 border rounded-2xl hover:bg-gray-300 active:bg-gray-500" onClick={toggleModal}>
                🎫 Xem Lịch
            </button>
            {isShow && 
                <div className=" fixed inset-0 z-50 flex items-center justify-center ">
                    {/* lop phu */}
                    <div
                        className="fixed inset-0 bg-gray-400 opacity-75 transition-opacity"
                        onClick={toggleModal} // Đóng Modal khi bấm vào nền mờ
                    ></div>

                    {/* 2. Hộp Nội Dung (Modal Container) */}
                    <div
                        className="bg-white rounded-lg shadow-2xl p-6 m-4 max-w-lg w-full z-50 transform transition-all duration-300 scale-100"
                    // Các lớp căn giữa được thay thế bằng flexbox trên thẻ cha
                    >
                        {/* Tiêu đề */}
                        <div className="flex justify-between items-center pb-3 border-b">
                            <h3 className="text-2xl font-semibold text-gray-800">Tiêu Đề Modal</h3>
                            <button onClick={toggleModal} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">
                                &times; {/* Dấu X */}
                            </button>
                        </div>

                        {/* Nội dung */}
                        <div className="py-4 text-gray-700">
                            <p>Đây là nội dung của Modal. Nó nằm ở trung tâm và nổi trên nền mờ.</p>
                            <p>Bạn có thể tùy chỉnh kích thước và giao diện bằng các class Tailwind CSS.</p>
                        </div>

                        {/* Chân Modal (Footer) */}
                        <div className="flex justify-end pt-3 border-t">
                            <button
                                onClick={toggleModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}
