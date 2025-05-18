import React from 'react';
import { Link } from 'react-router-dom';

const CompletionMessage: React.FC = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[#EBF5F4] rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-[#309689]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <h2 className="text-2xl mb-4">
                🎉 Chúc mừng, hồ sơ của bạn đã hoàn thành 100%!
            </h2>

            <p className="text-gray-600 mb-8 max-w-lg">
                Chào mừng bạn đến với nền tảng của chúng tôi! Hãy bắt đầu
                đăng tuyển hoặc khám phá bảng điều khiển để quản lý thông tin
                công ty và các cơ hội việc làm.
            </p>

            <div className="flex gap-4">
                <Link
                    to="/employer/dashboard"
                    className="bg-[#EBF5F4] hover:bg-[#daeae8] text-gray-700 font-medium py-2.5 px-6 rounded-md inline-flex items-center border border-[#E4E5E8]"
                >
                    View Dashboard
                </Link>
                <Link
                    to="/employer/post-job"
                    className="bg-[#309689] hover:bg-[#277b70] text-white font-medium py-2.5 px-6 rounded-md inline-flex items-center"
                >
                    Đăng Tin Tuyển Dụng
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default CompletionMessage; 