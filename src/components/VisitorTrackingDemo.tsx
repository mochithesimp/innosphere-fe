import React, { useState, useEffect } from 'react';
import { getVisitorStats, getCurrentVisitorInfo, clearVisitorData } from '../utils/visitorTracking';

interface VisitorStats {
    todayUniqueVisitors: number;
    todayPageViews: number;
    totalUniqueVisitors: number;
    last30DaysStats: Array<{
        date: string;
        uniqueVisitors: number;
        totalPageViews: number;
    }>;
    currentVisitorId: string;
}

interface VisitorInfo {
    visitorId: string;
    firstVisit: string | null;
    lastVisit: string | null;
    totalVisits: number;
    isUniqueToday: boolean;
}

const VisitorTrackingDemo: React.FC = () => {
    const [stats, setStats] = useState<VisitorStats | null>(null);
    const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);

    const refreshData = () => {
        const currentStats = getVisitorStats();
        const currentInfo = getCurrentVisitorInfo();
        setStats(currentStats);
        setVisitorInfo(currentInfo);
    };

    useEffect(() => {
        refreshData();
    }, []);

    const handleClearData = () => {
        clearVisitorData();
        refreshData();
    };

    if (!stats || !visitorInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Visitor Tracking Demo</h2>

            {/* Current Visitor Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">Your Visitor Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Visitor ID:</p>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded">{visitorInfo.visitorId}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Visits:</p>
                        <p className="text-lg font-bold text-blue-600">{visitorInfo.totalVisits}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">First Visit:</p>
                        <p className="text-sm">{visitorInfo.firstVisit ? new Date(visitorInfo.firstVisit).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Unique Today:</p>
                        <p className="text-lg font-bold text-green-600">{visitorInfo.isUniqueToday ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-green-800">Site Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{stats.todayUniqueVisitors}</p>
                        <p className="text-sm text-gray-600">Today's Unique Visitors</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{stats.todayPageViews}</p>
                        <p className="text-sm text-gray-600">Today's Page Views</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{stats.totalUniqueVisitors}</p>
                        <p className="text-sm text-gray-600">Total Unique Visitors (30 days)</p>
                    </div>
                </div>
            </div>

            {/* Recent Daily Stats */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Recent Daily Stats</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Date</th>
                                <th className="text-left p-2">Unique Visitors</th>
                                <th className="text-left p-2">Page Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.last30DaysStats.slice(-7).map((day, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{day.date}</td>
                                    <td className="p-2">{day.uniqueVisitors}</td>
                                    <td className="p-2">{day.totalPageViews}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={refreshData}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Refresh Data
                </button>
                <button
                    onClick={handleClearData}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Clear All Data (Testing)
                </button>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-yellow-800">How It Works</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Each visitor gets a unique ID based on browser fingerprinting</li>
                    <li>• Unique visitors are counted only once per day</li>
                    <li>• Page views are counted on every page navigation</li>
                    <li>• Data is stored locally in browser localStorage</li>
                    <li>• Works without backend - pure frontend solution</li>
                    <li>• Try opening in incognito mode to see a new visitor</li>
                </ul>
            </div>
        </div>
    );
};

export default VisitorTrackingDemo; 