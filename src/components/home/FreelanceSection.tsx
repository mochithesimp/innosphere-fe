import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { JobService, JobPostingApiResponse } from '../../services';

// Interface for display data (hybrid of API + static)
interface JobProps {
    id: number;
    title: string;
    company: string;
    logo: string;
    timePosted: string;
    schedule: string; // Static F&B/Retail/Event
    timeRange: string;
    salary: string;
    location: string; // Now from API (cityName)
}

// Static data for the fields that should remain hardcoded (cycling pattern for categories only)
const staticJobCategories = ["F&B", "Retail", "Event", "F&B", "Retail"];

// Static avatar image
const DEFAULT_AVATAR = "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain";

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
const convertApiToDisplayData = (apiJobs: JobPostingApiResponse[]): JobProps[] => {
    // Filter out jobs with REJECTED, PENDING, CLOSED, and COMPLETED status
    const filteredJobs = apiJobs.filter(apiJob =>
        apiJob.status !== 'REJECTED' &&
        apiJob.status !== 'PENDING' &&
        apiJob.status !== 'CLOSED' &&
        apiJob.status !== 'COMPLETED'
    );

    return filteredJobs.map((apiJob, index) => {
        const staticCategory = staticJobCategories[index % staticJobCategories.length];
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
            schedule: staticCategory, // Static cycling category
            timeRange: timeRange, // Dynamic from API (formatted)
            salary: formattedSalary, // Dynamic from API (formatted)
            location: actualLocation // Dynamic from API (cityName or location)
        };
    });
};

const JobCard: React.FC<{ job: JobProps }> = ({ job }) => {
    return (
        <div className="border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
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
                    <div className="mb-5">
                        <h3 className="font-bold text-2xl mb-1 text-left">{job.title}</h3>
                        <p className="text-gray-700 text-left">{job.company}</p>

                    </div>

                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex flex-wrap gap-6 items-center">
                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span>{job.schedule}</span>
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

                        <div
                            style={{
                                height: '36px',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                display: 'inline-block',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                window.location.href = `/job-detail?id=${job.id}`;
                            }}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

const FreelanceSection: React.FC = () => {
    const [jobs, setJobs] = useState<JobProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                // Use the JobService to get homepage jobs
                const apiJobs = await JobService.getHomepageJobs();

                if (apiJobs && apiJobs.length > 0) {
                    // Convert API data to display data with static overrides
                    const displayJobs = convertApiToDisplayData(apiJobs);
                    setJobs(displayJobs);
                } else {
                    setJobs([]);
                }
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Failed to load job listings');
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="bg-white py-12">
                <div className="container mx-auto px-4 max-w-[90%]">
                    <div className="flex justify-center items-center h-32">
                        <div className="text-gray-500">Đang tải việc làm...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white py-12">
                <div className="container mx-auto px-4 max-w-[90%]">
                    <div className="flex justify-center items-center h-32">
                        <div className="text-red-500">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold">Việc Làm Mới Nhất</h2>
                    <Link to="/jobs" className="text-[#309689] font-bold underline hover:text-[#277a6e]">
                        Tất cả
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Không có việc làm nào để hiển thị
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FreelanceSection; 