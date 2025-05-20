import React, { useState, useEffect } from 'react';
import { RiMore2Line, RiAddCircleLine, RiCloseLine, RiCheckLine } from 'react-icons/ri';

const MyJobsContent: React.FC = () => {
    const [selectedJobStatus, setSelectedJobStatus] = useState<string>('All Jobs');
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Function to handle button hover effect directly in DOM
    useEffect(() => {
        // Add style to head
        const style = document.createElement('style');
        style.textContent = `
            .view-profile-btn {
                background-color: #EBF5F4 !important;
                color: #309689 !important;
                padding: 4px 12px !important;
                border-radius: 4px !important;
                transition: all 0.3s ease !important;
                cursor: pointer !important;
                border: none !important;
                font-weight: 500 !important;
                font-size: 14px !important;
            }
            
            .view-profile-btn:hover {
                background-color: #309689 !important;
                color: white !important;
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

            .pagination-number.current {
                background-color: #E5E7EB;
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

    const toggleDropdown = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Sample job data for demonstration
    const jobs = [
        {
            id: 1,
            title: 'UI/UX Designer',
            timeRange: '7h00-15h00',
            status: 'Đã kết thúc',
            applications: 798,
            postedDays: 10
        },
        {
            id: 2,
            title: 'Senior UX Designer',
            timeRange: '6h00-11h00',
            status: 'Đã kết thúc',
            applications: 185,
            postedDays: 8
        },
        {
            id: 3,
            title: 'Junior Graphic Designer',
            timeRange: '9h00-17h00',
            status: 'Hoạt động',
            applications: 583,
            postedDays: 1
        },
        {
            id: 4,
            title: 'Front End Developer',
            timeRange: '17h00-20h00',
            status: 'Hết hạn',
            applications: 740,
            postedDays: 3
        },
        {
            id: 5,
            title: 'Techical Support Specialist',
            timeRange: '15h00-22h00',
            status: 'Hoạt động',
            applications: 556,
            postedDays: 2
        },
        {
            id: 6,
            title: 'Interaction Designer',
            timeRange: '7h00-15h00',
            status: 'Hết hạn',
            applications: 426,
            postedDays: 10
        },
        {
            id: 7,
            title: 'Software Engineer',
            timeRange: '8h00-13h00',
            status: 'Hoạt động',
            applications: 922,
            postedDays: 5
        },
        {
            id: 8,
            title: 'Product Designer',
            timeRange: '7h00-15h00',
            status: 'Hoạt động',
            applications: 994,
            postedDays: 7
        },
        {
            id: 9,
            title: 'Project Manager',
            timeRange: '9h00-11h00',
            status: 'Hết hạn',
            applications: 196,
            postedDays: 6
        }
    ];

    // Check if dropdown should appear above instead of below
    const shouldDropUp = (jobId: number) => {
        return jobId >= jobs.length - 2; // For the last two items
    };

    // Render status badge based on status
    const renderStatusBadge = (status: string) => {
        if (status === 'Hoạt động') {
            return (
                <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F4] text-[#309689] border border-[#d0e6e3]">
                        <span className="w-2 h-2 bg-[#309689] rounded-full mr-1.5"></span>
                        Hoạt động
                    </span>
                </div>
            );
        } else if (status === 'Đã kết thúc') {
            return (
                <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-1.5"></span>
                        Đã kết thúc
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

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-700">Công việc của tôi <span className="text-gray-400 ml-2">({jobs.length})</span></h1>

                <div className="relative">
                    <select
                        value={selectedJobStatus}
                        onChange={(e) => setSelectedJobStatus(e.target.value)}
                        className="appearance-none bg-white border border-gray-200 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-600 text-sm"
                    >
                        <option>All Jobs</option>
                        <option>Active Jobs</option>
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
                        {jobs.map((job) => (
                            <tr
                                key={job.id}
                                className="transition-all hover:border-[#309689] group"
                                style={{ borderWidth: '1px', borderColor: 'transparent' }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-left group-hover:border-l-2 group-hover:border-l-[#309689]">
                                    <div className="text-sm font-medium text-gray-900 text-left">{job.title}</div>
                                    <div className="text-sm text-gray-500 text-left">{job.timeRange} • Còn lại {job.status === 'Hết hạn' ? '0' : job.postedDays} giờ</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left">
                                    {renderStatusBadge(job.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                                        </svg>
                                        {job.applications} Ứng viên
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left flex items-center">
                                    <button className="view-profile-btn mr-3">
                                        Xem Hồ Sơ
                                    </button>
                                    <div className="dropdown-container relative">
                                        <button
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={(e) => toggleDropdown(job.id, e)}
                                        >
                                            <RiMore2Line className="h-5 w-5" />
                                        </button>

                                        {openDropdownId === job.id && (
                                            <div className={`dropdown-menu absolute ${shouldDropUp(job.id) ? 'bottom-6' : 'top-6'} right-0 mt-2 w-48`}>
                                                <div className="dropdown-item">
                                                    <RiAddCircleLine className="h-4 w-4" />
                                                    <span>Đăng tuyển dụng</span>
                                                </div>
                                                <div className="dropdown-item">
                                                    <RiCheckLine className="h-4 w-4" />
                                                    <span>Kết thúc công việc</span>
                                                </div>
                                                <div className="dropdown-item">
                                                    <RiCloseLine className="h-4 w-4" />
                                                    <span>Đóng công việc</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container my-8">
                <div className="pagination-arrow mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {[1, 2, 3, 4, 5].map((page) => (
                    <div
                        key={page}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page < 10 ? `0${page}` : page}
                    </div>
                ))}

                <div className="pagination-arrow ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default MyJobsContent; 