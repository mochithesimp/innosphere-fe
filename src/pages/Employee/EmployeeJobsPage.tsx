import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoLocationOutline } from "react-icons/io5";

import Header from '../../components/Employee/Header';
import Sidebar from '../../components/Employee/Sidebar';
import RatingModal from '../../components/Employee/RatingModal';
import { JobApplicationService, WorkerJobApplicationsResponse } from '../../services/jobApplicationService';

// Job item interface for unified data structure
interface JobItem {
    id: string;
    title: string;
    location: string;
    hourlyRate: string;
    timeRange: string;
    date: string;
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

// Add CSS for the active pagination button and arrow icons
const paginationStyles = `
    .active-page-button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #35a79c;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
        border: none;
        cursor: pointer;
    }
    
    .pagination-arrow svg {
        color: #35a79c;
        width: 16px;
        height: 16px;
    }
`;

// Add CSS for buttons
const buttonStyles = `
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
`;

const EmployeeJobsPage: React.FC = () => {
    // State for managing the rating modal
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState({ title: '', employer: '' });

    // State for job applications data
    const [apiJobApplications, setApiJobApplications] = useState<JobItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjust as needed

    // Static job data (keeping original static data)
    const staticJobData: JobItem[] = [
        {
            id: 'static-1',
            title: 'Rửa chén',
            location: 'HCM',
            hourlyRate: '20.000/Giờ',
            timeRange: '13h00-16h00',
            date: '2 tháng 3, 2025 19:28',
            status: {
                text: 'Hoạt động',
                style: 'bg-[#EBF5F4] text-[#309689]',
                color: '#309689'
            },
            action: {
                type: 'detail',
                text: 'Xem Chi Tiết'
            },
            companyInitial: 'Up',
            companyColor: '#4CBB17',
            isFromAPI: false
        },
        {
            id: 'static-2',
            title: 'Bán rau má',
            location: 'HCM',
            hourlyRate: '20.000/Giờ',
            timeRange: '11h00-18h00',
            date: '8 tháng 3, 2025 09:30',
            status: {
                text: 'Đã xong',
                style: 'bg-[#EBF5F4] text-[#309689]',
                color: '#309689'
            },
            action: {
                type: 'rating',
                text: 'Đánh Giá',
                employerName: 'Di Bảy'
            },
            companyInitial: 'B',
            companyColor: '#FF69B4',
            isFromAPI: false
        },
        {
            id: 'static-3',
            title: 'Cắt bịch nước mắm',
            location: 'HCM',
            hourlyRate: '20.000/Giờ',
            timeRange: '7h00-13h00',
            date: '12 tháng 3, 2025 16:01',
            status: {
                text: 'Đã xong',
                style: 'bg-[#EBF5F4] text-[#309689]',
                color: '#309689'
            },
            action: {
                type: 'rating',
                text: 'Đánh Giá',
                employerName: 'Di Bảy'
            },
            companyInitial: 'C',
            companyColor: 'black',
            isFromAPI: false
        },
        {
            id: 'static-4',
            title: 'Bán đậu hũ',
            location: 'HCM',
            hourlyRate: '20.000/Giờ',
            timeRange: '9h00-15h00',
            date: '21 tháng 3, 2025 11:00',
            status: {
                text: 'Đã xong',
                style: 'bg-[#EBF5F4] text-[#309689]',
                color: '#309689'
            },
            action: {
                type: 'rating',
                text: 'Đánh Giá',
                employerName: 'Di Bảy'
            },
            companyInitial: 'B',
            companyColor: '#ccc',
            isFromAPI: false
        },
        {
            id: 'static-5',
            title: 'Bán giò heo chiên nước mắm',
            location: 'HCM',
            hourlyRate: '20.000/Giờ',
            timeRange: '13h00-18h00',
            date: '2 tháng 4, 2025 19:28',
            status: {
                text: 'Hoạt động',
                style: 'bg-[#EBF5F4] text-[#309689]',
                color: '#309689'
            },
            action: {
                type: 'detail',
                text: 'Xem Chi Tiết'
            },
            companyInitial: 'B',
            companyColor: '#3B82F6',
            isFromAPI: false
        },
        {
            id: 'static-6',
            title: 'Thiết kế UI/UX',
            location: 'HCM',
            hourlyRate: '20.000/Giờ',
            timeRange: '19h00-23h00',
            date: '3 tháng 4, 2025 15:28',
            status: {
                text: 'Hoạt động',
                style: 'bg-[#EBF5F4] text-[#309689]',
                color: '#309689'
            },
            action: {
                type: 'detail',
                text: 'Xem Chi Tiết'
            },
            companyInitial: 'T',
            companyColor: '#2563EB',
            isFromAPI: false
        }
    ];

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
                text: 'Từ chối',
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
            } else if (jobPostingStatus === 'COMPLETED') {
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
                status: statusInfo,
                action,
                companyInitial: companyInfo.initial,
                companyColor: companyInfo.color,
                isFromAPI: true
            };
        });
    };

    // Fetch API data
    useEffect(() => {
        const fetchJobApplications = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const apiData = await JobApplicationService.getWorkerApplications();
                const convertedAPIData = convertAPIDataToJobItems(apiData);
                setApiJobApplications(convertedAPIData);
            } catch (err) {
                console.error('Error fetching job applications:', err);
                setError('Failed to fetch job applications');
                setApiJobApplications([]); // Set empty array on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobApplications();
    }, []);

    // Combine API data (on top) with static data
    const allJobData = [...apiJobApplications, ...staticJobData];

    // Calculate pagination
    const totalItems = allJobData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = allJobData.slice(startIndex, endIndex);

    // Function to open rating modal with job details
    const openRatingModal = (jobTitle: string, employerName: string) => {
        setSelectedJob({ title: jobTitle, employer: employerName });
        setIsRatingModalOpen(true);
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
            {/* Add the CSS styles */}
            <style>{paginationStyles}</style>
            <style>{buttonStyles}</style>

            {/* Header component with bottom border */}
            <div className="w-full border-b border-gray-300">
                <Header />
            </div>

            <div className="flex flex-1">
                {/* Sidebar component with right border */}
                <div className="border-r border-gray-300">
                    <Sidebar />
                </div>

                {/* Main Content with white background */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Jobs Content */}
                    <div className="flex-1 p-6 overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold">Công việc đã nhận <span className="text-gray-500 font-normal text-lg">({totalItems})</span></h1>
                        </div>

                        {/* Job Table */}
                        <div className="mb-6">
                            {/* Job Table Header */}
                            <div className="bg-gray-100 grid grid-cols-4 py-3 px-4 rounded-t-lg text-sm font-medium text-gray-600">
                                <div>Công việc</div>
                                <div>Ngày nhận</div>
                                <div>Trạng thái</div>
                                <div>Hành động</div>
                            </div>

                            {/* Job Items */}
                            <div className="bg-white rounded-b-lg shadow-sm">
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
                                        <div key={job.id} className={`grid grid-cols-4 items-center py-4 px-4 hover:bg-gray-50 ${jobIndex < currentPageData.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                            <div className="flex items-center">
                                                <div
                                                    className="p-3 rounded-lg mr-4 flex items-center justify-center w-10 h-10"
                                                    style={{ backgroundColor: job.companyColor }}
                                                >
                                                    <span className="text-white font-bold text-lg">{job.companyInitial}</span>
                                                </div>
                                                <div className="text-left overflow-hidden">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-medium truncate">{job.title}</h3>
                                                        <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3] whitespace-nowrap">
                                                            {job.timeRange}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                        <IoLocationOutline className="mr-1 flex-shrink-0" />
                                                        <span>{job.location}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{job.hourlyRate}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-600">{job.date}</div>
                                            <div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status.style}`}>
                                                    <span
                                                        className="w-2 h-2 rounded-full mr-1.5"
                                                        style={{ backgroundColor: job.status.color }}
                                                    ></span>
                                                    {job.status.text}
                                                </span>
                                            </div>
                                            <div>
                                                {job.action.type === 'rating' ? (
                                                    <button
                                                        onClick={() => openRatingModal(job.title, job.action.employerName || 'Unknown')}
                                                        className="rating-button-fixed"
                                                    >
                                                        {job.action.text}
                                                    </button>
                                                ) : (
                                                    <a href="#" className="detail-button" style={{
                                                        backgroundColor: '#F1F2F4',
                                                        color: '#309689',
                                                        padding: '6px 16px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #e0e1e3',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        display: 'inline-block',
                                                        textDecoration: 'none'
                                                    }}>
                                                        {job.action.text}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-6 mt-8">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: currentPage === 1 ? '#f3f4f6' : '#e9f5f3',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: 'none',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <FaChevronLeft style={{
                                        color: currentPage === 1 ? '#9ca3af' : '#35a79c',
                                        width: '16px',
                                        height: '16px'
                                    }} />
                                </button>

                                {getPageNumbers().map((pageNumber) => (
                                    pageNumber === currentPage ? (
                                        <div
                                            key={pageNumber}
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '50%',
                                                backgroundColor: '#35a79c',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {pageNumber.toString().padStart(2, '0')}
                                        </div>
                                    ) : (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className="flex items-center justify-center text-gray-500 font-medium text-sm hover:text-gray-700"
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '50%',
                                                border: 'none',
                                                cursor: 'pointer',
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                            {pageNumber.toString().padStart(2, '0')}
                                        </button>
                                    )
                                ))}

                                <button
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: currentPage === totalPages ? '#f3f4f6' : '#e9f5f3',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: 'none',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <FaChevronRight style={{
                                        color: currentPage === totalPages ? '#9ca3af' : '#35a79c',
                                        width: '16px',
                                        height: '16px'
                                    }} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer with top border that spans full width */}
            <footer className="bg-white p-4 text-center text-gray-500 text-sm border-t border-gray-300 w-full">
                <p>© 2025 InnoSphere. All rights Reserved</p>
            </footer>

            {/* Rating Modal */}
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                jobTitle={selectedJob.title}
                employerName={selectedJob.employer}
            />
        </div>
    );
};

export default EmployeeJobsPage; 