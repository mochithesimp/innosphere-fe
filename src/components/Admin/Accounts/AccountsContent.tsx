import React from 'react';

const AccountsContent: React.FC = () => {

    const recentTransactions = [
        {
            id: 1,
            icon: '🔄',
            title: '3rd-Party Subscription',
            date: '8 Tháng 3 2021',
            user: 'Dịch Vụ',
            card: '1234 ****',
            status: 'Đang giải quyết',
            amount: '-$150',
            amountColor: 'text-red-500'
        },
        {
            id: 2,
            icon: '🔧',
            title: 'Web Application',
            date: '8 Tháng 3 2025',
            user: 'Dịch Vụ',
            card: '1234 ****',
            status: 'Hoàn thành',
            amount: '-$340',
            amountColor: 'text-red-500'
        },
        {
            id: 3,
            icon: '👤',
            title: 'Tín Lệ',
            date: '8 Tháng 3 2025',
            user: 'Giao dịch',
            card: '1234 ****',
            status: 'Hoàn thành',
            amount: '+$780',
            amountColor: 'text-green-500'
        },
        {
            id: 4,
            icon: '👤',
            title: 'Thanh Vũ',
            date: '8 Tháng 3 2025',
            user: 'Giao dịch',
            card: '1234 ****',
            status: 'Hoàn thành',
            amount: '+$780',
            amountColor: 'text-green-500'
        },
        {
            id: 5,
            icon: '👤',
            title: 'Việt Quốc',
            date: '8 Tháng 3 2025',
            user: 'Giao dịch',
            card: '1234 ****',
            status: 'Hoàn thành',
            amount: '+$780',
            amountColor: 'text-green-500'
        }
    ];

    const accountUsers = [
        {
            id: 1,
            name: 'Minh Anh',
            time: '5 tiếng trước',
            status: 'Đang giải quyết',
            statusColor: 'text-blue-500'
        },
        {
            id: 2,
            name: 'Linh Huế',
            time: '1 tiếng trước',
            status: 'Chấp nhận',
            statusColor: 'text-green-500'
        },
        {
            id: 3,
            name: 'Tâm Anh',
            time: '5 tiếng trước',
            status: 'Từ chối',
            statusColor: 'text-red-500'
        },
        {
            id: 4,
            name: 'Thái Sơn',
            time: '10 tiếng trước',
            status: 'Chấp nhận',
            statusColor: 'text-green-500'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Top Section - Two columns: Recent Transactions | Balance + Card Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Recent Transactions - Takes up 3 columns */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 text-left">Giao dịch gần đây</h2>

                    <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center space-x-4 w-full">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                                        {transaction.icon}
                                    </div>
                                    <div className="min-w-[200px]">
                                        <h3 className="font-medium text-gray-900 text-base">{transaction.title}</h3>
                                        <p className="text-sm text-gray-500">{transaction.date}</p>
                                    </div>
                                    <span className="text-sm text-blue-500 min-w-[80px] text-left">{transaction.user}</span>
                                    <span className="text-sm text-gray-500 min-w-[80px] text-left">{transaction.card}</span>
                                    <span className="text-sm text-gray-500 min-w-[100px] text-left">{transaction.status}</span>
                                    <span className={`font-semibold text-base min-w-[80px] text-left ${transaction.amountColor === 'text-green-500' ? '' : 'text-red-500'
                                        }`}
                                        style={transaction.amountColor === 'text-green-500' ? { color: '#16DBAA' } : {}}
                                    >
                                        {transaction.amount}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Balance above Card - Takes up 2 columns */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Balance Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-blue-400 mb-1">Số dư</p>
                            <p className="text-2xl font-bold text-gray-900">$12,750</p>
                        </div>
                    </div>

                    {/* Card Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Thẻ</h2>
                            <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Xem tất cả</a>
                        </div>

                        {/* Credit Card */}
                        <div className="relative bg-gradient-to-br from-[#55D8BE] to-[#309689] rounded-2xl p-4 text-white">
                            <div className="flex justify-between items-start mb-6">
                                <div className="text-left">
                                    <p className="text-green-100 text-xs">Số dư</p>
                                    <p className="text-lg font-semibold">$295,756</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-full p-2">
                                    <div className="w-4 h-4 bg-white bg-opacity-50 rounded"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end mb-3">
                                <div className="text-left">
                                    <p className="text-green-100 text-xs">Tên</p>
                                    <p className="font-medium text-sm">Le Thanh Vu</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-100 text-xs">Ngày</p>
                                    <p className="font-medium text-sm">11/29</p>
                                </div>
                            </div>
                            <div className="mt-3 text-left">
                                <p className="text-sm tracking-wider">2911 **** **** 2003</p>
                            </div>
                            {/* Card Logo */}
                            <div className="absolute bottom-3 right-3">
                                <div className="flex space-x-1">
                                    <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full"></div>
                                    <div className="w-6 h-6 bg-white bg-opacity-50 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Debit & Credit Overview and Account Management with matching widths */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Debit & Credit Overview - Takes up 3 columns (same as Giao dịch gần đây) */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 text-left">Debit & Credit Overview</h2>

                    <div className="flex flex-col space-y-4 mb-6">
                        <div>
                            <span className="text-sm text-gray-500">$7,560</span>
                            <span className="text-blue-500 ml-1">Debited</span>
                            <span className="text-sm text-gray-500 mx-2">&</span>
                            <span className="text-sm text-gray-500">$5,420</span>
                            <span className="text-pink-500 ml-1">Credited in this Week</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Debit</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Credit</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-48">
                        <svg viewBox="0 0 600 200" className="w-full h-full">
                            {/* Days */}
                            {['Thứ 7', 'Chủ nhật', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                                <g key={day}>
                                    {/* Debit bars (blue) */}
                                    <rect
                                        x={50 + index * 80}
                                        y={170 - (30 + index * 10)}
                                        width={25}
                                        height={30 + index * 10}
                                        fill="#3B82F6"
                                        rx="3"
                                    />
                                    {/* Credit bars (orange) */}
                                    <rect
                                        x={80 + index * 80}
                                        y={170 - (40 + index * 8)}
                                        width={25}
                                        height={40 + index * 8}
                                        fill="#F59E0B"
                                        rx="3"
                                    />
                                    {/* Day labels */}
                                    <text
                                        x={75 + index * 80}
                                        y={190}
                                        textAnchor="middle"
                                        className="text-xs fill-gray-500"
                                    >
                                        {day}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>

                {/* Account Management - Takes up 2 columns (same as right side above) */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 text-left">Tài khoản khách hàng</h2>

                    <div className="space-y-4">
                        {accountUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between py-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                        <span className="text-pink-500 text-lg">👤</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                                        <p className="text-sm text-gray-500">{user.time}</p>
                                    </div>
                                </div>
                                <span className={`text-sm font-medium ${user.statusColor}`}>
                                    {user.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountsContent; 