import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Dashboard/Sidebar';
import { checkEmployerProfileAndRedirect } from '../../utils/employerAuth';

const EmployerLayout: React.FC = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Check employer profile on component mount to prevent unauthorized access
    useEffect(() => {
        const checkProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                console.log('🛡️ EmployerLayout: Checking employer profile...');
                await checkEmployerProfileAndRedirect(navigate, token);
            }
        };

        checkProfile();
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header component */}
            <Header />

            <div className="flex flex-1">
                {/* Sidebar component - hidden on mobile */}
                <div className="hidden md:block border-r border-gray-300">
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                </div>

                {/* Main Content with white background */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Dashboard Content */}
                    <div className="flex-1 p-4 md:p-6 overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>

            <footer className="bg-white py-4 text-center text-gray-500 text-sm border-t">
                © 2025 InnoSphere. All rights Reserved
            </footer>
        </div>
    );
};

export default EmployerLayout;
