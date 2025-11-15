
export default function ListInfomation() {

    const SanPhamPhoBien = [
        {
            key: "Sản phẩm phổ biến",
            list: [
                "Vé VinWonders Nha Trang",
                "Tour xe buýt mui trần FunVee Tour điểm | Singapore",
                "Universal Studios Singapore",
                "Gardens by the Bay",
                "Vé Thủy cung Singapore Oceanarium",
            ]
        },
        {
            key: "Địa điểm phổ biến",
            list: [
                "Đà Nẵng",
                "Phú Quốc",
                "Nha Trang",
                "Hạ Long",
                "Hội An",
            ]
        },
        {
            key: "Loại hình phổ biến",
            list: [
                "Vé tham quan",
                "Tour du lịch",
                "Vé vui chơi giải trí",
                "Dịch vụ spa & làm đẹp",
                "Phương tiện di chuyển",
            ]
        },
        {
            key: "Hoạt động phổ biến",
            list: [
                "Vui chơi giải trí",
                "Tham quan & khám phá",
                "Sức khỏe & làm đẹp",
                "Ăn uống",
                "Vận chuyển",
            ]
        }

    ];
    return (
        <div>
            {
                SanPhamPhoBien.map((item) => (
                    <div key={item.key} className="w-7xl mb-10">
                        <h2 className="text-2xl font-semibold mb-5">{item.key}</h2>
                        <div className="flex flex-wrap gap-5">
                            {
                                item.list.map((subItem) => (
                                    <span key={subItem} className="px-4 py-2 bg-gray-200 rounded-full text-gray-700 text-sm hover:bg-gray-300 cursor-pointer">{subItem}</span>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
