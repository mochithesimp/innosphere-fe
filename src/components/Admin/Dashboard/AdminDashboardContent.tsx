import React from 'react';
import { IoCard, IoSwapHorizontal, IoTrendingUp } from 'react-icons/io5';

const AdminDashboardContent: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Credit Cards and Recent Transactions Section - Same Line */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Credit Cards Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Page Title */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900">Thẻ của tôi</h1>
                        <a href="#" className="text-blue-600 hover:text-blue-800">Xem tất cả</a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Active Card with updated gradient */}
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

                {/* Recent Transactions Section */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 h-fit">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Giao Dịch Gần Đây</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <IoCard className="h-4 w-4 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Gửi tiền từ thẻ của tôi</p>
                                    <p className="text-xs text-gray-500">28 tháng 1 2025</p>
                                </div>
                            </div>
                            <span className="text-red-500 font-semibold text-sm">-$850</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <IoSwapHorizontal className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Gửi tiền Paypal</p>
                                    <p className="text-xs text-gray-500">25 tháng 1 2025</p>
                                </div>
                            </div>
                            <span className="text-green-500 font-semibold text-sm">+$2,500</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <IoTrendingUp className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Tín Lệ</p>
                                    <p className="text-xs text-gray-500">21 tháng 1 2025</p>
                                </div>
                            </div>
                            <span className="text-green-500 font-semibold text-sm">+$5,400</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Activity Chart */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 text-left">Hoạt động hàng tuần</h2>

                    {/* Chart container with Y-axis */}
                    <div className="flex">
                        {/* Y-axis labels */}
                        <div className="flex flex-col justify-between h-64 mr-4 text-sm text-gray-500">
                            <span>500</span>
                            <span>400</span>
                            <span>300</span>
                            <span>200</span>
                            <span>100</span>
                            <span>0</span>
                        </div>

                        {/* Chart bars */}
                        <div className="flex-1">
                            <div className="flex items-end justify-between h-64 mb-4">
                                {[
                                    { day: 'Sat', send: 480, withdraw: 240 },
                                    { day: 'Sun', send: 360, withdraw: 120 },
                                    { day: 'Mon', send: 320, withdraw: 280 },
                                    { day: 'Tue', send: 480, withdraw: 360 },
                                    { day: 'Wed', send: 160, withdraw: 240 },
                                    { day: 'Thu', send: 400, withdraw: 240 },
                                    { day: 'Fri', send: 400, withdraw: 320 }
                                ].map((data) => {
                                    // Convert values to pixel heights (500 = 256px max height)
                                    const sendHeight = (data.send / 500) * 256;
                                    const withdrawHeight = (data.withdraw / 500) * 256;

                                    return (
                                        <div key={data.day} className="flex flex-col items-center space-y-2">
                                            <div className="flex items-end space-x-2">
                                                {/* Gửi (Send) bar - Custom teal #16DBCC */}
                                                <div
                                                    className="w-6 rounded-t-sm"
                                                    style={{
                                                        height: `${sendHeight}px`,
                                                        backgroundColor: '#16DBCC'
                                                    }}
                                                ></div>
                                                {/* Rút (Withdraw) bar - Custom blue #1814F3 */}
                                                <div
                                                    className="w-6 rounded-t-sm"
                                                    style={{
                                                        height: `${withdrawHeight}px`,
                                                        backgroundColor: '#1814F3'
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-500">{data.day}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center space-x-6 mt-4">
                        <div className="flex items-center space-x-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: '#16DBCC' }}
                            ></div>
                            <span className="text-sm text-gray-600">Gửi</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: '#1814F3' }}
                            ></div>
                            <span className="text-sm text-gray-600">Rút</span>
                        </div>
                    </div>
                </div>

                {/* Expense Statistics Pie Chart */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 text-left">Thống kê chi phí</h2>
                    <div className="flex justify-center">
                        <div className="w-64 h-64">
                            <img
                                src="/piechart.png"
                                alt="Expense Statistics Pie Chart"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Outstanding Customers and Transaction History Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Outstanding Customers */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 text-left">Khách hàng xuất sắc nhất</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-around flex-1 space-x-6">
                            <div className="text-center flex-1">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                                    <span className="text-blue-600 font-bold text-lg">LV</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800">Lê Thanh Vũ</p>
                                <p className="text-sm text-blue-500">Actor</p>
                            </div>
                            <div className="text-center flex-1">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                                    <span className="text-purple-600 font-bold text-lg">AL</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800">Anh Vũ Lê</p>
                                <p className="text-sm text-purple-500">Developer</p>
                            </div>
                            <div className="text-center flex-1">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                                    <span className="text-green-600 font-bold text-lg">TL</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800">Tín Lê</p>
                                <p className="text-sm text-green-500">Designer</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 ml-4">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Transaction History Chart */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 text-left">Thống kê lịch sử giao dịch</h2>
                    <div className="relative">
                        <svg className="w-full h-32" viewBox="0 0 300 100">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,80 Q50,60 100,40 T200,30 T300,50"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2"
                            />
                            <path
                                d="M0,80 Q50,60 100,40 T200,30 T300,50 L300,100 L0,100 Z"
                                fill="url(#gradient)"
                            />
                        </svg>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Jul</span>
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
    );
};

export default AdminDashboardContent; 