import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import {
    RiDashboardLine,
    RiFileList3Line,
    RiBriefcaseLine,
    RiBookmarkLine,
    RiBarChartBoxLine,
    RiSettings4Line,
} from 'react-icons/ri';

interface HeaderProps {
    currentStep?: string;
}

const Header: React.FC<HeaderProps> = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { id: 'overview', label: 'Tổng quan', path: '/employer/dashboard', icon: <RiDashboardLine className="h-5 w-5" /> },
        { id: 'post-job', label: 'Đăng tin tuyển dụng', path: '/employer/post-job', icon: <RiFileList3Line className="h-5 w-5" /> },
        { id: 'my-jobs', label: 'Công việc của tôi', path: '/employer/my-jobs', icon: <RiBriefcaseLine className="h-5 w-5" />, count: 5 },
        { id: 'saved-candidates', label: 'Lưu thông tin ứng viên', path: '/employer/saved-candidates', icon: <RiBookmarkLine className="h-5 w-5" />, count: 12 },
        { id: 'plans', label: 'Lên kế hoạch và thanh toán', path: '/employer/plans', icon: <RiBarChartBoxLine className="h-5 w-5" /> },
        { id: 'settings', label: 'Cài đặt', path: '/employer/settings', icon: <RiSettings4Line className="h-5 w-5" /> }
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* Top Navigation */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center justify-between py-2">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            {isMobileMenuOpen ? (
                                <IoClose className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-5 w-5" />
                            )}
                        </button>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600 text-sm">+84 0989783393</span>
                            <div className="flex items-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" className="h-4 w-6 mr-2" />
                                <span className="text-sm">VN</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white absolute left-0 right-0 z-50 shadow-lg`}>
                        <div className="py-2 px-4">
                            {menuItems.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.id}
                                        to={item.path}
                                        className={`flex items-center justify-between py-3 ${active ? 'text-[#309689]' : 'text-gray-600'} hover:bg-gray-50 rounded-lg px-3`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className={active ? 'text-[#309689]' : 'text-gray-500'}>
                                                {item.icon}
                                            </span>
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        {item.count && (
                                            <span className={`
                                                px-2 py-1 rounded-full text-xs font-medium
                                                ${active ? 'bg-[#E8F5F3] text-[#309689]' : 'bg-gray-100 text-gray-600'}
                                            `}>
                                                {item.count < 10 ? `0${item.count}` : item.count}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-between py-2">
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

                            <Link to="/employer/post-job" className="bg-[#309689] hover:bg-[#277b70] text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
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