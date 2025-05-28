import React, { useState } from 'react';
import { IoCard, IoArrowUpOutline, IoArrowDownOutline } from 'react-icons/io5';

const TransactionsContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const transactions = [
        {
            id: '#12345678',
            name: 'Tín Lệ',
            type: 'Refund',
            card: '1234 ****',
            date: '8 tháng 3, 12:30 AM',
            amount: '-150.000VNĐ',
            status: 'negative',
            direction: 'up'
        },
        {
            id: '#12345679',
            name: 'NAVER Corp',
            type: 'Booking',
            card: '1234 ****',
            date: '8 tháng 3, 10:40 PM',
            amount: '+750.000VNĐ',
            status: 'positive',
            direction: 'down'
        },
        {
            id: '#12345680',
            name: 'Việt Quốc',
            type: 'Refund',
            card: '1234 ****',
            date: '2 tháng 3, 10:40 PM',
            amount: '-150.000VNĐ',
            status: 'negative',
            direction: 'up'
        },
        {
            id: '#12345667',
            name: 'Bùn Ngan Bà Bẩy',
            type: 'Refund',
            card: '1234 ****',
            date: '2 tháng 3, 03:29 PM',
            amount: '-1.050.000VNĐ',
            status: 'negative',
            direction: 'up'
        },
        {
            id: '#12345668',
            name: 'Quốc Thái',
            type: 'Transfer',
            card: '1234 ****',
            date: '2 tháng 3, 10:40 PM',
            amount: '+840.000VNĐ',
            status: 'positive',
            direction: 'down'
        }
    ];

    return (
        <>
            <style>
                {`
                    .pagination-nav {
                        color: #309689 !important;
                        font-size: 14px;
                        border: none;
                        background: transparent;
                        cursor: pointer;
                    }
                    .pagination-nav:disabled {
                        color: #9CA3AF !important;
                        cursor: not-allowed;
                        opacity: 0.5;
                    }
                    .pagination-active {
                        background-color: #309689 !important;
                        color: white !important;
                        font-size: 14px;
                        font-weight: bold !important;
                        border: none;
                        cursor: pointer;
                    }
                    .pagination-inactive {
                        color: #6B7280 !important;
                        font-size: 14px;
                        border: none;
                        background: transparent;
                        cursor: pointer;
                    }
                    .pagination-inactive:hover {
                        color: #309689 !important;
                    }
                `}
            </style>
            <div className="space-y-6">
                {/* Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Credit Cards Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Page Title */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900">Thẻ của tôi</h1>
                            <a href="#" className="text-blue-600 hover:text-blue-800">+ thêm thẻ</a>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Active Card */}
                            <div className="relative bg-gradient-to-br from-[#55D8BE] to-[#309689] rounded-2xl p-6 text-white">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="text-left">
                                        <p className="text-green-100 text-sm">Số dư</p>
                                        <p className="text-2xl font-semibold">$295,756</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                                        <IoCard className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-end mb-4">
                                    <div className="text-left">
                                        <p className="text-green-100 text-sm">Tên</p>
                                        <p className="font-medium">Le Thanh Vu</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-100 text-sm">Ngày</p>
                                        <p className="font-medium">11/29</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-left">
                                    <p className="text-lg tracking-wider">2911 **** **** 2003</p>
                                </div>
                            </div>

                            {/* Inactive Card */}
                            <div className="relative bg-white border border-gray-200 rounded-2xl p-6 text-gray-700">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="text-left">
                                        <p className="text-gray-500 text-sm">Số dư</p>
                                        <p className="text-2xl font-semibold">$295,756</p>
                                    </div>
                                    <div className="bg-gray-100 rounded-full p-3">
                                        <IoCard className="h-6 w-6 text-gray-600" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-end mb-4">
                                    <div className="text-left">
                                        <p className="text-gray-500 text-sm">Tên</p>
                                        <p className="font-medium">Le Thanh Vu</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-sm">Ngày</p>
                                        <p className="font-medium">11/29</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-left">
                                    <p className="text-lg tracking-wider text-gray-600">2911 **** **** 2003</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expense Chart Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-fit">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 text-left">Chi phí</h2>
                        <div className="text-center mb-6">
                            <p className="text-2xl font-bold text-gray-900">$12,500</p>
                        </div>
                        <div className="flex justify-center mb-6">
                            <div className="w-64 h-20">
                                <svg viewBox="0 0 280 80" className="w-full h-full">
                                    {/* Chart bars - matching the image proportions exactly */}
                                    <rect x="20" y="50" width="25" height="25" fill="#E5E7EB" rx="3" />
                                    <rect x="60" y="20" width="25" height="55" fill="#E5E7EB" rx="3" />
                                    <rect x="100" y="35" width="25" height="40" fill="#E5E7EB" rx="3" />
                                    <rect x="140" y="60" width="25" height="15" fill="#E5E7EB" rx="3" />
                                    <rect x="180" y="5" width="25" height="70" fill="#16DBCC" rx="3" />
                                    <rect x="220" y="45" width="25" height="30" fill="#E5E7EB" rx="3" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-between text-xs text-gray-500 max-w-64 mx-auto">
                                <span>Aug</span>
                                <span>Sep</span>
                                <span>Oct</span>
                                <span>Nov</span>
                                <span>Dec</span>
                                <span>Jan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Table Section */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 text-left">Giao dịch gần đây</h2>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'all'
                                ? ''
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            style={activeTab === 'all' ? { borderBottomColor: '#309689', color: '#309689' } : {}}
                        >
                            Tất cả giao dịch
                        </button>
                        <button
                            onClick={() => setActiveTab('income')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'income'
                                ? ''
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            style={activeTab === 'income' ? { borderBottomColor: '#309689', color: '#309689' } : {}}
                        >
                            Thu nhập
                        </button>
                        <button
                            onClick={() => setActiveTab('expense')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'expense'
                                ? ''
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            style={activeTab === 'expense' ? { borderBottomColor: '#309689', color: '#309689' } : {}}
                        >
                            Chi phí
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Mô tả</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Giao dịch ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Loại</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Thẻ</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Ngày</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Số lượng</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Biên lai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.direction === 'up' ? 'bg-blue-100' : 'bg-green-100'
                                                    }`}>
                                                    {transaction.direction === 'up' ? (
                                                        <IoArrowUpOutline className={`h-5 w-5 ${transaction.direction === 'up' ? 'text-blue-600' : 'text-green-600'
                                                            }`} />
                                                    ) : (
                                                        <IoArrowDownOutline className="h-5 w-5 text-green-600" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-900">{transaction.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 text-left">{transaction.id}</td>
                                        <td className="py-4 px-4 text-gray-600 text-left">{transaction.type}</td>
                                        <td className="py-4 px-4 text-gray-600 text-left">{transaction.card}</td>
                                        <td className="py-4 px-4 text-gray-600 text-left">{transaction.date}</td>
                                        <td className="py-4 px-4 text-left">
                                            <span className={`font-semibold ${transaction.status === 'positive' ? '' : 'text-red-500'
                                                }`}
                                                style={transaction.status === 'positive' ? { color: '#16DBAA' } : {}}
                                            >
                                                {transaction.amount}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-left">
                                            <button className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 text-gray-600">
                                                Tải về
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-end space-x-2 mt-6">
                        <button
                            className="px-3 py-2 hover:opacity-80 flex items-center pagination-nav"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            ← Trước
                        </button>
                        {[1, 2, 3, 4].map((page) => (
                            <button
                                key={page}
                                className={`px-3 py-2 rounded-md min-w-[2rem] h-8 flex items-center justify-center ${currentPage === page ? 'pagination-active' : 'pagination-inactive'
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="px-3 py-2 hover:opacity-80 flex items-center pagination-nav"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Sau →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionsContent; 