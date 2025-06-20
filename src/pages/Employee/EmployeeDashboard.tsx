import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegBookmark, FaChevronRight } from 'react-icons/fa';
import { HiOutlineBriefcase } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import Swal from 'sweetalert2';

import Header from '../../components/Employee/Header';
import Sidebar from '../../components/Employee/Sidebar';
import JobDetailModal from '../../components/Employee/JobDetailModal';
import RatingModal from '../../components/Employee/RatingModal';
import { WorkerService } from '../../services';
import { JobApplicationService, WorkerJobApplicationsResponse } from '../../services/jobApplicationService';
import { isJobApplicationRated } from '../../utils/ratingUtils';

import { IoLocationOutline } from "react-icons/io5";

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
    jobPostingId?: number; // Add this to store the job posting ID for modal
}

const EmployeeDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [hasProfile, setHasProfile] = useState<boolean>(false);
    const [profileLoading, setProfileLoading] = useState<boolean>(true);

    // State for job applications data
    const [apiJobApplications, setApiJobApplications] = useState<JobItem[]>([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiData, setApiData] = useState<WorkerJobApplicationsResponse | null>(null);
    const [selectedJobApplication, setSelectedJobApplication] = useState<WorkerJobApplicationsResponse['applications'][0] | null>(null);

    // State for managing the rating modal
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState({
        title: '',
        employer: '',
        jobApplicationId: 0,
        employerId: 0
    });
    const [ratedJobApplications, setRatedJobApplications] = useState<number[]>([]);

    // Function to open job detail modal
    const openJobDetailModal = (jobPostingId: number) => {
        console.log('🔍 Opening job detail modal for job posting ID:', jobPostingId);

        // Find the job application by jobPostingId
        if (apiData) {
            const jobApp = apiData.applications.find(app => app.jobPosting.id === jobPostingId);
            if (jobApp) {
                setSelectedJobApplication(jobApp);
                setIsModalOpen(true);
            }
        }
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJobApplication(null);
    };

    // Rating functions
    const handleRatingSuccess = (jobApplicationId: number) => {
        console.log('🌟 Rating success for application:', jobApplicationId);
        setRatedJobApplications(prev => [...prev, jobApplicationId]);
        setIsRatingModalOpen(false);
    };

    const openRatingModal = (jobTitle: string, employerName: string, jobApplicationId: number, employerId: number) => {
        setSelectedJob({
            title: jobTitle,
            employer: employerName,
            jobApplicationId,
            employerId
        });
        setIsRatingModalOpen(true);
    };

    // Static job data (keeping original static data)
    const staticJobData: JobItem[] = [
        {
            id: 'static-1',
            title: 'Rửa chén',
            location: 'HCM',
            hourlyRate: '20.000/Giờ',
            timeRange: '13h00-18h00',
            date: '2 tháng 3, 2025 19:28',
            sortDate: new Date('2025-03-02T19:28:00'),
            status: {
                text: 'Hoạt động',
                style: 'bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]',
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
            title: 'Sửa ống nước',
            location: 'HCM',
            hourlyRate: '20.000/Giờ',
            timeRange: '10h00-15h00',
            date: '3 tháng 3, 2025 23:26',
            sortDate: new Date('2025-03-03T23:26:00'),
            status: {
                text: 'Hoạt động',
                style: 'bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]',
                color: '#309689'
            },
            action: {
                type: 'detail',
                text: 'Xem Chi Tiết'
            },
            companyInitial: 'S',
            companyColor: '#FF69B4',
            isFromAPI: false
        },
        {
            id: 'static-3',
            title: 'Làm thumbnail',
            location: 'HCM',
            hourlyRate: '25.000/Giờ',
            timeRange: '7h00-13h00',
            date: '12 tháng 3, 2025 19:28',
            sortDate: new Date('2025-03-12T19:28:00'),
            status: {
                text: 'Hoạt động',
                style: 'bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]',
                color: '#309689'
            },
            action: {
                type: 'detail',
                text: 'Xem Chi Tiết'
            },
            companyInitial: 'T',
            companyColor: 'black',
            isFromAPI: false
        },
        {
            id: 'static-4',
            title: 'Vẽ 3D',
            location: 'HCM',
            hourlyRate: '28.000/Giờ',
            timeRange: '9h00-16h00',
            date: '11 tháng 3, 2025 23:26',
            sortDate: new Date('2025-03-11T23:26:00'),
            status: {
                text: 'Hoạt động',
                style: 'bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]',
                color: '#309689'
            },
            action: {
                type: 'detail',
                text: 'Xem Chi Tiết'
            },
            companyInitial: 'V',
            companyColor: '#ccc',
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

    // Function to get status info based on application and job posting status (updated to match Employee Jobs page)
    const getStatusInfo = (applicationStatus: string, jobPostingStatus: string) => {
        if (applicationStatus === 'PENDING') {
            return {
                text: 'Chờ xử lý',
                style: 'bg-yellow-100 text-yellow-600 border border-yellow-200',
                color: '#d97706'
            };
        } else if (applicationStatus === 'REJECTED') {
            return {
                text: 'Đã từ chối',
                style: 'bg-red-100 text-red-600 border border-red-200',
                color: '#dc2626'
            };
        } else if (applicationStatus === 'ACCEPTED') {
            // Show "Hoạt động" for ACCEPTED applications with APPROVED job posting
            if (jobPostingStatus === 'APPROVED') {
                return {
                    text: 'Hoạt động',
                    style: 'bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]',
                    color: '#309689'
                };
            }
            // Show "Đã xong" for ACCEPTED applications with COMPLETED or CLOSED job posting
            else if (jobPostingStatus === 'COMPLETED' || jobPostingStatus === 'CLOSED') {
                return {
                    text: 'Đã xong',
                    style: 'bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]',
                    color: '#309689'
                };
            }
        }

        // Default fallback
        return {
            text: 'Chờ xử lý',
            style: 'bg-yellow-100 text-yellow-600 border border-yellow-200',
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
                isFromAPI: true,
                jobPostingId: app.jobPosting.id
            };
        });
    };

    // Check if worker profile exists (just check if API doesn't return 404)
    useEffect(() => {
        const checkWorkerProfile = async () => {
            try {
                setProfileLoading(true);
                const profile = await WorkerService.getWorkerProfile();

                // If we get any profile data back (no 404), hide the alert
                setHasProfile(!!profile);
                console.log('📋 Worker profile check:', {
                    hasProfile: !!profile,
                    profile: profile
                });
            } catch (error) {
                console.error('Error checking worker profile:', error);

                // If there's a 404 error, show SweetAlert to complete profile
                if (error && typeof error === 'object' && 'response' in error) {
                    const axiosError = error as { response?: { status?: number } };
                    console.log('Error status:', axiosError.response?.status);

                    if (axiosError.response?.status === 404) {
                        console.log('404 detected, showing SweetAlert');
                        Swal.fire({
                            title: 'Hồ sơ chưa hoàn tất',
                            text: 'Vui lòng hoàn tất hồ sơ của bạn để sử dụng đầy đủ tính năng.',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Hoàn tất hồ sơ',
                            cancelButtonText: 'Để sau',
                            confirmButtonColor: '#309689',
                            cancelButtonColor: '#6b7280'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/employee/settings');
                            }
                        });
                    }
                }

                setHasProfile(false);
            } finally {
                setProfileLoading(false);
            }
        };

        checkWorkerProfile();
    }, [navigate]);

    // Function to fetch job applications (extracted for reuse)
    const fetchJobApplications = async () => {
        try {
            setIsLoadingJobs(true);

            const apiData = await JobApplicationService.getWorkerApplications();
            setApiData(apiData); // Store the API data for modal use
            const convertedAPIData = convertAPIDataToJobItems(apiData);
            setApiJobApplications(convertedAPIData);
        } catch (err) {
            console.error('Error fetching job applications:', err);
            setApiJobApplications([]); // Set empty array on error
        } finally {
            setIsLoadingJobs(false);
        }
    };

    // Fetch API data for jobs
    useEffect(() => {
        fetchJobApplications();
    }, []);

    // Combine API data (on top) with static data, sort by date (nearest first), limit to 4 items
    const allJobData = [...apiJobApplications, ...staticJobData];
    const sortedJobData = allJobData.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
    const displayedJobs = sortedJobData.slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
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
                    {/* Dashboard Content */}
                    <div className="flex-1 p-6 overflow-auto">
                        <div className="mb-8 text-left">
                            <h1 className="text-xl font-semibold">Hello, Anh Vũ Lê</h1>
                            <p className="text-gray-600 text-sm">Đây là các hoạt động hàng ngày và thông báo công việc của bạn</p>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Jobs Applied Card */}
                            <div style={{ backgroundColor: '#E7F0FA' }} className="rounded-lg p-5 flex items-center justify-between">
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold mb-1">589</h2>
                                    <p className="text-gray-600 text-sm">Công Việc đã nhận</p>
                                </div>
                                <div style={{ backgroundColor: 'white' }} className="p-3 rounded-lg shadow-sm">
                                    <HiOutlineBriefcase style={{ color: '#0A65CC' }} className="h-6 w-6" />
                                </div>
                            </div>

                            {/* Favorite Jobs Card */}
                            <div style={{ backgroundColor: '#FFF6E6' }} className="rounded-lg p-5 flex items-center justify-between">
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold mb-1">238</h2>
                                    <p className="text-gray-600 text-sm">Công Việc yêu thích</p>
                                </div>
                                <div style={{ backgroundColor: 'white' }} className="p-3 rounded-lg shadow-sm">
                                    <FaRegBookmark style={{ color: '#FFA500' }} className="h-6 w-6" />
                                </div>
                            </div>

                            {/* Job Alerts Card */}
                            <div style={{ backgroundColor: '#E7F6EA' }} className="rounded-lg p-5 flex items-center justify-between">
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold mb-1">574</h2>
                                    <p className="text-gray-600 text-sm">Cảnh báo công việc</p>
                                </div>
                                <div style={{ backgroundColor: 'white' }} className="p-3 rounded-lg shadow-sm">
                                    <FiBell style={{ color: '#0BA02C' }} className="h-6 w-6" />
                                </div>
                            </div>
                        </div>

                        {/* Profile Completion Alert - Only show if profile is incomplete */}
                        {profileLoading ? (
                            <div className="bg-gray-100 rounded-lg p-6 mb-8 animate-pulse">
                                <div className="flex justify-between items-center">
                                    <div className="text-left">
                                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                                    </div>
                                    <div className="h-10 bg-gray-300 rounded w-32"></div>
                                </div>
                            </div>
                        ) : !hasProfile ? (
                            <div className="bg-red-500 text-white rounded-lg p-6 mb-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-left">
                                        <h3 className="text-xl font-semibold mb-1">Việc chỉnh sửa hồ sơ của bạn chưa hoàn tất.</h3>
                                        <p className="text-sm opacity-90">Hoàn thiện việc chỉnh sửa hồ sơ của bạn và xây dựng Sơ yếu lý lịch tùy chỉnh của bạn</p>
                                    </div>
                                    <Link to="/employee/settings" className="bg-white font-medium px-4 py-2 rounded-lg flex items-center">
                                        <span style={{ color: '#E05151' }}>Chỉnh Sửa Hồ Sơ</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="#E05151">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ) : null}

                        {/* Recent Jobs Section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold">Công việc đã nhận gần đây</h2>
                                <Link to="/employee/all-jobs" className="text-gray-600 text-sm flex items-center">
                                    Tất cả
                                    <FaChevronRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>

                            {/* Job Table Header */}
                            <div className="bg-gray-100 grid grid-cols-4 py-3 px-4 rounded-t-lg text-sm font-medium text-gray-600">
                                <div>Công việc</div>
                                <div>Ngày nhận</div>
                                <div>Trạng thái</div>
                                <div>Hành động</div>
                            </div>

                            {/* Style for buttons - separate from tailwind */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                    button.detail-button {
                                        background-color: #EBF5F4 !important;
                                        color: #309689 !important;
                                        padding: 6px 16px !important;
                                        border-radius: 6px !important;
                                        border: 1px solid #d0e6e3 !important;
                                        font-size: 14px !important;
                                        font-weight: 500 !important;
                                        cursor: pointer !important;
                                        display: inline-block !important;
                                        text-decoration: none !important;
                                        outline: none !important;
                                        box-shadow: none !important;
                                    }
                                    button.detail-button:hover {
                                        background-color: #dfeeed !important;
                                        color: #309689 !important;
                                    }
                                    button.detail-button:focus {
                                        background-color: #EBF5F4 !important;
                                        color: #309689 !important;
                                        outline: none !important;
                                    }
                                    button.detail-button:disabled {
                                        cursor: not-allowed !important;
                                    }
                                `
                            }} />

                            {/* Job Items */}
                            <div className="bg-white rounded-b-lg shadow-sm">
                                {isLoadingJobs ? (
                                    <div className="py-8 text-center text-gray-500">
                                        Đang tải dữ liệu...
                                    </div>
                                ) : displayedJobs.length === 0 ? (
                                    <div className="py-8 text-center text-gray-500">
                                        Không có công việc nào
                                    </div>
                                ) : (
                                    displayedJobs.map((job, jobIndex) => (
                                        <div key={job.id} className={`grid grid-cols-4 items-center py-4 px-4 hover:bg-gray-50 rounded-lg my-2 ${jobIndex < displayedJobs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                            <div className="flex items-center">
                                                <div
                                                    className="p-3 rounded-lg mr-4 flex items-center justify-center w-12 h-12"
                                                    style={{ backgroundColor: job.companyColor }}
                                                >
                                                    <span className="text-white font-bold text-lg">{job.companyInitial}</span>
                                                </div>
                                                <div className="text-left">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-medium">{job.title}</h3>
                                                        <span className="text-xs bg-[#EBF5F4] text-[#309689] px-2 py-0.5 rounded-md border border-[#d0e6e3]">
                                                            {job.timeRange}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                        <IoLocationOutline className="mr-1" />
                                                        <span>{job.location}</span>
                                                        <span className="mx-2">•</span>
                                                        <span className="flex items-center">
                                                            <span>{job.hourlyRate}</span>
                                                        </span>
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
                                                    (() => {
                                                        let jobApplicationId = 0;
                                                        if (job.isFromAPI && apiData) {
                                                            const applicationId = parseInt(job.id.replace('api-', ''));
                                                            const application = apiData.applications.find(app => app.id === applicationId);
                                                            jobApplicationId = application?.id || 0;
                                                        }

                                                        const isRated = ratedJobApplications.includes(jobApplicationId) || isJobApplicationRated(jobApplicationId);

                                                        return (
                                                            <button
                                                                onClick={() => {
                                                                    if (!isRated) {
                                                                        if (job.isFromAPI && apiData) {
                                                                            const applicationId = parseInt(job.id.replace('api-', ''));
                                                                            const application = apiData.applications.find(app => app.id === applicationId);
                                                                            if (application) {
                                                                                openRatingModal(
                                                                                    job.title,
                                                                                    job.action.employerName || 'Unknown',
                                                                                    application.id,
                                                                                    application.jobPosting.employerId
                                                                                );
                                                                            }
                                                                        }
                                                                    }
                                                                }}
                                                                className="detail-button"
                                                                disabled={isRated}
                                                                style={{
                                                                    backgroundColor: isRated ? '#9CA3AF' : '#EBF5F4',
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
                                                        className="detail-button"
                                                        onClick={() => job.jobPostingId && openJobDetailModal(job.jobPostingId)}
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
                    </div>
                </div>
            </div>

            {/* Job Detail Modal */}
            <JobDetailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                jobApplication={selectedJobApplication}
                onStatusUpdate={fetchJobApplications}
            />

            {/* Rating Modal */}
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                jobTitle={selectedJob.title}
                employerName={selectedJob.employer}
                jobApplicationId={selectedJob.jobApplicationId}
                employerId={selectedJob.employerId}
                onRatingSuccess={handleRatingSuccess}
            />

            {/* Footer with top border that spans full width */}
            <footer className="bg-white p-4 text-center text-gray-500 text-sm border-t border-gray-300 w-full">
                <p>© 2025 InnoSphere. All rights Reserved</p>
            </footer>
        </div>
    );
};

export default EmployeeDashboard; 