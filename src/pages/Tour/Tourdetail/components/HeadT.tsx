import bg from "../assets/bg.png"
export default function HeadT() {
    return (
        <div className="flex justify-center bg-cover bg-center p-5" style={{ backgroundImage: `url(${bg})` }}>
            <div className="bg-white top-20 left-1/12 h-80 w-3/4 flex rounded-2xl overflow-hidden">
                <div className=" h-full w-2/5 p-2">
                    <div className="h-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500 border-2 border-white rounded-xl">
                        Ảnh lớn
                    </div>
                </div>
                <div className="flex flex-wrap h-full w-3/5 gap-2 p-2">
                    {[1,2,3,4,5].map((i) => (
                        <div key={i} className=" h-[48%] w-[32%] bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500 border-2 border-white rounded-xl">
                            {i < 5 ? `Ảnh nhỏ ${i}` : <span className="flex items-center justify-center w-full h-full">Xem Tất Cả Hình Ảnh</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
