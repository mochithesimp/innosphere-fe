import React, { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const jobData = [
    {
        id: 1,
        title: "Nhân viên phục vụ bàn",
        company: "Minh Anh Coffee",
        logo: "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain",
        timePosted: "10 phút trước",
        category: "F&B",
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
        category: "F&B",
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
        category: "Retail",
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
        category: "Event",
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
        category: "Retail",
        timeRange: "17h00-22h00",
        salary: "27.000/giờ",
        location: "Quận 9, HCM"
    },
    {
        id: 6,
        title: "Nhân viên chạy bàn",
        company: "Nhà Hàng Hải Sản",
        logo: "https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain",
        timePosted: "30 phút trước",
        category: "F&B",
        timeRange: "13h00-17h00",
        salary: "30.000/giờ",
        location: "Quận 2, HCM"
    }
];

// Categories for the filters
const categories = [
    { id: 'f&b', label: 'F&B', count: 10 },
    { id: 'ban-le', label: 'Bán lẻ', count: 10 },
    { id: 'su-kien', label: 'Sự kiện', count: 10 },
    { id: 'khac', label: 'Khác', count: 10 }
];

const experience = [
    { id: 'phuc-vu', label: 'Phục vụ & thu ngân', count: 10 },
    { id: 'ban-hang', label: 'Bán hàng & tiếp thị', count: 10 },
    { id: 'ho-tro', label: 'Hỗ trợ/Văn phòng', count: 10 },
    { id: 'pha-che', label: 'Pha chế/Nhà bếp', count: 10 }
];

const experienceLevels = [
    { id: 'khong-yeu-cau', label: 'Không yêu cầu kinh nghiệm', count: 10 },
    { id: 'chua-co', label: 'Chưa có kinh nghiệm', count: 10 },
    { id: 'nguoi-moi', label: 'Người mới bắt đầu', count: 10 },
    { id: 'co-kinh-nghiem', label: 'Có kinh nghiệm', count: 10 },
    { id: 'kinh-nghiem-cao', label: 'Kinh nghiệm cao', count: 10 }
];

const timePeriods = [
    { id: 'tat-ca', label: 'Tất cả', count: 10 },
    { id: '1-3', label: '1-3 giờ/ngày', count: 10 },
    { id: '4-6', label: '4-6 giờ/ngày', count: 10 },
    { id: '7', label: '7 ngày/tuần', count: 10 },
    { id: '30', label: '30 ngày/tuần', count: 10 }
];

const ChiTietButton: React.FC<{ jobTitle?: string }> = ({ jobTitle }) => {
    const isServerJob = jobTitle === "Nhân viên phục vụ bàn";
    const buttonContent = (
        <div
            style={{
                height: '36px',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'inline-block',
                cursor: 'pointer'
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
    );

    if (isServerJob) {
        return (
            <a href="/job-detail">
                {buttonContent}
            </a>
        );
    }

    return buttonContent;
};

const JobListItem = ({ job }: { job: typeof jobData[0] }) => (
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

                    <ChiTietButton jobTitle={job.title} />
                </div>
            </div>
        </div>
    </div>
);

// Separate button component with direct DOM styling
const XemThemButton: React.FC = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '36px',
                marginTop: '12px',
                borderRadius: '6px',
                overflow: 'hidden'
            }}
        >
            <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMDk2ODkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIiBmaWxsPSJ3aGl0ZSI+WGVtIFRow6ptPC90ZXh0Pjwvc3ZnPg=="
                alt="Xem Thêm"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer'
                }}
            />
        </div>
    );
};

const FilterSection = ({ title, items }: { title: string, items: { id: string, label: string, count: number }[] }) => {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-bold mb-3 text-gray-800 text-left">{title}</h3>
            <div className="space-y-1.5">
                {items.map(item => (
                    <div key={item.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={item.id}
                            className="h-4 w-4 text-[#309689] border-gray-300 rounded focus:ring-0"
                        />
                        <label htmlFor={item.id} className="ml-2 text-gray-600 text-sm">
                            {item.label}
                        </label>
                        <span className="ml-auto text-gray-400 text-xs">{item.count}</span>
                    </div>
                ))}
            </div>
            {title === "Danh mục" && <XemThemButton />}
        </div>
    );
};

// Create ApDungButton component using SVG approach
const ApDungButton: React.FC = () => {
    return (
        <div
            style={{
                height: '22px',
                marginLeft: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'inline-block',
                cursor: 'pointer'
            }}
        >
            <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSIyMiI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcng9IjQiIGZpbGw9IiMzMDk2ODkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjUwMCI+w4FwIEThu6VuZzwvdGV4dD48L3N2Zz4="
                alt="Áp Dụng"
                style={{
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </div>
    );
};

const SalarySlider = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(60);
    const [isDraggingMin, setIsDraggingMin] = useState(false);
    const [isDraggingMax, setIsDraggingMax] = useState(false);
    const maxSalary = 999999;

    const minSalary = Math.round((minValue / 100) * maxSalary);
    const currentMaxSalary = Math.round((maxValue / 100) * maxSalary);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinValue = parseInt(e.target.value);
        setMinValue(Math.min(newMinValue, maxValue - 5));
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = parseInt(e.target.value);
        // Hard limit to 100 to prevent exceeding max value
        const limitedMaxValue = Math.min(newMaxValue, 100);
        // Don't let max value go below min value + 5
        setMaxValue(Math.max(limitedMaxValue, minValue + 5));
    };

    const handleMinSalaryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueStr = e.target.value.replace(/\D/g, '');
        const value = parseInt(valueStr);

        if (!isNaN(value)) {
            const maxAllowed = Math.min(maxSalary, (maxValue / 100) * maxSalary - 10000);
            const limitedValue = Math.min(value, maxAllowed);
            const newMinValue = Math.min(Math.round((limitedValue / maxSalary) * 100), maxValue - 5);
            setMinValue(newMinValue);
        }
    };

    const handleMaxSalaryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueStr = e.target.value.replace(/\D/g, '');
        const value = parseInt(valueStr);

        if (!isNaN(value)) {
            // Ensure value is strictly capped at maxSalary
            const strictMaxSalary = Math.min(value, maxSalary);
            // Ensure value doesn't exceed max salary or go below min value
            const minAllowed = Math.max(0, (minValue / 100) * maxSalary + 10000);
            const limitedValue = Math.max(Math.min(strictMaxSalary, maxSalary), minAllowed);
            const newMaxValue = Math.max(Math.min(Math.round((limitedValue / maxSalary) * 100), 100), minValue + 5);
            setMaxValue(newMaxValue);
        }
    };

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDraggingMin || isDraggingMax) return;

        const track = e.currentTarget;
        const trackRect = track.getBoundingClientRect();
        const clickPosition = ((e.clientX - trackRect.left) / trackRect.width) * 100;

        const distToMin = Math.abs(clickPosition - minValue);
        const distToMax = Math.abs(clickPosition - maxValue);

        if (distToMin < distToMax) {
            setMinValue(Math.min(Math.round(clickPosition), maxValue - 5));
        } else {
            setMaxValue(Math.max(Math.round(clickPosition), minValue + 5));
        }
    };

    const handleMinHandleMouseDown = () => {
        setIsDraggingMin(true);
    };

    const handleMaxHandleMouseDown = () => {
        setIsDraggingMax(true);
    };

    // Add a validation effect to ensure max values stay within bounds
    React.useEffect(() => {
        // Force max value to stay at or below 100
        if (maxValue > 100) {
            setMaxValue(100);
        }

        // Ensure current salary values don't exceed maxSalary
        const currentMaxSalaryValue = Math.round((maxValue / 100) * maxSalary);
        if (currentMaxSalaryValue > maxSalary) {
            setMaxValue(100); // Reset to 100% of max
        }
    }, [maxValue, maxSalary]);

    // Mouse event handlers for dragging
    React.useEffect(() => {
        const handleMouseUp = () => {
            setIsDraggingMin(false);
            setIsDraggingMax(false);
        };

        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="mb-4">
            <h3 className="text-lg font-bold mb-3 text-gray-800 text-left">Lương</h3>
            <div className="px-2">
                <div
                    className="w-full bg-gray-200 rounded-full h-1.5 mb-4 relative cursor-pointer"
                    onClick={handleTrackClick}
                >
                    {/* Progress bar */}
                    <div
                        className="bg-[#309689] h-1.5 absolute rounded-full"
                        style={{
                            left: `${minValue}%`,
                            width: `${maxValue - minValue}%`
                        }}
                    ></div>

                    {/* Min handle */}
                    <div
                        className="bg-white border border-[#309689] w-3 h-3 rounded-full absolute -mt-0.75 top-0 z-10 transform -translate-x-1/2 cursor-grab"
                        style={{
                            left: `${minValue}%`,
                            borderWidth: isDraggingMin ? '2px' : '1px',
                            zIndex: isDraggingMin ? 40 : 10
                        }}
                        onMouseDown={handleMinHandleMouseDown}
                    ></div>

                    {/* Min slider (invisible) */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={minValue}
                        onChange={handleMinChange}
                        className="absolute top-0 left-0 opacity-0 h-1.5 cursor-pointer z-30"
                        style={{ left: '0%', width: `${maxValue}%` }}
                    />

                    {/* Max handle */}
                    <div
                        className="bg-white border border-[#309689] w-3 h-3 rounded-full absolute -mt-0.75 top-0 z-10 transform -translate-x-1/2 cursor-grab"
                        style={{
                            left: `${maxValue}%`,
                            borderWidth: isDraggingMax ? '2px' : '1px',
                            zIndex: isDraggingMax ? 40 : 10
                        }}
                        onMouseDown={handleMaxHandleMouseDown}
                    ></div>

                    {/* Max slider (invisible) */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={maxValue}
                        onChange={handleMaxChange}
                        className="absolute top-0 right-0 opacity-0 h-1.5 cursor-pointer z-30"
                        style={{ left: `${minValue}%`, width: `${100 - minValue}%` }}
                    />
                </div>

                {/* Input fields for direct entry */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={minSalary.toLocaleString('vi-VN')}
                            onChange={handleMinSalaryInput}
                            className="w-full border border-gray-300 rounded-md p-1 text-xs text-gray-700 text-center"
                        />
                    </div>
                    <div className="mx-2 text-gray-400">-</div>
                    <div className="flex-1">
                        <input
                            type="text"
                            value={currentMaxSalary.toLocaleString('vi-VN')}
                            onChange={handleMaxSalaryInput}
                            className="w-full border border-gray-300 rounded-md p-1 text-xs text-gray-700 text-center"
                        />
                    </div>
                </div>

                <div className="text-xs text-gray-600 flex justify-center items-center">
                    <ApDungButton />
                </div>
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
                    Đang hiển thị 6 trên 10 kết quả
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar - Filters */}
                    <div className="md:w-1/4">
                        <div className="bg-[#309689]/10 rounded-lg shadow-sm p-5">
                            <div className="mb-4">
                                <h2 className="text-lg font-bold mb-3 text-gray-800 text-left">Tìm kiếm công việc</h2>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Công việc hoặc công ty"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-[#309689] bg-white"
                                    />
                                    <button className="absolute right-3 top-2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-3 text-gray-800 text-left">Vị trí</h3>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-[#309689] appearance-none bg-white">
                                        <option>Chọn thành phố</option>
                                        <option>TP. Hồ Chí Minh</option>
                                        <option>Hà Nội</option>
                                        <option>Đà Nẵng</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <FilterSection title="Danh mục" items={categories} />
                            <FilterSection title="Loại công việc" items={experience} />
                            <FilterSection title="Trình độ kinh nghiệm" items={experienceLevels} />
                            <FilterSection title="Ngày đăng" items={timePeriods} />
                            <SalarySlider />
                            <TagSection />
                            <HiringBanner />
                        </div>
                    </div>

                    {/* Right Main Content - Job Listings */}
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">Hiển thị 6 việc làm</span>
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

                            <div className="divide-y divide-gray-200">
                                {jobData.map(job => (
                                    <JobListItem key={job.id} job={job} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-8">
                                <nav className="flex items-center space-x-2">
                                    <div className="flex-1 flex justify-end items-center">
                                        <span className="bg-[#309689] text-white flex items-center justify-center w-8 h-8 rounded">
                                            1
                                        </span>
                                        <span className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 cursor-pointer">
                                            2
                                        </span>
                                        <button className="flex items-center justify-center ml-2 px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
                                            Tiếp theo
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
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