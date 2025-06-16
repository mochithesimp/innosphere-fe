import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiBriefcaseLine, RiUserLine, RiTimeLine, RiMoreLine } from 'react-icons/ri';
import { JobPostingService, JobPostingListItem } from '../../../services/jobPostingService';
import { SubscriptionService } from '../../../services/subscriptionService';

const OverviewContent: React.FC = () => {
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [recentJobs, setRecentJobs] = useState<JobPostingListItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Function to toggle dropdown
    const toggleDropdown = (id: number) => {
        if (openDropdownId === id) {
            // If clicking on the same dropdown, close it
            setOpenDropdownId(null);
        } else {
            // Otherwise, open this one and close any other
            setOpenDropdownId(id);
        }
    };

    // Fetch recent job postings
    useEffect(() => {
        const fetchRecentJobs = async () => {
            try {
                setLoading(true);

                // Get employer profile to get employerId
                const employerProfile = await SubscriptionService.getEmployerProfile();
                if (!employerProfile || !employerProfile.employerId) {
                    console.error('Could not get employer profile');
                    return;
                }

                // Get job postings for this employer
                const jobPostings = await JobPostingService.getJobPostingsByEmployer(employerProfile.employerId);

                // Sort by posted date (most recent first) and take only 5
                const sortedJobs = jobPostings
                    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
                    .slice(0, 5);

                setRecentJobs(sortedJobs);
            } catch (error) {
                console.error('Error fetching recent jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentJobs();
    }, []);

    // Format time from datetime string to "HHh00" format (e.g., "7h00", "15h00")
    const formatTime = (dateTimeString?: string) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        const hours = date.getHours();
        return `${hours}h00`;
    };

    // Calculate remaining time
    const calculateRemainingTime = (expiresAt?: string) => {
        if (!expiresAt) return 'Không xác định';

        const now = new Date();
        const expiry = new Date(expiresAt);
        const diffInMilliseconds = expiry.getTime() - now.getTime();

        if (diffInMilliseconds <= 0) {
            return 'Còn lại 0 giờ';
        }

        const diffInHours = Math.ceil(diffInMilliseconds / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `Còn lại ${diffInHours} giờ`;
        } else {
            const diffInDays = Math.ceil(diffInHours / 24);
            return `Còn lại ${diffInDays} ngày`;
        }
    };

    // Determine job status
    const getJobStatus = (job: JobPostingListItem): 'active' | 'completed' | 'expired' | 'pending' => {
        const now = new Date();
        const expiresAt = job.expiresAt ? new Date(job.expiresAt) : null;

        // Check by status first
        if (job.status === 'PENDING') {
            return 'pending';
        } else if (job.status === 'APPROVED') {
            // Check if expired by date for approved jobs
            if (expiresAt && now > expiresAt) {
                return 'expired';
            }
            return 'active';
        } else if (job.status === 'CLOSED') {
            return 'completed';
        } else if (job.status === 'REJECTED') {
            return 'expired';
        } else {
            return 'expired'; // For unknown statuses
        }
    };

    // Handle job status actions
    const handleCloseJob = async (jobId: number) => {
        try {
            const success = await JobPostingService.closeJobPosting(jobId);
            if (success) {
                // Refresh the job list
                const employerProfile = await SubscriptionService.getEmployerProfile();
                if (employerProfile?.employerId) {
                    const jobPostings = await JobPostingService.getJobPostingsByEmployer(employerProfile.employerId);
                    const sortedJobs = jobPostings
                        .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
                        .slice(0, 5);
                    setRecentJobs(sortedJobs);
                }
                setOpenDropdownId(null);
            } else {
                alert('Có lỗi xảy ra khi kết thúc công việc');
            }
        } catch (error) {
            console.error('Error closing job:', error);
            alert('Có lỗi xảy ra khi kết thúc công việc');
        }
    };

    const handleRejectJob = async (jobId: number) => {
        try {
            const success = await JobPostingService.rejectJobPosting(jobId);
            if (success) {
                // Refresh the job list
                const employerProfile = await SubscriptionService.getEmployerProfile();
                if (employerProfile?.employerId) {
                    const jobPostings = await JobPostingService.getJobPostingsByEmployer(employerProfile.employerId);
                    const sortedJobs = jobPostings
                        .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
                        .slice(0, 5);
                    setRecentJobs(sortedJobs);
                }
                setOpenDropdownId(null);
            } else {
                alert('Có lỗi xảy ra khi đóng công việc');
            }
        } catch (error) {
            console.error('Error rejecting job:', error);
            alert('Có lỗi xảy ra khi đóng công việc');
        }
    };

    return (
        <div>
            <div className="mb-8 text-left">
                <h1 className="text-xl font-semibold">Hello, Anh Vũ</h1>
                <p className="text-gray-600 text-sm">Đây là thống tin ứng tuyển và hoạt động hàng ngày</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl">
                {/* Job Stats Card */}
                <div style={{ backgroundColor: '#E7F0FA' }} className="rounded-lg p-5 flex items-center justify-between">
                    <div className="text-left">
                        <h3 className="text-2xl font-bold mb-1">589</h3>
                        <p className="text-gray-600 text-sm">Công việc đang hoạt động</p>
                    </div>
                    <div style={{ backgroundColor: 'white' }} className="p-3 rounded-lg shadow-sm">
                        <RiBriefcaseLine style={{ color: '#0A65CC' }} className="h-6 w-6" />
                    </div>
                </div>

                {/* Candidate Stats Card */}
                <div style={{ backgroundColor: '#FFF6E6' }} className="rounded-lg p-5 flex items-center justify-between">
                    <div className="text-left">
                        <h3 className="text-2xl font-bold mb-1">2,517</h3>
                        <p className="text-gray-600 text-sm">Nhân viên đã lưu</p>
                    </div>
                    <div style={{ backgroundColor: 'white' }} className="p-3 rounded-lg shadow-sm">
                        <RiUserLine style={{ color: '#FF9F43' }} className="h-6 w-6" />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Bài đăng công việc gần đây</h2>
                    <Link to="/employer/my-jobs" className="text-gray-600 text-sm flex items-center">
                        Xem tất cả
                        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="grid grid-cols-7 bg-gray-50 py-3 px-4 text-sm font-medium text-gray-600 border-b">
                        <div className="col-span-3 text-left">JOBS</div>
                        <div className="col-span-1 text-center">STATUS</div>
                        <div className="col-span-1 text-center">APPLICATIONS</div>
                        <div className="col-span-2 text-center">ACTIONS</div>
                    </div>

                    {loading ? (
                        <div className="py-8 text-center text-gray-500">
                            Đang tải dữ liệu...
                        </div>
                    ) : recentJobs.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                            Chưa có bài đăng công việc nào
                        </div>
                    ) : (
                        recentJobs.map((job, index) => (
                            <JobItem
                                key={job.id}
                                job={job}
                                title={job.title}
                                timeSlot={job.startTime && job.endTime ? `${formatTime(job.startTime)}-${formatTime(job.endTime)}` : 'Không xác định'}
                                additionalInfo={calculateRemainingTime(job.expiresAt)}
                                status={getJobStatus(job)}
                                applications={job.applicationsCount}
                                isDropdownOpen={openDropdownId === job.id}
                                toggleDropdown={() => toggleDropdown(job.id)}
                                isLastItem={index === recentJobs.length - 1}
                                onCloseJob={handleCloseJob}
                                onRejectJob={handleRejectJob}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

interface JobItemProps {
    job: JobPostingListItem;
    title: string;
    timeSlot: string;
    additionalInfo: string;
    status: 'active' | 'completed' | 'expired' | 'pending';
    applications: number;
    isDropdownOpen: boolean;
    toggleDropdown: () => void;
    isLastItem: boolean;
    onCloseJob: (jobId: number) => Promise<void>;
    onRejectJob: (jobId: number) => Promise<void>;
}

const JobItem: React.FC<JobItemProps> = ({
    job,
    title,
    timeSlot,
    additionalInfo,
    status,
    applications,
    isDropdownOpen,
    toggleDropdown,
    isLastItem,
    onCloseJob,
    onRejectJob
}) => {
    // Status badge styling
    let statusBadge;

    if (status === 'active') {
        statusBadge = (
            <div className="flex items-center justify-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]">
                    <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                    Hoạt động
                </span>
            </div>
        );
    } else if (status === 'completed') {
        statusBadge = (
            <div className="flex items-center justify-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-1.5"></span>
                    Đã kết thúc
                </span>
            </div>
        );
    } else if (status === 'pending') {
        statusBadge = (
            <div className="flex items-center justify-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600 border border-yellow-200">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-1.5"></span>
                    Chờ xử lý
                </span>
            </div>
        );
    } else {
        statusBadge = (
            <div className="flex items-center justify-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-1.5"></span>
                    Hết hạn
                </span>
            </div>
        );
    }

    // Different actions based on job status
    const renderActions = () => {
        return (
            <div className="flex justify-center gap-2 items-center">
                <Link
                    to={`/employer/job-detail`}
                    className="bg-[#EBF5F4] text-[#309689] hover:bg-[#309689] hover:text-white px-3 py-1.5 rounded text-sm font-medium border border-[#d0e6e3] transition-colors duration-150"
                >
                    Xem Chi Tiết
                </Link>
                <div className="relative">
                    <button
                        className="p-1.5 rounded-full hover:bg-gray-100"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown();
                        }}
                    >
                        <RiMoreLine className="h-5 w-5 text-gray-500" />
                    </button>

                    {isDropdownOpen && (
                        <div
                            className={`absolute ${isLastItem ? "bottom-full mb-2" : "top-full mt-2"} right-0 bg-white rounded shadow-md border z-10`}
                            style={{ width: '200px' }}
                        >
                            <div className="py-1">
                                {/* Đăng tuyển dụng - show if status is completed (CLOSED) or expired */}
                                {(status === 'completed' || status === 'expired') && (
                                    <div className="flex items-center px-4 py-2 text-[#309689] hover:bg-[#EBF5F4] cursor-pointer"
                                        onClick={() => toggleDropdown()}>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        <span>Đăng tuyển dụng</span>
                                    </div>
                                )}

                                {/* Kết thúc công việc - show if status is active (APPROVED) */}
                                {status === 'active' && (
                                    <div className="flex items-center px-4 py-2 text-[#309689] hover:bg-[#EBF5F4] cursor-pointer"
                                        onClick={() => {
                                            onCloseJob(job.id);
                                        }}>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Kết thúc công việc</span>
                                    </div>
                                )}

                                {/* Đóng công việc - show if status is NOT expired and NOT pending (active or completed) */}
                                {(status !== 'expired' && status !== 'pending') && (
                                    <div className="flex items-center px-4 py-2 text-[#309689] hover:bg-[#EBF5F4] cursor-pointer"
                                        onClick={() => {
                                            onRejectJob(job.id);
                                        }}>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        <span>Đóng công việc</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-7 py-4 px-4 border-b hover:border-[#309689] items-center hover:bg-gray-50 transition-colors duration-150">
            <div className="col-span-3 text-left">
                <div className="flex items-center">
                    <div>
                        <h3 className="font-medium">{title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <RiTimeLine className="mr-1" />
                            <span>{timeSlot}</span>
                            <span className="mx-2">•</span>
                            <span>{additionalInfo}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 text-center">
                {statusBadge}
            </div>
            <div className="col-span-1 text-center">
                <div className="flex items-center justify-center text-gray-600">
                    <RiUserLine className="mr-1" />
                    <span>{applications} Ứng viên</span>
                </div>
            </div>
            <div className="col-span-2 text-right">
                {renderActions()}
            </div>
        </div>
    );
};

export default OverviewContent; 