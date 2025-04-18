import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    IoGridOutline,
    IoSettingsOutline,
    IoLogOutOutline
} from 'react-icons/io5';
import { BsBriefcase, BsBookmark, BsBell } from 'react-icons/bs';

interface SidebarItem {
    id: string;
    title: string;
    path: string;
    icon: JSX.Element;
    count?: number;
}

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState<string>(
        location.pathname.includes('/dashboard') ? 'overview' :
            location.pathname.includes('/jobs') ? 'jobs' :
                location.pathname.includes('/favorites') ? 'favorites' :
                    location.pathname.includes('/notifications') ? 'notifications' :
                        location.pathname.includes('/settings') ? 'settings' : 'overview'
    );

    const menuItems: SidebarItem[] = [
        {
            id: 'overview',
            title: 'Tổng quan',
            path: '/employee/dashboard',
            icon: <IoGridOutline className="w-5 h-5" />
        },
        {
            id: 'jobs',
            title: 'Công việc đã nhận',
            path: '/employee/jobs',
            icon: <BsBriefcase className="w-5 h-5" />
        },
        {
            id: 'favorites',
            title: 'Công việc yêu thích',
            path: '/employee/favorites',
            icon: <BsBookmark className="w-5 h-5" />
        },
        {
            id: 'notifications',
            title: 'Cảnh báo công việc',
            path: '/employee/notifications',
            icon: <BsBell className="w-5 h-5" />,
            count: 9
        },
        {
            id: 'settings',
            title: 'Cài đặt',
            path: '/employee/settings',
            icon: <IoSettingsOutline className="w-5 h-5" />
        }
    ];

    const handleItemClick = (id: string) => {
        setActiveItem(id);
    };

    return (
        <div className="bg-white h-full flex flex-col w-64 shadow-sm border-r border-gray-200">
            {/* Sidebar Header */}
            <div className="px-4 py-3">
                <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                    BẢNG ĐIỀU KHIỂN ỨNG CỬ VIÊN
                </h2>
            </div>

            {/* Menu Items */}
            <div className="flex-grow flex flex-col">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center px-4 py-3 text-sm 
                            ${activeItem === item.id
                                ? 'bg-[#eafaf7] border-l-[3px] border-[#46c1ae]'
                                : 'text-gray-600 hover:bg-gray-50 border-l-[3px] border-transparent'
                            }`}
                        onClick={() => handleItemClick(item.id)}
                    >
                        <span className={`ml-1 ${activeItem === item.id ? 'text-[#46c1ae]' : 'text-gray-500'}`}>
                            {item.icon}
                        </span>
                        <span className={`ml-3 ${activeItem === item.id ? 'text-[#46c1ae]' : 'text-gray-600'}`}>
                            {item.title}
                        </span>
                        {item.count && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs ml-auto">
                                {item.count < 10 ? `0${item.count}` : item.count}
                            </span>
                        )}
                    </Link>
                ))}

                {/* Logout Button - Positioned at the end of middle content */}
                <Link
                    to="/logout"
                    className="flex items-center px-4 py-3 mt-auto text-sm text-gray-600 hover:bg-gray-50 border-l-[3px] border-transparent"
                    onClick={() => handleItemClick('logout')}
                >
                    <span className="ml-1">
                        <IoLogOutOutline className="w-5 h-5 text-gray-500" />
                    </span>
                    <span className="ml-3">Đăng xuất</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar; 