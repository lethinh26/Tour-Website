import { Card, Button } from "antd";

const DestinationSection = () => (
  <div className="py-12 px-8 min-h-screen flex flex-col justify-center">
    <h4 className="text-[#1eaafa] font-bold tracking-widest mb-4 text-2xl">ĐIỂM ĐẾN NỔI TIẾNG</h4>
    <h2 className="text-4xl font-bold mb-4">Khám phá những điểm đến hàng đầu</h2>
    <div className="flex justify-end gap-4 mb-4">
      <Button shape="circle" className="bg-[#1eaafa] text-white text-xl">&#60;</Button>
      <Button shape="circle" className="bg-[#1eaafa] text-white text-xl">&#62;</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {[1,2,3].map((item) => (
        <Card key={item} className="shadow-md py-8 text-xl">
          <div className="w-full h-56 bg-gray-200 rounded-lg mb-6" />
          <div className="flex justify-between items-center mb-4">
            <span className="bg-blue-100 text-[#1eaafa] px-4 py-2 rounded text-lg font-bold">Đà nẵng</span>
            <span className="text-yellow-500 font-bold">4.9 ★</span>
          </div>
          <h3 className="font-semibold mb-2">Ai biết</h3>
          <p className="text-[#1eaafa] font-bold">300.000VNĐ</p>
        </Card>
      ))}
    </div>
    <div className="flex justify-center mt-8">
      <Button type="link" className="text-[#1eaafa] text-xl bg-blue-100! rounded-2xl!">Xem thêm &#62;</Button>
    </div>
  </div>
);

export default DestinationSection;
