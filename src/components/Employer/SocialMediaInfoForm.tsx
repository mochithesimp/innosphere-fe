import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTrash } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

const SocialMediaInfoForm: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState([
        { id: 1, type: 'facebook', url: '' },
        { id: 2, type: 'twitter', url: '' }
    ]);

    const handleUrlChange = (id: number, value: string) => {
        setSocialLinks(links => links.map(link =>
            link.id === id ? { ...link, url: value } : link
        ));
    };

    const handleTypeChange = (id: number, type: string) => {
        setSocialLinks(links => links.map(link =>
            link.id === id ? { ...link, type } : link
        ));
    };

    const handleDelete = (id: number) => {
        setSocialLinks(links => links.filter(link => link.id !== id));
    };

    const addNewLink = () => {
        if (socialLinks.length >= 4) return; // Limit to maximum 4 links
        const newId = Math.max(...socialLinks.map(link => link.id), 0) + 1;
        setSocialLinks([...socialLinks, { id: newId, type: 'facebook', url: '' }]);
    };

    // Get the icon component based on platform type
    const getSocialIcon = (type: string) => {
        switch (type) {
            case 'facebook':
                return <FaFacebookF className="h-5 w-5 text-[#1877F2]" />;
            case 'twitter':
                return <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />;
            case 'instagram':
                return <FaInstagram className="h-5 w-5 text-[#E4405F]" />;
            case 'youtube':
                return <FaYoutube className="h-5 w-5 text-[#FF0000]" />;
            default:
                return <FaFacebookF className="h-5 w-5 text-[#1877F2]" />;
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto px-4">
            {socialLinks.map((link, index) => (
                <div key={link.id} className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                        Liên Kết {index + 1}
                    </label>
                    <div className="flex gap-3">
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-300 hover:border-gray-400 pl-10 pr-8 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] text-gray-500"
                                value={link.type}
                                onChange={(e) => handleTypeChange(link.id, e.target.value)}
                            >
                                <option value="facebook">Facebook</option>
                                <option value="twitter">Twitter</option>
                                <option value="instagram">Instagram</option>
                                <option value="youtube">Youtube</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                {getSocialIcon(link.type)}
                            </div>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Profile link/url..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689]"
                                value={link.url}
                                onChange={(e) => handleUrlChange(link.id, e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => handleDelete(link.id)}
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
                        >
                            <FaTrash className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                </div>
            ))}

            <div className="mb-8">
                {socialLinks.length < 4 ? (
                    <div className="w-full bg-[#F1F2F4] hover:bg-gray-200 py-3 rounded-md text-gray-600 cursor-pointer" onClick={addNewLink}>
                        <div className="flex justify-center items-center gap-2">
                            <IoMdAdd className="h-5 w-5" />
                            <span>Thêm đường link social phía dưới</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-sm text-gray-500 py-2">
                        Đã đạt giới hạn tối đa 4 liên kết
                    </div>
                )}
            </div>

            <div className="flex justify-start gap-4 mt-12">
                <Link
                    to="/employer/establishment-info"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-6 rounded-md inline-flex items-center"
                >
                    Trang Trước
                </Link>
                <Link
                    to="/employer/contact-info"
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

export default SocialMediaInfoForm; 