import React, { useState } from 'react';

const JobPostingForm: React.FC = () => {
    const [salaryRangeFrom, setSalaryRangeFrom] = useState('');
    const [salaryRangeTo, setSalaryRangeTo] = useState('');
    const [applicationType, setApplicationType] = useState<'internal' | 'external' | 'email'>('internal');

    return (
        <>
            <style>
                {`
                    .submit-button {
                        background-color: #1CB99E;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 0.375rem;
                        display: flex;
                        align-items: center;
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    
                    .submit-button:hover {
                        background-color: #19a38b;
                    }
                    
                    .submit-button svg {
                        margin-left: 0.5rem;
                        width: 1.25rem;
                        height: 1.25rem;
                    }
                `}
            </style>
            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold mb-4 text-left">Đăng việc làm</h1>

                    {/* Job Title Section */}
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4 text-left">Tiêu đề công việc</h2>
                        <input
                            type="text"
                            placeholder="Thêm danh hiệu công việc, vai trò, vị trí tuyển dụng, v.v..."
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                        />
                    </div>

                    {/* Job Type Section */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <div className="md:w-2/3">
                                <h2 className="text-base font-medium mb-2 text-left">Thể</h2>
                                <input
                                    type="text"
                                    placeholder="Từ khóa công việc, thẻ, v.v..."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                />
                            </div>
                            <div className="md:w-1/3">
                                <h2 className="text-base font-medium mb-2 text-left">Vai trò công việc</h2>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="contract">Contract</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Salary Section */}
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4 text-left">Thu nhập</h2>
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="md:w-1/3">
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Mức lương tối thiểu</h3>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Lương tối thiểu..."
                                        className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                        value={salaryRangeFrom}
                                        onChange={(e) => setSalaryRangeFrom(e.target.value)}
                                    />
                                    <div className="bg-gray-100 flex items-center justify-center px-4 border-t border-r border-b border-gray-300 rounded-r-md">
                                        <span className="text-gray-600">VNĐ</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/3">
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Mức lương tối đa</h3>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Lương tối đa..."
                                        className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                        value={salaryRangeTo}
                                        onChange={(e) => setSalaryRangeTo(e.target.value)}
                                    />
                                    <div className="bg-gray-100 flex items-center justify-center px-4 border-t border-r border-b border-gray-300 rounded-r-md">
                                        <span className="text-gray-600">VNĐ</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/3">
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Kiểu Lương</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="monthly">Hàng tháng</option>
                                        <option value="annual">Hàng năm</option>
                                        <option value="hourly">Theo giờ</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Role and Salary Type */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Vai trò công việc</h3>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                >
                                    <option value="">Chọn...</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Kiểu Lương</h3>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                >
                                    <option value="">Chọn...</option>
                                    <option value="monthly">Hàng tháng</option>
                                    <option value="annual">Hàng năm</option>
                                    <option value="hourly">Theo giờ</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4 text-left">Thông tin thêm</h2>

                        {/* First row - Học vấn, Kinh Nghiệm, Loại công việc */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Học vấn</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="high-school">THPT</option>
                                        <option value="associate">Cao đẳng</option>
                                        <option value="bachelor">Đại học</option>
                                        <option value="master">Thạc sĩ</option>
                                        <option value="phd">Tiến sĩ</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Kinh Nghiệm</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="entry">Mới đi làm</option>
                                        <option value="1-2">1-2 năm</option>
                                        <option value="3-5">3-5 năm</option>
                                        <option value="5-plus">Trên 5 năm</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Loại công việc</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="full-time">Toàn thời gian</option>
                                        <option value="part-time">Bán thời gian</option>
                                        <option value="contract">Hợp đồng</option>
                                        <option value="remote">Từ xa</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second row - Vị trí, Ngày hết hạn, Trình độ công việc */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Vị trí</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="ho-chi-minh">Hồ Chí Minh</option>
                                        <option value="ha-noi">Hà Nội</option>
                                        <option value="da-nang">Đà Nẵng</option>
                                        <option value="remote">Remote</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Ngày hết hạn</h3>
                                <input
                                    type="date"
                                    placeholder="DD/MM/YYYY"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                />
                            </div>

                            <div>
                                <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Trình độ công việc</h3>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] appearance-none"
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="entry">Entry Level</option>
                                        <option value="mid">Mid Level</option>
                                        <option value="senior">Senior Level</option>
                                        <option value="director">Director</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Application Options Section */}
                    <div className="bg-gray-50 p-6 rounded-md mb-8">
                        <h2 className="text-base font-medium mb-4 text-left">Ứng tuyển công việc trên:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Nền tảng option */}
                            <div
                                className={`bg-white p-4 rounded-md border relative cursor-pointer ${applicationType === 'internal' ? 'border-[#309689] ring-1 ring-[#309689]' : 'border-gray-300'}`}
                                onClick={() => setApplicationType('internal')}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3 mt-1">
                                        <div
                                            className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${applicationType === 'internal' ? 'bg-[#309689] border-[#309689]' : 'bg-white'
                                                }`}
                                        >
                                            {applicationType === 'internal' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <input
                                            id="internal"
                                            name="application-method"
                                            type="radio"
                                            checked={applicationType === 'internal'}
                                            onChange={() => setApplicationType('internal')}
                                            className="sr-only" // Hide but keep for accessibility
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label htmlFor="internal" className="font-medium text-gray-800 block text-left">Nền tảng</label>
                                        <p className="text-gray-500 text-sm mt-1 text-left">
                                            Ứng viên sẽ nộp đơn xin việc bằng Nền tảng và tất cả các ứng dụng sẽ hiển thị trên bảng điều khiển của bạn.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Nền tảng bên ngoài option */}
                            <div
                                className={`bg-white p-4 rounded-md border relative cursor-pointer ${applicationType === 'external' ? 'border-[#309689] ring-1 ring-[#309689]' : 'border-gray-300'}`}
                                onClick={() => setApplicationType('external')}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3 mt-1">
                                        <div
                                            className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${applicationType === 'external' ? 'bg-[#309689] border-[#309689]' : 'bg-white'
                                                }`}
                                        >
                                            {applicationType === 'external' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <input
                                            id="external"
                                            name="application-method"
                                            type="radio"
                                            checked={applicationType === 'external'}
                                            onChange={() => setApplicationType('external')}
                                            className="sr-only" // Hide but keep for accessibility
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label htmlFor="external" className="font-medium text-gray-800 block text-left">Nền tảng bên ngoài</label>
                                        <p className="text-gray-500 text-sm mt-1 text-left">
                                            Ứng viên nộp đơn xin việc trên trang web của bạn, tất cả các ứng dụng sẽ hiển thị trên trang web của riêng bạn.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Trên email của bạn option */}
                            <div
                                className={`bg-white p-4 rounded-md border relative cursor-pointer ${applicationType === 'email' ? 'border-[#309689] ring-1 ring-[#309689]' : 'border-gray-300'}`}
                                onClick={() => setApplicationType('email')}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3 mt-1">
                                        <div
                                            className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${applicationType === 'email' ? 'bg-[#309689] border-[#309689]' : 'bg-white'
                                                }`}
                                        >
                                            {applicationType === 'email' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <input
                                            id="email"
                                            name="application-method"
                                            type="radio"
                                            checked={applicationType === 'email'}
                                            onChange={() => setApplicationType('email')}
                                            className="sr-only" // Hide but keep for accessibility
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label htmlFor="email" className="font-medium text-gray-800 block text-left">Trên email của bạn</label>
                                        <p className="text-gray-500 text-sm mt-1 text-left">
                                            Ứng viên nộp đơn xin việc tới địa chỉ email của bạn và tất cả các ứng dụng sẽ hiển thị trong email của bạn.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Description Section */}
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-2 text-left">Mô tả & Trách nhiệm</h2>
                        <div className="mb-4">
                            <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Mô tả</h3>
                            <div className="border border-gray-300 rounded-md overflow-hidden">
                                <textarea
                                    placeholder="Thêm mô tả công việc của bạn..."
                                    className="w-full p-3 border-none focus:outline-none focus:ring-0 min-h-[120px] resize-none"
                                ></textarea>
                                <div className="flex items-center border-t border-gray-300 p-2 bg-white">
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Bold">
                                        <span className="font-bold">B</span>
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Italic">
                                        <span className="italic">I</span>
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Underline">
                                        <span className="underline">U</span>
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Strikethrough">
                                        <span className="line-through">S</span>
                                    </button>
                                    <div className="h-5 w-px bg-gray-300 mx-2"></div>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Link">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                                        </svg>
                                    </button>
                                    <div className="h-5 w-px bg-gray-300 mx-2"></div>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Bullet List">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                                        </svg>
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Numbered List">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-600 mb-2 text-left font-medium">Trách nhiệm</h3>
                            <div className="border border-gray-300 rounded-md overflow-hidden">
                                <textarea
                                    placeholder="Thêm trách nhiệm công việc của bạn..."
                                    className="w-full p-3 border-none focus:outline-none focus:ring-0 min-h-[120px] resize-none"
                                ></textarea>
                                <div className="flex items-center border-t border-gray-300 p-2 bg-white">
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Bold">
                                        <span className="font-bold">B</span>
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Italic">
                                        <span className="italic">I</span>
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Underline">
                                        <span className="underline">U</span>
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Strikethrough">
                                        <span className="line-through">S</span>
                                    </button>
                                    <div className="h-5 w-px bg-gray-300 mx-2"></div>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Link">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                                        </svg>
                                    </button>
                                    <div className="h-5 w-px bg-gray-300 mx-2"></div>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Bullet List">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                                        </svg>
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-md" title="Numbered List">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#309689',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: '500',
                                fontSize: '16px',
                                border: 'none',
                                minWidth: '150px',
                                cursor: 'pointer'
                            }}
                        >
                            Đăng Công Việc
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                style={{ marginLeft: '10px' }}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobPostingForm; 