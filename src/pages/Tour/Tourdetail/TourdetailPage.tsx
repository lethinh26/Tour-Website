import { NavLink } from "react-router";
import HeadT from "./components/HeadT";

import "react-day-picker/style.css"

export default function TourdetailPage() {
    
    return (
        <div className="bg-gray-200">
            <HeadT />
            <div className="flex flex-col bg-gray-200 justify-center items-center">
                <div className="pt-10 flex px-5 w-3/4" >
                    <div className="w-4/5">
                        <div className="flex text-center gap-3 mb-3">
                            <h2 className="font-bold text-2xl">
                                Tour xe buýt mui trần FunVee Tour đêm | Singapore
                            </h2>
                            <span className="p-2 rounded-[50%] bg-blue-300">➕</span>
                            <span className="p-2 rounded-[50%] bg-blue-300">➕</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-gray-400 w-auto flex gap-2 justify-center items-center px-2 rounded-2xl">
                                <span className="p-1">📍</span>
                                <p className="font-bold">Singapore</p>
                                <NavLink to={''} className='text-blue-500 font-bold'>Xem ban do</NavLink>
                            </div>
                            <div className="bg-gray-400 w-auto flex gap-2 justify-center items-center px-2 rounded-2xl">
                                <span className="p-1">📍</span>
                                <p className="font-bold">Singapore | Thứ, 18 Nov 2025</p>
                            </div>
                            <div className="bg-gray-400 w-auto flex gap-2 justify-center items-center px-2 rounded-2xl">
                                <span className="p-1">📍</span>
                                <p className="font-bold">Singapore</p>
                            </div>
                            <div className="bg-gray-400 w-auto flex gap-2 justify-center items-center px-2 rounded-2xl">
                                <span className="p-1">📍</span>
                                <p className="font-bold">Singapore</p>
                                <NavLink to={''} className='text-blue-500 font-bold'>Xem ban do</NavLink>
                            </div>
                            <div className="max-h-100px overflow-hidden">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quam, quia sed iusto possimus odit, impedit reprehenderit facere voluptates aliquam pariatur rerum, expedita sequi dolore illo temporibus sapiente voluptatem fuga.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dignissimos exercitationem veritatis autem omnis debitis nulla tempora perferendis amet nostrum voluptatem minus impedit, quidem, hic consectetur sequi deleniti, rem repellat!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, dolorum rem ab fugit, praesentium consequuntur doloribus ullam ratione soluta voluptate a laudantium recusandae sapiente, commodi eius facilis nulla amet ex?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, dolorum rem ab fugit, praesentium consequuntur doloribus ullam ratione soluta voluptate a laudantium recusandae sapiente, commodi eius facilis nulla amet ex?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, dolorum rem ab fugit, praesentium consequuntur doloribus ullam ratione soluta voluptate a laudantium recusandae sapiente, commodi eius facilis nulla amet ex?
                                </p>
                                <button className="font-bold text-xl text-blue-500 hover:text-blue-700">
                                    Đọc thêm
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="sticky p-2 rounded-xl flex flex-col gap-2 w-1/5 top-10">
                        <h6 className="font-bold">
                            Bắt đầu từ
                        </h6>
                        <h4 className="flex text-xl font-bold items-center gap-2 text-amber-400">
                            486.163 VND <p className="line-through font-medium text-[14px] text-gray-600">648.217 VND</p>
                        </h4>
                        <button className="py-2 w-full bg-blue-500 rounded-4xl hover:bg-blue-700">
                            Tìm tour
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
