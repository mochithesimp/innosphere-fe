import React, { useState, useEffect } from 'react';
import { RiMore2Line, RiAddCircleLine, RiCloseLine, RiCheckLine, RiTimeLine, RiUserLine } from 'react-icons/ri';
import { JobPostingService, JobPostingListItem } from '../../../services/jobPostingService';
import { SubscriptionService } from '../../../services/subscriptionService';
import JobApplicationsView from './JobApplicationsView';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const MyJobsContent: React.FC = () => {
    const [selectedJobStatus, setSelectedJobStatus] = useState<string>('All Jobs');
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [allJobs, setAllJobs] = useState<JobPostingListItem[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<JobPostingListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showApplicationsPopup, setShowApplicationsPopup] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

    const ITEMS_PER_PAGE = 9;

    // Function to handle button hover effect directly in DOM
    useEffect(() => {
        // Add style to head
        const style = document.createElement('style');
        style.textContent = `
            button.view-profile-btn {
                background-color: #EBF5F4 !important;
                color: #309689 !important;
                padding: 4px 12px !important;
                border-radius: 4px !important;
                transition: all 0.3s ease !important;
                cursor: pointer !important;
                border: none !important;
                font-weight: 500 !important;
                font-size: 14px !important;
                text-decoration: none !important;
                outline: none !important;
            }
            
            button.view-profile-btn:hover {
                background-color: #309689 !important;
                color: white !important;
            }

            button.view-profile-btn:focus {
                background-color: #EBF5F4 !important;
                color: #309689 !important;
                outline: none !important;
            }

            .dropdown-menu {
                background-color: white !important;
                border-radius: 4px !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                overflow: hidden !important;
                z-index: 50 !important;
            }

            .dropdown-item {
                padding: 8px 16px !important;
                color: #309689 !important;
                font-size: 14px !important;
                cursor: pointer !important;
                transition: background-color 0.2s ease !important;
                display: flex !important;
                align-items: center !important;
                background-color: white !important;
            }

            .dropdown-item:hover {
                background-color: #EBF5F4 !important;
                color: #309689 !important;
            }

            .dropdown-item svg {
                margin-right: 8px !important;
            }

            .pagination-container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 2rem;
            }

            .pagination-arrow {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #EBF4FB;
                border-radius: 50%;
                cursor: pointer;
                color: #94A3B8;
                transition: all 0.2s ease;
            }

            .pagination-arrow:hover {
                background-color: #D1E4F7;
            }

            .pagination-arrow.disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }

            .pagination-number {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                margin: 0 5px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s ease;
            }

            .pagination-number.active {
                background-color: #309689;
                color: white;
            }

            .pagination-number:not(.active):hover {
                background-color: #F3F4F6;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdownId !== null && !(event.target as Element).closest('.dropdown-container')) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [openDropdownId]);

    // Fetch jobs when component mounts
    useEffect(() => {
        fetchJobs();
    }, []);

    // Filter jobs when selectedJobStatus changes
    useEffect(() => {
        filterJobs();
        setCurrentPage(1); // Reset to first page when filter changes
    }, [selectedJobStatus, allJobs]);

    // Fetch job postings (fetch all jobs, no API filtering)
    const fetchJobs = async () => {
        try {
            setLoading(true);

            // Get employer profile to get employerId
            const employerProfile = await SubscriptionService.getEmployerProfile();
            if (!employerProfile || !employerProfile.employerId) {
                console.error('Could not get employer profile');
                return;
            }

            // Get ALL job postings for this employer (no status filter)
            const jobPostings = await JobPostingService.getJobPostingsByEmployer(employerProfile.employerId);

            // Sort by posted date (most recent first)
            const sortedJobs = jobPostings.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

            setAllJobs(sortedJobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter jobs based on display status
    const filterJobs = () => {
        let filtered = allJobs;

        if (selectedJobStatus === 'Active Jobs') {
            filtered = allJobs.filter(job => getJobStatus(job) === 'active');
        } else if (selectedJobStatus === 'Expired Jobs') {
            filtered = allJobs.filter(job => getJobStatus(job) === 'expired');
        } else if (selectedJobStatus === 'Closed Jobs') {
            filtered = allJobs.filter(job => getJobStatus(job) === 'completed');
        } else if (selectedJobStatus === 'Pending Jobs') {
            filtered = allJobs.filter(job => getJobStatus(job) === 'pending');
        }
        // For 'All Jobs', show all jobs

        setFilteredJobs(filtered);
    };

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
                await fetchJobs();
                setOpenDropdownId(null);
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra',
                    text: 'Có lỗi xảy ra khi kết thúc công việc',
                    confirmButtonText: 'Đã hiểu',
                    confirmButtonColor: '#dc3545'
                });
            }
        } catch (error) {
            console.error('Error closing job:', error);
            MySwal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra',
                text: 'Có lỗi xảy ra khi kết thúc công việc',
                confirmButtonText: 'Đã hiểu',
                confirmButtonColor: '#dc3545'
            });
        }
    };

    const handleRejectJob = async (jobId: number) => {
        try {
            const success = await JobPostingService.rejectJobPosting(jobId);
            if (success) {
                // Refresh the job list
                await fetchJobs();
                setOpenDropdownId(null);
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra',
                    text: 'Có lỗi xảy ra khi đóng công việc',
                    confirmButtonText: 'Đã hiểu',
                    confirmButtonColor: '#dc3545'
                });
            }
        } catch (error) {
            console.error('Error rejecting job:', error);
            MySwal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra',
                text: 'Có lỗi xảy ra khi đóng công việc',
                confirmButtonText: 'Đã hiểu',
                confirmButtonColor: '#dc3545'
            });
        }
    };

    const toggleDropdown = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleViewApplications = (jobId: number) => {
        setSelectedJobId(jobId);
        setShowApplicationsPopup(true);
    };

    // Check if dropdown should appear above instead of below
    const shouldDropUp = (index: number) => {
        return index >= Math.min(filteredJobs.length, ITEMS_PER_PAGE) - 2; // For the last two items on current page
    };

    // Render status badge based on status
    const renderStatusBadge = (job: JobPostingListItem) => {
        const status = getJobStatus(job);

        if (status === 'active') {
            return (
                <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]">
                        <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                        Hoạt động
                    </span>
                </div>
            );
        } else if (status === 'completed') {
            return (
                <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-1.5"></span>
                        Đã kết thúc
                    </span>
                </div>
            );
        } else if (status === 'pending') {
            return (
                <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600 border border-yellow-200">
                        <span className="w-2 h-2 bg-yellow-600 rounded-full mr-1.5"></span>
                        Chờ xử lý
                    </span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-1.5"></span>
                        Hết hạn
                    </span>
                </div>
            );
        }
    };

    // Render dropdown menu based on job status
    const renderDropdownMenu = (job: JobPostingListItem, index: number) => {
        const status = getJobStatus(job);

        return (
            <div className={`dropdown-menu absolute ${shouldDropUp(index) ? 'bottom-6' : 'top-6'} right-0 mt-2 w-48`}>
                {/* Đăng tuyển dụng - show if status is completed (CLOSED) or expired */}
                {(status === 'completed' || status === 'expired') && (
                    <div className="dropdown-item">
                        <RiAddCircleLine className="h-4 w-4" />
                        <span>Đăng tuyển dụng</span>
                    </div>
                )}

                {/* Kết thúc công việc - show if status is active (APPROVED) */}
                {status === 'active' && (
                    <div className="dropdown-item" onClick={() => handleCloseJob(job.id)}>
                        <RiCheckLine className="h-4 w-4" />
                        <span>Kết thúc công việc</span>
                    </div>
                )}

                {/* Đóng công việc - show if status is NOT expired and NOT pending (active or completed) */}
                {(status !== 'expired' && status !== 'pending') && (
                    <div className="dropdown-item" onClick={() => handleRejectJob(job.id)}>
                        <RiCloseLine className="h-4 w-4" />
                        <span>Đóng công việc</span>
                    </div>
                )}
            </div>
        );
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-700">
                    Công việc của tôi
                    <span className="text-gray-400 ml-2">({filteredJobs.length})</span>
                </h1>

                <div className="relative">
                    <select
                        value={selectedJobStatus}
                        onChange={(e) => setSelectedJobStatus(e.target.value)}
                        className="appearance-none bg-white border border-gray-200 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-600 text-sm"
                    >
                        <option>All Jobs</option>
                        <option>Active Jobs</option>
                        <option>Pending Jobs</option>
                        <option>Closed Jobs</option>
                        <option>Expired Jobs</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Công việc
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                STATUS
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                APPLICATIONS
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : currentJobs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Chưa có công việc nào
                                </td>
                            </tr>
                        ) : (
                            currentJobs.map((job, index) => (
                                <tr
                                    key={job.id}
                                    className="transition-all hover:border-[#309689] group"
                                    style={{ borderWidth: '1px', borderColor: 'transparent' }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-left group-hover:border-l-2 group-hover:border-l-[#309689]">
                                        <div className="text-sm font-medium text-gray-900 text-left">{job.title}</div>
                                        <div className="text-sm text-gray-500 text-left flex items-center">
                                            <RiTimeLine className="mr-1" />
                                            <span>
                                                {job.startTime && job.endTime ? `${formatTime(job.startTime)}-${formatTime(job.endTime)}` : 'Không xác định'}
                                            </span>
                                            <span className="mx-2">•</span>
                                            <span>{calculateRemainingTime(job.expiresAt)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left">
                                        {renderStatusBadge(job)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <RiUserLine className="mr-1.5 h-4 w-4 text-gray-400" />
                                            {job.applicationsCount} Ứng viên
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left flex items-center">
                                        <button
                                            className="view-profile-btn mr-3"
                                            onClick={() => handleViewApplications(job.id)}
                                        >
                                            Xem Hồ Sơ
                                        </button>
                                        <div className="dropdown-container relative">
                                            <button
                                                className="text-gray-400 hover:text-gray-500"
                                                onClick={(e) => toggleDropdown(job.id, e)}
                                            >
                                                <RiMore2Line className="h-5 w-5" />
                                            </button>

                                            {openDropdownId === job.id && renderDropdownMenu(job, index)}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination-container my-8">
                    <div
                        className={`pagination-arrow mr-2 ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {getPageNumbers().map((page) => (
                        <div
                            key={page}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page < 10 ? `0${page}` : page}
                        </div>
                    ))}

                    <div
                        className={`pagination-arrow ml-2 ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            )}

            {showApplicationsPopup && selectedJobId && (
                <JobApplicationsView jobId={selectedJobId} onClose={() => setShowApplicationsPopup(false)} />
            )}
        </div>
    );
};

export default MyJobsContent; 