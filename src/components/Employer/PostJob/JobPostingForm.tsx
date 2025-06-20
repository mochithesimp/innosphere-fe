import React, { useState } from 'react';
import { getUserIdFromToken } from '../../../utils/auth';
import { SubscriptionService } from '../../../services/subscriptionService';
import { JobPostingService } from '../../../services/jobPostingService';
import JobPromotionPopup from './JobPromotionPopup';

const JobPostingForm: React.FC = () => {
    // Form state
    const [title, setTitle] = useState('');
    const [jobType, setJobType] = useState('');
    const [salaryRangeTo, setSalaryRangeTo] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [workType, setWorkType] = useState('');
    const [location, setLocation] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [description, setDescription] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [applicationType, setApplicationType] = useState<'internal' | 'external' | 'email'>('internal');

    // Popup state
    const [showPromotionPopup, setShowPromotionPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // City mapping
    const getCityData = (locationValue: string) => {
        switch (locationValue) {
            case 'ho-chi-minh':
                return { cityId: 1, location: 'Hồ Chí Minh' };
            case 'da-nang':
                return { cityId: 2, location: 'Đà Nẵng' };
            case 'ha-noi':
                return { cityId: 3, location: 'Hà Nội' };
            default:
                return { cityId: 1, location: 'Hồ Chí Minh' };
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        // Basic validation
        if (!title.trim()) {
            alert('Vui lòng nhập tiêu đề công việc');
            return;
        }
        if (!jobType) {
            alert('Vui lòng chọn vai trò công việc');
            return;
        }
        if (!salaryRangeTo.trim()) {
            alert('Vui lòng nhập mức lương tối đa');
            return;
        }
        if (!expirationDate) {
            alert('Vui lòng chọn ngày hết hạn');
            return;
        }

        setShowPromotionPopup(true);
    };

    // Handle job posting API call
    const handleJobPosting = async (isUrgent: boolean, isHighlighted: boolean) => {
        setIsSubmitting(true);

        try {
            // Get user authentication
            const userId = getUserIdFromToken();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Get employer profile to get employerId
            const employerProfile = await SubscriptionService.getEmployerProfile();
            if (!employerProfile || !employerProfile.employerId) {
                throw new Error('Could not get employer profile');
            }

            // Get user's subscription
            const subscriptions = await SubscriptionService.getSubscriptionsByEmployer(employerProfile.employerId);
            if (!subscriptions || subscriptions.length === 0) {
                throw new Error('No active subscription found');
            }

            // Use the first active subscription
            const activeSubscription = subscriptions[0];

            // Prepare data
            const cityData = getCityData(location);
            const currentDate = new Date();
            const expDate = new Date(expirationDate);

            // Combine requirements
            const requirements = [
                education ? `Học vấn: ${education}` : '',
                experience ? `Kinh nghiệm: ${experience}` : '',
                workType ? `Loại công việc: ${workType}` : ''
            ].filter(Boolean).join(' - ');

            // Combine description and responsibilities
            const combinedDescription = [
                description ? `Mô tả: ${description}` : '',
                responsibilities ? `Trách nhiệm: ${responsibilities}` : ''
            ].filter(Boolean).join(' - ');

            // Prepare API payload
            const jobData = {
                employerId: employerProfile.employerId,
                subscriptionId: activeSubscription.id,
                cityId: cityData.cityId,
                title: title.trim(),
                description: combinedDescription,
                location: cityData.location,
                startTime: currentDate.toISOString(),
                endTime: expDate.toISOString(),
                hourlyRate: parseFloat(salaryRangeTo) || 0,
                jobType: jobType,
                requirements: requirements,
                expiresAt: expDate.toISOString(),
                isUrgent: isUrgent,
                isHighlighted: isHighlighted
            };

            // Log the API payload in JSON format
            console.log('🚀 API Payload being sent to /api/jobposting:');
            console.log(JSON.stringify(jobData, null, 2));

            // Call the API
            const response = await JobPostingService.createJobPosting(jobData);

            if (response) {
                // Success - redirect to dashboard or show success message
                alert('Công việc đã được đăng thành công!');
                window.location.href = '/employer/dashboard';
            }

        } catch (error) {
            console.error('Error posting job:', error);
            alert('Có lỗi xảy ra khi đăng công việc. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
            setShowPromotionPopup(false);
        }
    };

    return (
        <>
            <style>
                {`
                    .submit-button {
                        background-color: #1CB99E;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 0.375rem;
                        display: flex;
                        align-items: center;
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    
                    .submit-button:hover {
                        background-color: #19a38b;
                    }
                    
                    .submit-button svg {
                        margin-left: 0.5rem;
                        width: 1.25rem;
                        height: 1.25rem;
                    }
                `}
            </style>
            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold mb-4 text-left">Đăng việc làm</h1>

                    {/* Job Title Section */}
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4 text-left">Tiêu đề công việc</h2>
                        <input
                            type="text"
                            placeholder="Thêm danh hiệu công việc, vai trò, vị trí tuyển dụng, v.v..."
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Job Type Section */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <div className="md:w-2/3">
                                <h2 className="text-base font-medium mb-2 text-left">Thể</h2>
                                <input
                                    type="text"
                                    placeholder="Từ khóa công việc, thẻ, v.v..."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                />
                            </div>
                            <div className="md:w-1/3">
                                <h2 className="text-base font-medium mb-2 text-left">Vai trò công việc</h2>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                        value={jobType}
                                        onChange={(e) => setJobType(e.target.value)}
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="FullTime">Full-time</option>
                                        <option value="PartTime">Part-time</option>
                                        <option value="Contract">Contract</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Salary Section */}
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4 text-left">Thu nhập</h2>
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="md:w-1/3">
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Mức lương tối thiểu</h3>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Lương tối thiểu..."
                                        className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] opacity-50"
                                        disabled
                                    />
                                    <div className="bg-gray-100 flex items-center justify-center px-4 border-t border-r border-b border-gray-300 rounded-r-md">
                                        <span className="text-gray-600">VNĐ</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/3">
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Mức lương tối đa</h3>
                                <div className="flex">
                                    <input
                                        type="number"
                                        placeholder="Lương tối đa..."
                                        className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                        value={salaryRangeTo}
                                        onChange={(e) => setSalaryRangeTo(e.target.value)}
                                    />
                                    <div className="bg-gray-100 flex items-center justify-center px-4 border-t border-r border-b border-gray-300 rounded-r-md">
                                        <span className="text-gray-600">VNĐ</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/3">
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Kiểu Lương</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                        value={salaryType}
                                        onChange={(e) => setSalaryType(e.target.value)}
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="monthly">Hàng tháng</option>
                                        <option value="annual">Hàng năm</option>
                                        <option value="hourly">Theo giờ</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Role and Salary Type */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Vai trò công việc</h3>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                >
                                    <option value="">Chọn...</option>
                                    <option value="FullTime">Full-time</option>
                                    <option value="PartTime">Part-time</option>
                                    <option value="Contract">Contract</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Kiểu Lương</h3>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    value={salaryType}
                                    onChange={(e) => setSalaryType(e.target.value)}
                                >
                                    <option value="">Chọn...</option>
                                    <option value="monthly">Hàng tháng</option>
                                    <option value="annual">Hàng năm</option>
                                    <option value="hourly">Theo giờ</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4 text-left">Thông tin thêm</h2>

                        {/* First row - Học vấn, Kinh Nghiệm, Loại công việc */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Học vấn</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="THPT">THPT</option>
                                        <option value="Cao đẳng">Cao đẳng</option>
                                        <option value="Đại học">Đại học</option>
                                        <option value="Thạc sĩ">Thạc sĩ</option>
                                        <option value="Tiến sĩ">Tiến sĩ</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Kinh Nghiệm</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="Mới đi làm">Mới đi làm</option>
                                        <option value="1 năm">1 năm</option>
                                        <option value="2 năm">2 năm</option>
                                        <option value="3-5 năm">3-5 năm</option>
                                        <option value="Trên 5 năm">Trên 5 năm</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Loại công việc</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                        value={workType}
                                        onChange={(e) => setWorkType(e.target.value)}
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="Hợp đồng">Hợp đồng</option>
                                        <option value="Toàn thời gian">Toàn thời gian</option>
                                        <option value="Bán thời gian">Bán thời gian</option>
                                        <option value="Từ xa">Từ xa</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second row - Vị trí, Ngày hết hạn */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Vị trí</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="ho-chi-minh">Hồ Chí Minh</option>
                                        <option value="ha-noi">Hà Nội</option>
                                        <option value="da-nang">Đà Nẵng</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Ngày hết hạn</h3>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                    value={expirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Application Options Section */}
                    <div className="bg-gray-50 p-6 rounded-md mb-8">
                        <h2 className="text-base font-medium mb-4 text-left">Ứng tuyển công việc trên:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Nền tảng option */}
                            <div
                                className={`bg-white p-4 rounded-md border relative cursor-pointer ${applicationType === 'internal' ? 'border-[#309689] ring-1 ring-[#309689]' : 'border-gray-300'}`}
                                onClick={() => setApplicationType('internal')}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3 mt-1">
                                        <div
                                            className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${applicationType === 'internal' ? 'bg-[#309689] border-[#309689]' : 'bg-white'
                                                }`}
                                        >
                                            {applicationType === 'internal' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <label className="font-medium text-gray-800 block text-left">Nền tảng</label>
                                        <p className="text-gray-500 text-sm mt-1 text-left">
                                            Ứng viên sẽ nộp đơn xin việc bằng Nền tảng và tất cả các ứng dụng sẽ hiển thị trên bảng điều khiển của bạn.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Nền tảng bên ngoài option */}
                            <div
                                className={`bg-white p-4 rounded-md border relative cursor-pointer ${applicationType === 'external' ? 'border-[#309689] ring-1 ring-[#309689]' : 'border-gray-300'}`}
                                onClick={() => setApplicationType('external')}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3 mt-1">
                                        <div
                                            className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${applicationType === 'external' ? 'bg-[#309689] border-[#309689]' : 'bg-white'
                                                }`}
                                        >
                                            {applicationType === 'external' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <label className="font-medium text-gray-800 block text-left">Nền tảng bên ngoài</label>
                                        <p className="text-gray-500 text-sm mt-1 text-left">
                                            Ứng viên nộp đơn xin việc trên trang web của bạn, tất cả các ứng dụng sẽ hiển thị trên trang web của riêng bạn.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Trên email của bạn option */}
                            <div
                                className={`bg-white p-4 rounded-md border relative cursor-pointer ${applicationType === 'email' ? 'border-[#309689] ring-1 ring-[#309689]' : 'border-gray-300'}`}
                                onClick={() => setApplicationType('email')}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3 mt-1">
                                        <div
                                            className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${applicationType === 'email' ? 'bg-[#309689] border-[#309689]' : 'bg-white'
                                                }`}
                                        >
                                            {applicationType === 'email' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <label className="font-medium text-gray-800 block text-left">Trên email của bạn</label>
                                        <p className="text-gray-500 text-sm mt-1 text-left">
                                            Ứng viên nộp đơn xin việc tới địa chỉ email của bạn và tất cả các ứng dụng sẽ hiển thị trong email của bạn.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Description Section */}
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-2 text-left">Mô tả & Trách nhiệm</h2>
                        <div className="mb-4">
                            <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Mô tả</h3>
                            <textarea
                                placeholder="Thêm mô tả công việc của bạn..."
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] min-h-[120px] resize-vertical"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Trách nhiệm</h3>
                            <textarea
                                placeholder="Thêm trách nhiệm công việc của bạn..."
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] min-h-[120px] resize-vertical"
                                value={responsibilities}
                                onChange={(e) => setResponsibilities(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                        <a
                            href="#"
                            onClick={handleSubmit}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#309689',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: '500',
                                fontSize: '16px',
                                border: 'none',
                                minWidth: '150px',
                                cursor: 'pointer'
                            }}
                        >
                            Đăng Công Việc
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                style={{ marginLeft: '10px' }}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Promotion Popup with job title */}
            <JobPromotionPopup
                isOpen={showPromotionPopup}
                onClose={() => setShowPromotionPopup(false)}
                jobTitle={title || 'Nhà thiết kế UI/UX'}
                onJobPost={handleJobPosting}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default JobPostingForm; 