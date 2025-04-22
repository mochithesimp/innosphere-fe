import React from 'react';
import Header from '../../components/Employee/Header';
import Sidebar from '../../components/Employee/Sidebar';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';

// Add pagination styles
const paginationStyles = `
    .active-page-button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #35a79c;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
        border: none;
        cursor: pointer;
    }
    
    .pagination-arrow {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #e9f5f3;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
    }
    
    .pagination-arrow svg {
        color: #35a79c;
        width: 16px;
        height: 16px;
    }

    .apply-button {
        margin-left: 12px;
        background-color: #E8F5F3;
        color: #309689;
        padding: 10px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        border: none;
        cursor: pointer;
    }

    .apply-button:hover {
        background-color: #d8efeb;
    }

    .apply-button svg {
        margin-left: 4px;
    }

    .expired-button {
        margin-left: 12px;
        background-color: #E8F5F3;
        color: #9ca3af;
        padding: 10px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        border: none;
    }

    .bookmark-active {
        color: #309689;
    }
`;

const EmployeeJobAlerts: React.FC = () => {
    // Sample data for job alerts
    const jobAlerts = [
        {
            id: 1,
            title: 'Giữ xe trụ sở Google',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: true,
            companyLogo: 'G',
            companyColor: '#4285F4'
        },
        {
            id: 2,
            title: 'UI/UX Designer',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: '▶',
            companyColor: '#FF0000'
        },
        {
            id: 3,
            title: 'Sáng tạo nội dung FB',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: 'f',
            companyColor: '#1877F2'
        },
        {
            id: 4,
            title: 'Bảo vệ trụ sở Google',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: true,
            companyLogo: 'G',
            companyColor: '#4285F4'
        },
        {
            id: 5,
            title: 'Bảo vệ trụ sở Twitter',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: '𝕏',
            companyColor: '#1DA1F2'
        },
        {
            id: 6,
            title: 'Chăm sóc khách hàng',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: 'W',
            companyColor: '#FF5722'
        },
        {
            id: 7,
            title: 'Hỗ trợ viên Google',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: true,
            companyLogo: 'G',
            companyColor: '#4285F4'
        },
        {
            id: 8,
            title: 'Thợ đóng thuyền',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: '★',
            companyColor: '#FF69B4'
        },
        {
            id: 9,
            title: 'Hỗ trợ viên Google',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: true,
            companyLogo: 'G',
            companyColor: '#4285F4'
        },
        {
            id: 10,
            title: 'Hỗ trợ viên Microsoft',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: 'M',
            companyColor: '#00A4EF'
        },
        {
            id: 11,
            title: 'Hỗ trợ viên Apple',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: '',
            companyColor: '#000000',
            companyIcon: '🍎'
        },
        {
            id: 12,
            title: 'Thiết kế Figma',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: 'F',
            companyColor: '#F24E1E'
        },
        {
            id: 13,
            title: 'Hỗ trợ viên UP',
            time: '13h00-16h00',
            location: 'HCM',
            salary: '20.000/Giờ',
            expired: false,
            days: 4,
            companyLogo: 'UP',
            companyColor: '#4CBB17'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <style>
                {paginationStyles}
            </style>

            {/* Header component with bottom border */}
            <div className="w-full border-b border-gray-300">
                <Header />
            </div>

            <div className="flex flex-1">
                {/* Sidebar component with right border */}
                <div className="border-r border-gray-300">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                    {/* Page Content */}
                    <div className="flex-1 p-6 overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Cảnh báo công việc <span className="text-sm text-gray-500 font-normal ml-2">(9 công việc mới)</span></h1>
                            <button className="text-[#309689] text-sm font-medium flex items-center">
                                <FiEdit className="mr-1.5 h-4 w-4" />
                                Chỉnh sửa cảnh báo việc làm
                            </button>
                        </div>

                        {/* Job Alerts */}
                        <div className="space-y-4">
                            {jobAlerts.map(job => (
                                <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between relative group">
                                    <div className="flex items-center flex-1">
                                        {/* Company Logo */}
                                        <div
                                            className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center mr-4 text-white font-bold text-xl"
                                            style={{ backgroundColor: job.companyColor }}
                                        >
                                            {job.companyIcon || job.companyLogo}
                                        </div>

                                        {/* Job Details */}
                                        <div className="flex-1">
                                            <div className="flex items-center mb-1">
                                                <h3 className="font-medium text-gray-800">{job.title}</h3>
                                                <span className="ml-2 text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">
                                                    {job.time}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>{job.location}</span>
                                                <span className="mx-2">•</span>
                                                <span>{job.salary}</span>

                                                {job.expired && (
                                                    <span className="ml-2 text-xs text-red-500 flex items-center">
                                                        <IoCloseCircle className="mr-1 h-3.5 w-3.5" />
                                                        Công việc đã hết hạn
                                                    </span>
                                                )}

                                                {!job.expired && job.days && (
                                                    <span className="ml-2 flex items-center">
                                                        <svg
                                                            className="mr-1 h-3.5 w-3.5 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"></rect>
                                                            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"></line>
                                                            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"></line>
                                                            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"></line>
                                                        </svg>
                                                        <span className="text-xs text-gray-500">Còn {job.days} ngày</span>
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center">
                                        {/* Bookmark Button */}
                                        <button className={`${job.id % 3 === 0 ? 'bookmark-active' : 'text-gray-300'} hover:bg-[#f0f9f7] p-2 rounded-full`}>
                                            <FaBookmark className="h-5 w-5" />
                                        </button>

                                        {/* Status/Apply Button */}
                                        {job.expired ? (
                                            <div className="expired-button">
                                                Đã Hết Hạn
                                            </div>
                                        ) : (
                                            <button className="apply-button">
                                                Ứng Tuyển Ngay
                                                <FiChevronRight className="ml-1 h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center space-x-6 mt-8">
                            <button className="pagination-arrow">
                                <FiChevronLeft />
                            </button>

                            {/* Active page number */}
                            <div className="active-page-button">
                                01
                            </div>

                            <button className="flex items-center justify-center text-gray-500 font-medium text-sm">
                                02
                            </button>
                            <button className="flex items-center justify-center text-gray-500 font-medium text-sm">
                                03
                            </button>
                            <button className="flex items-center justify-center text-gray-500 font-medium text-sm">
                                04
                            </button>
                            <button className="flex items-center justify-center text-gray-500 font-medium text-sm">
                                05
                            </button>
                            <button className="pagination-arrow">
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500">
                        © 2025 InnoSphere. All rights Reserved
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeJobAlerts; 