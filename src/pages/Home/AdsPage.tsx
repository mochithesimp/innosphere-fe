import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { FaCheck } from 'react-icons/fa';

const AdsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Banner */}
            <div className="bg-black text-white py-12 text-center">
                <h1 className="text-5xl font-bold">Quảng cáo</h1>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 max-w-[90%] py-12">
                {/* Intro Section */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6">Bạn có nhu cầu đăng quảng cáo?</h2>
                    <p className="text-gray-600 mb-16 max-w-3xl mx-auto">Chúng tôi luôn sẵn sàng hỗ trợ bạn để đăng quảng cáo phù hợp với nhu cầu.</p>

                    {/* Features */}
                    <div className="flex flex-col md:flex-row justify-center gap-12 mb-16 max-w-4xl mx-auto">
                        <div className="bg-[#F0F9F6] p-6 rounded-lg flex items-center gap-5">
                            <div className="bg-white p-3 rounded-lg">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <rect width="24" height="24" rx="4" fill="white" />
                                    <path d="M6 10H18V14H6V10ZM4 8V16H20V8H4Z" fill="#2A9D8F" />
                                </svg>
                            </div>
                            <span className="font-medium text-xl">Thương hiệu thông qua sáng tạo</span>
                        </div>

                        <div className="bg-[#F0F9F6] p-6 rounded-lg flex items-center gap-5">
                            <div className="bg-white p-3 rounded-lg">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <rect width="24" height="24" rx="4" fill="white" />
                                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z" fill="#2A9D8F" />
                                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#2A9D8F" />
                                </svg>
                            </div>
                            <span className="font-medium text-xl">Tiềm năng với sự đổi mới</span>
                        </div>
                    </div>
                </div>

                {/* Brand Importance Section */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold mb-8">Nơi thương hiệu của bạn được <span className="text-[#2A9D8F] italic">Chú trọng!</span></h2>
                    <p className="text-gray-600 mb-10">Cho dù bạn muốn nâng cao nhận diện thương hiệu, tăng cường tương tác hay thực đẩy doanh số, các giải pháp tùy chỉnh của chúng tôi được thiết kế để đáp ứng nhu cầu riêng của bạn. Hợp tác với chúng tôi để biến tầm nhìn của bạn thành một câu chuyện hấp dẫn.</p>

                    {/* Service grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Service 1 */}
                        <div className="border border-teal-600 rounded-lg p-8">
                            <div className="flex items-start gap-6 mb-4">
                                <div className="bg-[#F0F9F6] p-4 rounded-lg shrink-0">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" rx="4" fill="white" />
                                        <path d="M6 10H18V14H6V10ZM4 8V16H20V8H4Z" fill="#2A9D8F" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Giải pháp sáng tạo cho kỳ nguyên số</h3>
                                    <p className="text-gray-600">Chúng tôi kết hợp công nghệ và dữ liệu để tạo ra giải pháp sáng tạo, giúp doanh nghiệp nâng cao trải nghiệm khách hàng và tối ưu hóa giá trị thương hiệu.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="border border-teal-600 rounded-lg p-8">
                            <div className="flex items-start gap-6 mb-4">
                                <div className="bg-[#F0F9F6] p-4 rounded-lg shrink-0">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" rx="4" fill="white" />
                                        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#2A9D8F" />
                                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z" fill="#2A9D8F" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Biến đổi ý tưởng thành kỹ thuật số</h3>
                                    <p className="text-gray-600">Chúng tôi giúp hiện thực hóa ý tưởng sáng tạo bằng công nghệ số, tối ưu quy trình vận hành và nâng cao khả năng tiếp cận khách hàng.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="border border-teal-600 rounded-lg p-8 bg-[#F0F9F6]">
                            <div className="flex items-start gap-6 mb-4">
                                <div className="bg-white p-4 rounded-lg shrink-0">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" rx="4" fill="white" />
                                        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="#2A9D8F" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Tạo ra giá trị khác biệt</h3>
                                    <p className="text-gray-600">Sự sáng tạo không chỉ giúp bạn nổi bật, mà còn giúp bạn dẫn đầu. Chúng tôi kết hợp tư duy đổi mới với chiến lược dữ liệu để xây dựng những chiến dịch độc đáo.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service 4 */}
                        <div className="border border-teal-600 rounded-lg p-8">
                            <div className="flex items-start gap-6 mb-4">
                                <div className="bg-[#F0F9F6] p-4 rounded-lg shrink-0">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" rx="4" fill="white" />
                                        <path d="M7 14H17V18H7V14ZM5 12V20H19V12H5Z" fill="#2A9D8F" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Nơi Sáng tạo gặp Chiến lược</h3>
                                    <p className="text-gray-600">Từ ý tưởng đến thực thi, chúng tôi giúp bạn khai thác sức mạnh của sáng tạo để thu hút khách hàng và tối đa hóa hiệu quả kinh doanh.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <h2 className="text-6xl font-bold leading-tight text-left">Đồng hành với <br />chúng tôi</h2>
                        </div>
                        <div className="flex items-center">
                            <p className="text-gray-600 text-left">Cho dù bạn đang muốn nâng cao nhận diện thương hiệu, tăng cường sự tương tác hay thực đẩy doanh số, các giải pháp phù hợp của chúng tôi được thiết kế để đáp ứng</p>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Basic Plan */}
                        <div className="border border-teal-500 rounded-3xl flex flex-col h-full overflow-hidden">
                            <div className="p-6 border-b border-teal-500 text-left">
                                <h3 className="font-medium text-lg">Trang chi tiết công việc</h3>
                            </div>

                            <div className="p-6 pb-2">
                                <h2 className="text-5xl font-bold">3.000.000 VNĐ</h2>
                            </div>

                            <div className="px-6 pt-20 pb-4 flex-grow">
                                <div className="space-y-5">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Quảng cáo hiển trong trang chi tiết</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Tối đa 3 chiến dịch</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Báo cáo hàng tháng</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Tồn tại 30 ngày</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-20 mt-auto">
                                <button className="border border-teal-500 text-teal-500 py-4 px-8 rounded-full hover:bg-teal-500 hover:text-white transition duration-300 w-full text-center text-lg">
                                    Mua gói
                                </button>
                            </div>
                        </div>

                        {/* Premium Plan - Highlighted */}
                        <div className="rounded-3xl flex flex-col h-full bg-[#F0F9F6] overflow-hidden">
                            <div className="p-6 border-b border-teal-500 text-left">
                                <h3 className="font-medium text-lg">Trái/ phải trang chính</h3>
                            </div>

                            <div className="p-6 pb-2">
                                <h2 className="text-5xl font-bold">4.000.00 VNĐ</h2>
                            </div>

                            <div className="px-6 pt-20 pb-4 flex-grow">
                                <div className="space-y-5">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Quảng cáo hiển ở trái/ phải trang chủ</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Tối đa 6 chiến dịch</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Báo cáo hai tuần một lần</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Tồn tại 30 ngày</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-20 mt-auto">
                                <button className="border border-teal-500 text-teal-500 py-4 px-8 rounded-full hover:bg-teal-500 hover:text-white transition duration-300 w-full text-center text-lg">
                                    Mua gói
                                </button>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="border border-teal-500 rounded-3xl flex flex-col h-full overflow-hidden">
                            <div className="p-6 border-b border-teal-500 text-left">
                                <h3 className="font-medium text-lg">Trên cùng trang chính</h3>
                            </div>

                            <div className="p-6 pb-2">
                                <h2 className="text-5xl font-bold">5.000.00 VNĐ</h2>
                            </div>

                            <div className="px-6 pt-20 pb-4 flex-grow">
                                <div className="space-y-5">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Quảng cáo hiển ở đầu trang chủ</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Không giới hạn chiến dịch</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Báo cáo hàng tuần</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span>Tồn tại 30 ngày</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-20 mt-auto">
                                <button className="border border-teal-500 text-teal-500 py-4 px-8 rounded-full hover:bg-teal-500 hover:text-white transition duration-300 w-full text-center text-lg">
                                    Mua gói
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdsPage; 