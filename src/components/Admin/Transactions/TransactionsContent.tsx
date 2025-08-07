import React, { useState, useEffect } from 'react';
import { IoCard, IoArrowDownOutline } from 'react-icons/io5';
import { AdminService, SubscriptionModel, AdvertisementModel, PaymentReceiptService } from '../../../services';

// Types for combined data
type SubscriptionWithType = SubscriptionModel & { dataType: 'subscription' };
type AdvertisementWithType = AdvertisementModel & { dataType: 'advertisement' };
type CombinedTransactionType = SubscriptionWithType | AdvertisementWithType;

const TransactionsContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [subscriptions, setSubscriptions] = useState<SubscriptionModel[]>([]);
    const [advertisements, setAdvertisements] = useState<AdvertisementModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [subscriptionData, advertisementData] = await Promise.all([
                    AdminService.getAllSubscriptions(),
                    AdminService.getAllAdvertisements()
                ]);

                // Sort subscriptions by recent date first (startDate descending)
                const sortedSubscriptions = subscriptionData.sort((a, b) => {
                    const dateA = new Date(a.startDate);
                    const dateB = new Date(b.startDate);
                    return dateB.getTime() - dateA.getTime(); // Most recent first
                });

                // Sort advertisements by recent date first (startDate descending)
                const sortedAdvertisements = advertisementData.sort((a, b) => {
                    const dateA = new Date(a.startDate);
                    const dateB = new Date(b.startDate);
                    return dateB.getTime() - dateA.getTime(); // Most recent first
                });

                setSubscriptions(sortedSubscriptions);
                setAdvertisements(sortedAdvertisements);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Không thể tải dữ liệu giao dịch');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);



    // Helper to get phone number from the transaction data
    const getPhoneNumber = (transaction: SubscriptionModel | AdvertisementModel): string => {
        return transaction.employerPhoneNumber || '';
    };

    // Calculate pagination based on active tab
    const getCurrentData = () => {
        if (activeTab === 'services') {
            return subscriptions;
        } else if (activeTab === 'advertisements') {
            return advertisements;
        } else { // 'all' tab
            // Combine both arrays and sort by startDate (most recent first)
            const combined = [
                ...subscriptions.map(sub => ({ ...sub, dataType: 'subscription' as const })),
                ...advertisements.map(ad => ({ ...ad, dataType: 'advertisement' as const }))
            ];
            return combined.sort((a, b) => {
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);
                return dateB.getTime() - dateA.getTime(); // Most recent first
            });
        }
    };

    const totalPages = Math.ceil(getCurrentData().length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = getCurrentData().slice(startIndex, endIndex);

    // Reset page when switching tabs
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Format amount for display
    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Get transaction type for display
    const getTransactionDisplayType = (item: SubscriptionModel | AdvertisementModel | CombinedTransactionType) => {
        // Check if this is a combined item with dataType
        if ('dataType' in item) {
            if (item.dataType === 'subscription') {
                const sub = item as SubscriptionWithType;
                return sub.paymentStatus === 'PAID' ? 'Dịch vụ' : sub.paymentStatus;
            } else {
                return 'Quảng cáo';
            }
        }

        // For individual tabs
        if (activeTab === 'services') {
            const sub = item as SubscriptionModel;
            return sub.paymentStatus === 'PAID' ? 'Dịch vụ' : sub.paymentStatus;
        } else if (activeTab === 'advertisements') {
            return 'Quảng cáo';
        } else {
            // Fallback for 'all' tab without dataType
            if ('paymentStatus' in item) {
                const sub = item as SubscriptionModel;
                return sub.paymentStatus === 'PAID' ? 'Dịch vụ' : sub.paymentStatus;
            } else {
                return 'Quảng cáo';
            }
        }
    };

    // Get amount for display
    const getAmountForDisplay = (item: SubscriptionModel | AdvertisementModel | CombinedTransactionType) => {
        // Check if this is a combined item with dataType
        if ('dataType' in item) {
            if (item.dataType === 'subscription') {
                const sub = item as SubscriptionWithType;
                return sub.amountPaid;
            } else {
                const ad = item as AdvertisementWithType;
                return ad.price;
            }
        }

        // For individual tabs
        if (activeTab === 'services') {
            const sub = item as SubscriptionModel;
            return sub.amountPaid;
        } else if (activeTab === 'advertisements') {
            const ad = item as AdvertisementModel;
            return ad.price;
        } else {
            // Fallback for 'all' tab without dataType
            if ('amountPaid' in item) {
                const sub = item as SubscriptionModel;
                return sub.amountPaid;
            } else {
                const ad = item as AdvertisementModel;
                return ad.price;
            }
        }
    };

    // Handle download based on type
    const handleDownloadByType = (item: SubscriptionModel | AdvertisementModel | CombinedTransactionType) => {
        // Check if this is a combined item with dataType
        if ('dataType' in item) {
            if (item.dataType === 'subscription') {
                return handleDownloadReceipt(item as SubscriptionWithType);
            } else {
                return handleDownloadAdvertisementReceipt(item as AdvertisementWithType);
            }
        }

        // For individual tabs
        if (activeTab === 'services') {
            return handleDownloadReceipt(item as SubscriptionModel);
        } else if (activeTab === 'advertisements') {
            return handleDownloadAdvertisementReceipt(item as AdvertisementModel);
        } else {
            // Fallback for 'all' tab without dataType
            if ('amountPaid' in item) {
                return handleDownloadReceipt(item as SubscriptionModel);
            } else {
                return handleDownloadAdvertisementReceipt(item as AdvertisementModel);
            }
        }
    };

    // Handle download receipt for subscription
    const handleDownloadReceipt = async (subscription: SubscriptionModel) => {
        if (!subscription.transactionId || subscription.transactionId.trim() === '') {
            alert('Không có mã giao dịch để tải biên lai');
            return;
        }

        try {
            setDownloadingId(subscription.transactionId);

            const employerName = subscription.employerFullName || subscription.employerUserName || 'Khách hàng';
            const phoneNumber = getPhoneNumber(subscription);

            await PaymentReceiptService.downloadReceipt(
                subscription.transactionId,
                employerName,
                subscription.packageName || 'Gói dịch vụ',
                {
                    phoneNumber, // Custom field for receipt template
                    amountPaid: subscription.amountPaid,
                    startDate: subscription.startDate,
                    paymentStatus: subscription.paymentStatus
                }
            );
        } catch (error) {
            console.error('Download receipt error:', error);

            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải biên lai';
            alert(`Lỗi: ${errorMessage}`);
        } finally {
            setDownloadingId(null);
        }
    };

    // Handle download receipt for advertisement
    const handleDownloadAdvertisementReceipt = async (advertisement: AdvertisementModel) => {
        if (!advertisement.transactionId || advertisement.transactionId.trim() === '') {
            alert('Không có mã giao dịch để tải biên lai');
            return;
        }

        try {
            setDownloadingId(advertisement.transactionId);

            const employerName = advertisement.employerFullName || advertisement.employerUserName || 'Khách hàng';
            const phoneNumber = getPhoneNumber(advertisement);

            await PaymentReceiptService.downloadReceipt(
                advertisement.transactionId,
                employerName,
                `Quảng cáo ${advertisement.adTitle}`,
                {
                    phoneNumber, // Custom field for receipt template
                    amountPaid: advertisement.price,
                    startDate: advertisement.startDate,
                    paymentStatus: 'PAID'
                }
            );
        } catch (error) {
            console.error('Download advertisement receipt error:', error);

            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải biên lai';
            alert(`Lỗi: ${errorMessage}`);
        } finally {
            setDownloadingId(null);
        }
    };

    // Handle download all combined receipts (both services and advertisements)
    const handleDownloadAllCombinedReceipts = async () => {
        // Filter both types of transactions that have transaction IDs
        const subscriptionsWithTransactionId = subscriptions.filter(
            sub => sub.transactionId && sub.transactionId.trim() !== ''
        );
        const advertisementsWithTransactionId = advertisements.filter(
            ad => ad.transactionId && ad.transactionId.trim() !== ''
        );

        if (subscriptionsWithTransactionId.length === 0 && advertisementsWithTransactionId.length === 0) {
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
                            Tổng số giao dịch dịch vụ: <strong>${subscriptionsWithTransactionId.length}</strong>
                        </p>
                        <p style="margin: 5px 0; color: #666;">
                            Tổng số giao dịch quảng cáo: <strong>${advertisementsWithTransactionId.length}</strong>
                        </p>
                        <p style="margin: 5px 0; color: #666;">
                            Tổng doanh thu dịch vụ: <strong>${formatAmount(
                subscriptionsWithTransactionId.reduce((sum, sub) => sum + sub.amountPaid, 0)
            )}</strong>
                        </p>
                        <p style="margin: 5px 0; color: #666;">
                            Tổng doanh thu quảng cáo: <strong>${formatAmount(
                advertisementsWithTransactionId.reduce((sum, ad) => sum + ad.price, 0)
            )}</strong>
                        </p>
                        <p style="margin: 5px 0; color: #666; font-weight: bold;">
                            Tổng doanh thu: <strong>${formatAmount(
                subscriptionsWithTransactionId.reduce((sum, sub) => sum + sub.amountPaid, 0) +
                advertisementsWithTransactionId.reduce((sum, ad) => sum + ad.price, 0)
            )}</strong>
                        </p>
                    </div>
            `;

            // Combine and sort all transactions by date
            const allTransactions = [
                ...subscriptionsWithTransactionId.map(sub => ({ ...sub, type: 'service' as const })),
                ...advertisementsWithTransactionId.map(ad => ({ ...ad, type: 'advertisement' as const }))
            ].sort((a, b) => {
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);
                return dateB.getTime() - dateA.getTime(); // Most recent first
            });

            // Add each transaction
            allTransactions.forEach((transaction, index) => {
                if (transaction.type === 'service') {
                    const subscription = transaction as SubscriptionModel & { type: 'service' };
                    const employerName = subscription.employerFullName || subscription.employerUserName || 'Khách hàng';
                    const packageName = subscription.packageName || 'Gói dịch vụ';
                    const providerName = PaymentReceiptService.getProviderName(subscription.transactionId);
                    const phoneNumber = getPhoneNumber(subscription);

                    combinedHTML += `
                        <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;">
                            <h3 style="color: #309689; margin: 0 0 15px 0; font-size: 18px;">
                                Giao dịch dịch vụ #${index + 1}
                            </h3>
                            
                            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                                <tr>
                                    <td style="padding: 8px 0; color: #666; width: 30%;">Mã giao dịch:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #333;">${subscription.transactionId}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Phương thức:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #333;">${providerName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Khách hàng:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #333;">${employerName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Số điện thoại:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #333;">${phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Gói dịch vụ:</td>
                                    <td style="padding: 8px 0; color: #333;">${packageName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Ngày giao dịch:</td>
                                    <td style="padding: 8px 0; color: #333;">${formatDate(subscription.startDate)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Trạng thái:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #16DBAA;">Dịch vụ</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Số tiền:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #309689; font-size: 16px;">
                                        ${formatAmount(subscription.amountPaid)}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    `;
                } else {
                    const advertisement = transaction as AdvertisementModel & { type: 'advertisement' };
                    const employerName = advertisement.employerFullName || advertisement.employerUserName || 'Khách hàng';
                    const providerName = PaymentReceiptService.getProviderName(advertisement.transactionId);
                    const phoneNumber = getPhoneNumber(advertisement);

                    combinedHTML += `
                        <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;">
                            <h3 style="color: #309689; margin: 0 0 15px 0; font-size: 18px;">
                                Giao dịch quảng cáo #${index + 1}
                            </h3>
                            
                            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                                <tr>
                                    <td style="padding: 8px 0; color: #666; width: 30%;">Mã giao dịch:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #333;">${advertisement.transactionId}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Phương thức:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #333;">${providerName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Khách hàng:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #333;">${employerName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Số điện thoại:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #333;">${phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Tiêu đề quảng cáo:</td>
                                    <td style="padding: 8px 0; color: #333;">${advertisement.adTitle}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Vị trí:</td>
                                    <td style="padding: 8px 0; color: #333;">${advertisement.adPosition}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Ngày bắt đầu:</td>
                                    <td style="padding: 8px 0; color: #333;">${formatDate(advertisement.startDate)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Ngày kết thúc:</td>
                                    <td style="padding: 8px 0; color: #333;">${formatDate(advertisement.endDate)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Trạng thái:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #16DBAA;">Quảng cáo</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666;">Số tiền:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #309689; font-size: 16px;">
                                        ${formatAmount(advertisement.price)}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    `;
                }
            });

            combinedHTML += `
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
                        <p>Cảm ơn bạn đã sử dụng dịch vụ của INNOSPHERE!</p>
                        <p>Báo cáo này được tạo tự động vào ${new Date().toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
                    </div>
                </div>
            `;

            // Create a new window and print
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                throw new Error('Popup blocked. Please allow popups for this site.');
            }

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>All Transactions Report - ${new Date().toLocaleDateString('vi-VN')}</title>
                    <style>
                        @media print {
                            body { margin: 0; }
                            @page { margin: 1cm; }
                        }
                    </style>
                </head>
                <body>
                    ${combinedHTML}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
                </html>
            `);

            printWindow.document.close();
        } catch (error) {
            console.error('Download all combined receipts error:', error);

            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải tất cả biên lai';
            alert(`Lỗi: ${errorMessage}`);
        } finally {
            setDownloadingId(null);
        }
    };

    // Handle download all receipts based on active tab
    const handleDownloadAllReceipts = async () => {
        if (activeTab === 'services') {
            return handleDownloadAllSubscriptionReceipts();
        } else if (activeTab === 'advertisements') {
            return handleDownloadAllAdvertisementReceipts();
        } else { // 'all' tab
            return handleDownloadAllCombinedReceipts();
        }
    };

    // Handle download all subscription receipts
    const handleDownloadAllSubscriptionReceipts = async () => {
        // Filter subscriptions that have transaction IDs
        const subscriptionsWithTransactionId = subscriptions.filter(
            sub => sub.transactionId && sub.transactionId.trim() !== ''
        );

        if (subscriptionsWithTransactionId.length === 0) {
            alert('Không có giao dịch nào có mã để tải về');
            return;
        }

        try {
            setDownloadingId('ALL');

            // Generate combined HTML for all subscription transactions
            let combinedHTML = `
                <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background: #fff;">
                    <div style="text-align: center; border-bottom: 3px solid #309689; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="color: #309689; margin: 0; font-size: 28px;">INNOSPHERE</h1>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 16px;">Báo cáo tất cả giao dịch đăng ký</p>
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
                        <h3 style="margin: 0; color: #333;">Tổng quan đăng ký</h3>
                        <p style="margin: 5px 0; color: #666;">
                            Tổng số giao dịch: <strong>${subscriptionsWithTransactionId.length}</strong>
                        </p>
                        <p style="margin: 5px 0; color: #666;">
                            Tổng doanh thu: <strong>${formatAmount(
                subscriptionsWithTransactionId.reduce((sum, sub) => sum + sub.amountPaid, 0)
            )}</strong>
                        </p>
                    </div>
            `;

            // Add each subscription transaction
            subscriptionsWithTransactionId.forEach((subscription, index) => {
                const employerName = subscription.employerFullName || subscription.employerUserName || 'Khách hàng';
                const packageName = subscription.packageName || 'Gói dịch vụ';
                const providerName = PaymentReceiptService.getProviderName(subscription.transactionId);
                const phoneNumber = getPhoneNumber(subscription);

                combinedHTML += `
                    <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;">
                        <h3 style="color: #309689; margin: 0 0 15px 0; font-size: 18px;">
                            Giao dịch đăng ký #${index + 1}
                        </h3>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; width: 30%;">Mã giao dịch:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${subscription.transactionId}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Phương thức:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${providerName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Khách hàng:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${employerName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Số điện thoại:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${phoneNumber}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Gói dịch vụ:</td>
                                <td style="padding: 8px 0; color: #333;">${packageName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Ngày giao dịch:</td>
                                <td style="padding: 8px 0; color: #333;">${formatDate(subscription.startDate)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Trạng thái:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #16DBAA;">${getTransactionDisplayType(subscription)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Số tiền:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #309689; font-size: 16px;">
                                    ${formatAmount(getAmountForDisplay(subscription))}
                                </td>
                            </tr>
                        </table>
                    </div>
                `;
            });

            combinedHTML += `
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
                        <p>Cảm ơn bạn đã sử dụng dịch vụ của INNOSPHERE!</p>
                        <p>Báo cáo này được tạo tự động vào ${new Date().toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
                    </div>
                </div>
            `;

            // Create a new window and print
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                throw new Error('Popup blocked. Please allow popups for this site.');
            }

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>All Subscription Transactions Report - ${new Date().toLocaleDateString('vi-VN')}</title>
                    <style>
                        @media print {
                            body { margin: 0; }
                            @page { margin: 1cm; }
                        }
                    </style>
                </head>
                <body>
                    ${combinedHTML}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
                </html>
            `);

            printWindow.document.close();
        } catch (error) {
            console.error('Download all subscription receipts error:', error);

            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải tất cả biên lai đăng ký';
            alert(`Lỗi: ${errorMessage}`);
        } finally {
            setDownloadingId(null);
        }
    };

    // Handle download all advertisement receipts
    const handleDownloadAllAdvertisementReceipts = async () => {
        // Filter advertisements that have transaction IDs
        const advertisementsWithTransactionId = advertisements.filter(
            ad => ad.transactionId && ad.transactionId.trim() !== ''
        );

        if (advertisementsWithTransactionId.length === 0) {
            alert('Không có giao dịch quảng cáo nào có mã để tải về');
            return;
        }

        try {
            setDownloadingId('ALL');

            // Generate combined HTML for all advertisement transactions
            let combinedHTML = `
                <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background: #fff;">
                    <div style="text-align: center; border-bottom: 3px solid #309689; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="color: #309689; margin: 0; font-size: 28px;">INNOSPHERE</h1>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 16px;">Báo cáo tất cả giao dịch quảng cáo</p>
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
                        <h3 style="margin: 0; color: #333;">Tổng quan quảng cáo</h3>
                        <p style="margin: 5px 0; color: #666;">
                            Tổng số giao dịch: <strong>${advertisementsWithTransactionId.length}</strong>
                        </p>
                        <p style="margin: 5px 0; color: #666;">
                            Tổng doanh thu: <strong>${formatAmount(
                advertisementsWithTransactionId.reduce((sum, ad) => sum + ad.price, 0)
            )}</strong>
                        </p>
                    </div>
            `;

            // Add each advertisement transaction
            advertisementsWithTransactionId.forEach((advertisement, index) => {
                const employerName = advertisement.employerFullName || advertisement.employerUserName || 'Khách hàng';
                const providerName = PaymentReceiptService.getProviderName(advertisement.transactionId);
                const phoneNumber = getPhoneNumber(advertisement);

                combinedHTML += `
                    <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;">
                        <h3 style="color: #309689; margin: 0 0 15px 0; font-size: 18px;">
                            Giao dịch quảng cáo #${index + 1}
                        </h3>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; width: 30%;">Mã giao dịch:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${advertisement.transactionId}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Phương thức:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${providerName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Khách hàng:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${employerName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Số điện thoại:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${phoneNumber}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Tiêu đề quảng cáo:</td>
                                <td style="padding: 8px 0; color: #333;">${advertisement.adTitle}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Vị trí:</td>
                                <td style="padding: 8px 0; color: #333;">${advertisement.adPosition}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Ngày bắt đầu:</td>
                                <td style="padding: 8px 0; color: #333;">${formatDate(advertisement.startDate)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Ngày kết thúc:</td>
                                <td style="padding: 8px 0; color: #333;">${formatDate(advertisement.endDate)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Trạng thái:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #16DBAA;">${getTransactionDisplayType(advertisement)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Số tiền:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #309689; font-size: 16px;">
                                    ${formatAmount(getAmountForDisplay(advertisement))}
                                </td>
                            </tr>
                        </table>
                    </div>
                `;
            });

            combinedHTML += `
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
                        <p>Cảm ơn bạn đã sử dụng dịch vụ của INNOSPHERE!</p>
                        <p>Báo cáo này được tạo tự động vào ${new Date().toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
                    </div>
                </div>
            `;

            // Create a new window and print
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                throw new Error('Popup blocked. Please allow popups for this site.');
            }

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>All Advertisement Transactions Report - ${new Date().toLocaleDateString('vi-VN')}</title>
                    <style>
                        @media print {
                            body { margin: 0; }
                            @page { margin: 1cm; }
                        }
                    </style>
                </head>
                <body>
                    ${combinedHTML}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
                </html>
            `);

            printWindow.document.close();
        } catch (error) {
            console.error('Download all advertisement receipts error:', error);

            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải tất cả biên lai quảng cáo';
            alert(`Lỗi: ${errorMessage}`);
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <>
            <style>
                {`
                    .pagination-nav {
                        color: #309689 !important;
                        font-size: 14px;
                        border: none;
                        background: transparent;
                        cursor: pointer;
                    }
                    .pagination-nav:disabled {
                        color: #9CA3AF !important;
                        cursor: not-allowed;
                        opacity: 0.5;
                    }
                    .pagination-active {
                        background-color: #309689 !important;
                        color: white !important;
                        font-size: 14px;
                        font-weight: bold !important;
                        border: none;
                        cursor: pointer;
                    }
                    .pagination-inactive {
                        color: #6B7280 !important;
                        font-size: 14px;
                        border: none;
                        background: transparent;
                        cursor: pointer;
                    }
                    .pagination-inactive:hover {
                        color: #309689 !important;
                    }
                `}
            </style>
            <div className="space-y-6">
                {/* Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Credit Cards Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Page Title */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900">Thẻ của tôi</h1>
                            <a href="#" className="text-blue-600 hover:text-blue-800">+ thêm thẻ</a>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Active Card */}
                            <div className="relative bg-gradient-to-br from-[#55D8BE] to-[#309689] rounded-2xl p-6 text-white">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="text-left">
                                        <p className="text-green-100 text-sm">Số dư</p>
                                        <p className="text-2xl font-semibold">$295,756</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                                        <IoCard className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-end mb-4">
                                    <div className="text-left">
                                        <p className="text-green-100 text-sm">Tên</p>
                                        <p className="font-medium">Le Thanh Vu</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-100 text-sm">Ngày</p>
                                        <p className="font-medium">11/29</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-left">
                                    <p className="text-lg tracking-wider">2911 **** **** 2003</p>
                                </div>
                            </div>

                            {/* Inactive Card */}
                            <div className="relative bg-white border border-gray-200 rounded-2xl p-6 text-gray-700">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="text-left">
                                        <p className="text-gray-500 text-sm">Số dư</p>
                                        <p className="text-2xl font-semibold">$295,756</p>
                                    </div>
                                    <div className="bg-gray-100 rounded-full p-3">
                                        <IoCard className="h-6 w-6 text-gray-600" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-end mb-4">
                                    <div className="text-left">
                                        <p className="text-gray-500 text-sm">Tên</p>
                                        <p className="font-medium">Le Thanh Vu</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-sm">Ngày</p>
                                        <p className="font-medium">11/29</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-left">
                                    <p className="text-lg tracking-wider text-gray-600">2911 **** **** 2003</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expense Chart Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-fit">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 text-left">Chi phí</h2>
                        <div className="text-center mb-6">
                            <p className="text-2xl font-bold text-gray-900">$12,500</p>
                        </div>
                        <div className="flex justify-center mb-6">
                            <div className="w-64 h-20">
                                <svg viewBox="0 0 280 80" className="w-full h-full">
                                    {/* Chart bars - matching the image proportions exactly */}
                                    <rect x="20" y="50" width="25" height="25" fill="#E5E7EB" rx="3" />
                                    <rect x="60" y="20" width="25" height="55" fill="#E5E7EB" rx="3" />
                                    <rect x="100" y="35" width="25" height="40" fill="#E5E7EB" rx="3" />
                                    <rect x="140" y="60" width="25" height="15" fill="#E5E7EB" rx="3" />
                                    <rect x="180" y="5" width="25" height="70" fill="#16DBCC" rx="3" />
                                    <rect x="220" y="45" width="25" height="30" fill="#E5E7EB" rx="3" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-between text-xs text-gray-500 max-w-64 mx-auto">
                                <span>Aug</span>
                                <span>Sep</span>
                                <span>Oct</span>
                                <span>Nov</span>
                                <span>Dec</span>
                                <span>Jan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Table Section */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 text-left">Giao dịch gần đây</h2>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            onClick={() => handleTabChange('all')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'all'
                                ? ''
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            style={activeTab === 'all' ? { borderBottomColor: '#309689', color: '#309689' } : {}}
                        >
                            Tất cả giao dịch
                        </button>
                        <button
                            onClick={() => handleTabChange('services')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'services'
                                ? ''
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            style={activeTab === 'services' ? { borderBottomColor: '#309689', color: '#309689' } : {}}
                        >
                            Dịch vụ
                        </button>
                        <button
                            onClick={() => handleTabChange('advertisements')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'advertisements'
                                ? ''
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            style={activeTab === 'advertisements' ? { borderBottomColor: '#309689', color: '#309689' } : {}}
                        >
                            Quảng cáo
                        </button>
                    </div>

                    {/* Table Header with Download All Button */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Chi tiết giao dịch</h3>
                        <button
                            onClick={handleDownloadAllReceipts}
                            disabled={downloadingId === 'ALL' || getCurrentData().length === 0}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            {downloadingId === 'ALL' ? 'Đang tải...' : 'Tải về tất cả'}
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Mô tả</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Giao dịch ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Loại</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Ngày</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Số lượng</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Biên lai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                                <span>Đang tải dữ liệu...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 px-4 text-center text-red-500">
                                            {error}
                                        </td>
                                    </tr>
                                ) : getCurrentData().length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                                            Không có dữ liệu giao dịch
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((transaction) => (
                                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                                                        <IoArrowDownOutline className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-900">
                                                        {transaction.employerFullName || transaction.employerUserName || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600 text-left">{transaction.transactionId || 'N/A'}</td>
                                            <td className="py-4 px-4 text-gray-600 text-left">{getTransactionDisplayType(transaction)}</td>
                                            <td className="py-4 px-4 text-gray-600 text-left">{formatDate(transaction.startDate)}</td>
                                            <td className="py-4 px-4 text-left">
                                                <span className="font-semibold" style={{ color: '#16DBAA' }}>
                                                    {formatAmount(getAmountForDisplay(transaction))}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-left">
                                                {transaction.transactionId && transaction.transactionId.trim() !== '' ? (
                                                    <button
                                                        className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 text-gray-600"
                                                        onClick={() => handleDownloadByType(transaction)}
                                                        disabled={downloadingId === transaction.transactionId}
                                                    >
                                                        {downloadingId === transaction.transactionId ? 'Đang tải...' : 'Tải về'}
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Không có</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-end space-x-2 mt-6">
                        <button
                            className="px-3 py-2 hover:opacity-80 flex items-center pagination-nav"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            ← Trước
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    className={`px-3 py-2 rounded-md min-w-[2rem] h-8 flex items-center justify-center ${currentPage === page ? 'pagination-active' : 'pagination-inactive'
                                        }`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button
                            className="px-3 py-2 hover:opacity-80 flex items-center pagination-nav"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Sau →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionsContent; 