import React, { useState, useEffect } from 'react';
import { getTotalTimeSpentToday, formatTime, getCurrentVisitorInfo } from '../utils/visitorTracking';

const TimeTrackingTest: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [visitorInfo, setVisitorInfo] = useState<{
        visitorId: string;
        totalVisits: number;
        isUniqueToday: boolean;
    } | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeSpent = getTotalTimeSpentToday();
            const info = getCurrentVisitorInfo();
            setCurrentTime(timeSpent);
            setVisitorInfo(info);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Time Tracking Test Page</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Real-time Time Display */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">Current Session Time</h2>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">
                                {formatTime(currentTime)}
                            </div>
                            <p className="text-gray-600">Active time on this website</p>
                        </div>
                    </div>

                    {/* Visitor Info */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-purple-600">Visitor Information</h2>
                        {visitorInfo && (
                            <div className="space-y-2">
                                <p><span className="font-medium">Visitor ID:</span> {visitorInfo.visitorId.substring(0, 20)}...</p>
                                <p><span className="font-medium">Total Visits:</span> {visitorInfo.totalVisits}</p>
                                <p><span className="font-medium">Unique Today:</span> {visitorInfo.isUniqueToday ? 'Yes' : 'No'}</p>
                            </div>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="md:col-span-2 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                        <h3 className="text-lg font-semibold mb-3 text-yellow-800">Test Instructions</h3>
                        <ul className="text-yellow-700 space-y-2">
                            <li>• The timer above shows your active time on this website</li>
                            <li>• It only counts when the page is visible and you're actively using it</li>
                            <li>• Try switching to another tab - the timer should pause</li>
                            <li>• Come back to this tab - the timer should resume</li>
                            <li>• The time is saved and will persist across page refreshes</li>
                            <li>• Check the admin dashboard to see the total access time</li>
                        </ul>
                    </div>

                    {/* Activity Status */}
                    <div className="md:col-span-2 bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold mb-3 text-blue-800">Activity Detection</h3>
                        <p className="text-blue-700">
                            The system tracks when you're actively using the page by monitoring:
                        </p>
                        <ul className="text-blue-700 mt-2 space-y-1">
                            <li>• Page visibility (tab focus)</li>
                            <li>• Mouse movements</li>
                            <li>• Keyboard activity</li>
                            <li>• Scrolling</li>
                            <li>• Clicks</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeTrackingTest; 