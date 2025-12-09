

import { useNavigate } from "react-router";
import bg from "../assets/404.png";
import { RollbackOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
			<h1 className="text-5xl font-bold text-gray-900 mb-2 mt-8 text-center">Oops!</h1>
			<p className="text-lg text-gray-700 mb-6 text-center">Có vẻ trang này không tồn tại rồi!</p>
			<div className="w-full flex justify-center mb-8 mt-2">
				<div className="w-[800px] h-[550px] flex items-center justify-center -translate-y-10">
					<img src={bg} alt="404" className="w-full h-full object-contain" />
				</div>
			</div>
			<button
				onClick={() => navigate("/")}
				className="flex items-center gap-2 text-base text-gray-900 border-b border-gray-900 hover:text-blue-500 -translate-y-17"
			>
				<span><RollbackOutlined /></span>
				Quay trở lại trang chủ
			</button>
		</div>
	);
};

export default NotFoundPage;
