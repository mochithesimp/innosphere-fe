import React from 'react';
import { Link } from 'react-router-dom';

const ContactInfoForm: React.FC = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Email Liên Hệ
                </label>
                <input
                    type="email"
                    placeholder="Ví dụ: contact@example.com"
                    className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Số Điện Thoại
                </label>
                <input
                    type="tel"
                    placeholder="Ví dụ: 09XXXXXXXX"
                    className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Địa Chỉ
                </label>
                <input
                    type="text"
                    placeholder="Địa chỉ văn phòng"
                    className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Thành Phố
                </label>
                <select
                    className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white text-gray-500"
                >
                    <option value="">Chọn thành phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="other">Khác</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Họ Tên Người Liên Hệ
                </label>
                <input
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Chức Vụ
                </label>
                <input
                    type="text"
                    placeholder="Ví dụ: HR Manager"
                    className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                />
            </div>

            <div className="flex justify-start gap-4 mt-12">
                <Link
                    to="/employer/social-media-info"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-6 rounded-md inline-flex items-center"
                >
                    Trang Trước
                </Link>
                <button
                    type="submit"
                    className="bg-[#309689] hover:bg-[#277b70] text-white font-medium py-2.5 px-6 rounded-md inline-flex items-center"
                >
                    Hoàn Thành
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ContactInfoForm; 