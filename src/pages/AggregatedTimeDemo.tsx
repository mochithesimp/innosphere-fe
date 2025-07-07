import React, { useState, useEffect } from 'react';
import { getTotalTimeSpentToday, getTotalTimeSpentAllTime, formatTime, getVisitorStats } from '../utils/visitorTracking';

const AggregatedTimeDemo: React.FC = () => {
    const [todayTotalTime, setTodayTotalTime] = useState(0);
    const [allTimeTotalTime, setAllTimeTotalTime] = useState(0);
    const [visitorStats, setVisitorStats] = useState<{
        todayUniqueVisitors: number;
        todayPageViews: number;
        totalUniqueVisitors: number;
        currentVisitorId: string;
    } | null>(null);

    useEffect(() => {
        const updateStats = () => {
            const todayTime = getTotalTimeSpentToday();
            const allTime = getTotalTimeSpentAllTime();
            const stats = getVisitorStats();

            setTodayTotalTime(todayTime);
            setAllTimeTotalTime(allTime);
            setVisitorStats(stats);
        };

        // Update immediately
        updateStats();

        // Update every second to show real-time aggregation
        const interval = setInterval(updateStats, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Aggregated Time Tracking Demo</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Today's Total Time */}
                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">Today's Total Time</h2>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {formatTime(todayTotalTime)}
                            </div>
                            <p className="text-gray-600">All visitors combined today</p>
                        </div>
                    </div>

                    {/* All Time Total */}
                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                        <h2 className="text-xl font-semibold mb-4 text-green-600">All Time Total</h2>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                {formatTime(allTimeTotalTime)}
                            </div>
                            <p className="text-gray-600">All visitors all time</p>
                        </div>
                    </div>

                    {/* Today's Unique Visitors */}
                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                        <h2 className="text-xl font-semibold mb-4 text-purple-600">Today's Visitors</h2>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                {visitorStats?.todayUniqueVisitors || 0}
                            </div>
                            <p className="text-gray-600">Unique visitors today</p>
                        </div>
                    </div>
                </div>

                {/* Explanation */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">How Aggregated Time Tracking Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-blue-600 mb-2">Individual Tracking</h4>
                            <ul className="text-gray-700 space-y-1">
                                <li>• Each visitor gets a unique ID</li>
                                <li>• Time is tracked only when active on page</li>
                                <li>• Pauses when switching tabs/windows</li>
                                <li>• Resumes when returning to page</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-600 mb-2">Global Aggregation</h4>
                            <ul className="text-gray-700 space-y-1">
                                <li>• Sums time from all unique visitors</li>
                                <li>• Updates in real-time as visitors browse</li>
                                <li>• Separates today's time vs all-time</li>
                                <li>• Shows combined engagement metrics</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Testing Instructions */}
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-yellow-800">Testing Instructions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium text-yellow-800 mb-2">Single Browser Testing:</h4>
                            <ul className="text-yellow-700 space-y-1 text-sm">
                                <li>• Stay on this page and watch time increase</li>
                                <li>• Switch tabs - time should pause</li>
                                <li>• Return - time should resume</li>
                                <li>• Refresh page - time persists</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-yellow-800 mb-2">Multi-Browser Testing:</h4>
                            <ul className="text-yellow-700 space-y-1 text-sm">
                                <li>• Open in Chrome - time starts counting</li>
                                <li>• Open in Firefox - new visitor, time adds up</li>
                                <li>• Open incognito - another visitor, more time</li>
                                <li>• Total shows sum of ALL visitors</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Admin Dashboard Link */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold mb-3 text-blue-800">Admin Dashboard</h3>
                    <p className="text-blue-700 mb-4">
                        The "Access Time" in your admin dashboard now shows the total combined time of all unique visitors.
                    </p>
                    <a
                        href="/admin/statistics"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        View Admin Dashboard
                    </a>
                </div>

                {/* Real-time Data Display */}
                {visitorStats && (
                    <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Real-time Statistics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <p className="text-sm text-gray-600">Today's Visitors</p>
                                <p className="text-xl font-bold text-blue-600">{visitorStats.todayUniqueVisitors}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Today's Page Views</p>
                                <p className="text-xl font-bold text-green-600">{visitorStats.todayPageViews}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Visitors (30d)</p>
                                <p className="text-xl font-bold text-purple-600">{visitorStats.totalUniqueVisitors}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Your Visitor ID</p>
                                <p className="text-xs font-mono text-gray-500">{visitorStats.currentVisitorId.substring(0, 12)}...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AggregatedTimeDemo;

