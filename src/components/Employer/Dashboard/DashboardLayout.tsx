import React, { ReactNode } from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header component with bottom border */}
            <div className="w-full">
                <Header />
            </div>

            <div className="flex flex-1">
                {/* Sidebar component with right border */}
                <div className="border-r border-gray-300">
                    <Sidebar />
                </div>

                {/* Main Content with white background */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Dashboard Content */}
                    <div className="flex-1 p-6 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>

            <footer className="bg-white py-4 text-center text-gray-500 text-sm border-t">
                © 2025 InnoSphere. All rights Reserved
            </footer>
        </div>
    );
};

export default DashboardLayout; 