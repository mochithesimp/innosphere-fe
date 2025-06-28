import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaSearch } from 'react-icons/fa';
import { ResumeService, WorkerProfileResponse } from '../../services/resumeService';

const Header: React.FC = () => {
    const [workerProfile, setWorkerProfile] = useState<WorkerProfileResponse | null>(null);

    // Load worker profile to get avatar
    const loadWorkerProfile = async () => {
        try {
            const profile = await ResumeService.getWorkerProfile();
            setWorkerProfile(profile);
            console.log('🔄 Header: Worker profile loaded/refreshed:', profile);
        } catch (error) {
            console.error('Error loading worker profile:', error);
            // Don't show error to user, just use default avatar
        }
    };

    useEffect(() => {
        loadWorkerProfile();

        // Listen for profile update events
        const handleProfileUpdate = () => {
            console.log('📢 Header: Received profile update event, refreshing...');
            loadWorkerProfile();
        };

        // Add event listener for profile updates
        window.addEventListener('workerProfileUpdated', handleProfileUpdate);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('workerProfileUpdated', handleProfileUpdate);
        };
    }, []);

    return (
        <>
            {/* Top Navigation */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">Trang chủ</Link>
                            <Link to="/jobs" className="text-gray-500 hover:text-gray-700 text-sm">Tìm việc</Link>
                            <Link to="/recruitment" className="text-gray-500 hover:text-gray-700 text-sm">Tìm nhà tuyển dụng</Link>
                            <Link to="/employee/dashboard" className="text-[#309689] border-b-2 border-[#309689] pb-1 text-sm">Bảng điều khiển</Link>
                            <Link to="/notifications" className="text-gray-500 hover:text-gray-700 text-sm">Thông báo việc làm</Link>
                            <Link to="/support" className="text-gray-500 hover:text-gray-700 text-sm">Chăm sóc & Hỗ trợ</Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <span className="text-gray-600 text-sm">+84 0989783393</span>
                            </div>
                            <div className="flex items-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" className="h-4 w-6 mr-2" />
                                <span className="text-sm">Vietnamese</span>
                                <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main header with search */}
            <div className="bg-white border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center mr-11">
                            <img src="/logo.png" alt="InnoSphere Logo" className="h-8 mr-2" />
                            <span className="text-[#00FF19] font-bold text-xl">InnoSphere</span>
                        </Link>

                        {/* Search Section */}
                        <div className="flex w-[700px]">
                            {/* Vietnam dropdown */}
                            <div className="flex items-center border border-gray-300 border-r-0 bg-white px-3 py-2 rounded-l-md">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam" className="h-4 w-6 mr-2" />
                                <span className="text-sm">Vietnam</span>
                                <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>

                            {/* Search input */}
                            <div className="relative flex-1">
                                <div className="flex items-center">
                                    <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                                        <FaSearch className="text-[#309689]" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Tiêu đề công việc, từ khóa, công ty"
                                        className="w-full border border-gray-300 rounded-r-md py-2 pl-10 pr-3 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* User icons */}
                        <div className="ml-auto flex items-center space-x-4">
                            <div className="relative">
                                <FaBell className="text-gray-500 h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                            </div>
                            <img
                                src={workerProfile?.avatarUrl || "/avatar.jpg"}
                                alt="User profile"
                                className="h-8 w-8 rounded-full border-2 border-white object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/avatar.jpg";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header; 