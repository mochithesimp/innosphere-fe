import React, { useState } from 'react';
import { RiUploadCloudLine, RiUser3Line, RiBuilding2Line, RiGlobalLine, RiSettings4Line } from 'react-icons/ri';
import { BiBold, BiItalic, BiUnderline, BiStrikethrough, BiLink, BiListUl, BiListOl } from 'react-icons/bi';

const SettingsContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('company-info');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const tabs = [
        {
            id: 'company-info',
            label: 'Thông tin công ty',
            icon: <RiUser3Line className="h-5 w-5" />
        },
        {
            id: 'establishment-info',
            label: 'Thông tin thành lập',
            icon: <RiBuilding2Line className="h-5 w-5" />
        },
        {
            id: 'social-media',
            label: 'Hồ sơ mạng xã hội',
            icon: <RiGlobalLine className="h-5 w-5" />
        },
        {
            id: 'account-settings',
            label: 'Cài đặt tài khoản',
            icon: <RiSettings4Line className="h-5 w-5" />
        }
    ];

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setLogoFile(e.target.files[0]);
        }
    };

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverFile(e.target.files[0]);
        }
    };

    const handleDeleteLogo = () => {
        setLogoFile(null);
    };

    const handleDeleteCover = () => {
        setCoverFile(null);
    };

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-left">Cài đặt</h1>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center py-3 px-1 border-b-2 text-sm ${activeTab === tab.id
                                ? 'border-[#309689] text-[#309689] font-bold'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium'
                                }`}
                        >
                            <span className={`mr-2 ${activeTab === tab.id ? 'text-[#309689] font-bold' : 'text-gray-500'}`}>
                                {tab.icon}
                            </span>
                            <span className={activeTab === tab.id ? 'font-bold text-[#309689]' : 'font-medium text-gray-500'}>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'company-info' && (
                <div className="max-w-4xl">
                    {/* Logo & Cover Image Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-medium mb-6 text-gray-900 text-left">Hình ảnh Logo & Biểu ngữ</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Logo Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                    Tải lên logo
                                </label>
                                <div className="relative">
                                    <label className="cursor-pointer block">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleLogoUpload}
                                        />
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors h-48 flex flex-col items-center justify-center">
                                            {logoFile ? (
                                                <div className="relative">
                                                    <img
                                                        src={URL.createObjectURL(logoFile)}
                                                        alt="Logo preview"
                                                        className="h-24 w-24 object-contain mb-2"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteLogo();
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <RiUploadCloudLine className="h-12 w-12 text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-600 mb-1">
                                                        <span className="font-medium text-[#309689]">Tải ảnh lên</span> hoặc kéo thả vào đây
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">
                                        3.5 MB <span className="text-[#309689] cursor-pointer hover:underline">Xóa</span> <span className="text-[#309689] cursor-pointer hover:underline">Thay thế</span>
                                    </p>
                                </div>
                            </div>

                            {/* Cover Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                    Hình ảnh biểu ngữ
                                </label>
                                <div className="relative">
                                    <label className="cursor-pointer block">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleCoverUpload}
                                        />
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors h-48 flex flex-col items-center justify-center">
                                            {coverFile ? (
                                                <div className="relative">
                                                    <img
                                                        src={URL.createObjectURL(coverFile)}
                                                        alt="Cover preview"
                                                        className="h-24 w-32 object-cover mb-2 rounded"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteCover();
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <RiUploadCloudLine className="h-12 w-12 text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-600 mb-1">
                                                        <span className="font-medium text-[#309689]">Tải ảnh lên</span> hoặc kéo thả vào đây
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">
                                        4.3 MB <span className="text-[#309689] cursor-pointer hover:underline">Xóa</span> <span className="text-[#309689] cursor-pointer hover:underline">Thay thế</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company Name */}
                    <div className="mb-6">
                        <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Tên công ty
                        </label>
                        <input
                            type="text"
                            id="company-name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Nhập tên công ty"
                        />
                    </div>

                    {/* Company Description */}
                    <div className="mb-8">
                        <label htmlFor="company-description" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Về chúng tôi
                        </label>
                        <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                            {/* Toolbar */}
                            <div className="flex items-center gap-1 border-b border-gray-200 px-3 py-2 bg-gray-50">
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiBold className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiItalic className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiUnderline className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiStrikethrough className="h-4 w-4" />
                                </button>
                                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiLink className="h-4 w-4" />
                                </button>
                                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiListUl className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiListOl className="h-4 w-4" />
                                </button>
                            </div>
                            {/* Text Area */}
                            <textarea
                                id="company-description"
                                rows={6}
                                className="w-full px-3 py-3 border-0 focus:outline-none focus:ring-0 resize-none"
                                placeholder="Viết ra và công ty của bạn ở đây. Hãy cho ứng viên biết chúng tôi là ai..."
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-start">
                        <style>
                            {`
                                .custom-save-button {
                                    background-color: #309689 !important;
                                    color: white !important;
                                    border: none !important;
                                    padding: 12px 32px !important;
                                    border-radius: 8px !important;
                                    font-weight: 600 !important;
                                    font-size: 14px !important;
                                    cursor: pointer !important;
                                    transition: all 0.2s ease !important;
                                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
                                    outline: none !important;
                                }
                                .custom-save-button:hover {
                                    background-color: #277b70 !important;
                                    color: white !important;
                                }
                                .custom-save-button:focus {
                                    background-color: #309689 !important;
                                    color: white !important;
                                    outline: none !important;
                                }
                                .custom-save-button:active {
                                    background-color: #1f5f56 !important;
                                    color: white !important;
                                }
                            `}
                        </style>
                        <button className="custom-save-button">
                            Lưu Thay Đổi
                        </button>
                    </div>
                </div>
            )}

            {/* Other tab contents can be added here */}
            {activeTab === 'establishment-info' && (
                <div className="max-w-4xl">
                    {/* Establishment Info Form */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Loại hình tổ chức */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                Loại hình tổ chức
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-500">
                                <option>Chọn...</option>
                                <option>Công ty TNHH</option>
                                <option>Công ty Cổ phần</option>
                                <option>Doanh nghiệp tư nhân</option>
                                <option>Công ty hợp danh</option>
                            </select>
                        </div>

                        {/* Các loại ngành */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                Các loại ngành
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-500">
                                <option>Chọn...</option>
                                <option>Công nghệ thông tin</option>
                                <option>Tài chính - Ngân hàng</option>
                                <option>Giáo dục</option>
                                <option>Y tế</option>
                                <option>Sản xuất</option>
                                <option>Dịch vụ</option>
                            </select>
                        </div>

                        {/* Quy mô nhóm */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                Quy mô nhóm
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-500">
                                <option>Chọn...</option>
                                <option>1-10 nhân viên</option>
                                <option>11-50 nhân viên</option>
                                <option>51-200 nhân viên</option>
                                <option>201-500 nhân viên</option>
                                <option>500+ nhân viên</option>
                            </select>
                        </div>
                    </div>

                    {/* Năm thành lập and Trang web công ty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Năm thành lập */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                Năm thành lập
                            </label>
                            <input
                                type="text"
                                placeholder="dd/mm/yyyy"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-500"
                            />
                        </div>

                        {/* Trang web công ty */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                Trang web công ty
                            </label>
                            <input
                                type="url"
                                placeholder="Website url..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Tầm nhìn công ty */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Tầm nhìn công ty
                        </label>
                        <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                            {/* Toolbar */}
                            <div className="flex items-center gap-1 border-b border-gray-200 px-3 py-2 bg-gray-50">
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiBold className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiItalic className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiUnderline className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiStrikethrough className="h-4 w-4" />
                                </button>
                                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiLink className="h-4 w-4" />
                                </button>
                                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiListUl className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                                    <BiListOl className="h-4 w-4" />
                                </button>
                            </div>
                            {/* Text Area */}
                            <textarea
                                rows={6}
                                className="w-full px-3 py-3 border-0 focus:outline-none focus:ring-0 resize-none text-gray-500"
                                placeholder="Hãy cho chúng tôi biết Tầm nhìn của công ty bạn..."
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-start">
                        <style>
                            {`
                                .custom-save-button {
                                    background-color: #309689 !important;
                                    color: white !important;
                                    border: none !important;
                                    padding: 12px 32px !important;
                                    border-radius: 8px !important;
                                    font-weight: 600 !important;
                                    font-size: 14px !important;
                                    cursor: pointer !important;
                                    transition: all 0.2s ease !important;
                                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
                                    outline: none !important;
                                }
                                .custom-save-button:hover {
                                    background-color: #277b70 !important;
                                    color: white !important;
                                }
                                .custom-save-button:focus {
                                    background-color: #309689 !important;
                                    color: white !important;
                                    outline: none !important;
                                }
                                .custom-save-button:active {
                                    background-color: #1f5f56 !important;
                                    color: white !important;
                                }
                            `}
                        </style>
                        <button className="custom-save-button">
                            Lưu Thay Đổi
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'social-media' && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Hồ sơ mạng xã hội - Đang phát triển</p>
                </div>
            )}

            {activeTab === 'account-settings' && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Cài đặt tài khoản - Đang phát triển</p>
                </div>
            )}
        </div>
    );
};

export default SettingsContent; 