import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

interface HeaderProps {
    currentStep?: string;
}

const Header: React.FC<HeaderProps> = () => {
    return (
        <>
            {/* Top Navigation */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">Trang chủ</Link>
                            <Link to="/tim-ung-vien" className="text-gray-500 hover:text-gray-700 text-sm">Tìm ứng viên</Link>
                            <Link to="/employer/dashboard" className="text-[#309689] border-b-2 border-[#309689] pb-1 text-sm">Bảng điều khiển</Link>
                            <Link to="/cong-viec-cua-toi" className="text-gray-500 hover:text-gray-700 text-sm">Công việc của tôi</Link>
                            <Link to="/ung-tuyen" className="text-gray-500 hover:text-gray-700 text-sm">Ứng tuyển</Link>
                            <Link to="/cham-soc-khach-hang" className="text-gray-500 hover:text-gray-700 text-sm">Chăm sóc khách hàng</Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <span className="text-gray-600 text-sm">+84 0989783393</span>
                            </div>
                            <div className="flex items-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" className="h-4 w-6 mr-2" />
                                <span className="text-sm">Vietnamese</span>
                                <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main header with logo and action buttons */}
            <div className="bg-white border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <img src="/logo.png" alt="InnoSphere Logo" className="h-8 w-8 mr-2" />
                            <span className="text-[#00FF19] font-semibold text-xl">InnoSphere</span>
                        </Link>

                        {/* Right side elements: notifications and post job button */}
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <FaBell className="text-gray-500 h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                            </div>

                            <Link to="/employer/post-job" className="bg-[#309689] hover:bg-[#277b70] text-white px-4 py-2 rounded-md text-sm font-medium">
                                Đăng Tin Tuyển Dụng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header; 