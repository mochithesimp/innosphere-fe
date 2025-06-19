import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiHome2Line, RiEditLine, RiDeleteBinLine, RiMoreFill, RiCloseLine } from 'react-icons/ri';
import ApplicantPopup from './ApplicantPopup';
import { JobApplicationService, WorkerJobApplicationsResponse } from '../../../services/jobApplicationService';

// Define the Applicant type
interface Applicant {
    id: number;
    name: string;
    position: string;
    experience: string;
    education: string;
    applicationDate: string;
    coverNote?: string;
    // Enhanced API worker profile data (optional - fallback to hardcoded if null/empty)
    workerProfile?: {
        fullName?: string;
        bio?: string;
        dateOfBirth?: string;
        nationality?: string;
        maritalStatus?: string;
        gender?: string;
        personalWebsite?: string;
        contactLocation?: string;
        phoneNumber?: string;
        email?: string;
        experience?: string;
        education?: string;
    };
    resumeTitle?: string;
    isFromAPI?: boolean; // Flag to identify API data
    applicationId?: number; // Job application ID for API calls
    applicationStatus?: string; // Current application status
    jobPostingStatus?: string; // Job posting status (OPEN, CLOSED, etc.)
    workerId?: number; // The actual worker ID from the API
}

// Props interface for JobApplicationsView
interface JobApplicationsViewProps {
    jobId?: number;
    onClose?: () => void;
}

const JobApplicationsView: React.FC<JobApplicationsViewProps> = ({ jobId, onClose }) => {
    const [sortOption, setSortOption] = useState<string>('Mới nhất');
    const [filterActive, setFilterActive] = useState<boolean>(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [apiApplicants, setApiApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(false);

    // Function to format date from API format to display format
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    // Function to convert API data to Applicant format
    const convertAPIDataToApplicants = (apiData: WorkerJobApplicationsResponse): Applicant[] => {
        return apiData.applications.map((app) => ({
            id: app.id,
            name: app.workerName,
            position: app.jobTitle,
            experience: app.workerProfile?.experience || 'Không có kinh nghiệm',
            education: app.workerProfile?.education || 'Không có học vấn',
            applicationDate: formatDate(app.appliedAt),
            coverNote: app.coverNote,
            resumeTitle: app.resumeTitle,
            isFromAPI: true,
            applicationId: app.id, // Job application ID for API calls
            applicationStatus: app.status, // Current application status
            jobPostingStatus: app.jobPosting.status, // Job posting status
            workerId: app.workerId, // Worker ID for rating
            workerProfile: app.workerProfile ? {
                fullName: app.workerProfile.fullName,
                bio: app.workerProfile.bio,
                dateOfBirth: app.workerProfile.dateOfBirth ? formatDate(app.workerProfile.dateOfBirth) : undefined,
                nationality: app.workerProfile.nationality,
                maritalStatus: app.workerProfile.maritalStatus,
                gender: app.workerProfile.gender,
                personalWebsite: app.workerProfile.personalWebsite,
                contactLocation: app.workerProfile.contactLocation,
                phoneNumber: app.workerProfile.phoneNumber,
                email: app.workerProfile.email,
                experience: app.workerProfile.experience,
                education: app.workerProfile.education,
            } : undefined
        }));
    };

    // Fetch API data when jobId is provided
    useEffect(() => {
        if (jobId) {
            const fetchJobApplications = async () => {
                try {
                    setLoading(true);
                    const apiData = await JobApplicationService.getEmployerJobApplications(jobId);
                    const convertedAPIData = convertAPIDataToApplicants(apiData);
                    setApiApplicants(convertedAPIData);
                } catch (err) {
                    console.error('Error fetching job applications:', err);
                    setApiApplicants([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchJobApplications();
        }
    }, [jobId]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setFilterActive(false);
            }

            if (openMenuId && menuRefs.current[openMenuId] && !menuRefs.current[openMenuId]?.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuId]);

    // Toggle dropdown menu
    const toggleMenu = (id: string) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // Register menu ref
    const setMenuRef = (id: string, el: HTMLDivElement | null) => {
        menuRefs.current[id] = el;
    };

    // Open applicant popup
    const handleApplicantClick = (applicant: Applicant) => {
        setSelectedApplicant(applicant);
        setIsPopupOpen(true);
    };

    // Close applicant popup
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedApplicant(null);
    };

    // Handle applicant hire action
    const handleHireApplicant = async (applicantId: number) => {
        // Update the local state to reflect the change immediately
        setApiApplicants(prevApplicants =>
            prevApplicants.map(applicant =>
                applicant.id === applicantId
                    ? { ...applicant, applicationStatus: 'ACCEPTED' }
                    : applicant
            )
        );

        // Also update the selected applicant if it matches
        if (selectedApplicant && selectedApplicant.id === applicantId) {
            setSelectedApplicant({
                ...selectedApplicant,
                applicationStatus: 'ACCEPTED'
            });
        }

        // Optionally refresh data from server
        if (jobId) {
            try {
                const apiData = await JobApplicationService.getEmployerJobApplications(jobId);
                const convertedAPIData = convertAPIDataToApplicants(apiData);
                setApiApplicants(convertedAPIData);
            } catch (err) {
                console.error('Error refreshing job applications:', err);
            }
        }
    };

    // Sample data for applicants
    const allApplicants: Applicant[] = [
        {
            id: 1,
            name: 'Lê Thanh Vũ',
            position: 'UI/UX Designer',
            experience: '7 năm',
            education: 'Học vấn: tốt nghiệp MIT',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 2,
            name: 'Vũ Lê',
            position: 'UI/UX Designer',
            experience: '7 năm',
            education: 'Học vấn: tốt nghiệp Harvard',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 3,
            name: 'Mochi',
            position: 'Product Designer',
            experience: '7 năm',
            education: 'Học vấn: High School Degree',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 4,
            name: 'Anh Vũ Lê',
            position: 'User Experience Designer',
            experience: '7 năm',
            education: 'Học vấn: Master Degree',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 5,
            name: 'Vũ Lê Thanh',
            position: 'UI/UX Designer',
            experience: '7 năm',
            education: 'Học vấn: tốt nghiệp Stanford',
            applicationDate: 'Jan 23, 2025'
        }
    ];

    // For the right column, just the first two applicants
    const selectedApplicants: Applicant[] = [
        {
            id: 1,
            name: 'Vũ Lê',
            position: 'UI/UX Designer',
            experience: '7 năm',
            education: 'Học vấn: tốt nghiệp Harvard',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 2,
            name: 'Mochi The Simp',
            position: 'UI Designer',
            experience: '7 năm',
            education: 'Học vấn: Bachelor Degree',
            applicationDate: 'Jan 23, 2025'
        }
    ];

    // Combine API data (on top) with static data for "Tất cả" column
    const combinedApplicants = [...apiApplicants, ...allApplicants];

    // Render applicant card in the Tất cả column
    const renderApplicantCard = (applicant: Applicant) => {
        const handleHireClick = async (e: React.MouseEvent) => {
            e.stopPropagation(); // Prevent opening the popup
            if (applicant.applicationId && applicant.applicationStatus !== 'ACCEPTED') {
                await handleHireApplicant(applicant.id);
            }
        };

        // Debug log for card rendering
        if (applicant.isFromAPI) {
            console.log(`Card - Applicant ${applicant.name}:`, {
                applicationStatus: applicant.applicationStatus,
                jobPostingStatus: applicant.jobPostingStatus,
                showRatingButton: applicant.applicationStatus === 'ACCEPTED' && applicant.jobPostingStatus === 'CLOSED'
            });
        }

        return (
            <div
                key={applicant.id}
                className="bg-white rounded-lg shadow border border-gray-200 mb-4 text-left cursor-pointer hover:border-[#309689]"
                onClick={() => handleApplicantClick(applicant)}
            >
                <div className="p-4">
                    <div className="flex items-start">
                        {/* Blank Avatar */}
                        <div className="mr-3">
                            <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                        </div>

                        {/* Name and Title */}
                        <div className="flex-1 text-left">
                            <h3 className="text-base font-medium text-gray-900 text-left">{applicant.name}</h3>
                            <p className="text-sm text-gray-500 text-left">{applicant.position}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Experience & Details - Modified to show coverNote for API data */}
                <div className="p-4 text-left">
                    <ul className="text-sm text-gray-500 space-y-1 text-left">
                        {applicant.coverNote ? (
                            // API data - show coverNote with bullet points
                            <li className="text-left">• {applicant.coverNote}</li>
                        ) : (
                            // Static data - show traditional format
                            <>
                                <li className="text-left">• Kinh nghiệm: {applicant.experience}</li>
                                <li className="text-left">• {applicant.education}</li>
                            </>
                        )}
                        <li className="text-left">• Ngày nộp: {applicant.applicationDate}</li>
                    </ul>

                    <div className="flex justify-between items-center mt-3">
                        <button className="text-[#309689] text-sm font-medium flex items-center hover:underline text-left">
                            <svg className="w-4 h-4 mr-1" style={{ color: "#309689" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 14V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 15L12 3" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 7L12 3L16 7" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[#309689]">Download CV</span>
                        </button>

                        {/* Status-based hire button for API applicants */}
                        {applicant.isFromAPI && (
                            <div>
                                {applicant.applicationStatus === 'ACCEPTED' && applicant.jobPostingStatus === 'CLOSED' ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle rating action - you can implement this
                                            console.log('Open rating for applicant:', applicant.id);
                                        }}
                                        className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-md transition-colors"
                                    >
                                        Đánh giá ứng viên
                                    </button>
                                ) : applicant.applicationStatus === 'ACCEPTED' ? (
                                    <button
                                        className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md cursor-not-allowed"
                                        disabled
                                    >
                                        Đã thuê
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleHireClick}
                                        className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-md transition-colors"
                                    >
                                        Thuê ứng viên
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Render applicant card in the Chọn lọc column
    const renderSelectedApplicantCard = (applicant: Applicant) => {
        const handleHireClick = async (e: React.MouseEvent) => {
            e.stopPropagation(); // Prevent opening the popup
            if (applicant.applicationId && applicant.applicationStatus !== 'ACCEPTED') {
                await handleHireApplicant(applicant.id);
            }
        };

        return (
            <div
                key={applicant.id}
                className="bg-white rounded-lg shadow border border-gray-200 mb-4 text-left cursor-pointer hover:border-[#309689]"
                onClick={() => handleApplicantClick(applicant)}
            >
                <div className="p-4">
                    <div className="flex items-start">
                        {/* Blank Avatar */}
                        <div className="mr-3">
                            <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                        </div>

                        {/* Name and Title */}
                        <div className="flex-1 text-left">
                            <h3 className="text-base font-medium text-gray-900 text-left">{applicant.name}</h3>
                            <p className="text-sm text-gray-500 text-left">{applicant.position}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Experience & Details */}
                <div className="p-4 text-left">
                    <ul className="text-sm text-gray-500 space-y-1 text-left">
                        <li className="text-left">• Kinh nghiệm: {applicant.experience}</li>
                        <li className="text-left">• {applicant.education}</li>
                        <li className="text-left">• Ngày nộp: {applicant.applicationDate}</li>
                    </ul>

                    <div className="flex justify-between items-center mt-3">
                        <button className="text-[#309689] text-sm font-medium flex items-center hover:underline text-left">
                            <svg className="w-4 h-4 mr-1" style={{ color: "#309689" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 14V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 15L12 3" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 7L12 3L16 7" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[#309689]">Download CV</span>
                        </button>

                        {/* Status-based hire button for API applicants */}
                        {applicant.isFromAPI && (
                            <div>
                                {applicant.applicationStatus === 'ACCEPTED' && applicant.jobPostingStatus === 'CLOSED' ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle rating action - you can implement this
                                            console.log('Open rating for applicant:', applicant.id);
                                        }}
                                        className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-md transition-colors"
                                    >
                                        Đánh giá ứng viên
                                    </button>
                                ) : applicant.applicationStatus === 'ACCEPTED' ? (
                                    <button
                                        className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md cursor-not-allowed"
                                        disabled
                                    >
                                        Đã thuê
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleHireClick}
                                        className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-md transition-colors"
                                    >
                                        Thuê ứng viên
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Menu dropdown component
    const MenuDropdown = () => (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-36">
            <div className="py-1.5 px-2 text-gray-700 flex items-center hover:bg-gray-50 rounded cursor-pointer">
                <RiEditLine className="mr-2 text-gray-600" />
                <span>Chỉnh sửa</span>
            </div>
            <div className="py-1.5 px-2 text-red-500 flex items-center hover:bg-gray-50 rounded cursor-pointer">
                <RiDeleteBinLine className="mr-2" />
                <span>Xóa</span>
            </div>
        </div>
    );

    // Create the main content
    const mainContent = (
        <div className="w-full">
            {/* Breadcrumb Navigation - only show when not in popup mode */}
            {!onClose && (
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                        <RiHome2Line className="mr-1" />
                        <Link to="/" className="hover:text-[#309689]">Home</Link>
                    </div>
                    <div className="mx-2">/</div>
                    <div><Link to="/job" className="hover:text-[#309689]">Job</Link></div>
                    <div className="mx-2">/</div>
                    <div><Link to="/senior-uiux-designer" className="hover:text-[#309689]">Senior UI/UX Designer</Link></div>
                    <div className="mx-2">/</div>
                    <div className="text-[#309689]">Applications</div>
                </div>
            )}

            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Hồ sơ xin việc</h1>

                <div className="flex items-center relative">
                    <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:border hover:border-gray-300 transition-all mr-2">
                        Bộ lọc
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setFilterActive(!filterActive)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterActive ? 'bg-[#309689] text-white' : 'text-gray-700 hover:border hover:border-gray-300'}`}
                        >
                            Lọc
                        </button>

                        {/* Sort Dropdown */}
                        {filterActive && (
                            <div ref={sortRef} className="absolute mt-2 right-0 w-56 bg-white rounded-lg shadow-lg z-10 border border-gray-200 p-3">
                                <div className="text-xs text-gray-500 uppercase font-medium mb-2">SORT APPLICATION</div>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                id="newest"
                                                name="sort"
                                                checked={sortOption === 'Mới nhất'}
                                                onChange={() => setSortOption('Mới nhất')}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="newest"
                                                className="flex items-center cursor-pointer"
                                            >
                                                <span className={`w-5 h-5 inline-block mr-2 rounded-full border ${sortOption === 'Mới nhất' ? 'border-[#309689]' : 'border-gray-300'} flex-shrink-0`}>
                                                    {sortOption === 'Mới nhất' && (
                                                        <span className="block w-3 h-3 mt-1 ml-1 rounded-full bg-[#309689]"></span>
                                                    )}
                                                </span>
                                                <span className="text-sm text-gray-700">Mới nhất</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                id="oldest"
                                                name="sort"
                                                checked={sortOption === 'Cũ nhất'}
                                                onChange={() => setSortOption('Cũ nhất')}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="oldest"
                                                className="flex items-center cursor-pointer"
                                            >
                                                <span className={`w-5 h-5 inline-block mr-2 rounded-full border ${sortOption === 'Cũ nhất' ? 'border-[#309689]' : 'border-gray-300'} flex-shrink-0`}>
                                                    {sortOption === 'Cũ nhất' && (
                                                        <span className="block w-3 h-3 mt-1 ml-1 rounded-full bg-[#309689]"></span>
                                                    )}
                                                </span>
                                                <span className="text-sm text-gray-700">Cũ nhất</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                {/* Left Column - Tất cả */}
                <div className="w-full md:w-1/2">
                    <div className="bg-[#E4E5E8] rounded-lg shadow mb-4">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-[#E4E5E8]">
                            <h2 className="text-base font-medium text-gray-700 text-left">Tất cả (213)</h2>
                            <div className="relative" ref={el => setMenuRef('all', el)}>
                                <div
                                    onClick={() => toggleMenu('all')}
                                    className="flex items-center justify-center bg-[#E4E5E8] cursor-pointer"
                                >
                                    <RiMoreFill className="text-gray-600 h-5 w-5" />
                                </div>
                                {openMenuId === 'all' && (
                                    <div className="absolute right-0 mt-1 z-10">
                                        <MenuDropdown />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4">
                            {loading ? (
                                <div className="py-8 text-center text-gray-500">
                                    Đang tải dữ liệu...
                                </div>
                            ) : (
                                combinedApplicants.map(applicant => renderApplicantCard(applicant))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Chọn lọc */}
                <div className="w-full md:w-1/2">
                    <div className="bg-[#E4E5E8] rounded-lg shadow mb-4">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-[#E4E5E8]">
                            <h2 className="text-base font-medium text-gray-700 text-left">Chọn lọc (2)</h2>
                            <div className="relative" ref={el => setMenuRef('selected', el)}>
                                <div
                                    onClick={() => toggleMenu('selected')}
                                    className="flex items-center justify-center bg-[#E4E5E8] cursor-pointer"
                                >
                                    <RiMoreFill className="text-gray-600 h-5 w-5" />
                                </div>
                                {openMenuId === 'selected' && (
                                    <div className="absolute right-0 mt-1 z-10">
                                        <MenuDropdown />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4">
                            {selectedApplicants.map(applicant => renderSelectedApplicantCard(applicant))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Applicant Popup */}
            <ApplicantPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                applicant={selectedApplicant}
                onHire={handleHireApplicant}
            />
        </div>
    );

    // Return popup version or regular version
    if (onClose) {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={onClose}
            >
                <div
                    className="bg-white rounded-lg w-[90%] max-w-6xl max-h-[90vh] overflow-auto relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                    >
                        <RiCloseLine size={24} />
                    </button>

                    <div className="p-6">
                        {mainContent}
                    </div>
                </div>
            </div>
        );
    }

    return mainContent;
};

export default JobApplicationsView; 