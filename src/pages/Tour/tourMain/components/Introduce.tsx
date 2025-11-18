// import { useState } from "react";


// export default function Introduce() {
//     const [showMore, setShowMore] = useState(false);
//     return (
//         <div>
//             <h2 className="text-start text-2xl font-bold">Sống giàu trải nghiệm cùng Traveloka</h2>
//             <div className="flex gap-4 mt-10">
//                 <div className="w-85">
//                     {/* menu */}
//                     <ul className="flex gap-4 text-black font-medium flex-col sticky top-10">
//                         <li className="hover:text-green-600 cursor-pointer">Tour & Vui chơi</li>
//                         <li className="hover:text-green-600 cursor-pointer">Ăn uống</li>
//                         <li className="hover:text-green-600 cursor-pointer">Sức khỏe & Làm đẹp</li>
//                         <li className="hover:text-green-600 cursor-pointer">Vận chuyển</li>
//                         <li className="hover:text-green-600 cursor-pointer">Trải nghiệm khác</li>
//                         {
//                             showMore ? (<>
//                                 <li className="hover:text-green-600 cursor-pointer">Mua sắm</li>
//                                 <li className="hover:text-green-600 cursor-pointer">Sự kiện & Buổi biểu diễn</li>
//                                 <button className="text-blue-500 underline mt-2" onClick={() => setShowMore(false)}>Thu gọn</button>
//                             </>
//                             ) : (
//                                 <button className="text-blue-500 underline mt-2" onClick={() => setShowMore(true)}>Xem thêm</button>
//                             )
//                         }
//                     </ul>
//                 </div>
//                 <div className="w-215">
//                     <p className="text-gray-600">
//                         Du lịch không chỉ đơn thuần là việc đến một nơi xa lạ mà còn là hành trình khám phá, tận hưởng và tích lũy những trải nghiệm đáng nhớ. Với Traveloka, bạn sẽ được sống trọn từng khoảnh khắc trong chuyến đi của mình, từ những hoạt động thú vị đến các dịch vụ thư giãn và giải trí cao cấp. Dù là kỳ nghỉ ngắn ngày hay một hành trình dài, Traveloka luôn sẵn sàng đồng hành để giúp bạn tận hưởng mọi khoảnh khắc theo cách trọn vẹn nhất.

//                         Một chuyến đi sẽ trở nên sống động hơn khi bạn tham gia các hoạt động tham quan tại những điểm đến hấp dẫn. Bạn có thể khám phá công viên giải trí sôi động với hàng loạt trò chơi cảm giác mạnh, vui chơi tại công viên nước mát lạnh vào những ngày hè, hay tìm hiểu văn hóa và lịch sử qua các bảo tàng và phòng trưng bày nghệ thuật độc đáo.

//                         Ngoài các hoạt động tham quan, việc chăm sóc bản thân cũng là một phần không thể thiếu để làm cho kỳ nghỉ thêm trọn vẹn. Hãy dành thời gian thư giãn với các liệu pháp spa chuyên nghiệp hoặc làm mới diện mạo tại các salon hàng đầu. Traveloka mang đến cho bạn cơ hội đặt trước các gói dịch vụ chăm sóc sắc đẹp và sức khỏe với mức giá ưu đãi, từ massage thư giãn, chăm sóc da mặt đến các liệu pháp trị liệu toàn thân. Đây là cách tuyệt vời để tái tạo năng lượng và giúp bạn cảm thấy sảng khoái hơn sau những ngày làm việc mệt mỏi.

//                         Đặc biệt, các chương trình khuyến mãi của Traveloka thường xuyên được cập nhật, giúp bạn dễ dàng lựa chọn những hoạt động yêu thích mà không lo vượt quá ngân sách.

//                         Tại sao nên đặt hoạt động du lịch với Traveloka?
//                         1. Hơn 32.000 hoạt động vui chơi toàn cầu
//                         Traveloka hợp tác với các thương hiệu uy tín trên toàn cầu, mang đến cho khách hàng những dịch vụ cần thiết cho một chuyến đi, giúp cho việc đi du lịch của bạn trở nên dễ dàng hơn.

//                         Vé tham quan các điểm đến yêu thích: Traveloka mang đến hàng loạt gợi ý về những điểm tham quan hấp dẫn tại các địa danh du lịch nổi tiếng. Từ các công viên giải trí, công viên nước sôi động đến những bảo tàng và phòng trưng bày nghệ thuật độc đáo, tất cả đều được thiết kế để làm phong phú thêm hành trình khám phá của bạn.
//                         Vé khu vui chơi giải trí hấp dẫn: Bạn muốn tận hưởng thời gian vui chơi ý nghĩa cùng con cái hoặc bạn bè? Hãy đặt vé khu vui chơi dễ dàng và nhanh chóng trên Traveloka. Với hàng loạt gợi ý hấp dẫn, Traveloka mang đến các khu vui chơi đa dạng, bao gồm những trò chơi mang tính giáo dục, hỗ trợ trẻ phát triển kỹ năng vận động và giao tiếp. Đặc biệt, Traveloka tự hào là đối tác chính thức của nhiều khu vui chơi giải trí nổi tiếng trong nước và quốc tế như VinWonders, Sun World, Disneyland, LEGOLAND, NovaWorld,.., đảm bảo mang đến cho bạn trải nghiệm trọn vẹn và đáng nhớ.
//                         Tour du lịch trọn gói: Nếu bạn không muốn mất thời gian lên kế hoạch cho chuyến đi, Traveloka sẽ là lựa chọn lý tưởng với các gói tour hấp dẫn. Bạn có thể dễ dàng tìm thấy đa dạng loại hình tour, từ các tour du lịch trong nước như Hà Nội, Hạ Long, Sapa, Đà Nẵng, Nha Trang, Phú Quốc,... đến các tour du lịch quốc tế khám phá Thái Lan, Hàn Quốc, Nhật Bản, hay thậm chí các hành trình xa hơn đến châu Âu và châu Úc. Dù là tour đất liền hay tour biển đảo, tour ghép hay tour riêng, Traveloka đều đáp ứng mọi nhu cầu. Khi đặt tour trọn gói trên Traveloka, bạn sẽ không cần phải lo lắng về chỗ ở hay phương tiện di chuyển, giúp bạn thỏa sức tận hưởng và khám phá từ điểm đến này đến điểm đến khác một cách trọn vẹn.
//                         Thư giãn với các Spa & Salon tốt nhất: Traveloka mang đến cho bạn những gợi ý tuyệt vời về các spa và salon, giúp bạn tái tạo năng lượng và làm mới diện mạo sau những ngày làm việc mệt mỏi. Khám phá ngay các salon với đa dạng dịch vụ chăm sóc tóc như hấp dầu, nhuộm, duỗi, hay gội đầu dưỡng sinh, để tỏa sáng với vẻ ngoài rạng rỡ. Bạn cũng có thể dễ dàng đặt lịch các liệu pháp spa thư giãn như massage mặt, massage cổ vai gáy, hay massage chân ngay trên Traveloka. Bên cạnh đó, các dịch vụ làm đẹp khác như chăm sóc da mặt, làm móng tay và móng chân tại những spa uy tín cũng sẵn sàng chờ đón bạn.
//                         eSIM và SIM du lịch 4G là những người bạn đồng hành không thể thiếu cho bất kỳ chuyến đi nào, đặc biệt là khi bạn khám phá nước ngoài. Với sự tiện lợi và đa dạng, Traveloka mang đến các tùy chọn SIM phục vụ du khách, bao gồm SIM vật lý và eSIM. Bạn có thể dễ dàng lựa chọn từ các loại SIM dành riêng cho từng quốc gia, khu vực, hoặc thậm chí eSIM 4G toàn cầu với phạm vi phủ sóng rộng lớn. Các đối tác uy tín như Gohub, Sim2Go, Simplify Trip, Xplori, và JavaMifi sẽ đảm bảo bạn luôn kết nối mượt mà trong mọi hành trình.
//                         Dịch vụ làm visa du lịch các nước: Dịch vụ làm visa du lịch quốc tế trên Traveloka giúp việc xin visa trở nên dễ dàng và tiện lợi hơn bao giờ hết. Hợp tác với các đối tác uy tín như Visa PM và Natural Tourist, Traveloka hỗ trợ khách hàng xin visa cho nhiều quốc gia, từ Nhật Bản, Hàn Quốc, Trung Quốc, Hong Kong đến visa Schengen, Úc, Mỹ, và Canada. Quy trình xin visa được thực hiện trực tuyến, từ tư vấn, kiểm tra hồ sơ đến nộp visa, với sự hỗ trợ từ đội ngũ chuyên gia giàu kinh nghiệm, đảm bảo hồ sơ đầy đủ, chính xác và tăng cơ hội đậu visa. Với Traveloka, bạn có thể yên tâm bắt đầu hành trình khám phá những điểm đến mơ ước mà không cần bận tâm về thủ tục phức tạp.
//                         Phương tiện di chuyển: Việc lựa chọn phương tiện di chuyển phù hợp là yếu tố quan trọng giúp chuyến đi của bạn thuận tiện và thoải mái hơn, và Traveloka là giải pháp lý tưởng cho nhu cầu này. Với Traveloka, du khách có thể dễ dàng thuê xe máy hoặc thuê xe ô tô để khám phá nội thành và các khu vực lân cận, mang lại sự chủ động và linh hoạt cho hành trình. Dịch vụ xe đưa đón sân bay giúp bạn di chuyển an toàn, tiết kiệm thời gian với nhiều tùy chọn từ xe riêng đến xe chung. Nếu bạn muốn trải nghiệm ngắm cảnh thư thái, Traveloka còn hỗ trợ đặt vé tàu hỏa nhanh chóng với đầy đủ thông tin về lịch trình, giá vé và loại ghế. Đối với những chuyến khám phá thành phố, xe buýt 2 tầng là lựa chọn thú vị, mang đến góc nhìn toàn cảnh từ trên cao, trong khi các tuyến xe khách và phương tiện công cộng khác cũng được cung cấp để di chuyển giữa các tỉnh thành một cách tiết kiệm. Tất cả các dịch vụ trên Traveloka đều minh bạch về thông tin và giá cả, với quy trình đặt vé đơn giản, thao tác nhanh chóng và đội ngũ hỗ trợ chuyên nghiệp, đảm bảo bạn có một chuyến đi suôn sẻ và trọn vẹn.
//                         Vé Lễ hội, sự kiện: Tham dự các lễ hội và sự kiện luôn là một phần không thể thiếu của những chuyến du lịch, giúp bạn hòa mình vào không khí sôi động, khám phá văn hóa địa phương và tạo nên những kỷ niệm đáng nhớ. Traveloka cung cấp danh sách phong phú các sự kiện, từ các lễ hội truyền thống, chương trình âm nhạc, triển lãm nghệ thuật, cho đến các sự kiện thể thao, hội thảo chuyên ngành. Mỗi sự kiện đều được mô tả chi tiết với thông tin rõ ràng về thời gian, địa điểm, và các gói vé khác nhau để bạn lựa chọn. Chẳng hạn, bạn có thể tìm vé tham dự các lễ hội âm nhạc lớn như Đại nhạc hội 8Wonder, hoặc khám phá văn hóa qua các lễ hội độc đáo như Lễ hội Yi Peng ở Chiang Mai, Lễ hội Songkran ở Thái Lan. Không chỉ vậy, Traveloka còn cung cấp vé cho các sự kiện địa phương hấp dẫn tại Việt Nam như Lễ hội pháo hoa Đà Nẵng, hoặc các chương trình văn hóa tại phố cổ Hội An. Với Traveloka, việc khám phá và tham dự các lễ hội, sự kiện trở nên dễ dàng và thú vị hơn bao giờ hết. Bạn không chỉ tiết kiệm thời gian và công sức mà còn tận hưởng trải nghiệm tuyệt vời khi hòa mình vào
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }
