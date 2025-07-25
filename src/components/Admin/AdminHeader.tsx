import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { IoNotificationsOutline, IoSettingsOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import {
    IoHomeOutline,
    IoReceiptOutline,
    IoPersonOutline,
    IoStatsChartOutline,
    IoLayersOutline,
} from 'react-icons/io5';

const AdminHeader: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Bảng điều khiển',
            icon: <IoHomeOutline className="h-5 w-5" />,
            path: '/admin/dashboard'
        },
        {
            id: 'orders',
            label: 'Giao dịch',
            icon: <IoReceiptOutline className="h-5 w-5" />,
            path: '/admin/orders'
        },
        {
            id: 'accounts',
            label: 'Tài khoản',
            icon: <IoPersonOutline className="h-5 w-5" />,
            path: '/admin/accounts'
        },
        {
            id: 'statistics',
            label: 'Thống kê',
            icon: <IoStatsChartOutline className="h-5 w-5" />,
            path: '/admin/statistics'
        },
        {
            id: 'packages',
            label: 'Các gói dịch vụ và quảng cáo',
            icon: <IoLayersOutline className="h-5 w-5" />,
            path: '/admin/packages'
        },
        {
            id: 'settings',
            label: 'Cài đặt',
            icon: <IoSettingsOutline className="h-5 w-5" />,
            path: '/admin/settings'
        }
    ];

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/admin/dashboard':
                return 'Tổng Quan';
            case '/admin/orders':
                return 'Giao dịch';
            case '/admin/accounts':
                return 'Tài khoản';
            case '/admin/statistics':
                return 'Thống kê';
            case '/admin/credit-cards':
                return 'Thẻ tín dụng';
            case '/admin/loans':
                return 'Khoản vay';
            case '/admin/services':
                return 'Dịch vụ';
            case '/admin/packages':
                return 'Các gói dịch vụ và quảng cáo';
            case '/admin/settings':
                return 'Cài đặt';
            default:
                return 'Tổng Quan';
        }
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 md:pr-12">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <IoCloseOutline className="h-6 w-6" />
                    ) : (
                        <IoMenuOutline className="h-6 w-6" />
                    )}
                </button>

                {/* Logo */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center md:w-64 px-4 hover:opacity-80 transition-opacity cursor-pointer"
                >
                    <img
                        src="/logo.png"
                        alt="InnoSphere Logo"
                        className="h-8 w-auto"
                    />
                    <span className="ml-2 text-xl font-semibold" style={{ color: '#00FF19' }}>InnoSphere</span>
                </button>

                {/* Center section - Page title (hidden on mobile) */}
                <div className="hidden md:flex flex-1 items-center">
                    <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
                </div>

                {/* Right side - User info and actions */}
                <div className="flex items-center space-x-4">
                    {/* Search bar (hidden on mobile) */}
                    <div className="hidden md:block relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Settings */}
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <IoSettingsOutline className="h-5 w-5" />
                    </button>

                    {/* Notifications */}
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg relative">
                        <IoNotificationsOutline className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <nav className="px-4 py-2">
                        {menuItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`
                                        flex items-center px-4 py-3 mb-1 rounded-lg
                                        ${active ? 'bg-gray-100 text-[#309689]' : 'text-gray-600 hover:bg-gray-50'}
                                    `}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className={`mr-3 ${active ? 'text-[#309689]' : 'text-gray-500'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default AdminHeader; 