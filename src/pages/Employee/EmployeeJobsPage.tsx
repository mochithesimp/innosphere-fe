import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoLocationOutline } from "react-icons/io5";

import Header from '../../components/Employee/Header';
import Sidebar from '../../components/Employee/Sidebar';
import RatingModal from '../../components/Employee/RatingModal';
import JobDetailModal from '../../components/Employee/JobDetailModal';
import { JobApplicationService, WorkerJobApplicationsResponse } from '../../services/jobApplicationService';
import { isJobApplicationRated } from '../../utils/ratingUtils';

// Job item interface for unified data structure
interface JobItem {
    id: string;
    title: string;
    location: string;
    hourlyRate: string;
    timeRange: string;
    date: string;
    sortDate: Date; // Add sortable date field
    status: {
        text: string;
        style: string;
        color: string;
    };
    action: {
        type: 'detail' | 'rating';
        text: string;
        employerName?: string;
    };
    companyInitial: string;
    companyColor: string;
    isFromAPI: boolean;
}

const EmployeeJobsPage: React.FC = () => {
    // State for managing the rating modal
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState({
        title: '',
        employer: '',
        jobApplicationId: 0,
        employerId: 0
    });
    const [ratedJobApplications, setRatedJobApplications] = useState<number[]>([]);

    // State for job detail modal
    const [isJobDetailModalOpen, setIsJobDetailModalOpen] = useState(false);
    const [selectedJobApplication, setSelectedJobApplication] = useState<WorkerJobApplicationsResponse['applications'][0] | null>(null);

    // State for job applications data
    const [apiJobApplications, setApiJobApplications] = useState<JobItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fullApiData, setFullApiData] = useState<WorkerJobApplicationsResponse | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjust as needed

    // State for mobile menu
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Static job data (keeping original static data)


    // Function to format time from API format to display format
    const formatTime = (startTime: string, endTime: string): string => {
        const formatSingleTime = (timeStr: string): string => {
            const date = new Date(timeStr);
            return date.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        };

        return `${formatSingleTime(startTime)}-${formatSingleTime(endTime)}`;
    };

    // Function to format date from API format to display format
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} tháng ${month}, ${year} ${hours}:${minutes}`;
    };

    // Function to get status info based on application and job posting status
    const getStatusInfo = (applicationStatus: string, jobPostingStatus: string) => {
        if (applicationStatus === 'PENDING') {
            return {
                text: 'Chờ xử lý',
                style: 'bg-yellow-100 text-yellow-600',
                color: '#d97706'
            };
        } else if (applicationStatus === 'REJECTED') {
            return {
                text: 'Đã từ chối',
                style: 'bg-red-100 text-red-600',
                color: '#dc2626'
            };
        } else if (applicationStatus === 'ACCEPTED') {
            if (jobPostingStatus === 'APPROVED') {
                return {
                    text: 'Hoạt động',
                    style: 'bg-[#EBF5F4] text-[#309689]',
                    color: '#309689'
                };
            } else if (jobPostingStatus === 'COMPLETED' || jobPostingStatus === 'CLOSED') {
                return {
                    text: 'Đã xong',
                    style: 'bg-[#EBF5F4] text-[#309689]',
                    color: '#309689'
                };
            }
        }

        // Default fallback
        return {
            text: 'Chờ xử lý',
            style: 'bg-yellow-100 text-yellow-600',
            color: '#d97706'
        };
    };

    // Function to get company initial and color
    const getCompanyInfo = (companyName: string) => {
        const initial = companyName.charAt(0).toUpperCase();
        const colors = ['#4CBB17', '#FF69B4', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981'];
        const colorIndex = companyName.charCodeAt(0) % colors.length;

        return {
            initial,
            color: colors[colorIndex]
        };
    };

    // Function to convert API data to JobItem format
    const convertAPIDataToJobItems = (apiData: WorkerJobApplicationsResponse): JobItem[] => {
        return apiData.applications.map((app) => {
            const statusInfo = getStatusInfo(app.status, app.jobPosting.status);
            const companyInfo = getCompanyInfo(app.jobPosting.companyName);

            // Determine action based on status
            let action: JobItem['action'];
            if (statusInfo.text === 'Đã xong') {
                action = {
                    type: 'rating',
                    text: 'Đánh Giá',
                    employerName: app.jobPosting.companyName
                };
            } else {
                action = {
                    type: 'detail',
                    text: 'Xem Chi Tiết'
                };
            }

            return {
                id: `api-${app.id}`,
                title: app.jobPosting.title,
                location: app.jobPosting.cityName,
                hourlyRate: `${app.jobPosting.hourlyRate.toLocaleString('vi-VN')}/Giờ`,
                timeRange: formatTime(app.jobPosting.startTime, app.jobPosting.endTime),
                date: formatDate(app.jobPosting.startTime),
                sortDate: new Date(app.jobPosting.startTime),
                status: statusInfo,
                action,
                companyInitial: companyInfo.initial,
                companyColor: companyInfo.color,
                isFromAPI: true
            };
        });
    };

    // Function to fetch job applications (extracted for reuse)
    const fetchJobApplications = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const apiData = await JobApplicationService.getWorkerApplications();
            setFullApiData(apiData); // Store the full API data
            const convertedAPIData = convertAPIDataToJobItems(apiData);
            setApiJobApplications(convertedAPIData);
        } catch (err) {
            console.error('Error fetching job applications:', err);
            setError('Failed to fetch job applications');
            setApiJobApplications([]); // Set empty array on error
            setFullApiData(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Load rated job applications from localStorage on component mount
    useEffect(() => {
        const ratedJobs = JSON.parse(localStorage.getItem('ratedJobApplications') || '[]');
        setRatedJobApplications(ratedJobs);
    }, []);

    // Fetch API data
    useEffect(() => {
        fetchJobApplications();
    }, []);

    // Combine API data (on top) with static data, sort by date (nearest first)

    const sortedJobData = apiJobApplications.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

    // Calculate pagination
    const totalItems = sortedJobData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = sortedJobData.slice(startIndex, endIndex);

    // Function to handle successful rating
    const handleRatingSuccess = (jobApplicationId: number) => {
        setRatedJobApplications(prev => {
            if (!prev.includes(jobApplicationId)) {
                return [...prev, jobApplicationId];
            }
            return prev;
        });
    };

    // Function to open rating modal with job details
    const openRatingModal = (jobTitle: string, employerName: string, jobApplicationId: number, employerId: number) => {
        setSelectedJob({
            title: jobTitle,
            employer: employerName,
            jobApplicationId: jobApplicationId,
            employerId: employerId
        });
        setIsRatingModalOpen(true);
    };

    // Function to open job detail modal
    const openJobDetailModal = (jobId: string) => {
        if (fullApiData) {
            // Find the job application by its ID (remove 'api-' prefix)
            const applicationId = parseInt(jobId.replace('api-', ''));
            const application = fullApiData.applications.find(app => app.id === applicationId);
            if (application) {
                setSelectedJobApplication(application);
                setIsJobDetailModalOpen(true);
            }
        }
    };

    // Function to handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Add direct styles with high specificity */}
            <style>
                {`
                    /* Button styles */
                    .rating-button-fixed {
                        background-color: #F1F2F4 !important;
                        color: #309689 !important;
                        padding: 6px 16px !important;
                        border-radius: 6px !important;
                        border: 1px solid #e0e1e3 !important;
                        font-size: 14px !important;
                        font-weight: 500 !important;
                        display: inline-block !important;
                        cursor: pointer !important;
                        text-decoration: none !important;
                        outline: none !important;
                        box-shadow: none !important;
                    }

                    /* Pagination styles with high specificity */
                    .pagination-container .page-button {
                        width: 32px;
                        height: 32px;
                        border-radius: 9999px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.2s;
                        border: none;
                        cursor: pointer;
                    }

                    .pagination-container .page-button.active {
                        background-color: #309689 !important;
                        color: white !important;
                    }

                    .pagination-container .page-button:not(.active) {
                        color: #6B7280;
                    }

                    .pagination-container .page-button:not(.active):hover {
                        background-color: #F3F4F6;
                    }

                    .pagination-container .arrow-button {
                        width: 32px;
                        height: 32px;
                        border-radius: 9999px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #E8F5F3;
                        border: none;
                        cursor: pointer;
                    }

                    .pagination-container .arrow-button:disabled {
                        background-color: #F3F4F6;
                        cursor: not-allowed;
                    }

                    .pagination-container .arrow-button svg {
                        width: 12px;
                        height: 12px;
                        color: #309689;
                    }

                    .pagination-container .arrow-button:disabled svg {
                        color: #9CA3AF;
                    }

                    @media (min-width: 768px) {
                        .pagination-container .page-button,
                        .pagination-container .arrow-button {
                            width: 40px;
                            height: 40px;
                        }

                        .pagination-container .arrow-button svg {
                            width: 16px;
                            height: 16px;
                        }
                    }
                `}
            </style>

            {/* Header component with bottom border */}
            <div className="w-full border-b border-gray-300">
                <Header />
            </div>

            <div className="flex flex-1 relative">
                {/* Mobile Menu Toggle Button */}
                <button
                    className="md:hidden fixed top-20 left-4 z-50 bg-[#309689] text-white p-2 rounded-md shadow-lg"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {/* <FaBars className="h-5 w-5" /> */}
                </button>

                {/* Sidebar component */}
                <div className="md:relative">
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                </div>

                {/* Main Content with white background */}
                <div className="flex-1 flex flex-col bg-white w-full">
                    {/* Jobs Content */}
                    <div className="flex-1 p-4 md:p-6 overflow-auto">
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h1 className="text-lg md:text-xl font-semibold">
                                Công việc đã nhận <span className="text-gray-500 font-normal text-base md:text-lg">({totalItems})</span>
                            </h1>
                        </div>

                        {/* Job Table */}
                        <div className="mb-4 md:mb-6">
                            {/* Job Table Header - Hide on mobile */}
                            <div className="hidden md:grid grid-cols-4 py-3 px-4 rounded-t-lg text-sm font-medium text-gray-600 bg-gray-100">
                                <div>Công việc</div>
                                <div>Ngày nhận</div>
                                <div>Trạng thái</div>
                                <div>Hành động</div>
                            </div>

                            {/* Job Items */}
                            <div className="bg-white rounded-lg shadow-sm">
                                {isLoading ? (
                                    <div className="py-8 text-center text-gray-500">
                                        Đang tải dữ liệu...
                                    </div>
                                ) : error ? (
                                    <div className="py-8 text-center text-red-500">
                                        {error}
                                    </div>
                                ) : currentPageData.length === 0 ? (
                                    <div className="py-8 text-center text-gray-500">
                                        Không có công việc nào
                                    </div>
                                ) : (
                                    currentPageData.map((job, jobIndex) => (
                                        <div key={job.id} className={`grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 items-start md:items-center py-4 px-4 hover:bg-gray-50 ${jobIndex < currentPageData.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                            <div className="flex items-start md:items-center">
                                                <div
                                                    className="p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex items-center justify-center w-10 h-10"
                                                    style={{ backgroundColor: job.companyColor }}
                                                >
                                                    <span className="text-white font-bold text-base md:text-lg">{job.companyInitial}</span>
                                                </div>
                                                <div className="text-left flex-1">
                                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                                        <h3 className="font-medium text-sm md:text-base truncate">{job.title}</h3>
                                                        <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3] inline-block md:inline whitespace-nowrap">
                                                            {job.timeRange}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1 flex items-center flex-wrap">
                                                        <IoLocationOutline className="mr-1 flex-shrink-0" />
                                                        <span>{job.location}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{job.hourlyRate}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Mobile-only date */}
                                            <div className="text-xs text-gray-500 md:hidden mt-2">{job.date}</div>

                                            {/* Desktop-only date */}
                                            <div className="hidden md:block text-sm text-gray-600">{job.date}</div>

                                            <div className="mt-2 md:mt-0">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status.style}`}>
                                                    <span
                                                        className="w-2 h-2 rounded-full mr-1.5"
                                                        style={{ backgroundColor: job.status.color }}
                                                    ></span>
                                                    {job.status.text}
                                                </span>
                                            </div>

                                            <div className="mt-3 md:mt-0">
                                                {job.action.type === 'rating' ? (
                                                    (() => {
                                                        let jobApplicationId = 0;
                                                        if (job.isFromAPI && fullApiData) {
                                                            const applicationId = parseInt(job.id.replace('api-', ''));
                                                            const application = fullApiData.applications.find(app => app.id === applicationId);
                                                            jobApplicationId = application?.id || 0;
                                                        }

                                                        const isRated = ratedJobApplications.includes(jobApplicationId) || isJobApplicationRated(jobApplicationId);

                                                        return (
                                                            <button
                                                                onClick={() => {
                                                                    if (!isRated) {
                                                                        if (job.isFromAPI && fullApiData) {
                                                                            const applicationId = parseInt(job.id.replace('api-', ''));
                                                                            const application = fullApiData.applications.find(app => app.id === applicationId);
                                                                            if (application) {
                                                                                openRatingModal(
                                                                                    job.title,
                                                                                    job.action.employerName || 'Unknown',
                                                                                    application.id,
                                                                                    application.jobPosting.employerId
                                                                                );
                                                                            }
                                                                        } else {
                                                                            openRatingModal(job.title, job.action.employerName || 'Unknown', 0, 0);
                                                                        }
                                                                    }
                                                                }}
                                                                className="rating-button-fixed w-full md:w-auto text-center"
                                                                disabled={isRated}
                                                                style={{
                                                                    backgroundColor: isRated ? '#9CA3AF' : '#F1F2F4',
                                                                    color: isRated ? '#6B7280' : '#309689',
                                                                    cursor: isRated ? 'not-allowed' : 'pointer',
                                                                    opacity: isRated ? 0.7 : 1
                                                                }}
                                                            >
                                                                {isRated ? 'Đã đánh giá' : job.action.text}
                                                            </button>
                                                        );
                                                    })()
                                                ) : (
                                                    <button
                                                        onClick={() => openJobDetailModal(job.id)}
                                                        className="rating-button-fixed w-full md:w-auto text-center"
                                                    >
                                                        {job.action.text}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination-container flex justify-center items-center gap-2 md:gap-6 mt-6 md:mt-8">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="arrow-button"
                                >
                                    <FaChevronLeft />
                                </button>

                                {getPageNumbers().map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`page-button ${pageNumber === currentPage ? 'active' : ''}`}
                                    >
                                        {pageNumber.toString().padStart(2, '0')}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="arrow-button"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white p-4 text-center text-gray-500 text-sm border-t border-gray-300 w-full">
                <p>© 2025 InnoSphere. All rights Reserved</p>
            </footer>

            {/* Modals */}
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                jobTitle={selectedJob.title}
                employerName={selectedJob.employer}
                jobApplicationId={selectedJob.jobApplicationId}
                employerId={selectedJob.employerId}
                onRatingSuccess={handleRatingSuccess}
            />

            <JobDetailModal
                isOpen={isJobDetailModalOpen}
                onClose={() => setIsJobDetailModalOpen(false)}
                jobApplication={selectedJobApplication}
                onStatusUpdate={fetchJobApplications}
            />
        </div>
    );
};

export default EmployeeJobsPage; 