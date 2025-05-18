import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiCalendar, BiLink } from 'react-icons/bi';
import { BiBold, BiItalic, BiUnderline, BiStrikethrough, BiListUl, BiListOl } from 'react-icons/bi';

const EstablishmentInfoForm: React.FC = () => {
    const [companyType, setCompanyType] = useState('');
    const [businessArea, setBusinessArea] = useState('');
    const [operationScale, setOperationScale] = useState('');
    const [establishmentYear, setEstablishmentYear] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [companyVision, setCompanyVision] = useState('');

    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                        Loại doanh nghiệp
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] text-gray-500"
                            value={companyType}
                            onChange={(e) => setCompanyType(e.target.value)}
                        >
                            <option value="" disabled>Chọn...</option>
                            <option value="private" className="text-gray-900">Doanh nghiệp tư nhân</option>
                            <option value="corporation" className="text-gray-900">Công ty cổ phần</option>
                            <option value="limited" className="text-gray-900">Công ty TNHH</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                        Lĩnh vực hoạt động
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] text-gray-500"
                            value={businessArea}
                            onChange={(e) => setBusinessArea(e.target.value)}
                        >
                            <option value="" disabled>Chọn...</option>
                            <option value="tech" className="text-gray-900">Công nghệ thông tin</option>
                            <option value="finance" className="text-gray-900">Tài chính - Ngân hàng</option>
                            <option value="education" className="text-gray-900">Giáo dục</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                        Quy mô hoạt động
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] text-gray-500"
                            value={operationScale}
                            onChange={(e) => setOperationScale(e.target.value)}
                        >
                            <option value="" disabled>Chọn...</option>
                            <option value="small" className="text-gray-900">Dưới 50 nhân viên</option>
                            <option value="medium" className="text-gray-900">50-200 nhân viên</option>
                            <option value="large" className="text-gray-900">Trên 200 nhân viên</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                        Năm thành lập
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="dd/mm/yyyy"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] pl-10"
                            value={establishmentYear}
                            onChange={(e) => setEstablishmentYear(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiCalendar className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                        Trang web công ty
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Website url..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] pl-10"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiLink className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Tầm nhìn và sứ mệnh của công ty
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                    <div className="flex items-center gap-1 border-b px-2 py-1.5 bg-white">
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <BiBold className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <BiItalic className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <BiUnderline className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <BiStrikethrough className="h-5 w-5 text-gray-500" />
                        </button>
                        <span className="mx-1 text-gray-300">|</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <BiLink className="h-5 w-5 text-gray-500" />
                        </button>
                        <span className="mx-1 text-gray-300">|</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <BiListUl className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <BiListOl className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                    <textarea
                        rows={5}
                        className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-0"
                        placeholder="Hãy cho chúng tôi biết về tầm nhìn và sứ mệnh của công ty bạn"
                        value={companyVision}
                        onChange={(e) => setCompanyVision(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-between gap-4 mt-12">
                <Link
                    to="/employer/settings"
                    className="bg-[#EBF5F4] hover:bg-[#daeae8] text-gray-700 font-medium py-2.5 px-6 rounded-md inline-flex items-center border border-[#E4E5E8]"
                >
                    Trang Trước
                </Link>
                <Link
                    to="/employer/social-media-info"
                    className="bg-[#309689] hover:bg-[#277b70] text-white font-medium py-2.5 px-6 rounded-md inline-flex items-center"
                >
                    Lưu & Tiếp Tục
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default EstablishmentInfoForm; 