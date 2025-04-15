import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-[#0f172a] text-white py-3">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.png" alt="InnoSphere Logo" className="w-8 h-8 mr-2" />
                            <span className="font-semibold text-lg">InnoSphere</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="hover:text-[#309689] font-medium text-sm">Trang chủ</Link>
                        <Link to="/jobs" className="hover:text-[#309689] font-medium text-sm">Công việc</Link>
                        <Link to="/companies" className="hover:text-[#309689] font-medium text-sm">Về chúng tôi</Link>
                        <Link to="/blog" className="hover:text-[#309689] font-medium text-sm">Liên hệ</Link>
                        <Link to="/about" className="hover:text-[#309689] font-medium text-sm">Quảng cáo</Link>
                    </nav>

                    {/* Auth buttons */}
                    <div className="flex items-center space-x-3">
                        <Link to="/login" className="text-white hover:text-[#309689] text-sm font-medium">Đăng nhập</Link>
                        <Link
                            to="/register"
                            className="bg-[#309689] hover:bg-[#277a6e] text-white px-4 py-2 rounded-md text-sm font-medium"
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