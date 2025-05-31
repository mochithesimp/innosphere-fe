import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    IoHomeOutline,
    IoReceiptOutline,
    IoPersonOutline,
    IoStatsChartOutline,
    IoWalletOutline,
    IoConstructOutline,
    IoLayersOutline,
    IoSettingsOutline
} from 'react-icons/io5';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
}

const AdminSidebar: React.FC = () => {
    const location = useLocation();

    const sidebarItems: SidebarItem[] = [
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
            id: 'investments',
            label: 'Đầu tư',
            icon: <IoStatsChartOutline className="h-5 w-5" />,
            path: '/admin/investments'
        },
        {
            id: 'credit-cards',
            label: 'Thẻ tín dụng',
            icon: <IoWalletOutline className="h-5 w-5" />,
            path: '/admin/credit-cards'
        },
        {
            id: 'loans',
            label: 'Khoản vay',
            icon: <IoConstructOutline className="h-5 w-5" />,
            path: '/admin/loans'
        },
        {
            id: 'services',
            label: 'Dịch vụ',
            icon: <IoLayersOutline className="h-5 w-5" />,
            path: '/admin/services'
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

    return (
        <aside className="w-64 bg-white h-full border-r border-gray-200">
            <nav className="mt-6">
                <ul className="space-y-1 px-4">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    className={
                                        `flex items-center justify-start px-4 py-3 text-sm font-medium text-left rounded-lg transition-colors duration-200 ${isActive
                                            ? 'bg-gray-100 border-r-2'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`
                                    }
                                    style={isActive ? {
                                        color: '#309689',
                                        borderRightColor: '#309689'
                                    } : {}}
                                >
                                    <span
                                        className="mr-3"
                                        style={isActive ? { color: '#309689' } : {}}
                                    >
                                        {item.icon}
                                    </span>
                                    <span className="text-left">{item.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar; 