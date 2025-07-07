import React from 'react';

const StatisticsContent: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Today's Money Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1 text-left">Today's Money</p>
                            <p className="text-xl font-bold text-gray-900 text-left">$53,000</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-green-600 font-medium text-left">+55%</span>
                            </div>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Today's Users Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1 text-left">Today's Users</p>
                            <p className="text-xl font-bold text-gray-900 text-left">2,300</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-green-600 font-medium text-left">+3%</span>
                            </div>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* New Clients Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1 text-left">New Clients</p>
                            <p className="text-xl font-bold text-gray-900 text-left">+3,052</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-red-500 font-medium text-left">-14%</span>
                            </div>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Sales Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1 text-left">Sales</p>
                            <p className="text-xl font-bold text-gray-900 text-left">$173,000</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-green-600 font-medium text-left">+8%</span>
                            </div>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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
                    <p className="text-teal-400 text-sm mb-6 text-left">(+23) more in 2021</p>

                    {/* Simple Bar Chart */}
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

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-left">Users</p>
                                <p className="text-white font-bold text-lg text-left">32,984</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-left">Clicks</p>
                                <p className="text-white font-bold text-lg text-left">2,42m</p>
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
                                <p className="text-white font-bold text-lg text-left">2,400$</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-left">Items</p>
                                <p className="text-white font-bold text-lg text-left">320</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Overview Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-left">
                            <h3 className="text-lg font-semibold text-gray-900 text-left">Sales overview</h3>
                            <p className="text-teal-600 text-sm text-left">(+5) more in 2021</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Projects Section */}
                <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-left">
                            <h3 className="text-lg font-semibold text-gray-900 text-left">Projects</h3>
                            <p className="text-teal-600 text-sm text-left">30 done this month</p>
                        </div>
                    </div>

                    {/* Projects Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <th className="pb-3 text-left">Companies</th>
                                    <th className="pb-3 text-left">Members</th>
                                    <th className="pb-3 text-left w-24">Budget</th>
                                    <th className="pb-3 text-left">Completion</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-4">
                                {/* Chakra Soft UI Version */}
                                <tr className="border-b border-gray-100">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="bg-purple-100 p-2 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-gray-900 text-left">Chakra Soft UI Version</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">A</span>
                                            </div>
                                            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">B</span>
                                            </div>
                                            <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">C</span>
                                            </div>
                                            <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">D</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 w-24">
                                        <span className="font-medium text-gray-900">$14,000</span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                            </div>
                                            <span className="text-sm text-gray-600 text-left">60%</span>
                                        </div>
                                    </td>
                                </tr>

                                {/* Add Progress Track */}
                                <tr className="border-b border-gray-100">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-gray-900 text-left">Add Progress Track</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">E</span>
                                            </div>
                                            <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">F</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 w-24">
                                        <span className="font-medium text-gray-900">$3,000</span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                                            </div>
                                            <span className="text-sm text-gray-600 text-left">10%</span>
                                        </div>
                                    </td>
                                </tr>

                                {/* Fix Platform Errors */}
                                <tr className="border-b border-gray-100">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="bg-red-100 p-2 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-gray-900 text-left">Fix Platform Errors</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 bg-indigo-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">G</span>
                                            </div>
                                            <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">H</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 w-24">
                                        <span className="text-gray-500">Not set</span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                            <span className="text-sm text-gray-600 text-left">100%</span>
                                        </div>
                                    </td>
                                </tr>

                                {/* Launch our Mobile App */}
                                <tr className="border-b border-gray-100">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="bg-green-100 p-2 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-gray-900 text-left">Launch our Mobile App</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">I</span>
                                            </div>
                                            <div className="w-8 h-8 bg-cyan-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">J</span>
                                            </div>
                                            <div className="w-8 h-8 bg-lime-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">K</span>
                                            </div>
                                            <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">L</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 w-24">
                                        <span className="font-medium text-gray-900">$32,000</span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                            <span className="text-sm text-gray-600 text-left">100%</span>
                                        </div>
                                    </td>
                                </tr>

                                {/* Add the New Pricing Page */}
                                <tr className="border-b border-gray-100">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-gray-900 text-left">Add the New Pricing Page</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 bg-violet-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">M</span>
                                            </div>
                                            <div className="w-8 h-8 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">N</span>
                                            </div>
                                            <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">O</span>
                                            </div>
                                            <div className="w-8 h-8 bg-sky-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">P</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 w-24">
                                        <span className="font-medium text-gray-900">$400</span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                                            </div>
                                            <span className="text-sm text-gray-600 text-left">25%</span>
                                        </div>
                                    </td>
                                </tr>

                                {/* Redesign New Online Shop */}
                                <tr>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="bg-purple-100 p-2 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-gray-900 text-left">Redesign New Online Shop</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">Q</span>
                                            </div>
                                            <div className="w-8 h-8 bg-slate-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">R</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 w-24">
                                        <span className="font-medium text-gray-900">$7,600</span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                                            </div>
                                            <span className="text-sm text-gray-600 text-left">40%</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Orders Overview Section */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-left">
                            <h3 className="text-lg font-semibold text-gray-900 text-left">Orders overview</h3>
                            <p className="text-teal-600 text-sm text-left">+30% this month</p>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-2 rounded-lg mr-4">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-medium text-gray-900 text-left">$2400, Design changes</p>
                                <p className="text-sm text-gray-500 text-left">22 DEC 7:20 PM</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-red-100 p-2 rounded-lg mr-4">
                                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-medium text-gray-900 text-left">New order #4219423</p>
                                <p className="text-sm text-gray-500 text-left">21 DEC 11:21 PM</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-medium text-gray-900 text-left">Server Payments for April</p>
                                <p className="text-sm text-gray-500 text-left">21 DEC 9:28 PM</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                                <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-medium text-gray-900 text-left">New card added for order #3210145</p>
                                <p className="text-sm text-gray-500 text-left">20 DEC 2:20 PM</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-purple-100 p-2 rounded-lg mr-4">
                                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-medium text-gray-900 text-left">Unlock packages for Development</p>
                                <p className="text-sm text-gray-500 text-left">18 DEC 4:54 PM</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-lg mr-4">
                                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-medium text-gray-900 text-left">New order #9851258</p>
                                <p className="text-sm text-gray-500 text-left">18 DEC 4:41 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsContent; 