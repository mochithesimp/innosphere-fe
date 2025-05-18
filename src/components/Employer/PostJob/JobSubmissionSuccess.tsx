import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaListAlt, FaHome } from 'react-icons/fa';

interface JobSubmissionSuccessProps {
    jobTitle?: string;
}

const JobSubmissionSuccess: React.FC<JobSubmissionSuccessProps> = ({ jobTitle = "Công việc" }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-xl mx-auto text-center">
                <div className="mb-6 flex justify-center">
                    <FaCheckCircle className="text-[#309689] text-6xl" />
                </div>

                <h1 className="text-2xl font-semibold mb-4">Đăng tin thành công!</h1>

                <p className="text-gray-600 mb-8">
                    Tin tuyển dụng <span className="font-medium">"{jobTitle}"</span> đã được đăng thành công.
                    Tin của bạn sẽ được kiểm duyệt và sẽ hiển thị trên trang tìm việc.
                </p>

                <div className="bg-[#EBF5F4] p-6 rounded-lg mb-8">
                    <h3 className="font-medium text-lg text-[#309689] mb-3">Thông tin quan trọng</h3>
                    <ul className="text-gray-700 text-left space-y-2">
                        <li className="flex items-start">
                            <div className="bg-[#309689] rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0"></div>
                            <span>Tin tuyển dụng sẽ được hiển thị trong vòng 24 giờ sau khi được kiểm duyệt</span>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-[#309689] rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0"></div>
                            <span>Bạn có thể chỉnh sửa tin tuyển dụng trong mục "Công việc của tôi"</span>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-[#309689] rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0"></div>
                            <span>Các ứng viên quan tâm sẽ được thông báo đến bạn qua email</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/employer/my-jobs"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#309689] text-white px-6 py-3 rounded-md hover:bg-[#277b70] transition-colors font-medium"
                    >
                        <FaListAlt className="text-lg" /> Quản lý công việc
                    </Link>

                    <Link
                        to="/employer/post-job"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#309689] text-[#309689] px-6 py-3 rounded-md hover:bg-[#EBF5F4] transition-colors font-medium"
                    >
                        <FaArrowRight className="text-lg" /> Đăng tin mới
                    </Link>

                    <Link
                        to="/employer/dashboard"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium"
                    >
                        <FaHome className="text-lg" /> Trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobSubmissionSuccess; 