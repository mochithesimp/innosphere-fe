import React, { useState, useEffect } from 'react';
import { RiUploadCloudLine, RiUser3Line, RiBuilding2Line, RiGlobalLine, RiSettings4Line } from 'react-icons/ri';
import { BiBold, BiItalic, BiUnderline, BiStrikethrough, BiLink, BiListUl, BiListOl } from 'react-icons/bi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTrash } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { EmployerService, EmployerProfileModel } from '../../../services/employerService';
import { FirebaseStorageService } from '../../../services/firebaseStorageService';
import { getUserIdFromToken } from '../../../utils/jwtHelper';
import Swal from 'sweetalert2';

const SettingsContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('company-info');
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        fullName: '',
        avatarUrl: '',
        companyDescription: '',
        businessTypeId: 0,
        companyAddress: '',
        socialLinks: [] as Array<{ platform: string; url: string; }>
    });

    // Local state for UI
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [socialLinks, setSocialLinks] = useState([
        { id: 1, type: 'facebook', url: '' },
        { id: 2, type: 'twitter', url: '' }
    ]);

    // Load employer profile on component mount
    useEffect(() => {
        loadEmployerData();
    }, []);

    const loadEmployerData = async () => {
        try {
            const profile = await EmployerService.getEmployerProfile();
            console.log('📋 Loaded employer profile:', profile);

            if (profile) {

                // Map the data to form fields
                setFormData({
                    fullName: profile.companyName || '',
                    avatarUrl: profile.avatarUrl || '',
                    companyDescription: profile.companyDescription || '',
                    businessTypeId: profile.businessTypeId || 0,
                    companyAddress: profile.companyAddress || '',
                    socialLinks: (profile.socialLinks || []).map(link => ({
                        platform: link.platform,
                        url: link.url
                    }))
                });

                // UI state is handled by formData

                // Convert social links for UI
                const uiSocialLinks = (profile.socialLinks || []).map((link, index) => ({
                    id: index + 1,
                    type: link.platform.toLowerCase(),
                    url: link.url
                }));

                if (uiSocialLinks.length > 0) {
                    setSocialLinks(uiSocialLinks);
                }
            }
        } catch (error) {
            console.error('Error loading employer profile:', error);
        }
    };

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
            handleAvatarFileChange(e);
        }
    };

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverFile(e.target.files[0]);
        }
    };

    const handleDeleteLogo = () => {
        setAvatarPreview(null);
        setFormData(prev => ({ ...prev, avatarUrl: '' }));
    };

    const handleDeleteCover = () => {
        setCoverFile(null);
    };

    // Avatar file handling
    const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Validate the file
            const validation = FirebaseStorageService.validateImageFile(file);
            if (!validation.valid) {
                Swal.fire('Lỗi', validation.error, 'error');
                return;
            }

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);

            // Upload to Firebase immediately
            await uploadAvatarToFirebase(file);
        }
    };

    const uploadAvatarToFirebase = async (file: File) => {
        setIsUploadingAvatar(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const userId = getUserIdFromToken(token);
            if (!userId) {
                throw new Error('User ID not found in token');
            }

            console.log('🚀 Uploading avatar to Firebase...');
            const downloadURL = await FirebaseStorageService.uploadImage(file, userId, 'employer-avatars');
            console.log('✅ Avatar uploaded successfully. Download URL:', downloadURL);

            // Update form data with the Firebase URL
            setFormData(prev => ({ ...prev, avatarUrl: downloadURL }));

            Swal.fire('Thành công', 'Ảnh đại diện đã được tải lên thành công!', 'success');
        } catch (error) {
            console.error('❌ Error uploading avatar:', error);
            Swal.fire('Lỗi', 'Không thể tải lên ảnh đại diện. Vui lòng thử lại.', 'error');
            // Reset preview on error
            setAvatarPreview(null);
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    // Form field handlers
    const handleFormChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Business type mapping (commented out as it's not currently used)
    // const getBusinessTypeName = (id: number): string => {
    //     switch (id) {
    //         case 1: return 'Doanh nghiệp tư nhân';
    //         case 3: return 'Công ty TNHH';
    //         case 4: return 'Công ty cổ phần';
    //         default: return 'Chọn...';
    //     }
    // };

    // Step navigation
    const handleCompanyInfoSave = () => {
        setActiveTab('establishment-info');
    };

    const handleEstablishmentInfoSave = () => {
        setActiveTab('social-media');
    };

    // Final save to API
    const handleFinalSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire('Lỗi', 'Vui lòng đăng nhập lại', 'error');
                return;
            }

            const userId = getUserIdFromToken(token);
            if (!userId) {
                Swal.fire('Lỗi', 'Không thể xác thực người dùng', 'error');
                return;
            }

            // Prepare social links for API
            const socialLinksForAPI = socialLinks
                .filter(link => link.url.trim() !== '')
                .map(link => ({
                    userId: userId,
                    platform: link.type.charAt(0).toUpperCase() + link.type.slice(1) as 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube' | 'LinkedIn' | 'GitHub' | 'Website',
                    url: link.url
                }));

            const profileData: EmployerProfileModel = {
                fullName: formData.fullName,
                avatarUrl: formData.avatarUrl,
                address: '',
                phoneNumber: '',
                companyName: formData.fullName,
                businessTypeId: formData.businessTypeId,
                newBusinessTypeName: '',
                newBusinessTypeDescription: '',
                companyAddress: formData.companyAddress,
                taxCode: '',
                companyDescription: formData.companyDescription,
                socialLinks: socialLinksForAPI
            };

            console.log('📤 Saving employer profile:', profileData);
            await EmployerService.updateEmployerProfile(profileData);

            Swal.fire('Thành công', 'Hồ sơ công ty đã được cập nhật thành công!', 'success');

            // Dispatch custom event to notify other components (like Header) to refresh
            console.log('📢 Dispatching employerProfileUpdated event...');
            window.dispatchEvent(new CustomEvent('employerProfileUpdated'));
        } catch (error) {
            console.error('❌ Error saving employer profile:', error);
            Swal.fire('Lỗi', 'Không thể lưu hồ sơ. Vui lòng thử lại.', 'error');
        }
    };

    // Social media functions
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

    const handleDeleteSocialLink = (id: number) => {
        setSocialLinks(links => links.filter(link => link.id !== id));
    };

    const addNewSocialLink = () => {
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
                                            {avatarPreview ? (
                                                <div className="relative">
                                                    <img
                                                        src={avatarPreview}
                                                        alt="Logo preview"
                                                        className="h-24 w-24 object-contain mb-2"
                                                    />
                                                    {isUploadingAvatar && (
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                                        </div>
                                                    )}
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
                                            ) : formData.avatarUrl ? (
                                                <div className="relative">
                                                    <img
                                                        src={formData.avatarUrl}
                                                        alt="Current logo"
                                                        className="h-24 w-24 object-contain mb-2"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = '/logo.png';
                                                        }}
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
                                                    {isUploadingAvatar && (
                                                        <div className="mt-2">
                                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#309689] mx-auto"></div>
                                                        </div>
                                                    )}
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
                            value={formData.fullName}
                            onChange={(e) => handleFormChange('fullName', e.target.value)}
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
                                value={formData.companyDescription}
                                onChange={(e) => handleFormChange('companyDescription', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-start">
                        <button
                            onClick={handleCompanyInfoSave}
                            style={{
                                backgroundColor: '#309689',
                                color: 'white',
                                border: 'none',
                                padding: '12px 32px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                outline: 'none'
                            }}
                            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#309689'}
                            onMouseDown={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1f5f56'}
                            onMouseUp={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                        >
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
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-500"
                                value={formData.businessTypeId}
                                onChange={(e) => handleFormChange('businessTypeId', parseInt(e.target.value))}
                            >
                                <option value={0}>Chọn...</option>
                                <option value={3}>Công ty TNHH</option>
                                <option value={4}>Công ty Cổ phần</option>
                                <option value={1}>Doanh nghiệp tư nhân</option>
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
                                value={formData.companyAddress}
                                onChange={(e) => handleFormChange('companyAddress', e.target.value)}
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
                        <button
                            onClick={handleEstablishmentInfoSave}
                            style={{
                                backgroundColor: '#309689',
                                color: 'white',
                                border: 'none',
                                padding: '12px 32px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                outline: 'none'
                            }}
                            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#309689'}
                            onMouseDown={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1f5f56'}
                            onMouseUp={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                        >
                            Lưu Thay Đổi
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'social-media' && (
                <div className="max-w-4xl">
                    {/* Social Media Links - Reused from existing component */}
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
                                    onClick={() => handleDeleteSocialLink(link.id)}
                                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
                                >
                                    <FaTrash className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add New Social Link Button */}
                    <div className="mb-8">
                        {socialLinks.length < 4 ? (
                            <div className="w-full bg-[#F1F2F4] hover:bg-gray-200 py-3 rounded-md text-gray-600 cursor-pointer" onClick={addNewSocialLink}>
                                <div className="flex justify-center items-center gap-2">
                                    <IoMdAdd className="h-5 w-5" />
                                    <span>Add New Social Link</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-sm text-gray-500 py-2">
                                Đã đạt giới hạn tối đa 4 liên kết
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-start">
                        <button
                            onClick={handleFinalSave}
                            style={{
                                backgroundColor: '#309689',
                                color: 'white',
                                border: 'none',
                                padding: '12px 32px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                outline: 'none'
                            }}
                            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#309689'}
                            onMouseDown={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1f5f56'}
                            onMouseUp={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                        >
                            Lưu Thay Đổi
                        </button>
                    </div>
                </div>
            )
            }

            {
                activeTab === 'account-settings' && (
                    <div className="max-w-4xl">
                        {/* Contact Information Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-medium mb-6 text-gray-900 text-left">Thông tin liên lạc</h2>

                            <div className="space-y-4">
                                {/* Address/Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                        Vị trí bán đồ
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                        Điện thoại
                                    </label>
                                    <div className="flex">
                                        <div className="relative">
                                            <select className="appearance-none bg-red-600 text-white pl-10 pr-8 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent font-medium" defaultValue="+84">
                                                <option value="+84" className="bg-white text-black">
                                                    <span className="inline-block w-5 h-3 bg-red-600 mr-2"></span>+84
                                                </option>
                                                <option value="+1" className="bg-white text-black">🇺🇸 +1</option>
                                                <option value="+44" className="bg-white text-black">🇬🇧 +44</option>
                                                <option value="+86" className="bg-white text-black">🇨🇳 +86</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <div className="w-5 h-3 bg-red-600 border border-gray-300 rounded-sm mr-3 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-red-600"></div>
                                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <svg className="w-3 h-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                <svg className="fill-current h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="Số điện thoại..."
                                            className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-[#309689]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Địa chỉ Email"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Contact Info Button */}
                            <div className="mt-6 flex justify-start">
                                <button
                                    style={{
                                        backgroundColor: '#309689',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 32px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                        outline: 'none'
                                    }}
                                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#309689'}
                                    onMouseDown={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1f5f56'}
                                    onMouseUp={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                                >
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </div>

                        {/* Change Password Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-medium mb-6 text-gray-900 text-left">Thay đổi mật khẩu</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Current Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                        Mật khẩu hiện tại
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Mật khẩu hiện tại"
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                        />
                                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                        Mật khẩu mới
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Mật khẩu mới"
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                        />
                                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                        Xác nhận mật khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Xác nhận mật khẩu"
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                        />
                                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Change Password Button */}
                            <div className="mt-6 flex justify-start">
                                <button
                                    style={{
                                        backgroundColor: '#309689',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 32px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                        outline: 'none'
                                    }}
                                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#309689'}
                                    onMouseDown={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1f5f56'}
                                    onMouseUp={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#277b70'}
                                >
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </div>

                        {/* Delete Account Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-medium mb-4 text-gray-900 text-left">Xóa công ty của bạn</h2>
                            <p className="text-gray-600 text-left mb-6">
                                Nếu bạn xóa tài khoản InnoSphere của mình, bạn sẽ không còn có thể nhận được thông tin về các công việc phù hợp, nhà tuyển dụng theo dõi và thông báo việc làm, công việc trong danh sách rút gọn và hơn thế nữa. Bạn sẽ bị loại khỏi tất cả các dịch vụ của InnoSphere.com.
                            </p>

                            {/* Delete Account Button */}
                            <div>
                                <button
                                    style={{
                                        backgroundColor: '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 24px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                        outline: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#b91c1c'}
                                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626'}
                                    onMouseDown={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#991b1b'}
                                    onMouseUp={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#b91c1c'}
                                >
                                    <svg style={{ height: '16px', width: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Đóng tài khoản
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default SettingsContent; 