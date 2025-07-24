import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header component */}
            <AdminHeader />

            <div className="flex flex-1">
                {/* Sidebar component - hidden on mobile */}
                <div className="hidden md:block w-64 bg-white shadow-sm">
                    <AdminSidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-gray-50">
                    <div className="flex-1 p-4 md:p-6 overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout; 