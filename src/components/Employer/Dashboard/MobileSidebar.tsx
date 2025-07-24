import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    RiDashboardLine,
    RiFileList3Line,
    RiBriefcaseLine,
    RiBookmarkLine,
    RiBarChartBoxLine,
    RiSettings4Line,
} from 'react-icons/ri';

interface MenuItem {
    id: string;
    label: string;
    path: string;
    icon: React.ReactElement;
    count?: number;
}

const MobileSidebar: React.FC = () => {
    const location = useLocation();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const menuItems: MenuItem[] = [
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
        <div className="block md:hidden fixed left-0 top-16 bottom-0 w-16 bg-white shadow-lg z-50">
            <div className="flex flex-col items-center py-4 space-y-6">
                {menuItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <div key={item.id} className="relative" onMouseEnter={() => setHoveredItem(item.id)} onMouseLeave={() => setHoveredItem(null)}>
                            <Link
                                to={item.path}
                                className={`
                                    w-10 h-10 flex items-center justify-center rounded-xl
                                    ${active ? 'bg-[#E8F5F3] text-[#309689]' : 'text-gray-500 hover:bg-gray-100'}
                                    transition-all duration-200
                                `}
                            >
                                {item.icon}
                                {item.count && (
                                    <span className={`
                                        absolute -top-1 -right-1 w-5 h-5 
                                        flex items-center justify-center 
                                        text-xs font-medium rounded-full
                                        ${active ? 'bg-[#E8F5F3] text-[#309689]' : 'bg-gray-100 text-gray-600'}
                                    `}>
                                        {item.count < 10 ? `0${item.count}` : item.count}
                                    </span>
                                )}
                            </Link>

                            {/* Tooltip */}
                            {hoveredItem === item.id && (
                                <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm py-2 px-3 rounded-md whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileSidebar; 