import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const JobDetailPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <Header />

            {/* Black banner with title */}
            <div className="bg-black text-white py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-5xl font-bold text-center">Chi Tiết Công Việc</h1>
                </div>
            </div>

            {/* Job details content */}
            <div className="container mx-auto px-4 max-w-6xl py-16 mt-6">
                {/* Top section with job title and metadata */}
                <div className="mb-12">
                    {/* Time posted badge */}
                    <div className="flex items-center mb-6">
                        <div className="text-[#309689] bg-[#ecf8f6] text-sm py-1 px-3 rounded-full">
                            10 phút trước
                        </div>
                        <button className="ml-auto text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>
                    </div>

                    {/* Job title and company */}
                    <div className="flex items-start mb-6">
                        <div className="mr-4">
                            <div className="w-12 h-12 overflow-hidden">
                                <img
                                    src="https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain"
                                    alt="Minh Anh Coffee"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Nhân viên phục vụ bàn</h2>
                            <p className="text-gray-700">Minh Anh Coffee</p>
                        </div>
                    </div>

                    {/* Job metadata icons with Apply button */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span>F&B</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>7h00-12h00</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>27.000đ/giờ</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Quận 9, HCM</span>
                            </div>
                        </div>

                        {/* Apply button */}
                        <div style={{ width: '180px' }}>
                            <div style={{
                                backgroundColor: '#37A594',
                                borderRadius: '4px',
                                padding: '12px 0',
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: '500',
                                width: '100%'
                            }}>
                                Ứng Tuyển
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content with sidebar */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Content */}
                    <div className="md:w-3/4">
                        {/* Job description */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 text-left">Chi tiết công việc</h3>
                            <p className="text-gray-700 leading-relaxed mb-4 text-left">
                                Nhân viên phục vụ bàn chịu trách nhiệm đảm bảo trải nghiệm ấn tượng tốt nhất cho khách hàng Công việc bao gồm
                                tiếp đón khách, ghi chép order, phục vụ đồ uống và hỗ trợ khách hàng trong suốt quá trình dùng bữa. Đồng thời,
                                nhân viên cũng cần chú ý sự sạch sẽ, gọn gàng tại khu vực chịu trách nhiệm của các bàn khách để đảm bảo
                                vệ sinh lịch sự.
                            </p>
                        </div>

                        {/* Responsibilities */}
                        <div className="mb-8 pt-8">
                            <h3 className="text-xl font-bold mb-4 text-left">Nhiệm vụ chính</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Đón tiếp và hướng dẫn khách vào bàn.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Nhận order và chuyển đơn báo/bar.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Phục vụ món ăn, đồ uống đúng đúng cách.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Kiểm tra và dọn bàn bàn ăn luôn sạch sẽ.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Hỗ trợ khách hàng, giải đáp thắc mắc.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Phối hợp với đồng nghiệp để đảm bảo dịch vụ tốt nhất.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Skills */}
                        <div className="mb-8 pt-8">
                            <h3 className="text-xl font-bold mb-4 text-left">Kỹ Năng Chuyên Môn</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Kỹ năng giao tiếp: Giao tiếp rõ ràng, thân thiện với khách hàng và đồng nghiệp.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Kỹ năng phục vụ: Hiểu quy trình phục vụ, mang món lịch sự đúng cách, chuyên nghiệp.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Xử lý tình huống: Giải quyết nhanh các yêu cầu hoặc khiếu nại của khách.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Quản lý thời gian: Sắp xếp công việc hiệu quả, phục vụ nhanh chóng.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#309689] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Chịu áp lực: Làm việc tốt trong môi trường đông khách, cường độ cao.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Tags */}
                        <div className="mb-8 pt-8">
                            <h3 className="text-xl font-bold mb-4 text-left">Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                <span style={{ backgroundColor: '#ecf8f6', color: '#37A594' }} className="px-4 py-2 rounded-full text-sm">F&B</span>
                                <span style={{ backgroundColor: '#ecf8f6', color: '#37A594' }} className="px-4 py-2 rounded-full text-sm">Retail</span>
                                <span style={{ backgroundColor: '#ecf8f6', color: '#37A594' }} className="px-4 py-2 rounded-full text-sm">Quận 9</span>
                                <span style={{ backgroundColor: '#ecf8f6', color: '#37A594' }} className="px-4 py-2 rounded-full text-sm">HCM</span>
                                <span style={{ backgroundColor: '#ecf8f6', color: '#37A594' }} className="px-4 py-2 rounded-full text-sm">Phục vụ</span>
                            </div>
                        </div>

                        {/* Social share */}
                        <div className="mb-12 pt-8">
                            <div className="flex items-center">
                                <h3 className="text-sm font-medium mr-4">Chia sẻ :</h3>
                                <div className="flex items-center gap-4">
                                    <a href="#" className="text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Related jobs section */}
                        <div className="mb-12 pt-8">
                            <h2 className="text-2xl font-bold mb-6 text-left">Công việc liên quan</h2>

                            {/* Job item */}
                            <div className="border-b border-gray-200 py-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-[#ecf8f6] text-[#309689] text-sm py-1 px-3 rounded-full">
                                        24 phút trước
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
                                                src="https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain"
                                                alt="Nhà Hàng Tâm Anh"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 text-left">
                                        <div className="mb-4">
                                            <h3 className="font-bold text-xl mb-1">Nhân viên phục vụ bàn</h3>
                                            <p className="text-gray-700">Nhà Hàng Tâm Anh</p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between">
                                            <div className="flex flex-wrap gap-5 items-center">
                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span>F&B</span>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>18h00-23h00</span>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>27.000đ/giờ</span>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>Quận 1, HCM</span>
                                                </div>
                                            </div>

                                            <div style={{
                                                backgroundColor: '#37A594',
                                                color: 'white',
                                                padding: '8px 24px',
                                                borderRadius: '6px',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                display: 'inline-block',
                                                cursor: 'pointer'
                                            }}>
                                                Chi Tiết
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job item 2 */}
                            <div className="border-b border-gray-200 py-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-[#ecf8f6] text-[#309689] text-sm py-1 px-3 rounded-full">
                                        24 phút trước
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
                                                src="https://th.bing.com/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain"
                                                alt="Becker Restaurant"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 text-left">
                                        <div className="mb-4">
                                            <h3 className="font-bold text-xl mb-1">Nhân viên rửa chén</h3>
                                            <p className="text-gray-700">Becker Restaurant</p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between">
                                            <div className="flex flex-wrap gap-5 items-center">
                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span>F&B</span>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>13h00-17h00</span>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>30.000đ/giờ</span>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>Quận 2, HCM</span>
                                                </div>
                                            </div>

                                            <div style={{
                                                backgroundColor: '#37A594',
                                                color: 'white',
                                                padding: '8px 24px',
                                                borderRadius: '6px',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                display: 'inline-block',
                                                cursor: 'pointer'
                                            }}>
                                                Chi Tiết
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="md:w-1/4">
                        {/* Job Overview Card */}
                        <div className="bg-[#f7fcfb] rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-bold mb-5 text-left">Tổng quan công việc</h3>

                            {/* Job Details */}
                            <div className="space-y-5">
                                {/* Job position */}
                                <div className="flex">
                                    <div className="text-[#37A594] mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p className="font-medium text-black">Công việc</p>
                                        <p className="text-[#65816d] text-sm mt-0.5">Nhân viên phục vụ bàn</p>
                                    </div>
                                </div>

                                {/* Job type */}
                                <div className="flex">
                                    <div className="text-[#37A594] mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p className="font-medium text-black">Loại công việc</p>
                                        <p className="text-[#65816d] text-sm mt-0.5">Phục vụ & thu ngân</p>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="flex">
                                    <div className="text-[#37A594] mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p className="font-medium text-black">Danh mục</p>
                                        <p className="text-[#65816d] text-sm mt-0.5">F&B</p>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="flex">
                                    <div className="text-[#37A594] mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p className="font-medium text-black">Kinh Nghiệm</p>
                                        <p className="text-[#65816d] text-sm mt-0.5">Không yêu cầu</p>
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="flex">
                                    <div className="text-[#37A594] mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p className="font-medium text-black">Bằng cấp</p>
                                        <p className="text-[#65816d] text-sm mt-0.5">Không yêu cầu</p>
                                    </div>
                                </div>

                                {/* Salary */}
                                <div className="flex">
                                    <div className="text-[#37A594] mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p className="font-medium text-black">Lương</p>
                                        <p className="text-[#65816d] text-sm mt-0.5">27.000/giờ</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex">
                                    <div className="text-[#37A594] mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p className="font-medium text-black">Địa điểm</p>
                                        <p className="text-[#65816d] text-sm mt-0.5">Quận 9, TP.HCM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src="https://www.google.com/maps/vt/data=Q426DLsUFI04LGjc9TkDJ6k9vVRistX9hPN1GnCAMzA9JLmuWbaxacURQvF2sJMjecyQHT0a-V0sU0fuikDhy0hX4UOKUUmSq-6DDtxs_CakdfqIy7w4yUZYVwsWdoYGAVerTDuOH-INDbojoq4Nfgso9SHLdMrpbEgAa-wDMlXL2guaSccPp_a3W1CBsYHpbzbMFMCftJqK0MaPflhlwCFPZw3PNofrug"
                                    alt="Map location"
                                    className="w-full h-36 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://via.placeholder.com/600x300/f2f2f2/cccccc?text=Map";
                                    }}
                                />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-[#f7fcfb] rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4 text-left">Liên hệ với chúng tôi</h3>

                            <form className="space-y-4">
                                <div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <input type="text" placeholder="Họ tên" className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </span>
                                        <input type="tel" placeholder="Số điện thoại" className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <span className="absolute top-3 left-0 flex items-center pl-3 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </span>
                                        <textarea placeholder="Tin nhắn của bạn" rows={4} className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm"></textarea>
                                    </div>
                                </div>

                                <div style={{
                                    backgroundColor: '#37A594',
                                    color: 'white',
                                    padding: '8px 0',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    width: '100%',
                                    textAlign: 'center',
                                    cursor: 'pointer'
                                }}>
                                    Gửi Tin Nhắn
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default JobDetailPage; 