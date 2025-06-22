import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Employee/Header';
import Sidebar from '../../components/Employee/Sidebar';
import { FiUpload, FiPlus } from 'react-icons/fi';
import { BsGlobe } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { BsFileEarmarkText } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import CVModal from '../../components/Employee/CVModal';
import { ResumeService, ResumeModel, WorkerProfileResponse } from '../../services/resumeService';
import { WorkerService, WorkerProfileModel } from '../../services/workerService';
import { getUserIdFromToken } from '../../utils/jwtHelper';
import Swal from 'sweetalert2';

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
    
    .input-with-icon-container {
        display: flex;
        width: 100%;
    }
    
    .input-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.875rem;
        background-color: white;
        border: 1px solid #e5e7eb;
        border-right: none;
        border-radius: 0.375rem 0 0 0.375rem;
    }
    
    .input-with-icon {
        flex: 1;
        border-left: none;
        border-radius: 0 0.375rem 0.375rem 0;
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
    
    .privacy-container {
        display: flex;
        align-items: center;
        padding: 16px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background-color: white;
    }
    
    .toggle-container {
        position: relative;
        width: 44px;
        height: 24px;
        border-radius: 12px;
        transition: background-color 0.3s;
        cursor: pointer;
    }
    
    .toggle-container.active {
        background-color: #309689;
    }
    
    .toggle-container.inactive {
        background-color: #e5e7eb;
    }
    
    .toggle-circle {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s;
    }
    
    .toggle-container.active .toggle-circle {
        transform: translateX(20px);
    }
    
    .toggle-label {
        display: inline-flex;
        align-items: center;
        margin-left: 8px;
        padding-right: 8px;
        min-width: 36px;
    }
    
    .toggle-text {
        font-size: 0.75rem;
        font-weight: 600;
        padding-left: 4px;
    }
    
    .toggle-text.active {
        color: #309689;
    }
    
    .toggle-text.inactive {
        color: #dc2626;
    }
    
    .privacy-text {
        margin-left: 12px;
        font-size: 0.875rem;
        color: #4b5563;
        padding-left: 12px;
        border-left: 1px solid #e5e7eb;
    }

    .notification-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;
        padding: 12px 16px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
    }

    .notification-checkbox {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid #e5e7eb;
        border-radius: 4px;
        margin-right: 12px;
        margin-top: 1px;
        cursor: pointer;
        position: relative;
        background-color: white;
        flex-shrink: 0;
    }

    .notification-checkbox:checked {
        background-color: #309689;
        border-color: #309689;
    }

    .notification-checkbox:checked::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 6px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .notification-label {
        cursor: pointer;
        font-size: 14px;
        color: #4b5563;
    }

    /* Custom checkbox styling to match the image */
    .custom-checkbox {
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        margin-right: 12px;
        margin-top: 2px;
        flex-shrink: 0;
    }
    
    .custom-checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        border-radius: 4px;
        border: 1px solid #e5e7eb;
        background-color: white;
    }
    
    .custom-checkbox input:checked ~ .checkmark {
        background-color: #309689;
        border-color: #309689;
    }
    
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    
    .custom-checkbox input:checked ~ .checkmark:after {
        display: block;
        left: 7px;
        top: 3px;
        width: 6px;
        height: 11px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`;

const EmployeeSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('basic');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isCVModalOpen, setIsCVModalOpen] = useState(false);
    const [profilePrivacy, setProfilePrivacy] = useState(true);
    const [resumePrivacy, setResumePrivacy] = useState(false);

    // Add state for password visibility toggling
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Resume state
    const [resumes, setResumes] = useState<ResumeModel[]>([]);
    const [workerProfile, setWorkerProfile] = useState<WorkerProfileResponse | null>(null);
    const [isLoadingResumes, setIsLoadingResumes] = useState(false);

    // Form state for profile data
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        experience: '',
        education: '',
        website: '',
        bio: '',
        nationality: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        address: '',
        skills: '',
        avatarUrl: ''
    });

    // Social links state
    const [socialLinks, setSocialLinks] = useState({
        linkedin: '',
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        github: '',
        website: ''
    });

    // Load worker profile and resumes on component mount
    useEffect(() => {
        loadWorkerData();
    }, []);

    const loadWorkerData = async () => {
        try {
            setIsLoadingResumes(true);

            console.log('🔄 Calling API: GET https://103.163.24.72/api/worker/profile');

            // Get worker profile
            const profile = await ResumeService.getWorkerProfile();
            console.log('✅ Worker Profile API Response:', profile);

            setWorkerProfile(profile);

            // Populate form data with API response, leave empty if null
            const formDataToSet = {
                fullName: profile.fullName || '',
                phoneNumber: profile.phoneNumber || '',
                experience: profile.experience || '',
                education: profile.education || '',
                website: '', // Not available in API, keeping empty
                bio: profile.bio || '',
                nationality: '',
                dateOfBirth: '',
                gender: '',
                maritalStatus: '',
                address: profile.address || '',
                skills: profile.skills || '',
                avatarUrl: profile.avatarUrl || ''
            };

            console.log('📝 Populating form fields with data:', formDataToSet);
            setFormData(formDataToSet);

            // Get resumes using workerId
            if (profile.workerId) {
                const resumesData = await ResumeService.getResumesByWorker(profile.workerId);
                setResumes(resumesData);
            }
        } catch (error) {
            console.error('❌ Error loading worker data:', error);

            // Handle 404 response - leave form fields empty
            const errorResponse = error as { response?: { status?: number } };
            if (errorResponse.response?.status === 404) {
                console.log('⚠️ Worker profile not found (404). Leaving form fields empty.');
                setFormData({
                    fullName: '',
                    phoneNumber: '',
                    experience: '',
                    education: '',
                    website: '',
                    bio: '',
                    nationality: '',
                    dateOfBirth: '',
                    gender: '',
                    maritalStatus: '',
                    address: '',
                    skills: '',
                    avatarUrl: ''
                });
            }
        } finally {
            setIsLoadingResumes(false);
        }
    };

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleResumeAdded = () => {
        // Refresh the resumes list after adding a new one
        loadWorkerData();
    };

    const handleDeleteResume = async (resumeId: number) => {
        try {
            await ResumeService.deleteResume(resumeId);
            // Refresh the list
            loadWorkerData();
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    const handleFormChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSocialLinkChange = (platform: keyof typeof socialLinks, value: string) => {
        setSocialLinks(prev => ({
            ...prev,
            [platform]: value
        }));
    };

    // Function to create worker profile
    const createWorkerProfile = async () => {
        try {
            const token = localStorage.getItem('token'); // Fixed: use 'token' instead of 'accessToken'
            console.log('🔑 Retrieved token:', token ? 'Token found' : 'No token found');

            if (!token) {
                Swal.fire('Lỗi', 'Vui lòng đăng nhập lại', 'error');
                return;
            }

            const userId = getUserIdFromToken(token);
            console.log('👤 User ID from token:', userId);

            if (!userId) {
                Swal.fire('Lỗi', 'Không thể xác thực người dùng', 'error');
                return;
            }

            // Prepare social links array (only include non-empty links)
            const socialLinksArray = Object.entries(socialLinks)
                .filter(([, url]) => url.trim() !== '')
                .map(([platform, url]) => {
                    // Map platform names to proper format
                    const platformMap: { [key: string]: string } = {
                        'facebook': 'Facebook',
                        'twitter': 'Twitter',
                        'instagram': 'Instagram',
                        'youtube': 'Youtube',
                        'linkedin': 'LinkedIn',
                        'github': 'GitHub',
                        'website': 'Website'
                    };

                    return {
                        userId: userId,
                        platform: (platformMap[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)) as 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube' | 'LinkedIn' | 'GitHub' | 'Website',
                        url: url.trim()
                    };
                });

            console.log('🔗 Social links array:', socialLinksArray);

            const profileData: WorkerProfileModel = {
                fullName: formData.fullName,
                avatarUrl: formData.avatarUrl || '',
                address: formData.address || '',
                phoneNumber: formData.phoneNumber,
                skills: formData.skills || '',
                bio: formData.bio,
                education: formData.education,
                experience: formData.experience,
                socialLinks: socialLinksArray
            };

            console.log('🚀 Creating worker profile with data:', profileData);

            // Use WorkerService which has better error handling and token management  
            const response = await (WorkerService as any).createOrUpdateWorkerProfile(profileData);

            if (response) {
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Hồ sơ của bạn đã được tạo thành công',
                    icon: 'success',
                    confirmButtonColor: '#309689'
                });

                // Refresh the worker data
                loadWorkerData();
            }
        } catch (error) {
            console.error('❌ Error creating worker profile:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: 'Có lỗi xảy ra khi tạo hồ sơ. Vui lòng thử lại.',
                icon: 'error',
                confirmButtonColor: '#309689'
            });
        }
    };

    // Navigation handlers for tabs
    const handleBasicSave = () => {
        setActiveTab('profile');
    };

    const handleProfileSave = () => {
        setActiveTab('social');
    };

    const toggleProfilePrivacy = () => {
        setProfilePrivacy(!profilePrivacy);
    };

    const toggleResumePrivacy = () => {
        setResumePrivacy(!resumePrivacy);
    };

    // Password visibility toggle handlers
    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                                                    value={formData.fullName}
                                                    onChange={(e) => handleFormChange('fullName', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                    Phone
                                                </label>
                                                <div className="flex w-full">
                                                    <div className="inline-block">
                                                        <button className="flex items-center border border-gray-300 rounded-l-md h-[42px] px-3 bg-white">
                                                            <div className="flex items-center">
                                                                <span className="inline-block w-6 h-4 mr-2 overflow-hidden">
                                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" className="h-full w-full object-cover" />
                                                                </span>
                                                                <span className="text-gray-700 font-normal">+84</span>
                                                                <svg className="ml-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        className="flex-1 px-3 py-[9px] border border-l-0 border-gray-300 rounded-r-md focus:outline-none text-gray-500"
                                                        placeholder="Phone number.."
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                    Kinh nghiệm
                                                </label>
                                                <select
                                                    id="experience"
                                                    className="select-field"
                                                    value={formData.experience}
                                                    onChange={(e) => handleFormChange('experience', e.target.value)}
                                                >
                                                    <option value="">Chọn...</option>
                                                    <option value="Dưới 1 năm">Dưới 1 năm</option>
                                                    <option value="1-2 năm">1-2 năm</option>
                                                    <option value="3-5 năm">3-5 năm</option>
                                                    <option value="Trên 5 năm">Trên 5 năm</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                    Học vấn
                                                </label>
                                                <select
                                                    id="education"
                                                    className="select-field"
                                                    value={formData.education}
                                                    onChange={(e) => handleFormChange('education', e.target.value)}
                                                >
                                                    <option value="">Chọn...</option>
                                                    <option value="Trung học">Trung học</option>
                                                    <option value="Cao đẳng">Cao đẳng</option>
                                                    <option value="Đại học">Đại học</option>
                                                    <option value="Sau đại học">Sau đại học</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                Trang web cá nhân (nếu có)
                                            </label>
                                            <div className="input-with-icon-container">
                                                <div className="input-icon-wrapper">
                                                    <BsGlobe className="text-[#309689]" />
                                                </div>
                                                <input
                                                    type="url"
                                                    id="website"
                                                    className="input-field input-with-icon"
                                                    placeholder="Website url..."
                                                    value={formData.website}
                                                    onChange={(e) => handleFormChange('website', e.target.value)}
                                                    style={{
                                                        color: "#9ca3af",
                                                        letterSpacing: "0.01em"
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button onClick={handleBasicSave} className="apply-button">
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* CV/Resume Section */}
                                <div className="mt-8">
                                    <h2 className="text-lg font-medium text-gray-800 mb-4 text-left">CV/Sơ yếu lý lịch của bạn</h2>

                                    {isLoadingResumes ? (
                                        <div className="col-span-full flex justify-center items-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#309689]"></div>
                                            <span className="ml-2 text-gray-600">Đang tải CV/Resume...</span>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Dynamic Resume Items */}
                                            {resumes.map((resume) => (
                                                <div key={resume.id} className="bg-white border border-gray-200 rounded-lg p-4 relative group">
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
                                                            <p className="text-sm font-medium text-gray-800">{resume.title}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{ResumeService.formatFileSize(resume.fileSize)}</p>
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
                                                                    <button
                                                                        onClick={() => handleDeleteResume(resume.id)}
                                                                        className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 text-left w-full"
                                                                    >
                                                                        <svg className="h-3.5 w-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                        Xoá
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Other tabs would be implemented similarly */}
                        {activeTab === 'profile' && (
                            <div>
                                <h2 className="text-lg font-medium text-gray-800 mb-4 text-left">Hồ sơ</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Quốc tịch
                                        </label>
                                        <div className="relative">
                                            <select className="select-field text-left">
                                                <option value="" disabled selected>Chọn...</option>
                                                <option value="VN">Việt Nam</option>
                                                <option value="US">Hoa Kỳ</option>
                                                <option value="KR">Hàn Quốc</option>
                                                <option value="JP">Nhật Bản</option>
                                                <option value="SG">Singapore</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Ngày sinh
                                        </label>
                                        <input
                                            type="date"
                                            className="input-field text-left"
                                            placeholder="dd/mm/yyyy"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Giới tính
                                        </label>
                                        <div className="relative">
                                            <select className="select-field text-left">
                                                <option value="" disabled selected>Chọn...</option>
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                                <option value="other">Khác</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Tình trạng hôn nhân
                                        </label>
                                        <div className="relative">
                                            <select className="select-field text-left">
                                                <option value="" disabled selected>Chọn...</option>
                                                <option value="single">Độc thân</option>
                                                <option value="married">Đã kết hôn</option>
                                                <option value="divorced">Đã ly hôn</option>
                                                <option value="widowed">Góa phụ</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Học vấn
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="select-field text-left"
                                                value={formData.education}
                                                onChange={(e) => handleFormChange('education', e.target.value)}
                                            >
                                                <option value="">Chọn...</option>
                                                <option value="Trung học">Trung học</option>
                                                <option value="Cao đẳng">Cao đẳng</option>
                                                <option value="Đại học">Đại học</option>
                                                <option value="Sau đại học">Sau đại học</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Kinh nghiệm
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="select-field text-left"
                                                value={formData.experience}
                                                onChange={(e) => handleFormChange('experience', e.target.value)}
                                            >
                                                <option value="">Chọn...</option>
                                                <option value="Dưới 1 năm">Dưới 1 năm</option>
                                                <option value="1-2 năm">1-2 năm</option>
                                                <option value="3-5 năm">3-5 năm</option>
                                                <option value="Trên 5 năm">Trên 5 năm</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                        Tiểu sử
                                    </label>
                                    <textarea
                                        className="input-field h-40 text-left"
                                        placeholder="Viết tiểu sử của bạn ở đây. Hãy cho nhà tuyển dụng biết bạn là ai..."
                                        value={formData.bio}
                                        onChange={(e) => handleFormChange('bio', e.target.value)}
                                    ></textarea>

                                    <div className="flex items-center mt-2 text-gray-500 text-xs">
                                        <button className="p-1 mr-1 text-gray-400">
                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                                                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                                            </svg>
                                        </button>
                                        <button className="p-1 mr-1 text-gray-400">
                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                            </svg>
                                        </button>
                                        <button className="p-1 mr-1 text-gray-400">
                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                                <path d="M4 8h16M4 16h16"></path>
                                            </svg>
                                        </button>
                                        <button className="p-1 mr-1 text-gray-400">
                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                                <path d="M4 6h16M4 12h16M4 18h12"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 text-left">
                                    <button onClick={handleProfileSave} className="apply-button">
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'social' && (
                            <div>
                                <div className="space-y-6">
                                    {/* Facebook */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                            Liên kết 1
                                        </label>
                                        <div className="flex items-center">
                                            <div className="relative flex-grow mr-2">
                                                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md">
                                                    <div className="px-3 py-2 border-r border-gray-300 text-gray-500">
                                                        <div className="relative">
                                                            <div className="flex items-center">
                                                                <span className="inline-block w-4 h-4 mr-2 text-[#1877F2]">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                                    </svg>
                                                                </span>
                                                                <span>Facebook</span>
                                                            </div>
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 bg-white rounded-r-md outline-none"
                                                        placeholder="Profile link/url..."
                                                        value={socialLinks.facebook}
                                                        onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Twitter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                            Liên kết 2
                                        </label>
                                        <div className="flex items-center">
                                            <div className="relative flex-grow mr-2">
                                                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md">
                                                    <div className="px-3 py-2 border-r border-gray-300 text-gray-500">
                                                        <div className="relative">
                                                            <div className="flex items-center">
                                                                <span className="inline-block w-4 h-4 mr-2 text-[#1DA1F2]">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                                    </svg>
                                                                </span>
                                                                <span>Twitter</span>
                                                            </div>
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 bg-white rounded-r-md outline-none"
                                                        placeholder="Profile link/url..."
                                                        value={socialLinks.twitter}
                                                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Instagram */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                            Liên kết 3
                                        </label>
                                        <div className="flex items-center">
                                            <div className="relative flex-grow mr-2">
                                                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md">
                                                    <div className="px-3 py-2 border-r border-gray-300 text-gray-500">
                                                        <div className="relative">
                                                            <div className="flex items-center">
                                                                <span className="inline-block w-4 h-4 mr-2 text-[#E4405F]">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                                                    </svg>
                                                                </span>
                                                                <span>Instagram</span>
                                                            </div>
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 bg-white rounded-r-md outline-none"
                                                        placeholder="Profile link/url..."
                                                        value={socialLinks.instagram}
                                                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* YouTube */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                            Liên kết 4
                                        </label>
                                        <div className="flex items-center">
                                            <div className="relative flex-grow mr-2">
                                                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md">
                                                    <div className="px-3 py-2 border-r border-gray-300 text-gray-500">
                                                        <div className="relative">
                                                            <div className="flex items-center">
                                                                <span className="inline-block w-4 h-4 mr-2 text-[#FF0000]">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                                    </svg>
                                                                </span>
                                                                <span>Youtube</span>
                                                            </div>
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 bg-white rounded-r-md outline-none"
                                                        placeholder="Profile link/url..."
                                                        value={socialLinks.youtube}
                                                        onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Add New Button */}
                                    <div className="mt-8">
                                        <button
                                            className="w-full py-3 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-200"
                                            style={{ backgroundColor: "#F9F9F9" }}
                                        >
                                            <span className="flex items-center">
                                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Thêm liên kết xã hội
                                            </span>
                                        </button>
                                    </div>

                                    {/* Save Button */}
                                    <div className="mt-6 text-left">
                                        <button onClick={createWorkerProfile} className="apply-button">
                                            Lưu Thay Đổi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div>
                                <h2 className="text-lg font-medium text-gray-800 mb-6 text-left">Thông tin liên lạc</h2>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Vị trí
                                        </label>
                                        <div className="input-with-icon-container">
                                            <div className="input-icon-wrapper">
                                                <svg className="h-5 w-5 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                className="input-field input-with-icon"
                                                placeholder="Tên thành phố, tiểu bang, quốc gia"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Phone
                                        </label>
                                        <div className="flex w-full">
                                            <div className="inline-block">
                                                <button className="flex items-center border border-gray-300 rounded-l-md h-[42px] px-3 bg-white">
                                                    <div className="flex items-center">
                                                        <span className="inline-block w-6 h-4 mr-2 overflow-hidden">
                                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" className="h-full w-full object-cover" />
                                                        </span>
                                                        <span className="text-gray-700 font-normal">+84</span>
                                                        <svg className="ml-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                            <input
                                                type="tel"
                                                className="flex-1 px-3 py-[9px] border border-l-0 border-gray-300 rounded-r-md focus:outline-none text-gray-500"
                                                placeholder="Phone number.."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Email
                                        </label>
                                        <div className="input-with-icon-container">
                                            <div className="input-icon-wrapper">
                                                <svg className="h-5 w-5 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                className="input-field input-with-icon"
                                                placeholder="Email address"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="apply-button">
                                            Lưu Thay Đổi
                                        </button>
                                    </div>
                                </div>

                                <h2 className="text-lg font-medium text-gray-800 mb-6 text-left">Thông báo</h2>

                                <div className="mb-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-start">
                                            <label className="custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    id="notify-selected"
                                                    defaultChecked
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label htmlFor="notify-selected" className="block text-sm text-gray-700">
                                                Thông báo cho tôi khi nhà tuyển dụng chọn tôi
                                            </label>
                                        </div>

                                        <div className="flex items-start">
                                            <label className="custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    id="notify-saved"
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label htmlFor="notify-saved" className="block text-sm text-gray-700">
                                                Thông báo cho tôi khi nhà tuyển dụng lưu hồ sơ của tôi
                                            </label>
                                        </div>

                                        <div className="flex items-start">
                                            <label className="custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    id="notify-expired"
                                                    defaultChecked
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label htmlFor="notify-expired" className="block text-sm text-gray-700">
                                                Thông báo cho tôi khi công việc tôi đã nộp đơn hết hạn
                                            </label>
                                        </div>

                                        <div className="flex items-start">
                                            <label className="custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    id="notify-rejected"
                                                    defaultChecked
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label htmlFor="notify-rejected" className="block text-sm text-gray-700">
                                                Thông báo cho tôi khi nhà tuyển dụng từ chối tôi
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex items-start mt-4">
                                        <label className="custom-checkbox">
                                            <input
                                                type="checkbox"
                                                id="notify-jobs"
                                                defaultChecked
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="notify-jobs" className="block text-sm text-gray-700">
                                            Thông báo cho tôi khi tôi có tối 5 thông báo việc làm
                                        </label>
                                    </div>
                                </div>

                                <h2 className="text-lg font-medium text-gray-800 mb-6 text-left">Thông tin thêm</h2>

                                <div className="grid grid-cols-1 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Khu vực
                                        </label>
                                        <div className="input-with-icon-container">
                                            <div className="input-icon-wrapper">
                                                <svg className="h-5 w-5 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                className="input-field input-with-icon"
                                                placeholder="Tên thành phố, tiểu bang, quốc gia"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Vị trí
                                        </label>
                                        <div className="input-with-icon-container">
                                            <div className="input-icon-wrapper">
                                                <svg className="h-5 w-5 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                className="input-field input-with-icon"
                                                placeholder="Vị trí bạn nhắm đến"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 text-left">
                                    <button className="apply-button">
                                        Lưu Thay Đổi
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-800 mb-4 text-left">Hồ sơ riêng tư</h2>

                                        <div className="privacy-container">
                                            <div
                                                className={`toggle-container ${profilePrivacy ? 'active' : 'inactive'}`}
                                                onClick={toggleProfilePrivacy}
                                            >
                                                <div className="toggle-circle"></div>
                                            </div>
                                            <div className="toggle-label">
                                                <span className={`toggle-text ${profilePrivacy ? 'active' : 'inactive'}`}>
                                                    {profilePrivacy ? 'YES' : 'NO'}
                                                </span>
                                            </div>
                                            <span className="privacy-text">
                                                Hồ sơ của bạn hiện đã được công khai
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-medium text-gray-800 mb-4 text-left">Sơ yếu lý lịch riêng tư</h2>

                                        <div className="privacy-container">
                                            <div
                                                className={`toggle-container ${resumePrivacy ? 'active' : 'inactive'}`}
                                                onClick={toggleResumePrivacy}
                                            >
                                                <div className="toggle-circle"></div>
                                            </div>
                                            <div className="toggle-label">
                                                <span className={`toggle-text ${resumePrivacy ? 'active' : 'inactive'}`}>
                                                    {resumePrivacy ? 'YES' : 'NO'}
                                                </span>
                                            </div>
                                            <span className="privacy-text">
                                                Sơ yếu lý lịch của bạn hiện đang ở chế độ riêng tư
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-lg font-medium text-gray-800 mb-6 text-left">Thay đổi mật khẩu</h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Mật khẩu hiện tại
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showCurrentPassword ? "text" : "password"}
                                                className="input-field pr-10"
                                                placeholder="Password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={toggleCurrentPasswordVisibility}
                                            >
                                                {showCurrentPassword ? (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Mật khẩu mới
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                className="input-field pr-10"
                                                placeholder="Password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={toggleNewPasswordVisibility}
                                            >
                                                {showNewPassword ? (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Xác nhận mật khẩu
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="input-field pr-10"
                                                placeholder="Password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                                {showConfirmPassword ? (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 text-left">
                                    <button className="apply-button">
                                        Lưu Thay Đổi
                                    </button>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-lg font-medium text-gray-800 mb-4 text-left">Xóa tài khoản của bạn</h2>

                                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                                        <p className="text-sm text-gray-700 text-left">
                                            Nếu bạn xóa tài khoản InnoSphere của mình, bạn sẽ không còn có thể nhận được thông tin về các công việc phù hợp, các nhà tuyển dụng đang theo dõi, thông báo việc làm, các công việc được chọn lọc và nhiều thông tin khác. Bạn sẽ bị từ bỏ khỏi tất cả các dịch vụ của InnoSphere.com.
                                        </p>
                                    </div>

                                    <button className="flex items-center px-6 py-2 bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition duration-200">
                                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Đóng Tài Khoản
                                    </button>
                                </div>
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
                workerId={workerProfile?.workerId || 0}
                onResumeAdded={handleResumeAdded}
            />
        </div>
    );
};

export default EmployeeSettings; 