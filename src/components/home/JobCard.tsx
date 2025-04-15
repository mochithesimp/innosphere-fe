import React from 'react';
import { Link } from 'react-router-dom';

interface JobCardProps {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    experience?: string;
    jobType?: string;
    category?: string;
    logo: string;
    isNew?: boolean;
    isUrgent?: boolean;
    postedTime: string;
}

const JobCard: React.FC<JobCardProps> = ({
    id,
    title,
    company,
    location,
    salary,
    experience,
    jobType,
    logo,
    isNew = false,
    postedTime
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition-shadow">
            {/* Time Posted - Green Pill */}
            <div className="flex justify-between items-center mb-4">
                <span className="bg-[#ecf8f6] text-[#309689] text-xs font-medium py-1 px-3 rounded-full">
                    {postedTime}
                </span>
                {isNew && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Mới nhất</span>
                )}
            </div>

            <div className="flex items-start gap-5">
                {/* Company Logo */}
                <div className="flex-shrink-0 bg-gray-50 rounded-lg p-2 overflow-hidden w-16 h-16 flex items-center justify-center border border-gray-100">
                    <img src={logo} alt={company} className="w-12 h-12 object-contain" />
                </div>

                {/* Job Details */}
                <div className="flex-grow">
                    <h3 className="font-medium text-xl">{title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{company}</p>

                    {/* Job Metadata */}
                    <div className="flex flex-wrap gap-5 items-center">
                        {location && (
                            <div className="flex items-center text-gray-500 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {location}
                            </div>
                        )}

                        {salary && (
                            <div className="flex items-center text-gray-500 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {salary}
                            </div>
                        )}

                        {experience && (
                            <div className="flex items-center text-gray-500 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {experience}
                            </div>
                        )}

                        {jobType && (
                            <div className="flex items-center text-gray-500 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {jobType}
                            </div>
                        )}
                    </div>
                </div>

                {/* Button */}
                <div className="flex-shrink-0 self-center">
                    <Link
                        to={`/jobs/${id}`}
                        className="inline-block bg-[#309689] hover:bg-[#277a6e] text-white text-sm font-medium py-2 px-6 rounded"
                    >
                        Chi Tiết
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard; 