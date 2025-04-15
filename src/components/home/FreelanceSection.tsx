import React from 'react';
import { Link } from 'react-router-dom';

interface JobProps {
    id: number;
    title: string;
    company: string;
    logo: string;
    timePosted: string;
    schedule: string;
    timeRange: string;
    salary: string;
    location: string;
}

const jobData: JobProps[] = [
    {
        id: 1,
        title: "Nhân viên phục vụ bàn",
        company: "Minh Anh Coffee",
        logo: "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain",
        timePosted: "10 phút trước",
        schedule: "F&B",
        timeRange: "7h00-12h00",
        salary: "27.000/giờ",
        location: "Quận 9, HCM"
    },
    {
        id: 2,
        title: "Nhân viên rửa chén",
        company: "Becker Restaurant",
        logo: "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain",
        timePosted: "12 phút trước",
        schedule: "F&B",
        timeRange: "18h00-23h00",
        salary: "35.000/giờ",
        location: "Quận 2, HCM"
    },
    {
        id: 3,
        title: "Nhân viên sắp xếp hàng hoá",
        company: "Sammi Shop",
        logo: "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain",
        timePosted: "15 phút trước",
        schedule: "Retail",
        timeRange: "13h00-17h00",
        salary: "30.000/giờ",
        location: "Quận 7, HCM"
    },
    {
        id: 4,
        title: "Nhân viên phát tờ rơi",
        company: "Sapphire PR",
        logo: "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain",
        timePosted: "24 phút trước",
        schedule: "Event",
        timeRange: "7h00-11h00",
        salary: "25.000/giờ",
        location: "Quận 1, HCM"
    },
    {
        id: 5,
        title: "Nhân viên đóng gói đơn hàng",
        company: "Hebe Beauty",
        logo: "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain",
        timePosted: "26 phút trước",
        schedule: "Retail",
        timeRange: "17h00-22h00",
        salary: "27.000/giờ",
        location: "Quận 9, HCM"
    }
];

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

                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="inline-block bg-[#309689] hover:bg-[#277a6e] text-white font-medium py-2 px-6 rounded-lg shadow-sm"
                        >
                            Chi Tiết
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FreelanceSection: React.FC = () => {
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
                    {jobData.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FreelanceSection; 