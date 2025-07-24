import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="flex flex-1 pt-16">
                {/* Desktop Sidebar */}
                <div className="hidden md:block">
                    <Sidebar isOpen={true} onClose={() => { }} />
                </div>

                {/* Content Area */}
                <main className="flex-1 min-h-screen">
                    <div className="p-4 md:p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout; 