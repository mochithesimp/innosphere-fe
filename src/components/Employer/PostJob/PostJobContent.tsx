import React from 'react';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

const PostJobContent: React.FC = () => {
    return (
        <div className="flex-1">
            {/* Header section with title and image */}
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-2xl font-semibold">Mua đăng ký trả phí để đăng tuyển dụng</h1>
                <div className="hidden lg:block w-[350px]">
                    <img
                        src="/pricehiring.png"
                        alt="Pricing Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            {/* Pricing plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pr-4 md:pr-16 mb-20">
                {/* Standard Plan */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-medium mb-4">Tiêu Chuẩn</h3>
                    <div className="text-xl font-bold text-[#309689] mb-4">
                        1.000.000VNĐ <span className="text-sm font-normal text-gray-500">/tháng</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Đăng 10 bài</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Tin tuyển dụng khán cấp & nổi bật</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Làm nổi bật tin bằng highlight</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Truy cập & lưu trữ 5 hồ sơ ứng viên</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hiển thị hồ sơ ứng tuyển trong 10 ngày</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hỗ trợ 24/7</span>
                        </div>
                    </div>
                    <a href="#" className="w-full bg-[#EBF5F4] text-[#309689] py-3 rounded-md flex items-center justify-center gap-2 font-medium hover:bg-[#d8efeb] transition-colors">
                        Chọn Gói <FaArrowRight className="ml-1" />
                    </a>
                </div>

                {/* Premium Plan - with more height and distinctive styling */}
                <div className="bg-white rounded-lg shadow-xl border-2 border-[#309689] p-6 relative mt-[-30px] transform scale-110 z-10">
                    <div className="absolute top-0 right-0 bg-[#309689] text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        Khuyến Nghi
                    </div>
                    <h3 className="text-xl font-bold text-[#309689] mb-4 text-center">Cao Cấp</h3>
                    <div className="text-xl font-bold text-[#309689] mb-4">
                        1.350.000VNĐ <span className="text-sm font-normal text-gray-500">/tháng</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Đăng 15 bài</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Tin tuyển dụng khán cấp & nổi bật</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Làm nổi bật tin bằng màu sắc</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Truy cập & lưu trữ 10 hồ sơ ứng viên</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hiển thị hồ sơ ứng tuyển trong 20 ngày</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hỗ trợ 24/7</span>
                        </div>
                    </div>
                    <a href="#" className="w-full bg-[#309689] text-white py-3 rounded-md flex items-center justify-center gap-2 font-medium hover:bg-[#277b70] transition-colors">
                        Chọn Gói <FaArrowRight className="ml-1" />
                    </a>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-medium mb-4">Doanh Nghiệp</h3>
                    <div className="text-xl font-bold text-[#309689] mb-4">
                        3.000.000VNĐ <span className="text-sm font-normal text-gray-500">/3 Months</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Đăng tin không giới hạn + Quảng bá thương hiệu</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Tin tuyển dụng khán cấp & nổi bật</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Làm nổi bật tin bằng màu sắc</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Truy cập & lưu trữ 20 hồ sơ ứng viên</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hiển thị hồ sơ ứng tuyển trong 30 ngày</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hỗ trợ 24/7</span>
                        </div>
                    </div>
                    <a href="#" className="w-full bg-[#EBF5F4] text-[#309689] py-3 rounded-md flex items-center justify-center gap-2 font-medium hover:bg-[#d8efeb] transition-colors">
                        Chọn Gói <FaArrowRight className="ml-1" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostJobContent;