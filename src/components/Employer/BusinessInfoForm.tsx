import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiUploadCloudLine } from 'react-icons/ri';
import { BiBold, BiItalic, BiUnderline, BiStrikethrough, BiLink, BiListUl, BiListOl } from 'react-icons/bi';

const BusinessInfoForm: React.FC = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

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

    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <h2 className="text-xl font-medium mb-6 text-left">Logo & ảnh bìa</h2>

            <div className="flex flex-wrap -mx-3 mb-8">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 text-sm font-medium mb-2 text-left">Ảnh logo</label>
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                        />
                        <div className="border border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                            {logoFile ? (
                                <img
                                    src={URL.createObjectURL(logoFile)}
                                    alt="Logo preview"
                                    className="h-20 w-20 object-contain mb-2"
                                />
                            ) : (
                                <div className="mb-2">
                                    <RiUploadCloudLine className="h-10 w-10 text-gray-400 mx-auto" />
                                </div>
                            )}

                            <p className="text-sm text-gray-600 mb-1 font-bold">
                                Tải ảnh lên hoặc kéo thả vào đây
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                                Nên dùng ảnh lớn hơn 400 pixel để có chất lượng tốt nhất. Dung lượng tối đa 5 MB.
                            </p>
                        </div>
                    </label>
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-2 text-left">Ảnh bìa</label>
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverUpload}
                        />
                        <div className="border border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                            {coverFile ? (
                                <img
                                    src={URL.createObjectURL(coverFile)}
                                    alt="Cover preview"
                                    className="h-20 w-32 object-cover mb-2"
                                />
                            ) : (
                                <div className="mb-2">
                                    <RiUploadCloudLine className="h-10 w-10 text-gray-400 mx-auto" />
                                </div>
                            )}

                            <p className="text-sm text-gray-600 mb-1 font-bold">
                                Tải ảnh lên hoặc kéo thả vào đây
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                                Kích thước ý tưởng cho ảnh bìa là 1520×400. Hỗ trợ định dạng JPEG, PNG. Dung lượng tối đa 5 MB.
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="company-name" className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Tên công ty
                </label>
                <input
                    type="text"
                    id="company-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689]"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
            </div>

            <div className="mb-8">
                <label htmlFor="company-description" className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Giới thiệu về công ty
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
                        id="company-description"
                        rows={5}
                        className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-0"
                        placeholder="Viết vài dòng giới thiệu về công ty của bạn để ứng viên hiểu rõ hơn về công ty"
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-start mt-12">
                <Link
                    to="/employer/establishment-info"
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

export default BusinessInfoForm; 