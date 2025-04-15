import React from 'react';
import { Link } from 'react-router-dom';

const HourlyJobPromo: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden shadow-md">
                    {/* Left side with image */}
                    <div className="w-full md:w-1/2 p-8 bg-[#f7f9fc] flex justify-center">
                        <img
                            src="/images/hourly-job-illustration.png"
                            alt="Việc làm theo giờ"
                            className="max-w-full h-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "image 6.png"; // Fallback image URL
                            }}
                        />
                    </div>

                    {/* Right side with content */}
                    <div className="w-full md:w-1/2 p-10">
                        <h2 className="text-4xl font-bold mb-4 text-[#333] text-left">
                            Việc Làm Theo Giờ - <br />Cơ Hội Linh Hoạt
                        </h2>
                        <p className="text-gray-600 mb-6 text-left">
                            Tìm kiếm công việc theo giờ phù hợp với lịch trình của bạn. Chọn từ nhiều
                            ngành nghề khác nhau và kiếm thêm thu nhập một cách linh hoạt.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/jobs"
                                className="bg-[#309689] hover:bg-[#277a6e] text-white font-medium py-3 px-6 rounded-md transition-colors">
                                Tìm Việc
                            </Link>
                            <Link to="/about-hourly"
                                className="text-[#309689] hover:text-[#277a6e] font-medium py-3 px-0 transition-colors">
                                Tìm hiểu thêm
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {/* Stat 1 */}
                    <div className="text-left">
                        <h3 className="text-[#309689] text-4xl font-bold mb-3">12k+</h3>
                        <h4 className="text-[#333] text-xl font-semibold mb-2">Tuyển dụng nhanh</h4>
                        <p className="text-gray-600">
                            Tìm nhân sự nhanh, đáp ứng nhu cầu
                            linh hoạt của doanh nghiệp.
                        </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="text-left">
                        <h3 className="text-[#309689] text-4xl font-bold mb-3">20k+</h3>
                        <h4 className="text-[#333] text-xl font-semibold mb-2">Ứng viên sẵn sàng</h4>
                        <p className="text-gray-600">
                            Hồ sơ ứng viên phong phú, có thể
                            nhận việc ngay lập tức.
                        </p>
                    </div>

                    {/* Stat 3 */}
                    <div className="text-left">
                        <h3 className="text-[#309689] text-4xl font-bold mb-3">18k+</h3>
                        <h4 className="text-[#333] text-xl font-semibold mb-2">Việc làm linh hoạt</h4>
                        <p className="text-gray-600">
                            Kết nối doanh nghiệp với lao động
                            theo ca, giờ một cách hiệu quả.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HourlyJobPromo; 