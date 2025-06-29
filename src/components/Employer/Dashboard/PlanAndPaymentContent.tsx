import React, { useState, useEffect } from 'react';
import { RiCheckLine, RiDownload2Line } from 'react-icons/ri';
import { FiInfo, FiAlertCircle } from 'react-icons/fi';
import { getUserIdFromToken } from '../../../utils/jwtHelper';
import { SubscriptionService, Subscription } from '../../../services/subscriptionService';
import { AdvertisementService, AdvertisementModel } from '../../../services/advertisementService';
import PaymentReceiptService from '../../../services/paymentReceiptService';

interface CombinedTransaction {
    id: string;
    date: string;
    type: string;
    plan: string;
    amount: string;
    transactionId: string;
    sortDate: Date;
    rawData: Subscription | AdvertisementModel;
}

const PlanAndPaymentContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [transactions, setTransactions] = useState<CombinedTransaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const totalPages = 5;

    // Function to get plan name from subscriptionPackageId
    const getPlanName = (subscriptionPackageId: number): string => {
        switch (subscriptionPackageId) {
            case 1:
                return 'Cơ Bản';
            case 2:
                return 'Tiêu Chuẩn';
            case 3:
                return 'Cao Cấp';
            default:
                return 'Không xác định';
        }
    };

    // Function to format amount
    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Function to format date
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fetch transactions data from both APIs
    const fetchTransactionsData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const userId = getUserIdFromToken(token);
            if (!userId) {
                throw new Error('Cannot get user ID from token');
            }

            // Convert userId to number for API calls
            const employerId = parseInt(userId);

            // Fetch both subscription and advertisement data
            const [subscriptions, advertisements] = await Promise.all([
                SubscriptionService.getSubscriptionsByEmployer(employerId),
                AdvertisementService.getAdvertisementsByEmployer(employerId)
            ]);

            console.log('Fetched subscriptions:', subscriptions);
            console.log('Fetched advertisements:', advertisements);

            // Convert subscription data to CombinedTransaction format
            const subscriptionTransactions: CombinedTransaction[] = subscriptions.map(sub => ({
                id: `#${sub.id}`,
                date: formatDate(sub.startDate),
                type: 'Gói thành viên',
                plan: getPlanName(sub.subscriptionPackageId),
                amount: formatAmount(sub.amountPaid),
                transactionId: sub.transactionId,
                sortDate: new Date(sub.startDate),
                rawData: sub
            }));

            // Convert advertisement data to CombinedTransaction format
            const advertisementTransactions: CombinedTransaction[] = advertisements.map(ad => ({
                id: `#${ad.id}`,
                date: formatDate(ad.startDate),
                type: 'Quảng cáo',
                plan: ad.adTitle,
                amount: formatAmount(ad.price),
                transactionId: ad.transactionId,
                sortDate: new Date(ad.startDate),
                rawData: ad
            }));

            // Combine and sort by date (newest first)
            const combinedTransactions = [...subscriptionTransactions, ...advertisementTransactions]
                .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

            setTransactions(combinedTransactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch transactions');
        } finally {
            setIsLoading(false);
        }
    };

    // Download single receipt
    const handleDownloadReceipt = async (transaction: CombinedTransaction) => {
        if (!transaction.transactionId || transaction.transactionId.trim() === '') {
            alert('Không có mã giao dịch để tải biên lai');
            return;
        }

        try {
            setDownloadingId(transaction.transactionId);

            if (transaction.type === 'Gói thành viên') {
                const subscription = transaction.rawData as Subscription;
                await PaymentReceiptService.downloadReceipt(
                    transaction.transactionId,
                    'Khách hàng', // You can get this from employer profile if needed
                    transaction.plan,
                    {
                        amountPaid: subscription.amountPaid,
                        startDate: subscription.startDate,
                        paymentStatus: subscription.paymentStatus
                    }
                );
            } else {
                const advertisement = transaction.rawData as AdvertisementModel;
                await PaymentReceiptService.downloadReceipt(
                    transaction.transactionId,
                    'Khách hàng', // You can get this from employer profile if needed
                    `Quảng cáo ${advertisement.adTitle}`,
                    {
                        amountPaid: advertisement.price,
                        startDate: advertisement.startDate,
                        paymentStatus: 'PAID'
                    }
                );
            }
        } catch (error) {
            console.error('Download receipt error:', error);
            alert(`Lỗi: ${error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải biên lai'}`);
        } finally {
            setDownloadingId(null);
        }
    };

    // Download all receipts
    const handleDownloadAllReceipts = async () => {
        const transactionsWithId = transactions.filter(t => t.transactionId && t.transactionId.trim() !== '');

        if (transactionsWithId.length === 0) {
            alert('Không có giao dịch nào có mã để tải về');
            return;
        }

        try {
            setDownloadingId('ALL');

            // Generate combined HTML for all transactions
            let combinedHTML = `
                <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background: #fff;">
                    <div style="text-align: center; border-bottom: 3px solid #309689; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="color: #309689; margin: 0; font-size: 28px;">INNOSPHERE</h1>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 16px;">Báo cáo tất cả giao dịch</p>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">
                            Tạo ngày: ${new Date().toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
                        </p>
                    </div>

                    <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                        <h3 style="margin: 0; color: #333;">Tổng quan</h3>
                        <p style="margin: 5px 0; color: #666;">
                            Tổng số giao dịch: <strong>${transactionsWithId.length}</strong>
                        </p>
                    </div>
            `;

            // Add each transaction
            transactionsWithId.forEach((transaction, index) => {
                const providerName = PaymentReceiptService.getProviderName(transaction.transactionId);

                combinedHTML += `
                    <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;">
                        <h3 style="color: #309689; margin: 0 0 15px 0; font-size: 18px;">
                            Giao dịch #${index + 1} - ${transaction.type}
                        </h3>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; width: 30%;">Mã giao dịch:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${transaction.transactionId}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Phương thức:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${providerName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Loại:</td>
                                <td style="padding: 8px 0; color: #333;">${transaction.type}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Gói/Sản phẩm:</td>
                                <td style="padding: 8px 0; color: #333;">${transaction.plan}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Ngày giao dịch:</td>
                                <td style="padding: 8px 0; color: #333;">${transaction.date}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Số tiền:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #309689; font-size: 16px;">
                                    ${transaction.amount}
                                </td>
                            </tr>
                        </table>
                    </div>
                `;
            });

            combinedHTML += '</div>';

            // Create and download PDF
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>Tất cả giao dịch - InnoSphere</title>
                            <style>
                                @media print {
                                    body { margin: 0; }
                                    .page-break { page-break-before: always; }
                                }
                            </style>
                        </head>
                        <body>
                            ${combinedHTML}
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 1000);
            }
        } catch (error) {
            console.error('Download all receipts error:', error);
            alert(`Lỗi: ${error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải tất cả biên lai'}`);
        } finally {
            setDownloadingId(null);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchTransactionsData();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Plan Section */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-md font-medium text-gray-500 mb-2 text-left">Gói hiện tại</h2>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-left">Cao cấp</h3>

                        <div className="flex space-x-3 mb-4 justify-start">
                            <button className="px-8 py-2 bg-gray-100 text-[#309689] rounded-md hover:bg-gray-200 text-left">
                                Đổi Gói
                            </button>
                            <button className="px-8 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-left">
                                Hủy Bỏ Gói
                            </button>
                        </div>
                    </div>
                </div>

                {/* Plan Benefits */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-md font-medium text-gray-500 mb-4 text-left">Quyền lợi của gói</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ul className="space-y-4">
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Đăng 15 việc làm</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Làm nổi bật công việc với màu sắc</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Khả năng hiển thị sơ yếu lý lịch trong 60 ngày</span>
                                </li>
                            </ul>

                            <ul className="space-y-4">
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Công việc khẩn cấp và nổi bật</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Truy cập và lưu 20 ứng viên</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <span className="text-[#309689] mr-2"><RiCheckLine size={18} /></span>
                                    <span className="text-gray-600 text-left">Hỗ trợ quản trọng 24/7</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h5 className="text-xs text-gray-500 mb-3 text-left">Remaining</h5>
                            <ul className="space-y-2">
                                <li className="flex items-center justify-start">
                                    <FiInfo className="text-[#309689] mr-2" />
                                    <span className="text-gray-600 text-left">Còn 6 ứng viên có thể lưu</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <FiAlertCircle className="text-red-500 mr-2" />
                                    <span className="text-gray-600 text-left">Còn 15 ngày hiển thị lý lịch</span>
                                </li>
                                <li className="flex items-center justify-start">
                                    <FiAlertCircle className="text-red-500 mr-2" />
                                    <span className="text-gray-600 text-left">4 Đăng tuyển dụng còn lại</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice and Card Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Invoice Section */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-md font-medium text-gray-500 mb-2 text-left">Hóa đơn tiếp theo</h2>

                        <div className="mb-2 mt-4 text-left">
                            <h3 className="text-2xl font-semibold text-[#309689]">1.350.000VND</h3>
                        </div>
                        <p className="text-gray-600 font-medium text-left">Feb 29, 2025</p>
                        <p className="text-sm text-gray-500 mt-1 text-left">Gói bắt đầu: <span className="font-bold">Jan 29, 2025</span></p>
                        <p className="text-sm text-gray-500 mt-1 text-left">Bạn phải trả số tiền này mỗi tháng một lần.</p>

                        <button className="mt-5 w-full py-3 bg-[#309689] text-white rounded-md hover:bg-[#277b70] flex items-center justify-center">
                            Trả Ngay
                            <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Credit Card */}
                <div className="h-auto">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-400 rounded-lg p-6 text-white h-full relative overflow-hidden">
                        <div className="flex flex-col justify-between h-full min-h-[200px]">
                            {/* Top section - Balance only */}
                            <div className="text-left">
                                <h5 className="uppercase text-xs text-teal-100 mb-1">Balance</h5>
                                <div className="text-2xl font-semibold">$295,756</div>
                            </div>

                            {/* Bottom section */}
                            <div className="mt-auto">
                                {/* Card Holder and Valid Thru */}
                                <div className="flex mb-4">
                                    <div className="text-left">
                                        <h5 className="uppercase text-xs text-teal-100 mb-1">Card Holder</h5>
                                        <div>Le Thanh Vu</div>
                                    </div>
                                    <div className="text-left ml-40">
                                        <h5 className="uppercase text-xs text-teal-100 mb-1">Valid Thru</h5>
                                        <div>11/29</div>
                                    </div>
                                </div>

                                {/* Card Number */}
                                <div className="text-lg text-left">2911 **** **** 2003</div>
                            </div>
                        </div>

                        {/* Card Logo */}
                        <div className="absolute right-6 bottom-6">
                            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white bg-opacity-30"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-md font-medium text-gray-500 text-left">Giao dịch mới nhất</h2>
                    {transactions.length > 0 && (
                        <button
                            onClick={handleDownloadAllReceipts}
                            disabled={downloadingId === 'ALL'}
                            className="px-4 py-2 bg-[#309689] text-white rounded-md hover:bg-[#277b70] flex items-center disabled:opacity-50"
                        >
                            <RiDownload2Line className="mr-2" size={16} />
                            {downloadingId === 'ALL' ? 'Đang tải...' : 'Tải tất cả'}
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
                    {isLoading ? (
                        <div className="p-6 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#309689] mx-auto mb-2"></div>
                            <p className="text-gray-500">Đang tải dữ liệu...</p>
                        </div>
                    ) : error ? (
                        <div className="p-6 text-center">
                            <p className="text-red-500 mb-2">Lỗi: {error}</p>
                            <button
                                onClick={fetchTransactionsData}
                                className="px-4 py-2 bg-[#309689] text-white rounded-md hover:bg-[#277b70]"
                            >
                                Thử lại
                            </button>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="p-6 text-center">
                            <p className="text-gray-500">Không có giao dịch nào</p>
                        </div>
                    ) : (
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map((transaction) => (
                                    <tr key={`${transaction.type}-${transaction.id}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{transaction.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{transaction.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.type === 'Gói thành viên'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{transaction.plan}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left font-medium">{transaction.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {transaction.transactionId && transaction.transactionId.trim() !== '' ? (
                                                <button
                                                    onClick={() => handleDownloadReceipt(transaction)}
                                                    disabled={downloadingId === transaction.transactionId}
                                                    className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                                >
                                                    {downloadingId === transaction.transactionId ? (
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                                                    ) : (
                                                        <RiDownload2Line size={20} />
                                                    )}
                                                </button>
                                            ) : (
                                                <span className="text-gray-300">N/A</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                {transactions.length > 0 && (
                    <div className="flex justify-center mt-4 space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-2 text-sm rounded-md ${currentPage === i + 1
                                        ? 'bg-[#309689] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlanAndPaymentContent; 