import React, { useState, useEffect } from 'react';
import { UserService, UserModel } from '../../../services';

// User Popup Component
const UserPopup: React.FC<{ user: UserModel | null; isOpen: boolean; onClose: () => void }> = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    const getUserTypeLabel = (user: UserModel) => {
        if (user.roles.includes('Employer')) {
            return { text: 'Employer', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        } else if (user.roles.includes('Worker')) {
            return { text: 'Worker', color: 'text-green-600', bgColor: 'bg-green-100' };
        } else {
            return { text: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-100' };
        }
    };

    const getUserInitials = (fullName: string) => {
        return fullName
            .split(' ')
            .map(name => name.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const status = getUserTypeLabel(user);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-2xl text-white">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-left">Thông tin người dùng</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* User Avatar and Name */}
                    <div className="flex items-center mt-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                            {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-white text-lg font-bold">
                                    {getUserInitials(user.fullName)}
                                </span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-left">{user.fullName}</h3>
                            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color} mt-1`}>
                                {status.text}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 text-left">
                            Thông tin cơ bản
                        </h4>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 text-left">Tên đầy đủ</p>
                                    <p className="font-medium text-gray-900 text-left">{user.fullName}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 text-left">Email</p>
                                    <p className="font-medium text-gray-900 break-words text-left">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 text-left">Tên người dùng</p>
                                    <p className="font-medium text-gray-900 text-left">{user.userName}</p>
                                </div>
                            </div>

                            {user.phoneNumber && (
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 text-left">Số điện thoại</p>
                                        <p className="font-medium text-gray-900 text-left">{user.phoneNumber}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 text-left">
                            Chi tiết tài khoản
                        </h4>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 text-left">ID người dùng</p>
                                    <p className="font-medium text-gray-900 font-mono text-sm text-left">{user.id}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 text-left">Vai trò</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {user.roles.map((role, index) => (
                                            <span key={index} className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color} text-left`}>
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 ${user.isDeleted === 'true' ? 'bg-red-100' : 'bg-green-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <svg className={`w-5 h-5 ${user.isDeleted === 'true' ? 'text-red-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {user.isDeleted === 'true' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        )}
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Trạng thái tài khoản</p>
                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${user.isDeleted === 'true' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                        {user.isDeleted === 'true' ? 'Đã xóa' : 'Đang hoạt động'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

const AccountsContent: React.FC = () => {
    const [accountUsers, setAccountUsers] = useState<UserModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const userData = await UserService.getAllUsers();
                setAccountUsers(userData);
            } catch (error) {
                console.error('Error fetching account users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Get user initials for avatar
    const getUserInitials = (fullName: string) => {
        return fullName
            .split(' ')
            .map(name => name.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Get user type label and color
    const getUserTypeLabel = (user: UserModel) => {
        if (user.roles.includes('Employer')) {
            return { text: 'Employer', color: 'text-blue-500' };
        } else if (user.roles.includes('Worker')) {
            return { text: 'Worker', color: 'text-green-500' };
        } else {
            return { text: 'Unknown', color: 'text-gray-500' };
        }
    };

    // Format date to Vietnamese time format
    const getTimeFormat = (index: number) => {
        const hours = [1, 5, 10, 2];
        return `${hours[index % hours.length]} tiếng trước`;
    };

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

    // Handle user click to open popup
    const handleUserClick = (user: UserModel) => {
        setSelectedUser(user);
        setIsPopupOpen(true);
    };

    // Close popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedUser(null);
    };

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

                    <div className={`space-y-4 ${accountUsers.length > 4 ? 'max-h-80 overflow-y-auto pr-2' : ''}`}>
                        {isLoading ? (
                            // Loading state
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex items-center justify-between py-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse">
                                        </div>
                                        <div>
                                            <div className="h-4 bg-gray-200 rounded mb-2 w-20 animate-pulse"></div>
                                            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                                </div>
                            ))
                        ) : accountUsers.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                Không có khách hàng nào
                            </div>
                        ) : (
                            accountUsers.map((user, index) => {
                                const status = getUserTypeLabel(user);
                                return (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 transition-all duration-200 hover:shadow-sm"
                                        onClick={() => handleUserClick(user)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                                <span className="text-pink-500 text-xs font-medium">
                                                    {getUserInitials(user.fullName)}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 text-left">{user.fullName}</h3>
                                                <p className="text-sm text-gray-500 text-left">{getTimeFormat(index)}</p>
                                            </div>
                                        </div>
                                        <span className={`text-sm font-medium ${status.color}`}>
                                            {status.text}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            {/* User Popup */}
            <UserPopup
                user={selectedUser}
                isOpen={isPopupOpen}
                onClose={closePopup}
            />
        </div>
    );
};

export default AccountsContent; 