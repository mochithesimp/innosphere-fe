import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getRoleFromToken } from '../../utils/jwtHelper';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    const token = localStorage.getItem("token");
    const isLoggedIn = token;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    };

    const handleAvatarClick = () => {
        if (token) {
            const role = getRoleFromToken(token);
            if (role === "Admin") {
                navigate("/admin/dashboard");
            } else if (role === "Worker") {
                navigate("/employee/dashboard");
            } else if (role === "Employer") {
                navigate("/employer/dashboard");
            }
        }
    };

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
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-3">
                                {/* User Avatar */}
                                <button
                                    onClick={handleAvatarClick}
                                    className="w-8 h-8 bg-[#309689] rounded-full flex items-center justify-center hover:bg-[#277a6e] transition-colors"
                                    title="Đi tới Dashboard"
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        ></path>
                                    </svg>
                                </button>

                                {/* Logout Button */}
                                <Link
                                    to="/login"
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-white hover:text-[#309689] text-base"
                                >
                                    Đăng xuất
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 text-white hover:text-[#309689] text-base">
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-[#309689] hover:bg-[#277a6e] text-white px-5 py-2 rounded-md text-base ml-2"
                                >
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 