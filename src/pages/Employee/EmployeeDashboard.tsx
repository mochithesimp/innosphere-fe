import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegBookmark, FaChevronRight } from 'react-icons/fa';
import { HiOutlineBriefcase } from "react-icons/hi";
import { FiBell } from "react-icons/fi";

import Header from '../../components/Employee/Header';
import Sidebar from '../../components/Employee/Sidebar';
import { WorkerService } from '../../services';

import { IoLocationOutline } from "react-icons/io5";

const EmployeeDashboard: React.FC = () => {
    const [hasProfile, setHasProfile] = useState<boolean>(false);
    const [profileLoading, setProfileLoading] = useState<boolean>(true);

    // Check if worker profile exists (just check if API doesn't return 404)
    useEffect(() => {
        const checkWorkerProfile = async () => {
            try {
                setProfileLoading(true);
                const profile = await WorkerService.getWorkerProfile();

                // If we get any profile data back (no 404), hide the alert
                setHasProfile(!!profile);
                console.log('📋 Worker profile check:', {
                    hasProfile: !!profile,
                    profile: profile
                });
            } catch (error) {
                console.error('Error checking worker profile:', error);
                // If there's an error (like 404), show the profile completion alert
                setHasProfile(false);
            } finally {
                setProfileLoading(false);
            }
        };

        checkWorkerProfile();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header component with bottom border */}
            <div className="w-full border-b border-gray-300">
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
                        <div className="mb-8 text-left">
                            <h1 className="text-xl font-semibold">Hello, Anh Vũ Lê</h1>
                            <p className="text-gray-600 text-sm">Đây là các hoạt động hàng ngày và thông báo công việc của bạn</p>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Jobs Applied Card */}
                            <div style={{ backgroundColor: '#E7F0FA' }} className="rounded-lg p-5 flex items-center justify-between">
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold mb-1">589</h2>
                                    <p className="text-gray-600 text-sm">Công Việc đã nhận</p>
                                </div>
                                <div style={{ backgroundColor: 'white' }} className="p-3 rounded-lg shadow-sm">
                                    <HiOutlineBriefcase style={{ color: '#0A65CC' }} className="h-6 w-6" />
                                </div>
                            </div>

                            {/* Favorite Jobs Card */}
                            <div style={{ backgroundColor: '#FFF6E6' }} className="rounded-lg p-5 flex items-center justify-between">
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold mb-1">238</h2>
                                    <p className="text-gray-600 text-sm">Công Việc yêu thích</p>
                                </div>
                                <div style={{ backgroundColor: 'white' }} className="p-3 rounded-lg shadow-sm">
                                    <FaRegBookmark style={{ color: '#FFA500' }} className="h-6 w-6" />
                                </div>
                            </div>

                            {/* Job Alerts Card */}
                            <div style={{ backgroundColor: '#E7F6EA' }} className="rounded-lg p-5 flex items-center justify-between">
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold mb-1">574</h2>
                                    <p className="text-gray-600 text-sm">Cảnh báo công việc</p>
                                </div>
                                <div style={{ backgroundColor: 'white' }} className="p-3 rounded-lg shadow-sm">
                                    <FiBell style={{ color: '#0BA02C' }} className="h-6 w-6" />
                                </div>
                            </div>
                        </div>

                        {/* Profile Completion Alert - Only show if profile is incomplete */}
                        {profileLoading ? (
                            <div className="bg-gray-100 rounded-lg p-6 mb-8 animate-pulse">
                                <div className="flex justify-between items-center">
                                    <div className="text-left">
                                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                                    </div>
                                    <div className="h-10 bg-gray-300 rounded w-32"></div>
                                </div>
                            </div>
                        ) : !hasProfile ? (
                            <div className="bg-red-500 text-white rounded-lg p-6 mb-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-left">
                                        <h3 className="text-xl font-semibold mb-1">Việc chỉnh sửa hồ sơ của bạn chưa hoàn tất.</h3>
                                        <p className="text-sm opacity-90">Hoàn thiện việc chỉnh sửa hồ sơ của bạn và xây dựng Sơ yếu lý lịch tùy chỉnh của bạn</p>
                                    </div>
                                    <Link to="/employee/settings" className="bg-white font-medium px-4 py-2 rounded-lg flex items-center">
                                        <span style={{ color: '#E05151' }}>Chỉnh Sửa Hồ Sơ</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="#E05151">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ) : null}

                        {/* Recent Jobs Section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold">Công việc đã nhận gần đây</h2>
                                <Link to="/employee/all-jobs" className="text-gray-600 text-sm flex items-center">
                                    Tất cả
                                    <FaChevronRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>

                            {/* Job Table Header */}
                            <div className="bg-gray-100 grid grid-cols-4 py-3 px-4 rounded-t-lg text-sm font-medium text-gray-600">
                                <div>Công việc</div>
                                <div>Ngày nhận</div>
                                <div>Trạng thái</div>
                                <div>Hành động</div>
                            </div>

                            {/* Style for buttons - separate from tailwind */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                    .detail-button {
                                        background-color: #EBF5F4 !important;
                                        color: #309689 !important;
                                        padding: 6px 16px !important;
                                        border-radius: 6px !important;
                                        border: 1px solid #d0e6e3 !important;
                                        font-size: 14px !important;
                                        font-weight: 500 !important;
                                        cursor: pointer !important;
                                        display: inline-block !important;
                                    }
                                    .detail-button:hover {
                                        background-color: #dfeeed !important;
                                    }
                                `
                            }} />

                            {/* Job Items */}
                            <div className="bg-white rounded-b-lg shadow-sm">
                                {/* Job Item 1 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg my-2">
                                    <div className="flex items-center">
                                        <div className="bg-[#4CBB17] p-3 rounded-lg mr-4 flex items-center justify-center w-12 h-12">
                                            <span className="text-white font-bold text-lg">Up</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">Rửa chén</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">13h00-18h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span className="flex items-center">
                                                    <span>20.000/Giờ</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">2 tháng 3, 2025 19:28</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Hoạt động
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button">
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                </div>

                                {/* Job Item 2 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg my-2">
                                    <div className="flex items-center">
                                        <div className="bg-[#FF69B4] p-3 rounded-lg mr-4 flex items-center justify-center w-12 h-12">
                                            <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">Sửa ống nước</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">10h00-15h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span className="flex items-center">
                                                    <span>20.000/Giờ</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">3 tháng 3, 2025 23:26</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Hoạt động
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button">
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                </div>

                                {/* Job Item 3 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg my-2">
                                    <div className="flex items-center">
                                        <div className="bg-black p-3 rounded-lg mr-4 flex items-center justify-center w-12 h-12">
                                            <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">Làm thumbnail</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">7h00-13h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span className="flex items-center">
                                                    <span>25.000/Giờ</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">12 tháng 3, 2025 19:28</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Hoạt động
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button">
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                </div>

                                {/* Job Item 4 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 hover:bg-gray-50 rounded-lg my-2">
                                    <div className="flex items-center">
                                        <div className="bg-gray-200 p-3 rounded-lg mr-4 flex items-center justify-center w-12 h-12">
                                            <img src="https://static.vecteezy.com/system/resources/previews/004/966/104/original/colorful-letter-s-logo-vector.jpg" alt="Microsoft" className="h-6 w-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">Vẽ 3D</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">9h00-16h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span className="flex items-center">
                                                    <span>28.000/Giờ</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">11 tháng 3, 2025 23:26</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Hoạt động
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button">
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer with top border that spans full width */}
            <footer className="bg-white p-4 text-center text-gray-500 text-sm border-t border-gray-300 w-full">
                <p>© 2025 InnoSphere. All rights Reserved</p>
            </footer>
        </div>
    );
};

export default EmployeeDashboard; 