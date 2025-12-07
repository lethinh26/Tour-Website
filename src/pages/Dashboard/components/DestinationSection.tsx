import { Card, Button } from "antd";
import { useNavigate } from "react-router";

const destinations = [
  {
    id: 1,
    name: "Đà Nẵng - Hội An",
    location: "Đà Nẵng",
    rating: 4.9,
    price: 2500000,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500"
  },
  {
    id: 2,
    name: "Phố cổ Hội An",
    location: "Quảng Nam",
    rating: 4.8,
    price: 1800000,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500"
  },
  {
    id: 3,
    name: "Vịnh Hạ Long",
    location: "Quảng Ninh",
    rating: 5.0,
    price: 3200000,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500"
  }
];

const DestinationSection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 px-8 min-h-screen flex flex-col justify-center">
      <h4 className="text-[#1eaafa] font-bold tracking-widest mb-4 text-2xl">ĐIỂM ĐẾN NỔI TIẾNG</h4>
      <h2 className="text-4xl font-bold mb-4">Khám phá những điểm đến hàng đầu</h2>
      <div className="flex justify-end gap-4 mb-4">
        <Button shape="circle" className="bg-[#1eaafa] text-white text-xl">&#60;</Button>
        <Button shape="circle" className="bg-[#1eaafa] text-white text-xl">&#62;</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {destinations.map((destination) => (
          <Card key={destination.id} className="shadow-md py-8 text-xl">
            <div 
              className="w-full h-56 bg-gray-200 rounded-lg mb-6 bg-cover bg-center" 
              style={{ backgroundImage: `url(${destination.image})` }}
            />
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-100 text-[#1eaafa] px-4 py-2 rounded text-lg font-bold">{destination.location}</span>
              <span className="text-yellow-500 font-bold">{destination.rating} ★</span>
            </div>
            <h3 className="font-semibold mb-2">{destination.name}</h3>
            <p className="text-[#1eaafa] font-bold">{destination.price.toLocaleString('vi-VN')} VNĐ</p>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button 
          type="link" 
          className="text-[#1eaafa] text-xl bg-blue-100! rounded-2xl!"
          onClick={() => navigate("/tour")}
        >
          Xem thêm &#62;
        </Button>
      </div>
    </div>
  );
};

export default DestinationSection;
