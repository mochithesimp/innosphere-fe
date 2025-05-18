import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import JobSubmissionSuccess from './JobSubmissionSuccess';

interface JobDetailsFormProps {
    selectedPlan?: string;
    onBack?: () => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ selectedPlan = 'standard', onBack }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [salaryType, setSalaryType] = useState('monthly');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [benefits, setBenefits] = useState('');
    const [timeSlots, setTimeSlots] = useState([{ day: '', startTime: '', endTime: '' }]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Handle time slot changes
    const handleTimeSlotChange = (index: number, field: string, value: string) => {
        const updatedTimeSlots = [...timeSlots];
        updatedTimeSlots[index] = { ...updatedTimeSlots[index], [field]: value };
        setTimeSlots(updatedTimeSlots);
    };

    // Add new time slot
    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { day: '', startTime: '', endTime: '' }]);
    };

    // Remove time slot
    const removeTimeSlot = (index: number) => {
        if (timeSlots.length > 1) {
            setTimeSlots(timeSlots.filter((_, i) => i !== index));
        }
    };

    // Get plan name based on selectedPlan
    const getPlanName = () => {
        switch (selectedPlan) {
            case 'standard':
                return 'Tiêu Chuẩn';
            case 'premium':
                return 'Cao Cấp';
            case 'enterprise':
                return 'Doanh Nghiệp';
            default:
                return 'Tiêu Chuẩn';
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Show loading state
        setIsLoading(true);

        // Simulate an API call
        setTimeout(() => {
            console.log({
                selectedPlan,
                jobTitle,
                jobType,
                jobCategory,
                jobLocation,
                salary,
                salaryType,
                description,
                requirements,
                benefits,
                timeSlots
            });

            // End loading state and show success
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    // If the job has been successfully submitted, show the success component
    if (isSubmitted) {
        return <JobSubmissionSuccess jobTitle={jobTitle} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-6">
                    <button
                        className="flex items-center text-[#309689] hover:underline"
                        onClick={onBack}
                    >
                        <FaArrowLeft className="mr-2" />
                        Quay lại gói đăng ký
                    </button>
                </div>

                <h1 className="text-2xl font-semibold mb-2">Thông tin công việc</h1>
                <p className="text-gray-600 mb-6">Gói đã chọn: <span className="font-medium text-[#309689]">{getPlanName()}</span></p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Job Information */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-medium mb-4 border-b pb-2">Thông tin cơ bản</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên công việc <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="jobTitle"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    placeholder="Ví dụ: Nhân viên phục vụ"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Loại hình công việc <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="jobType"
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    required
                                >
                                    <option value="">Chọn loại hình</option>
                                    <option value="full-time">Toàn thời gian</option>
                                    <option value="part-time">Bán thời gian</option>
                                    <option value="freelance">Freelance</option>
                                    <option value="temporary">Tạm thời</option>
                                    <option value="internship">Thực tập</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700 mb-1">
                                    Danh mục <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="jobCategory"
                                    value={jobCategory}
                                    onChange={(e) => setJobCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    required
                                >
                                    <option value="">Chọn danh mục</option>
                                    <option value="food-service">Dịch vụ ăn uống</option>
                                    <option value="retail">Bán lẻ</option>
                                    <option value="hospitality">Khách sạn - Nhà hàng</option>
                                    <option value="office">Văn phòng</option>
                                    <option value="labor">Lao động phổ thông</option>
                                    <option value="customer-service">Chăm sóc khách hàng</option>
                                    <option value="events">Sự kiện & Quảng cáo</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Địa điểm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="jobLocation"
                                    value={jobLocation}
                                    onChange={(e) => setJobLocation(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    placeholder="Ví dụ: Quận 1, TP.HCM"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mức lương
                                </label>
                                <input
                                    type="text"
                                    id="salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    placeholder="Ví dụ: 5.000.000"
                                />
                            </div>
                            <div>
                                <label htmlFor="salaryType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Loại lương
                                </label>
                                <select
                                    id="salaryType"
                                    value={salaryType}
                                    onChange={(e) => setSalaryType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                >
                                    <option value="hourly">Theo giờ</option>
                                    <option value="daily">Theo ngày</option>
                                    <option value="weekly">Theo tuần</option>
                                    <option value="monthly">Theo tháng</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-medium mb-4 border-b pb-2">Mô tả công việc</h3>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Mô tả chi tiết <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                rows={5}
                                placeholder="Mô tả chi tiết về công việc, trách nhiệm..."
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                                Yêu cầu <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="requirements"
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                rows={5}
                                placeholder="Yêu cầu về kỹ năng, kinh nghiệm..."
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                                Quyền lợi
                            </label>
                            <textarea
                                id="benefits"
                                value={benefits}
                                onChange={(e) => setBenefits(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                rows={5}
                                placeholder="Quyền lợi khi làm việc, chế độ đãi ngộ..."
                            />
                        </div>
                    </div>

                    {/* Time Slots */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-lg font-medium">Khung giờ làm việc</h3>
                            <button
                                type="button"
                                onClick={addTimeSlot}
                                className="text-[#309689] font-medium hover:underline flex items-center"
                            >
                                + Thêm khung giờ
                            </button>
                        </div>

                        {timeSlots.map((timeSlot, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center pb-4 border-b border-dashed border-gray-200">
                                <div>
                                    <label htmlFor={`day-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày
                                    </label>
                                    <select
                                        id={`day-${index}`}
                                        value={timeSlot.day}
                                        onChange={(e) => handleTimeSlotChange(index, 'day', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    >
                                        <option value="">Chọn ngày</option>
                                        <option value="monday">Thứ 2</option>
                                        <option value="tuesday">Thứ 3</option>
                                        <option value="wednesday">Thứ 4</option>
                                        <option value="thursday">Thứ 5</option>
                                        <option value="friday">Thứ 6</option>
                                        <option value="saturday">Thứ 7</option>
                                        <option value="sunday">Chủ nhật</option>
                                        <option value="weekdays">Các ngày trong tuần</option>
                                        <option value="weekends">Cuối tuần</option>
                                        <option value="all">Tất cả các ngày</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor={`startTime-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Giờ bắt đầu
                                    </label>
                                    <input
                                        type="time"
                                        id={`startTime-${index}`}
                                        value={timeSlot.startTime}
                                        onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`endTime-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Giờ kết thúc
                                    </label>
                                    <input
                                        type="time"
                                        id={`endTime-${index}`}
                                        value={timeSlot.endTime}
                                        onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-end justify-center h-full">
                                    {timeSlots.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTimeSlot(index)}
                                            className="text-red-500 hover:text-red-700 py-2"
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-6 py-2 border border-[#309689] text-[#309689] rounded-md hover:bg-gray-50"
                        >
                            Lưu nháp
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-6 py-2 bg-[#309689] text-white rounded-md hover:bg-[#277b70] flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    Đăng tin tuyển dụng <FaArrowRight className="ml-2" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobDetailsForm; 