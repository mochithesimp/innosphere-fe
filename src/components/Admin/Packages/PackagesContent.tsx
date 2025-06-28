import React, { useState, useMemo, useEffect, useRef } from 'react';
import { IoFunnelOutline, IoCalendarOutline, IoChevronDownOutline, IoRefreshOutline, IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline, IoEllipsisVertical } from 'react-icons/io5';
import { AdminService, PackageDisplayData, AdvertisementModel, JobPostingModel, SubscriptionModel } from '../../../services';
import { AxiosError } from 'axios';
import JobPostingDetailModal from '../JobPostingDetailModal';
import Swal from 'sweetalert2';
import { downloadFileFromUrl, getFilenameFromUrl } from '../../../utils/fileDownload';

interface ModalData {
    name: string;
    type: string;
    imageUrl?: string;
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
    const [showJobDetailModal, setShowJobDetailModal] = useState(false);
    const [selectedJobPosting, setSelectedJobPosting] = useState<JobPostingModel | null>(null);

    // API data states
    const [apiPackagesData, setApiPackagesData] = useState<PackageDisplayData[]>([]);
    const [isApiLoading, setIsApiLoading] = useState(true);
    const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    // Loading state for status updates
    const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

    const serviceDropdownRef = useRef<HTMLDivElement>(null);
    const statusDropdownRef = useRef<HTMLDivElement>(null);
    const actionDropdownRef = useRef<HTMLDivElement>(null);

    // Load data from APIs
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsApiLoading(true);

                // Debug: Check current token and user info
                const token = localStorage.getItem('token');
                console.log('🔑 Current token:', token ? 'Token exists' : 'No token');
                if (token) {
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        console.log('🔍 Token payload:', payload);
                        console.log('👤 User roles:', payload.role || 'No role found');
                    } catch (e) {
                        console.error('❌ Failed to decode token:', e);
                    }
                }

                const [advertisements, jobPostings, subscriptions] = await Promise.all([
                    AdminService.getAllAdvertisements(),
                    AdminService.getAllJobPostings(),
                    AdminService.getAllSubscriptions()
                ]);

                const combinedData = AdminService.convertToDisplayData(
                    advertisements,
                    jobPostings,
                    subscriptions
                );

                setApiPackagesData(combinedData);
            } catch (error) {
                console.error('Error fetching admin packages data:', error);
                if (error instanceof AxiosError) {
                    console.error('Error details:', error.response?.data);
                    console.error('Error status:', error.response?.status);
                }
            } finally {
                setIsApiLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
                setShowServiceDropdown(false);
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
                setShowStatusDropdown(false);
            }
            if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target as Node)) {
                setDropdownOpenId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Use API data or fallback to empty array while loading
    const packagesData = isApiLoading ? [] : apiPackagesData;

    const serviceTypes = ['Quảng Cáo', 'Đăng tin', 'Gói thành viên'];
    const statusOptions = ['Hoàn thành', 'Đang xử lý', 'Từ chối', 'Đang chờ', 'Đồng ý'];

    // Filter the data based on selected filters
    const filteredData = useMemo(() => {
        return packagesData.filter(item => {
            const matchesService = filterService.length === 0 || filterService.some(service =>
                item.serviceType.toLowerCase() === service.toLowerCase()
            );
            const matchesStatus = filterStatus.length === 0 || filterStatus.includes(item.status);

            // Fix date filtering - compare actual dates instead of formatted strings
            let matchesDate = true;
            if (filterDate) {
                const filterDateObj = new Date(filterDate);
                const itemDateObj = new Date(
                    item.originalType === 'advertisement' ? (item.originalData as AdvertisementModel).startDate :
                        item.originalType === 'jobposting' ? (item.originalData as JobPostingModel).postedAt :
                            (item.originalData as SubscriptionModel).startDate
                );

                // Compare only the date part (ignore time)
                const filterDateStr = filterDateObj.toDateString();
                const itemDateStr = itemDateObj.toDateString();
                matchesDate = filterDateStr === itemDateStr;

                // Debug logging for date filter
                if (packagesData.length > 0 && packagesData.indexOf(item) === 0) {
                    console.log('🗓️ Date Filter Debug:');
                    console.log('Filter Date:', filterDate, '→', filterDateStr);
                    console.log('Item Date:', itemDateObj.toISOString().split('T')[0], '→', itemDateStr);
                    console.log('Match:', matchesDate);
                }
            }

            return matchesService && matchesStatus && matchesDate;
        });
    }, [packagesData, filterService, filterStatus, filterDate]);

    // Paginate the filtered data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filterService, filterStatus, filterDate]);

    const resetFilters = () => {
        setFilterDate('');
        setFilterService([]);
        setFilterStatus([]);
        setCurrentPage(1);
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
        // Page reset is handled by useEffect
    };

    const applyStatusFilter = () => {
        setShowStatusDropdown(false);
        // Page reset is handled by useEffect
    };

    const openImageModal = (name: string, type: string, imageUrl?: string) => {
        setModalData({ name, type, imageUrl });
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
        setModalData(null);
    };

    // Handle image download
    const handleImageDownload = async () => {
        if (!modalData?.imageUrl) {
            Swal.fire('Lỗi', 'Không có hình ảnh để tải xuống', 'error');
            return;
        }

        try {
            console.log('🚀 Starting image download...');

            // Generate filename based on advertisement info
            const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
            const baseFilename = `quangcao_${modalData.type}_${timestamp}`;

            // Try to get original filename, or use generated one with appropriate extension
            let filename = getFilenameFromUrl(modalData.imageUrl);
            if (!filename || filename === 'cv-document.pdf') {
                // If we can't get a good filename, create one with proper extension
                const hasExtension = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(modalData.imageUrl);
                const extension = hasExtension ? modalData.imageUrl.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i)?.[0] || '.jpg' : '.jpg';
                filename = `${baseFilename}${extension}`;
            }

            // Use existing download utility
            await downloadFileFromUrl(modalData.imageUrl, filename);

            console.log('✅ Image download completed');

        } catch (error) {
            console.error('❌ Error downloading image:', error);
            Swal.fire('Lỗi', 'Không thể tải xuống hình ảnh. Vui lòng thử lại.', 'error');
        }
    };

    const openJobDetailModal = async (jobPostingId: number) => {
        try {
            const jobPosting = await AdminService.getJobPostingById(jobPostingId);
            if (jobPosting) {
                setSelectedJobPosting(jobPosting);
                setShowJobDetailModal(true);
            }
        } catch (error) {
            console.error('Error fetching job posting details:', error);
        }
    };

    const closeJobDetailModal = () => {
        setShowJobDetailModal(false);
        setSelectedJobPosting(null);
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
            case 'Đồng ý':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleStatusUpdate = async (item: PackageDisplayData, newStatus: string) => {
        try {
            setUpdatingItemId(item.id);
            setDropdownOpenId(null);

            const action = newStatus === 'Đồng ý' ? 'approve' : 'reject';

            if (item.originalType === 'advertisement') {
                const originalAd = item.originalData as AdvertisementModel;
                await AdminService.updateAdvertisementStatus(originalAd.id, action);
                console.log(`✅ Advertisement ${originalAd.id} ${action}d successfully`);
            } else if (item.originalType === 'jobposting') {
                const originalJp = item.originalData as JobPostingModel;
                await AdminService.updateJobPostingStatus(originalJp.id, action);
                console.log(`✅ Job Posting ${originalJp.id} ${action}d successfully`);
            }

            // Refresh data after successful update
            const [advertisements, jobPostings, subscriptions] = await Promise.all([
                AdminService.getAllAdvertisements(),
                AdminService.getAllJobPostings(),
                AdminService.getAllSubscriptions()
            ]);

            const combinedData = AdminService.convertToDisplayData(
                advertisements,
                jobPostings,
                subscriptions
            );

            setApiPackagesData(combinedData);
        } catch (error) {
            console.error('❌ Error updating status:', error);
            if (error instanceof AxiosError) {
                console.error('Error details:', error.response?.data);
                console.error('Error status:', error.response?.status);
            }
        } finally {
            setUpdatingItemId(null);
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isApiLoading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : paginatedData.map((item) => (
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
                                        {item.serviceType === 'Quảng cáo' && (
                                            <button
                                                onClick={() => {
                                                    const originalAd = item.originalData as AdvertisementModel;
                                                    openImageModal(item.name, item.type, originalAd.imageUrl);
                                                }}
                                                className="ml-2 px-3 py-1 text-xs rounded-full hover:bg-gray-50"
                                                style={{
                                                    color: '#123288',
                                                    borderColor: '#123288',
                                                    border: '1px solid #123288'
                                                }}
                                            >
                                                Xem ảnh
                                            </button>
                                        )}
                                        {item.serviceType === 'Đăng tin' && (
                                            <button
                                                onClick={() => {
                                                    const originalJp = item.originalData as JobPostingModel;
                                                    openJobDetailModal(originalJp.id);
                                                }}
                                                className="ml-2 px-3 py-1 text-xs rounded-full hover:bg-gray-50"
                                                style={{
                                                    color: '#123288',
                                                    borderColor: '#123288',
                                                    border: '1px solid #123288'
                                                }}
                                            >
                                                Xem chi tiết
                                            </button>
                                        )}
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
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {item.status === 'Đang chờ' && (item.originalType === 'advertisement' || item.originalType === 'jobposting') && (
                                        <div className="relative" ref={actionDropdownRef}>
                                            <button
                                                onClick={() => setDropdownOpenId(dropdownOpenId === item.id ? null : item.id)}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                                disabled={updatingItemId === item.id}
                                            >
                                                {updatingItemId === item.id ? (
                                                    <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                                                ) : (
                                                    <IoEllipsisVertical className="h-5 w-5" />
                                                )}
                                            </button>
                                            {dropdownOpenId === item.id && (
                                                <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => handleStatusUpdate(item, 'Đồng ý')}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        >
                                                            Đồng ý
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(item, 'Từ chối')}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        >
                                                            Từ chối
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Hiển thị {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredData.length)} trên {filteredData.length}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-700">
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
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

                                    {/* Image Display */}
                                    <div className="flex flex-col items-center justify-center h-64">
                                        {modalData.imageUrl ? (
                                            <img
                                                src={modalData.imageUrl}
                                                alt="Advertisement"
                                                className="max-w-full max-h-full object-contain rounded-lg"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "/hiring.png";
                                                }}
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-sm">Không có hình ảnh</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Upload Button positioned outside the image box */}
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={handleImageDownload}
                                        disabled={!modalData.imageUrl}
                                        className={`px-6 py-2 text-sm rounded-lg border transition-colors ${modalData.imageUrl
                                            ? 'hover:bg-gray-50'
                                            : 'opacity-50 cursor-not-allowed'
                                            }`}
                                        style={{
                                            color: modalData.imageUrl ? '#309689' : '#9CA3AF',
                                            borderColor: modalData.imageUrl ? '#309689' : '#9CA3AF'
                                        }}
                                    >
                                        {modalData.imageUrl ? 'Tải Hình Ảnh' : 'Không có hình ảnh'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Job Posting Detail Modal */}
            <JobPostingDetailModal
                isOpen={showJobDetailModal}
                onClose={closeJobDetailModal}
                jobPosting={selectedJobPosting}
            />
        </div>
    );
};

export default PackagesContent; 