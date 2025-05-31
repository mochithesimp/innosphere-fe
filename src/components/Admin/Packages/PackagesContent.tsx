import React, { useState, useMemo, useEffect, useRef } from 'react';
import { IoFunnelOutline, IoCalendarOutline, IoChevronDownOutline, IoRefreshOutline, IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface PackageData {
    id: string;
    name: string;
    serviceType: string;
    date: string;
    type: string;
    status: string;
}

interface ModalData {
    name: string;
    type: string;
}

const PackagesContent: React.FC = () => {
    const [filterType] = useState('Lọc theo');
    const [filterDate, setFilterDate] = useState('');
    const [filterService, setFilterService] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState<string[]>([]);
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [modalData, setModalData] = useState<ModalData | null>(null);

    const serviceDropdownRef = useRef<HTMLDivElement>(null);
    const statusDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
                setShowServiceDropdown(false);
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
                setShowStatusDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const packagesData: PackageData[] = [
        {
            id: '00001',
            name: 'Le Thanh Vu',
            serviceType: 'Quảng cáo',
            date: '19 Tháng 3 2025',
            type: 'Đầu trang',
            status: 'Hoàn thành'
        },
        {
            id: '00002',
            name: 'Vu Le Thanh',
            serviceType: 'Quảng cáo',
            date: '19 Tháng 3 2025',
            type: 'Đầu trang',
            status: 'Đang xử lý'
        },
        {
            id: '00003',
            name: 'Thanh Vu Le',
            serviceType: 'Gói thành viên',
            date: '19 Tháng 3 2025',
            type: 'Đầu trang',
            status: 'Từ chối'
        },
        {
            id: '00004',
            name: 'Lu Thanh Ve',
            serviceType: 'Quảng cáo',
            date: '19 Tháng 3 2025',
            type: 'Giữa trang',
            status: 'Hoàn thành'
        },
        {
            id: '00005',
            name: 'Mochi',
            serviceType: 'Gói thành viên',
            date: '18 Tháng 3 2025',
            type: 'Cuối trang',
            status: 'Đang xử lý'
        },
        {
            id: '00006',
            name: 'Mochi the Cutie',
            serviceType: 'Quảng cáo',
            date: '18 Tháng 3 2025',
            type: 'Giữa trang',
            status: 'Hoàn thành'
        },
        {
            id: '00007',
            name: 'Mochi the Simp',
            serviceType: 'Gói thành viên',
            date: '18 Tháng 3 2025',
            type: 'Giữa trang',
            status: 'Đang xử lý'
        },
        {
            id: '00008',
            name: 'Anh Vu Le',
            serviceType: 'Quảng cáo',
            date: '17 Tháng 3 2025',
            type: 'Đầu trang',
            status: 'Đang chờ'
        },
        {
            id: '00009',
            name: 'Le Vu Anh',
            serviceType: 'Gói thành viên',
            date: '17 Tháng 3 2025',
            type: 'Cuối trang',
            status: 'Hoàn thành'
        }
    ];

    const serviceTypes = ['Quảng Cáo', 'Gói thành viên'];
    const statusOptions = ['Hoàn thành', 'Đang xử lý', 'Từ chối', 'Đang chờ'];

    // Filter the data based on selected filters
    const filteredData = useMemo(() => {
        return packagesData.filter(item => {
            const matchesService = filterService.length === 0 || filterService.some(service =>
                item.serviceType.toLowerCase() === service.toLowerCase()
            );
            const matchesStatus = filterStatus.length === 0 || filterStatus.includes(item.status);
            const matchesDate = !filterDate || item.date.includes(convertDateFormat(filterDate));

            return matchesService && matchesStatus && matchesDate;
        });
    }, [filterService, filterStatus, filterDate]);

    // Convert date from YYYY-MM-DD to Vietnamese format
    const convertDateFormat = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day} Tháng ${month} ${year}`;
    };

    const resetFilters = () => {
        setFilterDate('');
        setFilterService([]);
        setFilterStatus([]);
    };

    const toggleServiceFilter = (service: string) => {
        setFilterService(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const toggleStatusFilter = (status: string) => {
        setFilterStatus(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const applyServiceFilter = () => {
        setShowServiceDropdown(false);
    };

    const applyStatusFilter = () => {
        setShowStatusDropdown(false);
    };

    const openImageModal = (name: string, type: string) => {
        setModalData({ name, type });
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
        setModalData(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Hoàn thành':
                return 'bg-green-100 text-green-800';
            case 'Đang xử lý':
                return 'bg-purple-100 text-purple-800';
            case 'Từ chối':
                return 'bg-red-100 text-red-800';
            case 'Đang chờ':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <style>
                {`
                    .service-filter-selected {
                        background-color: #309689 !important;
                        color: white !important;
                        border-color: #309689 !important;
                    }
                    .service-filter-unselected {
                        background-color: white !important;
                        color: #374151 !important;
                        border-color: #d1d5db !important;
                    }
                    .service-filter-unselected:hover {
                        background-color: #f9fafb !important;
                    }
                    .filter-apply-button {
                        background-color: #309689 !important;
                        color: white !important;
                        border: none !important;
                    }
                    .filter-apply-button:hover {
                        opacity: 0.9 !important;
                    }
                `}
            </style>

            {/* Header with filters */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-start space-x-4">
                    {/* Filter Icon */}
                    <div className="flex items-center text-gray-500">
                        <IoFunnelOutline className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">{filterType}</span>
                        <IoChevronDownOutline className="h-4 w-4 ml-1" />
                    </div>

                    {/* Date Filter */}
                    <div className="flex items-center text-gray-500 border border-gray-300 rounded-lg px-3 py-2">
                        <IoCalendarOutline className="h-4 w-4 mr-2" />
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="text-sm bg-transparent border-none outline-none cursor-pointer"
                            placeholder="Chọn ngày"
                        />
                    </div>

                    {/* Service Type Filter */}
                    <div className="relative" ref={serviceDropdownRef}>
                        <button
                            onClick={() => {
                                setShowServiceDropdown(!showServiceDropdown);
                                setShowStatusDropdown(false); // Close status dropdown
                            }}
                            className="flex items-center text-gray-500 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
                        >
                            <span className="text-sm">
                                {filterService.length > 0 ? `${filterService.length} đã chọn` : 'Loại dịch vụ'}
                            </span>
                            <IoChevronDownOutline className="h-4 w-4 ml-2" />
                        </button>
                        {showServiceDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn loại dịch vụ</h3>

                                <div className="flex gap-3 mb-4">
                                    {serviceTypes.map((service) => {
                                        const isSelected = filterService.includes(service);
                                        return (
                                            <button
                                                key={service}
                                                onClick={() => toggleServiceFilter(service)}
                                                className={`flex-1 px-4 py-3 text-center text-sm rounded-lg border transition-colors ${isSelected
                                                    ? 'service-filter-selected'
                                                    : 'service-filter-unselected'
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        );
                                    })}
                                </div>

                                <p className="text-sm text-gray-500 mb-4">* Bạn có thể chọn nhiều loại Dịch Vụ.</p>

                                <button
                                    onClick={applyServiceFilter}
                                    className="w-full px-4 py-2 text-sm rounded-lg transition-colors filter-apply-button"
                                >
                                    Bắt đầu lọc
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Status Filter */}
                    <div className="relative" ref={statusDropdownRef}>
                        <button
                            onClick={() => {
                                setShowStatusDropdown(!showStatusDropdown);
                                setShowServiceDropdown(false); // Close service dropdown
                            }}
                            className="flex items-center text-gray-500 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
                        >
                            <span className="text-sm">
                                {filterStatus.length > 0 ? `${filterStatus.length} đã chọn` : 'Trạng thái'}
                            </span>
                            <IoChevronDownOutline className="h-4 w-4 ml-2" />
                        </button>
                        {showStatusDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn trạng thái</h3>

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {statusOptions.map((status) => {
                                        const isSelected = filterStatus.includes(status);
                                        return (
                                            <button
                                                key={status}
                                                onClick={() => toggleStatusFilter(status)}
                                                className={`px-4 py-3 text-center text-sm rounded-lg border transition-colors ${isSelected
                                                    ? 'service-filter-selected'
                                                    : 'service-filter-unselected'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        );
                                    })}
                                </div>

                                <p className="text-sm text-gray-500 mb-4">* Bạn có thể chọn nhiều Trạng thái.</p>

                                <button
                                    onClick={applyStatusFilter}
                                    className="w-full px-4 py-2 text-sm rounded-lg transition-colors filter-apply-button"
                                >
                                    Bắt đầu lọc
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Reset Filter Button */}
                    <button
                        onClick={resetFilters}
                        className="flex items-center text-red-500 text-sm font-medium hover:text-red-700"
                    >
                        <IoRefreshOutline className="h-4 w-4 mr-1 text-red-500" />
                        <span className="ml-1 text-red-500">Đặt lại bộ lọc</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tên
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Loại dịch vụ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Loại
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tình trạng
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                                    {item.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left">
                                    <div className="flex items-center justify-start">
                                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900">
                                    <div className="flex items-center justify-start">
                                        <span>{item.serviceType}</span>
                                        <button
                                            onClick={() => openImageModal(item.name, item.type)}
                                            className="ml-2 px-3 py-1 text-xs rounded-full hover:bg-gray-50"
                                            style={{
                                                color: '#123288',
                                                borderColor: '#123288',
                                                border: '1px solid #123288'
                                            }}
                                        >
                                            Xem ảnh
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900">
                                    {item.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-start space-x-4">
                    <div className="text-sm text-gray-700">
                        Hiển thị 1-{filteredData.length} trên {filteredData.length}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {showImageModal && modalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Đăng tải quảng cáo: <span className="font-bold">{modalData.type}</span>
                            </h2>
                            <button
                                onClick={closeImageModal}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <IoCloseOutline className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 pb-8">
                            {/* User Info */}
                            <div className="mb-6">
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Người dùng
                                </label>
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-left">
                                    <span className="text-sm text-gray-900">{modalData.name}</span>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="mb-6">
                                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Hình ảnh
                                </label>
                                <div className="relative bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-8">
                                    {/* Navigation Arrows */}
                                    <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50">
                                        <IoChevronBackOutline className="h-6 w-6 text-gray-600" />
                                    </button>
                                    <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50">
                                        <IoChevronForwardOutline className="h-6 w-6 text-gray-600" />
                                    </button>

                                    {/* Image Placeholder */}
                                    <div className="flex flex-col items-center justify-center h-64">
                                        <div className="w-48 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4 flex items-center justify-center relative">
                                            <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full absolute top-4 left-4"></div>
                                            <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Upload Button positioned outside the image box */}
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="px-6 py-2 text-sm rounded-lg border hover:bg-gray-50 transition-colors"
                                        style={{ color: '#309689', borderColor: '#309689' }}
                                    >
                                        Tải Hình Ảnh
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackagesContent; 