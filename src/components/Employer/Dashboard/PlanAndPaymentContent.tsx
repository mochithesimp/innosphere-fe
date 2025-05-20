import React, { useState } from 'react';
import { RiCheckLine, RiDownload2Line } from 'react-icons/ri';
import { FiInfo, FiAlertCircle } from 'react-icons/fi';

interface Transaction {
    id: string;
    date: string;
    plan: string;
    amount: string;
}

const PlanAndPaymentContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const transactions: Transaction[] = [
        { id: '#487441', date: 'Nov 29, 2025 23:26', plan: 'Premium', amount: '1.350.000VND' },
        { id: '#65351B', date: 'Nov 29, 2025 23:26', plan: 'Premium', amount: '1.350.000VND' },
        { id: '#267400', date: 'Nov 29, 2025 23:26', plan: 'Premium', amount: '1.350.000VND' },
        { id: '#651535', date: 'Nov 29, 2025 23:26', plan: 'Premium', amount: '1.350.000VND' },
        { id: '#449003', date: 'Nov 29, 2025 23:26', plan: 'Premium', amount: '1.350.000VND' },
        { id: '#558612', date: 'Nov 29, 2025 23:26', plan: 'Premium', amount: '1.350.000VND' },
    ];

    const totalPages = 5;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Plan Section */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-md font-medium text-gray-500 mb-2 text-left">Gói hiện tại</h2>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-left">Cao cấp</h3>

                        <div className="flex space-x-3 mb-4 justify-start">
                            <button className="px-8 py-2 bg-gray-100 text-[#309689] rounded-md hover:bg-gray-200 text-left">
                                Đổi Gói
                            </button>
                            <button className="px-8 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-left">
                                Hủy Bỏ Gói
                            </button>
                        </div>
                    </div>
                </div>

                {/* Plan Benefits */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-md font-medium text-gray-500 mb-4 text-left">Quyền lợi của gói</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ul className="space-y-4">
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Đăng 15 việc làm</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Làm nổi bật công việc với màu sắc</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Khả năng hiển thị sơ yếu lý lịch trong 60 ngày</span>
                                </li>
                            </ul>

                            <ul className="space-y-4">
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Công việc khẩn cấp và nổi bật</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Truy cập và lưu 20 ứng viên</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Hỗ trợ quản trọng 24/7</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h5 className="text-xs text-gray-500 mb-3 text-left">Remaining</h5>
                            <ul className="space-y-2">
                                <li className="flex items-center justify-start">
                                    <FiInfo className="text-[#309689] mr-2" />
                                    <span className="text-gray-600 text-left">Còn 6 ứng viên có thể lưu</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <FiAlertCircle className="text-red-500 mr-2" />
                                    <span className="text-gray-600 text-left">Còn 15 ngày hiển thị lý lịch</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <FiAlertCircle className="text-red-500 mr-2" />
                                    <span className="text-gray-600 text-left">4 Đăng tuyển dụng còn lại</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice and Card Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Invoice Section */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-md font-medium text-gray-500 mb-2 text-left">Hóa đơn tiếp theo</h2>

                        <div className="mb-2 mt-4 text-left">
                            <h3 className="text-2xl font-semibold text-[#309689]">1.350.000VND</h3>
                        </div>
                        <p className="text-gray-600 font-medium text-left">Feb 29, 2025</p>
                        <p className="text-sm text-gray-500 mt-1 text-left">Gói bắt đầu: <span className="font-bold">Jan 29, 2025</span></p>
                        <p className="text-sm text-gray-500 mt-1 text-left">Bạn phải trả số tiền này mỗi tháng một lần.</p>

                        <button className="mt-5 w-full py-3 bg-[#309689] text-white rounded-md hover:bg-[#277b70] flex items-center justify-center">
                            Trả Ngay
                            <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Credit Card */}
                <div className="h-auto">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-400 rounded-lg p-6 text-white h-full relative overflow-hidden">
                        <div className="flex flex-col justify-between h-full min-h-[200px]">
                            {/* Top section - Balance only */}
                            <div className="text-left">
                                <h5 className="uppercase text-xs text-teal-100 mb-1">Balance</h5>
                                <div className="text-2xl font-semibold">$295,756</div>
                            </div>

                            {/* Bottom section */}
                            <div className="mt-auto">
                                {/* Card Holder and Valid Thru */}
                                <div className="flex mb-4">
                                    <div className="text-left">
                                        <h5 className="uppercase text-xs text-teal-100 mb-1">Card Holder</h5>
                                        <div>Le Thanh Vu</div>
                                    </div>
                                    <div className="text-left ml-40">
                                        <h5 className="uppercase text-xs text-teal-100 mb-1">Valid Thru</h5>
                                        <div>11/29</div>
                                    </div>
                                </div>

                                {/* Card Number */}
                                <div className="text-lg text-left">2911 **** **** 2003</div>
                            </div>
                        </div>

                        {/* Card Logo */}
                        <div className="absolute right-6 bottom-6">
                            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white bg-opacity-30"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="mt-6">
                <h2 className="text-md font-medium text-gray-500 mb-2 text-left">Giao dịch mới nhất</h2>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{transaction.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{transaction.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{transaction.plan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{transaction.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <RiDownload2Line size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="pagination-container my-8 flex justify-center items-center">
                        <div
                            className="pagination-arrow mr-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <div
                                    key={pageNumber}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium cursor-pointer mx-1 ${currentPage === pageNumber
                                        ? 'bg-[#309689] text-white'
                                        : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber < 10 ? `0${pageNumber}` : pageNumber}
                                </div>
                            );
                        })}

                        <div
                            className="pagination-arrow ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanAndPaymentContent; 