import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    IoGridOutline,
    IoSettingsOutline,
    IoLogOutOutline,
    IoCloseOutline
} from 'react-icons/io5';
import { BsBriefcase, BsBookmark, BsBell } from 'react-icons/bs';

interface SidebarItem {
    id: string;
    title: string;
    path: string;
    icon: React.ReactElement;
    count?: number;
}

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState<string>(
        location.pathname.includes('/dashboard') ? 'overview' :
            location.pathname.includes('/jobs') ? 'jobs' :
                location.pathname.includes('/favorites') ? 'favorites' :
                    location.pathname.includes('/job-alerts') ? 'notifications' :
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
            path: '/employee/job-alerts',
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
        if (onClose) {
            onClose();
        }
    };

    // Base classes for the sidebar container
    const sidebarClasses = `
        fixed md:static
        inset-y-0 left-0
        z-30 md:z-auto
        w-64
        bg-white
        shadow-lg md:shadow-sm
        border-r border-gray-200
        transform md:transform-none
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
        h-full
    `;

    // Overlay for mobile
    const overlayClasses = `
        fixed inset-0
        bg-black bg-opacity-50
        z-20
        transition-opacity duration-300
        md:hidden
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `;

    return (
        <>
            {/* Mobile Overlay */}
            <div className={overlayClasses} onClick={onClose} />

            {/* Sidebar */}
            <div className={sidebarClasses}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        BẢNG ĐIỀU KHIỂN ỨNG CỬ VIÊN
                    </h2>
                    {/* Close button - only on mobile */}
                    <button
                        className="md:hidden text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        <IoCloseOutline className="w-6 h-6" />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex-grow flex flex-col overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`flex items-center px-4 py-3 text-sm transition-colors duration-200
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
                                {item.title}
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

                    {/* Logout Button */}
                    <Link
                        to="/logout"
                        className="flex items-center px-4 py-3 mt-auto text-sm text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
                        onClick={() => handleItemClick('logout')}
                    >
                        <span className="text-gray-500">
                            <IoLogOutOutline className="w-5 h-5" />
                        </span>
                        <span className="ml-3 font-medium">Đăng xuất</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar; 