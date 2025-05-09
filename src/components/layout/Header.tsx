import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <header className="bg-black text-white py-4">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.png" alt="InnoSphere Logo" className="h-8 mr-2" />
                            <span className="font-semibold text-xl">InnoSphere</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center">
                        <Link
                            to="/"
                            className={`px-4 py-2 text-base ${path === '/' ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            to="/jobs"
                            className={`px-4 py-2 text-base ${path === '/jobs' || path.includes('/job/') ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Công việc
                        </Link>
                        <Link
                            to="/about"
                            className={`px-4 py-2 text-base ${path === '/about' ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Về chúng tôi
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-4 py-2 text-base ${path === '/contact' ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Liên hệ
                        </Link>
                        <Link
                            to="/ads"
                            className={`px-4 py-2 text-base ${path === '/ads' ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Quảng cáo
                        </Link>
                    </nav>

                    {/* Auth buttons */}
                    <div className="flex items-center">
                        <Link to="/login" className="px-4 py-2 text-white hover:text-[#309689] text-base">
                            Đăng nhập
                        </Link>
                        <Link
                            to="/register"
                            className="bg-[#309689] hover:bg-[#277a6e] text-white px-5 py-2 rounded-md text-base ml-2"
                        >
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 