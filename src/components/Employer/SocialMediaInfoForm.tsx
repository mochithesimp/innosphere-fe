import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTrash } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { getUserIdFromToken } from '../../utils/jwtHelper';

interface SocialLink {
    id: number;
    type: 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube';
    url: string;
}

const SocialMediaInfoForm: React.FC = () => {
    const location = useLocation();
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        { id: 1, type: 'Facebook', url: '' },
        { id: 2, type: 'Twitter', url: '' }
    ]);

    // Get data from previous steps
    const [formData, setFormData] = useState({
        companyName: '',
        companyDescription: '',
        businessTypeId: undefined as number | undefined,
        newBusinessTypeName: '',
        newBusinessTypeDescription: '',
        companyAddress: ''
    });

    useEffect(() => {
        if (location.state) {
            setFormData({
                companyName: location.state.companyName || '',
                companyDescription: location.state.companyDescription || '',
                businessTypeId: location.state.businessTypeId,
                newBusinessTypeName: location.state.newBusinessTypeName || '',
                newBusinessTypeDescription: location.state.newBusinessTypeDescription || '',
                companyAddress: location.state.companyAddress || ''
            });
        }
    }, [location.state]);

    const handleUrlChange = (id: number, value: string) => {
        setSocialLinks(links => links.map(link =>
            link.id === id ? { ...link, url: value } : link
        ));
    };

    const handleTypeChange = (id: number, type: 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube') => {
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
        setSocialLinks([...socialLinks, { id: newId, type: 'Facebook', url: '' }]);
    };

    // Get the icon component based on platform type
    const getSocialIcon = (type: string) => {
        switch (type) {
            case 'Facebook':
                return <FaFacebookF className="h-5 w-5 text-[#1877F2]" />;
            case 'Twitter':
                return <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />;
            case 'Instagram':
                return <FaInstagram className="h-5 w-5 text-[#E4405F]" />;
            case 'Youtube':
                return <FaYoutube className="h-5 w-5 text-[#FF0000]" />;
            default:
                return <FaFacebookF className="h-5 w-5 text-[#1877F2]" />;
        }
    };

    // Prepare social links for API (only non-empty URLs)
    const prepareSocialLinksForAPI = () => {
        const userId = getUserIdFromToken(localStorage.getItem('token') || '');
        return socialLinks
            .filter(link => link.url.trim() !== '')
            .map(link => ({
                userId: userId || '',
                platform: link.type,
                url: link.url.trim()
            }));
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
                                onChange={(e) => handleTypeChange(link.id, e.target.value as 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube')}
                            >
                                <option value="Facebook">Facebook</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Youtube">Youtube</option>
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

            <div className="flex justify-between gap-4 mt-12">
                <Link
                    to="/employer/establishment-info"
                    className="bg-[#EBF5F4] hover:bg-[#daeae8] text-gray-700 font-medium py-2.5 px-6 rounded-md inline-flex items-center border border-[#E4E5E8]"
                    state={{
                        companyName: formData.companyName,
                        companyDescription: formData.companyDescription,
                        businessTypeId: formData.businessTypeId,
                        newBusinessTypeName: formData.newBusinessTypeName,
                        newBusinessTypeDescription: formData.newBusinessTypeDescription,
                        companyAddress: formData.companyAddress
                    }}
                >
                    Trang Trước
                </Link>
                <Link
                    to="/employer/contact-info"
                    className="bg-[#309689] hover:bg-[#277b70] text-white font-medium py-2.5 px-6 rounded-md inline-flex items-center"
                    state={{
                        ...formData,
                        socialLinks: prepareSocialLinksForAPI()
                    }}
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