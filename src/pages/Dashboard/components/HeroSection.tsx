import { Button } from "antd";
import img1 from "../assets/temp_bg1.png";
import img2 from "../assets/temp_bg2.png";
import img3 from "../assets/temp_bg3.png";
import img4 from "../assets/temp_bg4.png";

const HeroSection = () => (
    <div className="flex flex-col md:flex-row items-center justify-between py-12 min-h-screen gap-3">
        <div className="max-w-[500px]">
            <h1 className="text-6xl font-bold mb-8">
                <span className="text-[#1eaafa]">Triploka </span>– Mỗi chuyến đi là một câu chuyện
            </h1>
            <p className="text-gray-500 mb-6 text-lg">
                Hãy để Triploka đồng hành cùng bạn trên mọi nẻo đường, mang đến những trải nghiệm du lịch tuyệt vời và đáng nhớ.
            </p>
            <Button type="primary" size="large" className="bg-[#1eaafa]! rounded-full px-8 py-2 text-lg">
                Khám phá ngay
            </Button>
        </div>
        <div className="flex gap-6 mt-12 md:mt-0 flex-wrap">
            <div className="flex flex-col gap-4 w-[45%]">
                <img src={img1} alt="" />
                <img src={img2} alt="" />
            </div>
            <div className="flex flex-col gap-4 translate-y-6 w-[45%]">
                <img src={img3} alt=""/>
                <img src={img4} alt=""/>
            </div>
        </div>
    </div>
);

export default HeroSection;
