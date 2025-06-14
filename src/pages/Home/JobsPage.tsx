import React, { useState, useEffect } from 'react';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { JobService, JobPostingApiResponse, JobSearchFilters } from '../../services';

// Interface for display data (hybrid of API + static)
interface JobProps {
    id: number;
    title: string;
    company: string;
    logo: string;
    timePosted: string;
    category: string; // Static
    timeRange: string;
    salary: string;
    location: string; // Now from API (cityName)
}

// Static data for the fields that should remain hardcoded (cycling pattern for categories only)
const staticJobCategories = [
    "F&B", "F&B", "Retail", "Event", "Retail", "F&B"
];

// Static avatar image
const DEFAULT_AVATAR = "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain";

// City mapping for the dropdown
const CITY_MAPPING = [
    { id: 1, name: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
    { id: 2, name: 'Đà Nẵng', label: 'Đà Nẵng' },
    { id: 3, name: 'Hà Nội', label: 'Hà Nội' }
];

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

// Function to convert API data to display data with static categories but real location
const convertApiToDisplayData = (apiJobs: JobPostingApiResponse[], startIndex: number = 0): JobProps[] => {
    return apiJobs.map((apiJob, index) => {
        const staticIndex = (startIndex + index) % staticJobCategories.length;
        const staticCategory = staticJobCategories[staticIndex];
        const timeRange = `${formatTime(apiJob.startTime)}-${formatTime(apiJob.endTime)}`;
        const formattedSalary = `${apiJob.hourlyRate?.toLocaleString()}/giờ`;

        // Use actual city name from API, fallback to location field if cityName is not available
        const actualLocation = apiJob.cityName || apiJob.location || 'Vị trí không xác định';

        return {
            id: apiJob.id,
            title: apiJob.title, // Dynamic from API
            company: apiJob.companyName, // Dynamic from API
            logo: DEFAULT_AVATAR, // Static avatar
            timePosted: getTimeAgo(apiJob.postedAt), // Dynamic from API
            category: staticCategory, // Static cycling category
            timeRange: timeRange, // Dynamic from API (formatted)
            salary: formattedSalary, // Dynamic from API (formatted)
            location: actualLocation // Dynamic from API (cityName or location)
        };
    });
};

// Categories for the filters - updated without counts
const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'f&b', label: 'F&B' },
    { id: 'retail', label: 'Bán lẻ' },
    { id: 'event', label: 'Sự kiện' },
    { id: 'other', label: 'Khác' }
];



// Salary ranges for filtering
const salaryRanges = [
    { id: 'under-20', label: 'Dưới 20.000đ/giờ', minRate: 0, maxRate: 20000, count: 8 },
    { id: '20-30', label: '20.000đ - 30.000đ/giờ', minRate: 20000, maxRate: 30000, count: 15 },
    { id: '30-50', label: '30.000đ - 50.000đ/giờ', minRate: 30000, maxRate: 50000, count: 12 },
    { id: '50-100', label: '50.000đ - 100.000đ/giờ', minRate: 50000, maxRate: 100000, count: 6 },
    { id: 'over-100', label: 'Trên 100.000đ/giờ', minRate: 100000, maxRate: 999999, count: 3 }
];

const ChiTietButton: React.FC<{ jobId: number }> = ({ jobId }) => {
    const handleClick = () => {
        // Navigate to job detail page with job ID
        window.location.href = `/job-detail?id=${jobId}`;
    };

    return (
        <div
            style={{
                height: '36px',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'inline-block',
                cursor: 'pointer'
            }}
            onClick={handleClick}
        >
            <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSIzNiI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcng9IjYiIGZpbGw9IiMzMDk2ODkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjUwMCI+Q2hpIFRp4bq/dDwvdGV4dD48L3N2Zz4="
                alt="Chi Tiết"
                style={{
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </div>
    );
};

const JobListItem = ({ job }: { job: JobProps }) => {
    return (
        <div className="border-b border-gray-200 py-6 first:pt-0">
            <div className="flex justify-between items-start mb-2">
                <div className="bg-[#ecf8f6] text-[#309689] text-sm py-1 px-3 rounded-full">
                    {job.timePosted}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>
            </div>

            <div className="flex items-start">
                <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                        <img
                            src={job.logo}
                            alt={job.company}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="mb-4">
                        <h3 className="font-bold text-xl mb-1 text-left">{job.title}</h3>
                        <p className="text-gray-700 text-left">{job.company}</p>

                    </div>

                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex flex-wrap gap-5 items-center">
                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span>{job.category}</span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{job.timeRange}</span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{job.salary}</span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{job.location}</span>
                            </div>
                        </div>

                        <ChiTietButton jobId={job.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};


const CategoryFilter: React.FC<{
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}> = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="mb-6">
            <h3 className="font-bold text-base mb-3 text-gray-800 text-left">Danh mục</h3>
            <div className="space-y-2">
                {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="w-4 h-4 text-[#309689] border-gray-300 focus:ring-[#309689] focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

const SalaryFilter: React.FC<{
    selectedSalaryRange: string;
    onSalaryApply: (minRate: number | undefined, maxRate: number | undefined) => void;
}> = ({ selectedSalaryRange, onSalaryApply }) => {
    const [tempSelectedRange, setTempSelectedRange] = useState(selectedSalaryRange);

    const handleApply = () => {
        const selectedRange = salaryRanges.find(range => range.id === tempSelectedRange);
        onSalaryApply(selectedRange?.minRate, selectedRange?.maxRate);
    };

    const handleClear = () => {
        setTempSelectedRange('');
        onSalaryApply(undefined, undefined);
    };

    return (
        <div className="mb-6">
            <h3 className="font-bold text-base mb-3 text-gray-800 text-left">Lương</h3>
            <div className="space-y-2 mb-4">
                {salaryRanges.map((range) => (
                    <label key={range.id} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="salary"
                                value={range.id}
                                checked={tempSelectedRange === range.id}
                                onChange={(e) => setTempSelectedRange(e.target.value)}
                                className="w-4 h-4 text-[#309689] border-gray-300 focus:ring-[#309689] focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                        </div>
                        <span className="text-xs text-gray-500">{range.count}</span>
                    </label>
                ))}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleApply}
                    className="flex-1 bg-[#309689] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#267a6e] transition-colors"
                >
                    Áp dụng
                </button>
                {selectedSalaryRange && (
                    <button
                        onClick={handleClear}
                        className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                        Xóa
                    </button>
                )}
            </div>
        </div>
    );
};



const TagSection = () => {
    const tags = [
        { id: 'phuc-vu', label: 'phục vụ' },
        { id: 'pha-che', label: 'pha chế' },
        { id: 'f&b', label: 'F&B' },
        { id: 'su-kien', label: 'sự kiện' },
        { id: 'ban-hang', label: 'bán hàng' },
        { id: 'tp-hcm', label: 'TP.HCM' },
        { id: 'quan-9', label: 'quận 9' },
    ];

    return (
        <div className="mb-4">
            <h3 className="text-lg font-bold mb-3 text-gray-800 text-left">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                    <span
                        key={tag.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs cursor-pointer"
                        style={{
                            backgroundColor: '#ecf8f6',
                            color: '#309689'
                        }}
                    >
                        {tag.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

const HiringBanner = () => {
    return (
        <div className="rounded-lg mb-4">
            <img
                src="/hiring.png"
                alt="We are hiring - Apply Today!"
                className="w-full h-auto rounded-lg shadow-sm"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x300/ffcc00/ffffff?text=WE+ARE+HIRING";
                }}
            />
        </div>
    );
};

const JobsPage: React.FC = () => {
    const [sortOrder, setSortOrder] = useState("Mới nhất");
    const [jobs, setJobs] = useState<JobProps[]>([]);
    const [allJobs, setAllJobs] = useState<JobProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [activeFilters, setActiveFilters] = useState<JobSearchFilters>({ category: 'all' });
    const [selectedSalaryRange, setSelectedSalaryRange] = useState<string>('');
    const [selectedCityId, setSelectedCityId] = useState<number | undefined>(undefined);

    const PAGE_SIZE = 6;

    // Function to filter jobs by salary range (client-side)
    const filterJobsBySalary = (jobsToFilter: JobProps[], minRate: number, maxRate: number): JobProps[] => {
        return jobsToFilter.filter(job => {
            const salaryMatch = job.salary.match(/(\d{1,3}(?:,\d{3})*)/);
            if (!salaryMatch) return false;

            const salaryValue = parseInt(salaryMatch[1].replace(/,/g, ''));
            return salaryValue >= minRate && salaryValue <= maxRate;
        });
    };

    // Function to filter jobs by category
    const filterJobsByCategory = (jobsToFilter: JobProps[], categoryFilter: string): JobProps[] => {
        if (!categoryFilter || categoryFilter === 'all') {
            return jobsToFilter;
        }

        return jobsToFilter.filter(job => {
            const jobCategory = job.category.toLowerCase();
            switch (categoryFilter) {
                case 'f&b':
                    return jobCategory === 'f&b';
                case 'retail':
                    return jobCategory === 'retail';
                case 'event':
                    return jobCategory === 'event';
                case 'other':
                    return !['f&b', 'retail', 'event'].includes(jobCategory);
                default:
                    return true;
            }
        });
    };

    // Function to paginate filtered results
    const paginateJobs = (filteredJobs: JobProps[], page: number): { paginatedJobs: JobProps[], totalPages: number, totalCount: number } => {
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
        const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);

        return {
            paginatedJobs,
            totalPages,
            totalCount: filteredJobs.length
        };
    };

    // Function to fetch jobs from API
    const fetchJobs = async (page: number, filters: JobSearchFilters = {}) => {
        try {
            setLoading(true);
            const apiFilters: JobSearchFilters = {
                keyword: filters.keyword,
                cityId: filters.cityId
            };

            const response = await JobService.getJobPostings(1, 50, apiFilters);

            if (response && response.data) {
                const displayJobs = convertApiToDisplayData(response.data, 0);
                setAllJobs(displayJobs);

                const filteredJobs = filterJobsByCategory(displayJobs, filters.category || 'all');

                const { paginatedJobs, totalPages: filteredTotalPages, totalCount: filteredTotalCount } = paginateJobs(filteredJobs, page);

                setJobs(paginatedJobs);
                setTotalCount(filteredTotalCount);
                setTotalPages(filteredTotalPages);
            } else {
                setJobs([]);
                setAllJobs([]);
                setTotalCount(0);
                setTotalPages(0);
            }
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setError('Failed to load job listings');
            setJobs([]);
            setAllJobs([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle salary filter application (client-side)
    const handleSalaryApply = (minRate: number | undefined, maxRate: number | undefined) => {
        const selectedRange = salaryRanges.find(range => range.minRate === minRate && range.maxRate === maxRate);
        setSelectedSalaryRange(selectedRange?.id || '');

        let filteredJobs = allJobs;

        if (activeFilters.category && activeFilters.category !== 'all') {
            filteredJobs = filterJobsByCategory(filteredJobs, activeFilters.category);
        }

        if (minRate !== undefined && maxRate !== undefined) {
            filteredJobs = filterJobsBySalary(filteredJobs, minRate, maxRate);
        }

        const { paginatedJobs, totalPages: filteredTotalPages, totalCount: filteredTotalCount } = paginateJobs(filteredJobs, 1);

        setJobs(paginatedJobs);
        setTotalCount(filteredTotalCount);
        setTotalPages(filteredTotalPages);
        setCurrentPage(1);
    };

    const handleFilterChange = (newFilters: JobSearchFilters) => {
        const categoryChanged = newFilters.category !== activeFilters.category;
        const searchChanged = newFilters.keyword !== activeFilters.keyword;

        if (categoryChanged && !searchChanged && allJobs.length > 0) {
            const filteredJobs = filterJobsByCategory(allJobs, newFilters.category || 'all');
            const { paginatedJobs, totalPages: filteredTotalPages, totalCount: filteredTotalCount } = paginateJobs(filteredJobs, 1);

            setJobs(paginatedJobs);
            setTotalCount(filteredTotalCount);
            setTotalPages(filteredTotalPages);
            setCurrentPage(1);
        } else {
            fetchJobs(1, newFilters);
            setCurrentPage(1);
        }

        setActiveFilters(newFilters);
    };

    const handlePageChange = (page: number) => {
        if (allJobs.length > 0) {
            const filteredJobs = filterJobsByCategory(allJobs, activeFilters.category || 'all');
            const { paginatedJobs } = paginateJobs(filteredJobs, page);
            setJobs(paginatedJobs);
        }
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchJobs(currentPage, activeFilters);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const newFilters: JobSearchFilters = {
            ...activeFilters,
            keyword: searchKeyword.trim() || undefined
        };
        handleFilterChange(newFilters);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const clearSearch = () => {
        setSearchKeyword("");
        const newFilters: JobSearchFilters = {
            ...activeFilters,
            keyword: undefined
        };
        handleFilterChange(newFilters);
    };

    const handleCategoryChange = (category: string) => {
        const newFilters: JobSearchFilters = {
            ...activeFilters,
            category: category
        };
        handleFilterChange(newFilters);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = e.target.value ? parseInt(e.target.value) : undefined;
        setSelectedCityId(cityId);

        const newFilters: JobSearchFilters = {
            ...activeFilters,
            cityId: cityId
        };
        handleFilterChange(newFilters);
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            handlePageChange(page);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const getPaginationNumbers = () => {
        const numbers = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const end = Math.min(totalPages, start + maxVisible - 1);


        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }

        return numbers;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            {/* Banner with title */}
            <div className="bg-black text-white pt-4 pb-8">
                <div className="container mx-auto px-4 max-w-[90%]">
                    <h1 className="text-6xl font-bold text-center">Công Việc</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 max-w-[90%] py-8">
                <div className="text-gray-500 text-xs mb-6">
                    {loading ? (
                        "Đang tải..."
                    ) : (
                        `Đang hiển thị ${jobs.length} trên ${totalCount} kết quả${activeFilters.keyword ? ` cho "${activeFilters.keyword}"` : ''}`
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar - Filters */}
                    <div className="md:w-1/4">
                        <div className="bg-[#309689]/10 rounded-lg shadow-sm p-5">
                            <div className="mb-4">
                                <h2 className="text-lg font-bold mb-3 text-gray-800 text-left">Tìm kiếm công việc</h2>
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Công việc hoặc công ty"
                                        value={searchKeyword}
                                        onChange={handleSearchInputChange}
                                        className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-[#309689] bg-white"
                                    />
                                    <div className="absolute right-1 top-1 flex items-center">
                                        {searchKeyword && (
                                            <button
                                                type="button"
                                                onClick={clearSearch}
                                                className="text-gray-400 hover:text-gray-600 p-1 mr-1"
                                                title="Clear search"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            className="text-gray-400 hover:text-[#309689] p-1"
                                            title="Search"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>

                                {/* Search indicator */}
                                {activeFilters.keyword && (
                                    <div className="mt-2 flex items-center text-sm text-[#309689]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Đang tìm: "{activeFilters.keyword}"
                                        <button
                                            onClick={clearSearch}
                                            className="ml-2 text-gray-400 hover:text-gray-600"
                                            title="Clear search"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-3 text-gray-800 text-left">Vị trí</h3>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-[#309689] appearance-none bg-white"
                                        value={selectedCityId || ''}
                                        onChange={handleCityChange}
                                    >
                                        <option value="">Chọn thành phố</option>
                                        {CITY_MAPPING.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <CategoryFilter
                                selectedCategory={activeFilters.category || 'all'}
                                onCategoryChange={handleCategoryChange}
                            />
                            <SalaryFilter
                                selectedSalaryRange={selectedSalaryRange}
                                onSalaryApply={handleSalaryApply}
                            />
                            <TagSection />
                            <HiringBanner />
                        </div>
                    </div>

                    {/* Right Main Content - Job Listings */}
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">
                                    {loading ? "Đang tải..." : `Hiển thị ${jobs.length} việc làm`}
                                </span>
                                <div className="relative">
                                    <select
                                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:border-[#309689] appearance-none"
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                    >
                                        <option>Mới nhất</option>
                                        <option>Lương cao nhất</option>
                                        <option>Phù hợp nhất</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Job Listings */}
                            {loading ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="text-gray-500">Đang tải việc làm...</div>
                                </div>
                            ) : error ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="text-red-500">{error}</div>
                                </div>
                            ) : jobs.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {jobs.map(job => (
                                        <JobListItem key={job.id} job={job} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    {activeFilters.keyword
                                        ? `Không tìm thấy việc làm nào cho "${activeFilters.keyword}"`
                                        : "Không có việc làm nào để hiển thị"
                                    }
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="flex justify-center mt-8">
                                <nav className="flex items-center space-x-2">
                                    <div className="flex-1 flex justify-end items-center">
                                        {getPaginationNumbers().map(pageNum => (
                                            pageNum === currentPage ? (
                                                <span key={pageNum} className="bg-[#309689] text-white flex items-center justify-center w-8 h-8 rounded">
                                                    {pageNum}
                                                </span>
                                            ) : (
                                                <span
                                                    key={pageNum}
                                                    onClick={() => goToPage(pageNum)}
                                                    className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {pageNum}
                                                </span>
                                            )
                                        ))}
                                        {currentPage < totalPages && (
                                            <button
                                                onClick={goToNextPage}
                                                className="flex items-center justify-center ml-2 px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                                            >
                                                Tiếp theo
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Companies Section - Completely Separate */}
            <div className="bg-[#f0f9f7] py-12">
                <div className="container mx-auto px-4 max-w-[90%]">
                    <h2 className="text-4xl font-bold mb-3 text-center">Doanh Nghiệp Nổi Bật</h2>
                    <p className="text-gray-600 mb-10 text-center">Việc làm theo giờ linh hoạt, thu nhập ổn định. Đăng ký ngay để bắt đầu!</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Instagram',
                                logo: '/instagram.png',
                                description: 'Tương tác với người theo dõi, Instagram Ads, etc,...',
                                openings: 8
                            },
                            {
                                name: 'McDonald\'s',
                                logo: '/macdonal.png',
                                description: 'Thu ngân, Phục vụ, Bảo vệ, etc,...',
                                openings: 12
                            },
                            {
                                name: 'Apple',
                                logo: '/apple.png',
                                description: 'Thu Ngân, Chuyên viên tư vấn, etc,...',
                                openings: 9
                            }
                        ].map((company, index) => (
                            <div key={index} className="bg-white rounded-lg p-10 text-center shadow-sm">
                                <div className="w-14 h-14 mx-auto mb-6 bg-black rounded-xl flex items-center justify-center">
                                    <img
                                        src={company.logo}
                                        alt={company.name}
                                        className="w-9 h-9 object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            if (company.name === 'Apple') {
                                                // Special fallback for Apple
                                                target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMTlhMSAxIDAgMCAxLTEtMXYtNWExIDEgMCAwIDEgMi0wdjVhMSAxIDAgMCAxLTEgMXoiPjwvcGF0aD48cGF0aCBkPSJNMTQgNWEyIDIgMCAxIDEtNCAwIDE1IDE1IDAgMCAxIDMuNjYtMy41IDE0IDE0IDAgMCAwLTcuNTEgMTYuNjJBMTQgMTQgMCAwIDAgMjEuNzggMTIgMTQgMTQgMCAwIDAgMTQuNyAxLjQgNCAxIDAgMCAxIDE0IDV6Ij48L3BhdGg+PC9zdmc+";
                                            } else {
                                                target.src = `https://placehold.co/200x200/000/fff?text=${company.name.charAt(0)}`;
                                            }
                                        }}
                                    />
                                </div>
                                <h3 className="font-bold text-2xl mb-4">{company.name}</h3>
                                <p className="text-gray-600 text-sm mb-6">{company.description}</p>
                                <div className="text-[#309689] font-medium text-sm">
                                    <span className="bg-[#ecf8f6] text-[#309689] py-1 px-4 rounded-full">
                                        {company.openings} open jobs
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default JobsPage; 