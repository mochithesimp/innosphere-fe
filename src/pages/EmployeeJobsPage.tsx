import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoLocationOutline } from "react-icons/io5";

import Header from '../components/Employee/Header';
import Sidebar from '../components/Employee/Sidebar';

// Add CSS for the active pagination button and arrow icons
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
`;

const EmployeeJobsPage: React.FC = () => {
    // Common button style for consistency
    const buttonStyle = {
        backgroundColor: '#EBF5F4',
        color: '#309689',
        padding: '6px 16px',
        borderRadius: '6px',
        border: '1px solid #d0e6e3',
        fontSize: '14px',
        fontWeight: '500',
        display: 'inline-block',
        textDecoration: 'none'
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Add the CSS style */}
            <style>{paginationStyles}</style>

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
                    {/* Jobs Content */}
                    <div className="flex-1 p-6 overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold">Công việc đã nhận <span className="text-gray-500 font-normal text-lg">(589)</span></h1>
                        </div>

                        {/* Job Table */}
                        <div className="mb-6">
                            {/* Job Table Header */}
                            <div className="bg-gray-100 grid grid-cols-4 py-3 px-4 rounded-t-lg text-sm font-medium text-gray-600">
                                <div>Công việc</div>
                                <div>Ngày nhận</div>
                                <div>Trạng thái</div>
                                <div>Hành động</div>
                            </div>

                            {/* Job Items */}
                            <div className="bg-white rounded-b-lg shadow-sm">
                                {/* Job Item 1 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="bg-[#4CBB17] p-3 rounded-lg mr-4 flex items-center justify-center w-10 h-10">
                                            <span className="text-white font-bold text-lg">Up</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">Rửa chén</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">13h00-16h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span>20.000/Giờ</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">2 tháng 3, 2025 19:28</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Hoạt động
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button" style={buttonStyle}>
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                </div>

                                {/* Job Item 2 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="bg-[#FF69B4] p-3 rounded-lg mr-4 flex items-center justify-center w-10 h-10">
                                            <span className="text-white font-bold text-lg">B</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">Bán rau má</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">11h00-18h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span>20.000/Giờ</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">8 tháng 3, 2025 09:30</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Đã xong
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button" style={buttonStyle}>
                                            Đánh Giá
                                        </a>
                                    </div>
                                </div>

                                {/* Job Item 3 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="bg-black p-3 rounded-lg mr-4 flex items-center justify-center w-10 h-10">
                                            <span className="text-white font-bold text-lg">C</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">Cắt bịch nước mắm</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">7h00-13h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span>20.000/Giờ</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">12 tháng 3, 2025 16:01</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Đã xong
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button" style={buttonStyle}>
                                            Đánh Giá
                                        </a>
                                    </div>
                                </div>

                                {/* Job Item 4 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="bg-gray-200 p-3 rounded-lg mr-4 flex items-center justify-center w-10 h-10">
                                            <span className="text-gray-700 font-bold text-lg">B</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">Bán đậu hũ</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">9h00-15h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span>20.000/Giờ</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">21 tháng 3, 2025 11:00</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Đã xong
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button" style={buttonStyle}>
                                            Đánh Giá
                                        </a>
                                    </div>
                                </div>

                                {/* Job Item 5 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="bg-blue-500 p-3 rounded-lg mr-4 flex items-center justify-center w-10 h-10">
                                            <span className="text-white font-bold text-lg">B</span>
                                        </div>
                                        <div className="text-left overflow-hidden">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium truncate">Bán giò heo chiên nước mắm</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3] whitespace-nowrap">13h00-18h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1 flex-shrink-0" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span>20.000/Giờ</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">2 tháng 4, 2025 19:28</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Hoạt động
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button" style={buttonStyle}>
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                </div>

                                {/* Job Item 6 */}
                                <div className="grid grid-cols-4 items-center py-4 px-4 border-b border-gray-100 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="bg-blue-600 p-3 rounded-lg mr-4 flex items-center justify-center w-10 h-10">
                                            <span className="text-white font-bold text-lg">T</span>
                                        </div>
                                        <div className="text-left overflow-hidden">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium truncate">Thiết kế UI/UX</h3>
                                                <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3] whitespace-nowrap">19h00-23h00</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <IoLocationOutline className="mr-1 flex-shrink-0" />
                                                <span>HCM</span>
                                                <span className="mx-2">•</span>
                                                <span>20.000/Giờ</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">3 tháng 4, 2025 15:28</div>
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689]">
                                            <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                                            Hoạt động
                                        </span>
                                    </div>
                                    <div>
                                        <a href="#" className="detail-button" style={buttonStyle}>
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center space-x-6 mt-8">
                            <button
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: '#e9f5f3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaChevronLeft style={{ color: '#35a79c', width: '16px', height: '16px' }} />
                            </button>

                            {/* Active page number with direct styling */}
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
                            <button
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: '#e9f5f3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaChevronRight style={{ color: '#35a79c', width: '16px', height: '16px' }} />
                            </button>
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

export default EmployeeJobsPage; 