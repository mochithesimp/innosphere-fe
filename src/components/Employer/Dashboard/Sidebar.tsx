import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    RiDashboardLine,
    RiFileList3Line,
    RiBriefcaseLine,
    RiBookmarkLine,
    RiBarChartBoxLine,
    RiSettings4Line,
    RiLogoutBoxRLine,
    RiCloseLine
} from 'react-icons/ri';

interface SidebarItem {
    id: string;
    label: string;
    path: string;
    icon: React.ReactElement;
    count?: number;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState<string>('overview');

    // Update active item based on URL path
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/employer/dashboard')) {
            setActiveItem('overview');
        } else if (path.includes('/employer/post-job') || path.includes('/employer/create-job')) {
            setActiveItem('post-job');
        } else if (path.includes('/employer/my-jobs') || path.includes('/employer/job-applications')) {
            setActiveItem('my-jobs');
        } else if (path.includes('/employer/saved-candidates')) {
            setActiveItem('saved-candidates');
        } else if (path.includes('/employer/plans')) {
            setActiveItem('plans');
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
            id: 'settings',
            label: 'Cài đặt',
            path: '/employer/settings',
            icon: <RiSettings4Line className="h-5 w-5" />
        }
    ];

    const handleItemClick = (id: string) => {
        setActiveItem(id);
        onClose();
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[900] md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static 
                    top-0 left-0 bottom-0
                    z-[950] md:z-0
                    w-[280px] md:w-64
                    bg-white 
                    shadow-2xl md:shadow-none
                    border-r border-gray-200
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    flex flex-col
                    overflow-hidden
                `}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
                    <h2 className="text-sm font-medium text-gray-700">
                        Bảng điều khiển nhà tuyển dụng
                    </h2>
                    {/* Close button - only on mobile */}
                    <button
                        className="md:hidden text-gray-500 hover:text-gray-700 p-2"
                        onClick={onClose}
                    >
                        <RiCloseLine className="w-6 h-6" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto bg-white py-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`
                                flex items-center px-4 py-3 text-sm
                                transition-colors duration-200
                                ${activeItem === item.id
                                    ? 'bg-[#E8F5F3] border-l-4 border-[#309689]'
                                    : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                }
                            `}
                            onClick={() => handleItemClick(item.id)}
                        >
                            <span className={activeItem === item.id ? 'text-[#309689]' : 'text-gray-500'}>
                                {item.icon}
                            </span>
                            <span className={`ml-3 font-medium ${activeItem === item.id ? 'text-[#309689]' : 'text-gray-600'}`}>
                                {item.label}
                            </span>
                            {item.count && (
                                <span className={`
                                    px-2 py-0.5 rounded-full text-xs ml-auto
                                    ${activeItem === item.id
                                        ? 'bg-[#E8F5F3] text-[#309689]'
                                        : 'bg-gray-100 text-gray-600'
                                    }
                                `}>
                                    {item.count < 10 ? `0${item.count}` : item.count}
                                </span>
                            )}
                        </Link>
                    ))}

                    {/* Logout Button */}
                    <Link
                        to="/logout"
                        className="flex items-center px-4 py-3 mt-4 text-sm text-red-500 hover:bg-gray-50 border-l-4 border-transparent"
                        onClick={onClose}
                    >
                        <span>
                            <RiLogoutBoxRLine className="h-5 w-5" />
                        </span>
                        <span className="ml-3 font-medium">Đăng xuất</span>
                    </Link>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar; 