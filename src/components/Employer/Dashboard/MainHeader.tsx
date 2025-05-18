import React from 'react';
import { Link } from 'react-router-dom';

const MainHeader: React.FC = () => {
    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between h-16">
                <div className="flex items-center gap-10">
                    {/* Logo and main navigation */}
                    <Link to="/" className="flex items-center">
                        <span className="text-[#00FF19] font-semibold text-xl">InnoSphere</span>
                    </Link>

                    <nav className="hidden md:flex">
                        <ul className="flex space-x-1">
                            <li>
                                <Link to="/" className="px-3 py-2 text-gray-500 hover:text-gray-700">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/tim-ung-vien" className="px-3 py-2 text-gray-500 hover:text-gray-700">
                                    Tìm ứng viên
                                </Link>
                            </li>
                            <li>
                                <Link to="/employer/dashboard" className="px-3 py-2 text-[#309689] border-b-2 border-[#309689]">
                                    Bảng điều khiển
                                </Link>
                            </li>
                            <li>
                                <Link to="/cong-viec-cua-toi" className="px-3 py-2 text-gray-500 hover:text-gray-700">
                                    Công việc của tôi
                                </Link>
                            </li>
                            <li>
                                <Link to="/ung-tuyen" className="px-3 py-2 text-gray-500 hover:text-gray-700">
                                    Ứng tuyển
                                </Link>
                            </li>
                            <li>
                                <Link to="/cham-soc-khach-hang" className="px-3 py-2 text-gray-500 hover:text-gray-700">
                                    Chăm sóc khách hàng
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* Right side elements: phone, language selector, notifications, and post job button */}
                    <div className="flex items-center text-gray-700">
                        <span className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </span>
                        <span className="text-sm">+84 0989783393</span>
                    </div>

                    <div className="flex items-center text-sm">
                        <img src="/vn-flag.png" alt="Vietnamese" className="h-4 w-6 mr-1" />
                        <span>Vietnamese</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <div className="relative">
                        <button className="relative p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">2</span>
                        </button>
                    </div>

                    <Link to="/employer/post-job" className="bg-[#309689] hover:bg-[#277b70] text-white px-4 py-2 rounded-md text-sm font-medium">
                        Đăng Tin Tuyển Dụng
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default MainHeader; 