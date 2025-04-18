import React, { useState, useRef } from 'react';
import Header from '../components/Employee/Header';
import Sidebar from '../components/Employee/Sidebar';
import { FiUpload, FiPlus } from 'react-icons/fi';
import { BsGlobe } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { BsFileEarmarkText } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import CVModal from '../components/Employee/CVModal';


const settingStyles = `
    .tab-item {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        border-bottom: 2px solid transparent;
        color: #6b7280;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s;
    }
    
    .tab-item:hover {
        color: #309689;
    }
    
    .tab-item svg {
        margin-right: 0.5rem;
    }
    
    .tab-active {
        color: #309689;
        border-bottom: 2px solid #309689;
    }
    
    .tab-container {
        display: flex;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .tab-active-underline {
        position: relative;
    }
    
    .tab-active-underline::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #309689;
    }
    
    .input-field {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        color: #4b5563;
    }
    
    .input-field:focus {
        outline: none;
        border-color: #309689;
        box-shadow: 0 0 0 1px #e8f5f3;
    }
    
    .select-field {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        color: #4b5563;
        background-color: white;
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.75rem center;
        background-repeat: no-repeat;
        background-size: 1.25em 1.25em;
    }

    .apply-button {
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
    
    .save-button {
        background-color: #309689;
        color: white;
        padding: 10px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
        text-align: center;
    }
    
    .save-button:hover {
        background-color: #277b70;
    }
    
    .btn-outline {
        border: 1px solid #e5e7eb;
        color: #4b5563;
        background-color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    
    .btn-outline:hover {
        background-color: #f9fafb;
    }
    
    .file-upload {
        border: 2px dashed #e5e7eb;
        border-radius: 0.5rem;
        padding: 2rem;
        text-align: center;
        cursor: pointer;
    }
    
    .file-upload:hover {
        border-color: #d1d5db;
        background-color: #f9fafb;
    }
    
    .file-item {
        border: 1px solid #e5e7eb;
        border-radius: 0.375rem;
        padding: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const EmployeeSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('basic');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isCVModalOpen, setIsCVModalOpen] = useState(false);

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleAddCV = (name: string, file: File | null) => {
        // Here you would typically handle the CV upload to a server
        console.log('Adding CV:', name, file);
        // Close the modal
        setIsCVModalOpen(false);
        // You might want to refresh the CVs list or show a success message
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <style>
                {settingStyles}
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
                            <h1 className="text-2xl font-semibold text-gray-800">Cài đặt</h1>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex">
                                <button
                                    className={`tab-item ${activeTab === 'basic' ? 'tab-active' : ''}`}
                                    onClick={() => setActiveTab('basic')}
                                >
                                    <FiUser size={18} style={{ color: activeTab === 'basic' ? '#309689' : '#6b7280' }} />
                                    <span style={{ color: activeTab === 'basic' ? '#309689' : '#6b7280' }}>Cá nhân</span>
                                </button>
                                <button
                                    className={`tab-item ${activeTab === 'profile' ? 'tab-active' : ''}`}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    <BsFileEarmarkText size={18} style={{ color: activeTab === 'profile' ? '#309689' : '#6b7280' }} />
                                    <span style={{ color: activeTab === 'profile' ? '#309689' : '#6b7280' }}>Hồ sơ</span>
                                </button>
                                <button
                                    className={`tab-item ${activeTab === 'social' ? 'tab-active' : ''}`}
                                    onClick={() => setActiveTab('social')}
                                >
                                    <BiWorld size={18} style={{ color: activeTab === 'social' ? '#309689' : '#6b7280' }} />
                                    <span style={{ color: activeTab === 'social' ? '#309689' : '#6b7280' }}>Liên kết xã hội</span>
                                </button>
                                <button
                                    className={`tab-item ${activeTab === 'account' ? 'tab-active' : ''}`}
                                    onClick={() => setActiveTab('account')}
                                >
                                    <IoSettingsOutline size={18} style={{ color: activeTab === 'account' ? '#309689' : '#6b7280' }} />
                                    <span style={{ color: activeTab === 'account' ? '#309689' : '#6b7280' }}>Thiết lập tài khoản</span>
                                </button>
                            </div>
                        </div>

                        {/* Basic Information Form */}
                        {activeTab === 'basic' && (
                            <div>
                                <style>
                                    {`
                                    .custom-save-button {
                                        background-color: #309689;
                                        color: white;
                                        padding: 10px 24px;
                                        border-radius: 6px;
                                        font-size: 14px;
                                        font-weight: 500;
                                        display: inline-block;
                                        border: none;
                                        cursor: pointer;
                                        text-align: center;
                                    }
                                    .custom-save-button:hover {
                                        background-color: #277b70;
                                    }
                                    `}
                                </style>

                                <h2 className="text-lg font-medium text-gray-800 mb-4 text-left">Thông tin cơ bản</h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Left Column - Avatar Upload */}
                                    <div className="md:col-span-1">
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                                Ảnh đại diện
                                            </label>
                                            <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg border-dashed">
                                                <div className="relative mb-2">
                                                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                        <div className="text-gray-400 flex flex-col items-center justify-center">
                                                            <FiUpload className="w-6 h-6 mb-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        // Handle file change
                                                        console.log(e.target.files);
                                                    }}
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={handleFileUpload}
                                                        className="text-sm font-medium text-[#309689] cursor-pointer hover:underline focus:outline-none"
                                                    >
                                                        Chọn ảnh
                                                    </button>
                                                    <span className="text-xs text-gray-500">hoặc thả vào đây</span>
                                                </div>
                                                <p className="text-xs text-gray-500 text-center mt-2">
                                                    Ảnh có kích thước tối thiểu 400 pixel là tốt nhất. Kích thước ảnh tối đa là 5 MB.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Form Fields */}
                                    <div className="md:col-span-2 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                    Họ tên đầy đủ
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    className="input-field"
                                                    placeholder="Nhập họ tên của bạn"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                    Liên lạc
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phoneNumber"
                                                    className="input-field"
                                                    placeholder="+84 987654321"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                    Kinh nghiệm
                                                </label>
                                                <select id="experience" className="select-field">
                                                    <option>Chọn...</option>
                                                    <option>Dưới 1 năm</option>
                                                    <option>1-2 năm</option>
                                                    <option>3-5 năm</option>
                                                    <option>Trên 5 năm</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                    Học vấn
                                                </label>
                                                <select id="education" className="select-field">
                                                    <option>Chọn...</option>
                                                    <option>Trung học</option>
                                                    <option>Cao đẳng</option>
                                                    <option>Đại học</option>
                                                    <option>Sau đại học</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                Trang web cá nhân (nếu có)
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <BsGlobe className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="url"
                                                    id="website"
                                                    className="input-field pl-10"
                                                    placeholder="Website url..."
                                                    style={{
                                                        color: "#9ca3af",
                                                        letterSpacing: "0.01em",
                                                        padding: "12px 12px 12px 40px"
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button className="apply-button">
                                                Lưu Thay Đổi
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* CV/Resume Section */}
                                <div className="mt-8">
                                    <h2 className="text-lg font-medium text-gray-800 mb-4 text-left">CV/Sơ yếu lý lịch của bạn</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* CV Item 1 */}
                                        <div className="bg-white border border-gray-200 rounded-lg p-4 relative group">
                                            <div className="flex items-start">
                                                <div className="mr-3 text-left">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14 2V8H20" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16 13H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16 17H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10 9H9H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-medium text-gray-800">Sơ yếu lý lịch chuyên nghiệp</p>
                                                    <p className="text-xs text-gray-500 mt-1">3.5 MB</p>
                                                </div>
                                            </div>

                                            {/* Actions Menu - Show on Click */}
                                            <div className="absolute top-2 right-2 text-gray-400">
                                                <div className="relative">
                                                    <button
                                                        className="cursor-pointer focus:outline-none"
                                                        onClick={(e) => {
                                                            e.currentTarget.nextElementSibling?.classList.toggle('hidden');
                                                        }}
                                                    >
                                                        <div className="flex space-x-0.5">
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                        </div>
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    <div className="hidden absolute right-0 mt-1 bg-white shadow-lg rounded-md border border-gray-100 w-28 z-10">
                                                        <div className="py-1">
                                                            <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                                                                <svg className="h-3.5 w-3.5 mr-2 text-[#309689]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                                Chỉnh sửa
                                                            </a>
                                                            <a href="#" className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 text-left">
                                                                <svg className="h-3.5 w-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Xoá
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CV Item 2 */}
                                        <div className="bg-white border border-gray-200 rounded-lg p-4 relative group">
                                            <div className="flex items-start">
                                                <div className="mr-3 text-left">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14 2V8H20" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16 13H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16 17H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10 9H9H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-medium text-gray-800">Nhà thiết kế sản phẩm</p>
                                                    <p className="text-xs text-gray-500 mt-1">4.7 MB</p>
                                                </div>
                                            </div>

                                            {/* Actions Menu */}
                                            <div className="absolute top-2 right-2 text-gray-400">
                                                <div className="relative">
                                                    <button
                                                        className="cursor-pointer focus:outline-none"
                                                        onClick={(e) => {
                                                            e.currentTarget.nextElementSibling?.classList.toggle('hidden');
                                                        }}
                                                    >
                                                        <div className="flex space-x-0.5">
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                        </div>
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    <div className="hidden absolute right-0 mt-1 bg-white shadow-lg rounded-md border border-gray-100 w-28 z-10">
                                                        <div className="py-1">
                                                            <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                                                                <svg className="h-3.5 w-3.5 mr-2 text-[#309689]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                                Chỉnh sửa
                                                            </a>
                                                            <a href="#" className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 text-left">
                                                                <svg className="h-3.5 w-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Xoá
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CV Item 3 */}
                                        <div className="bg-white border border-gray-200 rounded-lg p-4 relative group">
                                            <div className="flex items-start">
                                                <div className="mr-3 text-left">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14 2V8H20" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16 13H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16 17H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10 9H9H8" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-medium text-gray-800">Nhà thiết kế hình ảnh</p>
                                                    <p className="text-xs text-gray-500 mt-1">1.3 MB</p>
                                                </div>
                                            </div>

                                            {/* Actions Menu */}
                                            <div className="absolute top-2 right-2 text-gray-400">
                                                <div className="relative">
                                                    <button
                                                        className="cursor-pointer focus:outline-none"
                                                        onClick={(e) => {
                                                            e.currentTarget.nextElementSibling?.classList.toggle('hidden');
                                                        }}
                                                    >
                                                        <div className="flex space-x-0.5">
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                            <div className="w-1 h-1 rounded-full bg-black"></div>
                                                        </div>
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    <div className="hidden absolute right-0 mt-1 bg-white shadow-lg rounded-md border border-gray-100 w-28 z-10">
                                                        <div className="py-1">
                                                            <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                                                                <svg className="h-3.5 w-3.5 mr-2 text-[#309689]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                                Chỉnh sửa
                                                            </a>
                                                            <a href="#" className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 text-left">
                                                                <svg className="h-3.5 w-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Xoá
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add CV Button */}
                                        <div
                                            className="border-2 border-dashed border-gray-200 p-4 rounded-lg flex items-start cursor-pointer hover:bg-gray-50 relative"
                                            onClick={() => setIsCVModalOpen(true)}
                                        >
                                            <div className="flex items-start">
                                                <div className="mr-3">
                                                    <div className="h-6 w-6 rounded-full bg-[#E8F5F3] flex items-center justify-center">
                                                        <FiPlus className="h-4 w-4 text-[#309689]" />
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-medium text-gray-800">Thêm CV/Resume</p>
                                                    <p className="text-xs text-gray-500 mt-1">Duyệt tập tin hoặc thả vào đây!</p>
                                                    <p className="text-xs text-gray-400 mt-1">Chi.pdf</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Other tabs would be implemented similarly */}
                        {activeTab !== 'basic' && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Nội dung đang được phát triển</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500">
                        © 2025 InnoSphere. All rights Reserved
                    </div>
                </div>
            </div>

            {/* CV Modal */}
            <CVModal
                isOpen={isCVModalOpen}
                onClose={() => setIsCVModalOpen(false)}
                onSubmit={handleAddCV}
            />
        </div>
    );
};

export default EmployeeSettings; 