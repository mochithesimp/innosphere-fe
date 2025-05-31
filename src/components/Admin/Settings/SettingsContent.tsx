import React, { useState } from 'react';
import { IoCheckmarkCircleOutline, IoChevronDownOutline } from 'react-icons/io5';

const SettingsContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        fullName: 'Le Thanh Vu',
        email: 'vult2911@gmail.com',
        birthDate: '29 November 2003',
        address: 'Landmark',
        postalCode: '71300',
        displayName: 'Mochi The Simp',
        password: '••••••••••',
        location: 'Landmark',
        city: 'Ho Chi Minh',
        country: 'Vietnam'
    });

    const [customizeData, setCustomizeData] = useState({
        currency: 'USD - VND',
        timezone: '(UTC+7) Giờ Đông Dương',
        notifications: {
            digitalMoney: true,
            orderNotifications: false,
            accountSuggestions: true
        }
    });

    const [securityData, setSecurityData] = useState({
        twoFactorAuth: true,
        currentPassword: '••••••••••',
        newPassword: '••••••••••'
    });

    const tabs = [
        { id: 'profile', label: 'Chỉnh sửa hồ sơ' },
        { id: 'customize', label: 'Tùy chỉnh' },
        { id: 'security', label: 'Bảo mật' }
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCustomizeChange = (field: string, value: string) => {
        setCustomizeData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNotificationChange = (notification: string, value: boolean) => {
        setCustomizeData(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [notification]: value
            }
        }));
    };

    const handleSecurityChange = (field: string, value: string | boolean) => {
        setSecurityData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        // Handle save functionality
        console.log('Saving data:', formData, customizeData, securityData);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <style>
                {`
                    .settings-save-button {
                        background-color: #309689 !important;
                        color: white !important;
                        border: none !important;
                    }
                    .settings-save-button:hover {
                        opacity: 0.9 !important;
                    }
                    .toggle-on {
                        background-color: #4FD1C7 !important;
                    }
                    .toggle-off {
                        background-color: #9CA3AF !important;
                    }
                    .tab-active {
                        color: #309689 !important;
                        border-bottom-color: #309689 !important;
                    }
                    .settings-input-text {
                        color: #309689 !important;
                    }
                `}
            </style>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6 pt-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                ? 'tab-active'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Form Content */}
            {activeTab === 'profile' && (
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Họ và Tên */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Họ và Tên
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Le Thanh Vu"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#309689]"
                                        placeholder="vult2911@gmail.com"
                                    />
                                    <IoCheckmarkCircleOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                </div>
                            </div>

                            {/* Ngày Sinh */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Ngày Sinh
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.birthDate}
                                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-[#309689]"
                                    >
                                        <option value="29 November 2003">29 November 2003</option>
                                        {/* Add more date options as needed */}
                                    </select>
                                    <IoChevronDownOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Địa chỉ thường trú */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Địa chỉ thường trú
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#309689]"
                                    placeholder="Landmark"
                                />
                            </div>

                            {/* Mã bưu cục */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Mã bưu cục
                                </label>
                                <input
                                    type="text"
                                    value={formData.postalCode}
                                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#309689]"
                                    placeholder="71300"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Tên hiện thị */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Tên hiện thị
                                </label>
                                <input
                                    type="text"
                                    value={formData.displayName}
                                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Mochi The Simp"
                                />
                            </div>

                            {/* Mật Khẩu */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Mật Khẩu
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="••••••••••"
                                />
                            </div>

                            {/* Địa chỉ */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#309689]"
                                    placeholder="Landmark"
                                />
                            </div>

                            {/* Thành Phố */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Thành Phố
                                </label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#309689]"
                                    placeholder="Ho Chi Minh"
                                />
                            </div>

                            {/* Quốc gia */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Quốc gia
                                </label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#309689]"
                                    placeholder="Vietnam"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleSave}
                            className="px-8 py-2 text-sm rounded-lg transition-colors settings-save-button"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            )}

            {/* Other tab contents */}
            {activeTab === 'customize' && (
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        {/* Left Column - Currency */}
                        <div>
                            <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                Tiền tệ
                            </label>
                            <div className="relative">
                                <select
                                    value={customizeData.currency}
                                    onChange={(e) => handleCustomizeChange('currency', e.target.value)}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-[#309689]"
                                >
                                    <option value="USD - VND">USD - VND</option>
                                    <option value="EUR - VND">EUR - VND</option>
                                    <option value="JPY - VND">JPY - VND</option>
                                </select>
                                <IoChevronDownOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Right Column - Timezone */}
                        <div>
                            <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                Múi giờ
                            </label>
                            <div className="relative">
                                <select
                                    value={customizeData.timezone}
                                    onChange={(e) => handleCustomizeChange('timezone', e.target.value)}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-[#309689]"
                                >
                                    <option value="(UTC+7) Giờ Đông Dương">(UTC+7) Giờ Đông Dương</option>
                                    <option value="(UTC+0) GMT">(UTC+0) GMT</option>
                                    <option value="(UTC+8) CST">(UTC+8) CST</option>
                                </select>
                                <IoChevronDownOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="mb-8">
                        <h3 className="text-left text-sm font-medium text-gray-700 mb-4">Thông báo</h3>

                        <div className="space-y-4">
                            {/* Digital Money Notification */}
                            <div className="flex items-center py-2">
                                <button
                                    onClick={() => handleNotificationChange('digitalMoney', !customizeData.notifications.digitalMoney)}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none mr-4 ${customizeData.notifications.digitalMoney ? 'toggle-on' : 'toggle-off'
                                        }`}
                                >
                                    <span
                                        className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md"
                                        style={{
                                            transform: customizeData.notifications.digitalMoney ? 'translateX(24px)' : 'translateX(2px)'
                                        }}
                                    />
                                </button>
                                <span className="text-sm text-gray-700">Tôi gửi hoặc nhận tiền kỳ thuật số</span>
                            </div>

                            {/* Order Notifications */}
                            <div className="flex items-center py-2">
                                <button
                                    onClick={() => handleNotificationChange('orderNotifications', !customizeData.notifications.orderNotifications)}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none mr-4 ${customizeData.notifications.orderNotifications ? 'toggle-on' : 'toggle-off'
                                        }`}
                                >
                                    <span
                                        className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md"
                                        style={{
                                            transform: customizeData.notifications.orderNotifications ? 'translateX(24px)' : 'translateX(2px)'
                                        }}
                                    />
                                </button>
                                <span className="text-sm text-gray-700">Tôi nhận đơn hàng từ người bán</span>
                            </div>

                            {/* Account Suggestions */}
                            <div className="flex items-center py-2">
                                <button
                                    onClick={() => handleNotificationChange('accountSuggestions', !customizeData.notifications.accountSuggestions)}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none mr-4 ${customizeData.notifications.accountSuggestions ? 'toggle-on' : 'toggle-off'
                                        }`}
                                >
                                    <span
                                        className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md"
                                        style={{
                                            transform: customizeData.notifications.accountSuggestions ? 'translateX(24px)' : 'translateX(2px)'
                                        }}
                                    />
                                </button>
                                <span className="text-sm text-gray-700">Có đề xuất cho tài khoản của tôi</span>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="px-8 py-2 text-sm rounded-lg transition-colors settings-save-button"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="p-6">
                    {/* Two-Factor Authentication Section */}
                    <div className="mb-8">
                        <h3 className="text-left text-sm font-medium text-gray-700 mb-4">Xác thực hai yếu tố</h3>

                        <div className="flex items-center py-2">
                            <button
                                onClick={() => handleSecurityChange('twoFactorAuth', !securityData.twoFactorAuth)}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none mr-4 ${securityData.twoFactorAuth ? 'toggle-on' : 'toggle-off'
                                    }`}
                            >
                                <span
                                    className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md"
                                    style={{
                                        transform: securityData.twoFactorAuth ? 'translateX(24px)' : 'translateX(2px)'
                                    }}
                                />
                            </button>
                            <span className="text-sm text-gray-700">Bật hoặc tắt xác thực hai yếu tố</span>
                        </div>
                    </div>

                    {/* Change Password Section */}
                    <div className="mb-8">
                        <h3 className="text-left text-sm font-medium text-gray-700 mb-4">Đổi mật khẩu</h3>

                        <div className="space-y-6">
                            {/* Current Password */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    type="password"
                                    value={securityData.currentPassword}
                                    onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent settings-input-text"
                                    placeholder="••••••••••"
                                />
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    value={securityData.newPassword}
                                    onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent settings-input-text"
                                    placeholder="••••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="px-8 py-2 text-sm rounded-lg transition-colors settings-save-button"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsContent; 