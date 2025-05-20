import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    RiDashboardLine,
    RiUserLine,
    RiFileList3Line,
    RiBriefcaseLine,
    RiBookmarkLine,
    RiBarChartBoxLine,
    RiSettings4Line,
    RiLogoutBoxRLine
} from 'react-icons/ri';

interface SidebarItem {
    id: string;
    label: string;
    path: string;
    icon: JSX.Element;
    count?: number;
}

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState<string>('overview');

    // Update active item based on URL path
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/employer/dashboard')) {
            setActiveItem('overview');
        } else if (path.includes('/employer/profile')) {
            setActiveItem('profile');
        } else if (path.includes('/employer/post-job') || path.includes('/employer/create-job')) {
            setActiveItem('post-job');
        } else if (path.includes('/employer/my-jobs') || path.includes('/employer/job-applications')) {
            setActiveItem('my-jobs');
        } else if (path.includes('/employer/saved-candidates')) {
            setActiveItem('saved-candidates');
        } else if (path.includes('/employer/plans')) {
            setActiveItem('plans');
        } else if (path.includes('/employer/companies')) {
            setActiveItem('companies');
        } else if (path.includes('/employer/settings')) {
            setActiveItem('settings');
        }
    }, [location.pathname]);

    const menuItems: SidebarItem[] = [
        {
            id: 'overview',
            label: 'Tổng quan',
            path: '/employer/dashboard',
            icon: <RiDashboardLine className="h-5 w-5" />
        },
        {
            id: 'profile',
            label: 'Hồ sơ nhà tuyển dụng',
            path: '/employer/profile',
            icon: <RiUserLine className="h-5 w-5" />
        },
        {
            id: 'post-job',
            label: 'Đăng tin tuyển dụng',
            path: '/employer/post-job',
            icon: <RiFileList3Line className="h-5 w-5" />
        },
        {
            id: 'my-jobs',
            label: 'Công việc của tôi',
            path: '/employer/my-jobs',
            icon: <RiBriefcaseLine className="h-5 w-5" />,
            count: 5
        },
        {
            id: 'saved-candidates',
            label: 'Lưu thông tin ứng viên',
            path: '/employer/saved-candidates',
            icon: <RiBookmarkLine className="h-5 w-5" />,
            count: 12
        },
        {
            id: 'plans',
            label: 'Lên kế hoạch và thanh toán',
            path: '/employer/plans',
            icon: <RiBarChartBoxLine className="h-5 w-5" />
        },
        {
            id: 'companies',
            label: 'Tất cả doanh nghiệp',
            path: '/employer/companies',
            icon: <RiBarChartBoxLine className="h-5 w-5" />
        },
        {
            id: 'settings',
            label: 'Cài đặt',
            path: '/employer/settings',
            icon: <RiSettings4Line className="h-5 w-5" />
        }
    ];

    const handleItemClick = (id: string) => {
        setActiveItem(id);
    };

    return (
        <div className="bg-white h-full flex flex-col w-64 shadow-sm border-r border-gray-200">
            {/* Sidebar Header */}
            <div className="px-4 py-4">
                <h2 className="text-sm text-gray-500 text-center">
                    Bảng điều khiển nhà tuyển dụng
                </h2>
            </div>

            {/* Menu Items */}
            <div className="flex-grow flex flex-col py-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center px-4 py-3 text-sm 
                            ${activeItem === item.id
                                ? 'bg-[#E8F5F3] border-l-4 border-[#309689]'
                                : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                            }`}
                        onClick={() => handleItemClick(item.id)}
                    >
                        <span className={activeItem === item.id ? 'text-[#309689]' : 'text-gray-500'}>
                            {item.icon}
                        </span>
                        <span className={`ml-3 font-medium ${activeItem === item.id ? 'text-[#309689]' : 'text-gray-600'}`}>
                            {item.label}
                        </span>
                        {item.count && (
                            <span className={`px-2 py-0.5 rounded-full text-xs ml-auto ${activeItem === item.id
                                ? 'bg-[#E8F5F3] text-[#309689]'
                                : 'bg-gray-100 text-gray-600'
                                }`}>
                                {item.count < 10 ? `0${item.count}` : item.count}
                            </span>
                        )}
                    </Link>
                ))}

                {/* Logout Button - Positioned at the end of middle content */}
                <Link
                    to="/logout"
                    className="flex items-center px-4 py-3 mt-auto text-sm text-red-500 hover:bg-gray-50 border-l-4 border-transparent"
                >
                    <span>
                        <RiLogoutBoxRLine className="h-5 w-5" />
                    </span>
                    <span className="ml-3 font-medium">Đăng xuất</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar; 