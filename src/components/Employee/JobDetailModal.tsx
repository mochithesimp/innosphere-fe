import React, { useState } from 'react';

import { WorkerJobApplicationsResponse, JobApplicationService } from '../../services/jobApplicationService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Define the type for a single job application from the API response
type JobApplication = WorkerJobApplicationsResponse['applications'][0];

interface JobDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobApplication: JobApplication | null;
    onStatusUpdate?: () => void; // Optional callback to refresh data after status update
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ isOpen, onClose, jobApplication, onStatusUpdate }) => {
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    // Utility function to format time to hh:mm
    const formatTime = (dateTimeString: string) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    // Utility function to format posted time
    const getTimeAgo = (dateTimeString: string) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes} phút trước`;
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return `${hours} giờ trước`;
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return `${days} ngày trước`;
        }
    };

    // Function to parse requirements with green tick formatting
    const formatRequirements = (requirements: string) => {
        if (!requirements) return [];
        return requirements.split(',').map(req => req.trim()).filter(req => req.length > 0);
    };

    // Function to handle canceling job application
    const handleCancelApplication = async () => {
        if (!jobApplication) return;

        try {
            setIsUpdatingStatus(true);
            console.log(`🔄 Canceling job application ID: ${jobApplication.id}`);
            console.log('🔄 Calling API: PUT https://103.163.24.72/api/jobapplication/' + jobApplication.id + '/cancel');

            await JobApplicationService.cancelJobApplication(jobApplication.id);

            console.log('✅ Job application canceled successfully');
            MySwal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Đã hủy ứng tuyển thành công!',
                confirmButtonText: 'Đã hiểu',
                confirmButtonColor: '#37A594',
                timer: 2500,
                timerProgressBar: true
            });

            // Call the callback to refresh data
            if (onStatusUpdate) {
                onStatusUpdate();
            }

            onClose(); // Close the modal
        } catch (error) {
            console.error('❌ Error canceling job application:', error);
            MySwal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra',
                text: 'Có lỗi xảy ra khi hủy ứng tuyển. Vui lòng thử lại.',
                confirmButtonText: 'Thử lại',
                confirmButtonColor: '#dc3545'
            });
        } finally {
            setIsUpdatingStatus(false);
        }
    };



    if (!isOpen || !jobApplication) return null;

    const jobData = jobApplication.jobPosting;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Chi Tiết Công Việc</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {/* Top section with job title and metadata */}
                    <div className="mb-8">
                        {/* Time posted badge */}
                        <div className="flex items-center mb-6">
                            <div className="text-[#309689] bg-[#ecf8f6] text-sm py-1 px-3 rounded-full">
                                {getTimeAgo(jobData.postedAt)}
                            </div>
                        </div>

                        {/* Job title and company */}
                        <div className="flex items-start mb-6">
                            <div className="mr-4">
                                <div className="w-12 h-12 overflow-hidden">
                                    <img
                                        src={jobData.companyLogoUrl || "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain"}
                                        alt={jobData.companyName}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-1 text-left">{jobData.title}</h2>
                                <p className="text-gray-700 text-left">{jobData.companyName}</p>
                            </div>
                        </div>

                        {/* Job metadata icons with Apply button */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>F&B</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{formatTime(jobData.startTime)}-{formatTime(jobData.endTime)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{jobData.hourlyRate?.toLocaleString()}đ/giờ</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{jobData.cityName}</span>
                                </div>
                            </div>

                            {/* Apply button */}
                            <div style={{ width: '280px' }}>
                                {jobApplication.status === 'PENDING' ? (
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div
                                            style={{
                                                backgroundColor: '#9CA3AF',
                                                borderRadius: '4px',
                                                padding: '8px 12px',
                                                textAlign: 'center',
                                                color: 'white',
                                                fontWeight: '500',
                                                flex: 1,
                                                cursor: 'not-allowed',
                                                opacity: 0.7,
                                                fontSize: '13px'
                                            }}
                                        >
                                            Đang chờ duyệt
                                        </div>
                                        <button
                                            style={{
                                                backgroundColor: '#EF4444',
                                                borderRadius: '4px',
                                                padding: '8px 12px',
                                                textAlign: 'center',
                                                color: 'white',
                                                fontWeight: '500',
                                                flex: 1,
                                                cursor: isUpdatingStatus ? 'not-allowed' : 'pointer',
                                                opacity: isUpdatingStatus ? 0.7 : 1,
                                                fontSize: '13px',
                                                border: 'none'
                                            }}
                                            onClick={handleCancelApplication}
                                            disabled={isUpdatingStatus}
                                        >
                                            {isUpdatingStatus ? 'Đang hủy...' : 'Hủy bỏ'}
                                        </button>
                                    </div>
                                ) : jobApplication.status === 'ACCEPTED' ? (
                                    <div
                                        style={{
                                            backgroundColor: '#37A594',
                                            borderRadius: '4px',
                                            padding: '12px 0',
                                            textAlign: 'center',
                                            color: 'white',
                                            fontWeight: '500',
                                            width: '100%',
                                            cursor: 'not-allowed',
                                            opacity: 0.8
                                        }}
                                    >
                                        Đã nhận việc
                                    </div>
                                ) : jobApplication.status === 'REJECTED' ? (
                                    <div
                                        style={{
                                            backgroundColor: '#EF4444',
                                            borderRadius: '4px',
                                            padding: '12px 0',
                                            textAlign: 'center',
                                            color: 'white',
                                            fontWeight: '500',
                                            width: '100%',
                                            cursor: 'not-allowed',
                                            opacity: 0.8
                                        }}
                                    >
                                        Đã từ chối
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            backgroundColor: '#37A594',
                                            borderRadius: '4px',
                                            padding: '12px 0',
                                            textAlign: 'center',
                                            color: 'white',
                                            fontWeight: '500',
                                            width: '100%',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            // Handle apply action - you can add your logic here
                                            console.log('Apply for job:', jobData.title);
                                        }}
                                    >
                                        Ứng Tuyển
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content with sidebar */}
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Content */}
                        <div className="md:w-3/4">
                            {/* Job description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 text-left">Chi tiết công việc</h3>
                                <p className="text-gray-700 leading-relaxed mb-4 text-left">
                                    {jobData.description || 'Mô tả công việc không có sẵn.'}
                                </p>
                            </div>

                            {/* Responsibilities */}
                            <div className="mb-8 pt-8">
                                <h3 className="text-xl font-bold mb-4 text-left">Nhiệm vụ chính</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Đón tiếp và hướng dẫn khách vào bàn.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Nhận order và chuyển đơn báo/bar.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Phục vụ món ăn, đồ uống đúng đúng cách.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Kiểm tra và dọn bàn bàn ăn luôn sạch sẽ.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Hỗ trợ khách hàng, giải đáp thắc mắc.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Phối hợp với đồng nghiệp để đảm bảo dịch vụ tốt nhất.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Skills */}
                            <div className="mb-8 pt-8">
                                <h3 className="text-xl font-bold mb-4 text-left">Kỹ Năng Chuyên Môn</h3>
                                <ul className="space-y-3">
                                    {formatRequirements(jobData.requirements || '').map((requirement, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{requirement}</span>
                                        </li>
                                    ))}
                                    {(!jobData.requirements || formatRequirements(jobData.requirements).length === 0) && (
                                        <li className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Không có yêu cầu đặc biệt</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="md:w-1/4">
                            {/* Job Overview Card */}
                            <div className="bg-[#f7fcfb] rounded-lg p-6 mb-6">
                                <h3 className="text-xl font-bold mb-5 text-left">Tổng quan công việc</h3>

                                {/* Job Details */}
                                <div className="space-y-5">
                                    {/* Job position */}
                                    <div className="flex">
                                        <div className="text-[#37A594] mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p className="font-medium text-black">Công việc</p>
                                            <p className="text-[#65816d] text-sm mt-0.5">{jobData.title}</p>
                                        </div>
                                    </div>

                                    {/* Job type */}
                                    <div className="flex">
                                        <div className="text-[#37A594] mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p className="font-medium text-black">Loại công việc</p>
                                            <p className="text-[#65816d] text-sm mt-0.5">Phục vụ & thu ngân</p>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="flex">
                                        <div className="text-[#37A594] mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p className="font-medium text-black">Danh mục</p>
                                            <p className="text-[#65816d] text-sm mt-0.5">F&B</p>
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div className="flex">
                                        <div className="text-[#37A594] mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p className="font-medium text-black">Kinh Nghiệm</p>
                                            <p className="text-[#65816d] text-sm mt-0.5">Không yêu cầu</p>
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div className="flex">
                                        <div className="text-[#37A594] mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p className="font-medium text-black">Bằng cấp</p>
                                            <p className="text-[#65816d] text-sm mt-0.5">Không yêu cầu</p>
                                        </div>
                                    </div>

                                    {/* Salary */}
                                    <div className="flex">
                                        <div className="text-[#37A594] mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p className="font-medium text-black">Lương</p>
                                            <p className="text-[#65816d] text-sm mt-0.5">{jobData.hourlyRate?.toLocaleString()}/giờ</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex">
                                        <div className="text-[#37A594] mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p className="font-medium text-black">Địa điểm</p>
                                            <p className="text-[#65816d] text-sm mt-0.5">{jobData.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Map placeholder */}
                                <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                                    <img
                                        src="https://www.google.com/maps/vt/data=Q426DLsUFI04LGjc9TkDJ6k9vVRistX9hPN1GnCAMzA9JLmuWbaxacURQvF2sJMjecyQHT0a-V0sU0fuikDhy0hX4UOKUUmSq-6DDtxs_CakdfqIy7w4yUZYVwsWdoYGAVerTDuOH-INDbojoq4Nfgso9SHLdMrpbEgAa-wDMlXL2guaSccPp_a3W1CBsYHpbzbMFMCftJqK0MaPflhlwCFPZw3PNofrug"
                                        alt="Map location"
                                        className="w-full h-36 object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://via.placeholder.com/600x300/f2f2f2/cccccc?text=Map";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailModal; 