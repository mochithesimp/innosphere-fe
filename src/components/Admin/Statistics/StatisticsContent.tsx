import React, { useState, useEffect } from 'react';
import { getVisitorStats, formatTime } from '../../../utils/visitorTracking';
import { UserService } from '../../../services/userService';
import { FaUserTie, FaUsers } from 'react-icons/fa';
import { AdminService } from '../../../services/adminService';

interface DailyStats {
    date: string;
    uniqueVisitors: number;
    totalPageViews: number;
    visitors: string[];
}

const StatisticsContent: React.FC = () => {
    const [visitorStats, setVisitorStats] = useState<{
        todayUniqueVisitors: number;
        todayPageViews: number;
        totalUniqueVisitors: number;
        last30DaysStats: DailyStats[];
        currentVisitorId: string;
        totalTimeSpent: number;
        totalTimeSpentAllTime: number;
    }>({
        todayUniqueVisitors: 0,
        todayPageViews: 0,
        totalUniqueVisitors: 0,
        last30DaysStats: [],
        currentVisitorId: 'unknown',
        totalTimeSpent: 0,
        totalTimeSpentAllTime: 0
    });

    const [userStats, setUserStats] = useState<{
        totalWorkers: number;
        totalEmployers: number;
    }>({
        totalWorkers: 0,
        totalEmployers: 0
    });

    const [dashboardStats, setDashboardStats] = useState<{
        totalPostings: number;
        totalSales: number;
        totalPlans: number;
    }>({
        totalPostings: 0,
        totalSales: 0,
        totalPlans: 0
    });

    useEffect(() => {
        // Load visitor statistics
        const loadStats = () => {
            const stats = getVisitorStats();
            setVisitorStats({
                ...stats,
                totalTimeSpent: stats.totalTimeSpent || 0,
                totalTimeSpentAllTime: stats.totalTimeSpentAllTime || 0
            });
        };

        // Load initial stats
        loadStats();

        // Update stats every 5 seconds to show real-time data
        const interval = setInterval(loadStats, 5000);

        // Load user statistics
        const loadUserStats = async () => {
            try {
                const users = await UserService.getAllUsers();
                const workers = users.filter(user => user.roles.includes('Worker'));
                const employers = users.filter(user => user.roles.includes('Employer'));
                setUserStats({
                    totalWorkers: workers.length,
                    totalEmployers: employers.length
                });
            } catch (error) {
                console.error('Error loading user stats:', error);
            }
        };

        loadUserStats();

        // Load dashboard stats
        const loadDashboardStats = async () => {
            try {
                // Get total postings
                const jobPostings = await AdminService.getAllJobPostings();
                setDashboardStats((prev) => ({ ...prev, totalPostings: jobPostings.length }));
                // Get all subscriptions and advertisements
                const [subscriptions, advertisements] = await Promise.all([
                    AdminService.getAllSubscriptions(),
                    AdminService.getAllAdvertisements()
                ]);
                const totalSales =
                    subscriptions.reduce((sum, sub) => sum + (sub.amountPaid || 0), 0) +
                    advertisements.reduce((sum, ad) => sum + (ad.price || 0), 0);
                setDashboardStats((prev) => ({ ...prev, totalSales, totalPlans: subscriptions.length }));
            } catch (error) {
                console.error('Error loading dashboard stats:', error);
            }
        };
        loadDashboardStats();

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            {/* Header Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Total Workers Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1 text-left">Total Workers</p>
                            <p className="text-xl font-bold text-gray-900 text-left">{userStats.totalWorkers}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-gray-600 font-medium text-left">Registered Workers</span>
                            </div>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                            <FaUsers className="w-6 h-6 text-teal-600" />
                        </div>
                    </div>
                </div>

                {/* Total Employers Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1 text-left">Total Employers</p>
                            <p className="text-xl font-bold text-gray-900 text-left">{userStats.totalEmployers}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-gray-600 font-medium text-left">Registered Employers</span>
                            </div>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                            <FaUserTie className="w-6 h-6 text-teal-600" />
                        </div>
                    </div>
                </div>

                {/* New Clients Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1 text-left">Total Visitors</p>
                            <p className="text-xl font-bold text-gray-900 text-left">{visitorStats.totalUniqueVisitors}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-blue-500 font-medium text-left">Last 30 days</span>
                            </div>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Access Time Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1 text-left">Access Time</p>
                            <p className="text-xl font-bold text-gray-900 text-left">{formatTime(visitorStats.totalTimeSpent)}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-blue-600 font-medium text-left">Active time</span>
                            </div>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts and Active Users Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Users Chart */}
                <div className="bg-gray-800 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-4 text-left">Active Users</h3>
                    {/* <p className="text-teal-400 text-sm mb-6 text-left">(+23) more in 2021</p> */}
                    <div className="flex items-end justify-between h-32 mb-6">
                        {[60, 80, 40, 100, 75, 60, 85, 45].map((height, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className="bg-white rounded-sm mb-2"
                                    style={{
                                        height: `${height}%`,
                                        width: '12px'
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-left">Users</p>
                                <p className="text-white font-bold text-lg text-left">{userStats.totalWorkers + userStats.totalEmployers}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-left">Total Posting</p>
                                <p className="text-white font-bold text-lg text-left">{dashboardStats.totalPostings}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-left">Sales</p>
                                <p className="text-white font-bold text-lg text-left">{dashboardStats.totalSales.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-left">Total Plans</p>
                                <p className="text-white font-bold text-lg text-left">{dashboardStats.totalPlans}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Overview Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-left">
                            <h3 className="text-lg font-semibold text-gray-900 text-left">Sales overview</h3>
                            {/* <p className="text-teal-600 text-sm text-left">(+5) more in 2021</p> */}
                        </div>
                    </div>

                    {/* Line Chart Area */}
                    <div className="h-64 relative">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                            <span>300</span>
                            <span>250</span>
                            <span>200</span>
                            <span>150</span>
                            <span>100</span>
                            <span>50</span>
                            <span>0</span>
                        </div>

                        {/* Chart area with gradient background */}
                        <div className="ml-8 h-full relative bg-gradient-to-b from-teal-50 to-transparent rounded-lg">
                            {/* Sample curved line path */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                                <path
                                    d="M 0 150 Q 50 120 100 130 T 200 110 T 300 120 T 400 100"
                                    stroke="#14B8A6"
                                    strokeWidth="3"
                                    fill="none"
                                    className="opacity-80"
                                />
                                <path
                                    d="M 0 180 Q 50 160 100 170 T 200 150 T 300 160 T 400 140"
                                    stroke="#6B7280"
                                    strokeWidth="2"
                                    fill="none"
                                    className="opacity-60"
                                />
                            </svg>
                        </div>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 mt-2">
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                            <span>Sep</span>
                            <span>Oct</span>
                            <span>Nov</span>
                            <span>Dec</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects and Orders Overview Section - Same Line */}
            {/* Removed Projects and Orders overview sections as requested */}
        </div>
    );
};

export default StatisticsContent; 