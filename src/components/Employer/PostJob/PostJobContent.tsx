import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaCreditCard } from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { getUserIdFromToken } from '../../../utils/auth';
import { SubscriptionService } from '../../../services/subscriptionService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface PlanDetails {
    name: string;
    price: string;
    formattedPrice: string;
    subscriptionPackageId: number;
}

const PostJobContent: React.FC = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [useExistingCard, setUseExistingCard] = useState(true);

    const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);

    // Check if user has valid subscription on component mount
    useEffect(() => {
        checkUserSubscription();
    }, []);

    const checkUserSubscription = async () => {
        try {
            // Get user authentication
            const userId = getUserIdFromToken();
            if (!userId) {
                console.error('User not authenticated');
                setIsCheckingSubscription(false);
                return;
            }

            // Get employer profile to get employerId
            const employerProfile = await SubscriptionService.getEmployerProfile();
            if (!employerProfile || !employerProfile.employerId) {
                console.error('Could not get employer profile');
                setIsCheckingSubscription(false);
                return;
            }

            // Check if user has valid subscription
            const subscriptions = await SubscriptionService.getSubscriptionsByEmployer(employerProfile.employerId);

            if (subscriptions && subscriptions.length > 0) {
                // User has subscription, redirect to create-job
                console.log('User has valid subscription, redirecting to create-job');
                window.location.href = '/employer/create-job';
                return;
            }

            // No valid subscription, stay on current page
            console.log('User has no valid subscription, staying on post-job page');
            setIsCheckingSubscription(false);

        } catch {
            // If error (like 404), user doesn't have subscription
            console.log('No subscription found (404 or error), staying on post-job page');
            setIsCheckingSubscription(false);
        }
    };

    // PayPal configuration
    const paypalOptions = {
        clientId: "AbYoH5JdRKNeJ_x46blNYUZnSaxLGAS4mqYfhIx65TlQVu2xEiUCFVHyuaEYFOTfFE4ND7At-F_WcLQc",
        currency: "USD",
        intent: "capture"
    };

    // Currency conversion function (VND to USD)
    const convertVNDToUSD = (vndAmount: number): string => {
        const USD_TO_VND_RATE = 24000; // Approximate rate, in production you'd use a real-time API
        const usdAmount = vndAmount / USD_TO_VND_RATE;
        return usdAmount.toFixed(2);
    };

    // Get subscription duration based on package ID
    const getSubscriptionDuration = (packageId: number): number => {
        return packageId === 3 ? 3 : 1; // 3 months for Doanh Nghiệp, 1 month for others
    };

    // Calculate end date based on start date and duration
    const getEndDate = (startDate: Date, durationInMonths: number): Date => {
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + durationInMonths);
        return endDate;
    };

    const handleSelectPlan = (plan: PlanDetails) => {
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    };

    const closeModal = () => {
        setShowPaymentModal(false);
    };

    // Handle successful PayPal payment
    // @ts-expect-error - PayPal types can be complex, using any for actions parameter
    const handlePayPalApprove = async (_data: unknown, actions: any) => {
        try {
            const order = await actions.order.capture();
            const transactionId = order.id;

            // Get user ID from token
            const userId = getUserIdFromToken();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            if (!selectedPlan) {
                throw new Error('No plan selected');
            }

            // Get employer profile to get the actual employerId
            const employerProfile = await SubscriptionService.getEmployerProfile();
            if (!employerProfile || !employerProfile.employerId) {
                throw new Error('Could not get employer profile or employerId');
            }

            const employerId = employerProfile.employerId;

            // Prepare subscription API payload
            const startDate = new Date();
            const duration = getSubscriptionDuration(selectedPlan.subscriptionPackageId);
            const endDate = getEndDate(startDate, duration);

            const subscriptionData = {
                employerId: employerId,
                subscriptionPackageId: selectedPlan.subscriptionPackageId,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                amountPaid: parseFloat(selectedPlan.price),
                paymentStatus: "PAID",
                transactionId: transactionId
            };

            // Call the subscription purchase API
            const response = await SubscriptionService.purchaseSubscription(subscriptionData);

            if (response) {
                // Success - close modal and navigate to create-job
                setShowPaymentModal(false);
                window.location.href = '/employer/create-job';
            }
        } catch (error) {
            console.error('❌ Error processing payment:', error);

            // Log detailed error information in JSON format
            if ((error as any).response) {
                // API responded with an error status
                const apiError = (error as any).response;
                console.error('🔍 API Error Details:', JSON.stringify({
                    status: apiError.status,
                    statusText: apiError.statusText,
                    responseData: apiError.data,
                    responseHeaders: apiError.headers
                }, null, 2));

                // Show user-friendly error message
                const errorMessage = apiError.data?.message || apiError.data || 'Unknown API error';
                MySwal.fire({
                    icon: 'error',
                    title: 'Thanh toán thất bại',
                    text: `Payment failed (${apiError.status}): ${errorMessage}`,
                    confirmButtonText: 'Thử lại',
                    confirmButtonColor: '#dc3545'
                });
            } else if ((error as any).request) {
                // Request was made but no response received
                console.error('🌐 Network Error - No response received:', JSON.stringify((error as any).request, null, 2));
                MySwal.fire({
                    icon: 'error',
                    title: 'Lỗi kết nối',
                    text: 'Network error: Unable to reach the server. Please check your connection.',
                    confirmButtonText: 'Thử lại',
                    confirmButtonColor: '#dc3545'
                });
            } else {
                // Something else happened
                console.error('🔧 Other Error:', JSON.stringify({ message: (error as any).message }, null, 2));
                MySwal.fire({
                    icon: 'error',
                    title: 'Lỗi xử lý',
                    text: `Payment processing failed: ${(error as any).message}`,
                    confirmButtonText: 'Thử lại',
                    confirmButtonColor: '#dc3545'
                });
            }
        }
    };

    // Create HTML for standard button
    const createStandardButtonHtml = (text: string, onClick: string) => {
        return {
            __html: `
                <button 
                    onclick="${onClick}"
                    style="
                        background-color: #EBF5F4 !important; 
                        color: #309689 !important; 
                        padding: 12px; 
                        border-radius: 6px; 
                        width: 100%; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        font-weight: 500; 
                        border: none; 
                        cursor: pointer;
                    "
                >
                    ${text} 
                    <svg 
                        style="margin-left: 8px;" 
                        stroke="currentColor" 
                        fill="currentColor" 
                        stroke-width="0" 
                        viewBox="0 0 448 512" 
                        height="1em" 
                        width="1em" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                    </svg>
                </button>
            `
        };
    };

    // Create HTML for premium button
    const createPremiumButtonHtml = (text: string, onClick: string) => {
        return {
            __html: `
                <button 
                    onclick="${onClick}"
                    style="
                        background-color: #309689 !important; 
                        color: white !important; 
                        padding: 12px; 
                        border-radius: 6px; 
                        width: 100%; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        font-weight: 500; 
                        border: none; 
                        cursor: pointer;
                    "
                >
                    ${text} 
                    <svg 
                        style="margin-left: 8px;" 
                        stroke="currentColor" 
                        fill="currentColor" 
                        stroke-width="0" 
                        viewBox="0 0 448 512" 
                        height="1em" 
                        width="1em" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                    </svg>
                </button>
            `
        };
    };

    // Define button click handlers as window functions
    React.useEffect(() => {
        // @ts-expect-error - Adding custom method to Window interface
        window.handleTieuChuanClick = () => {
            handleSelectPlan({
                name: 'Tiêu chuẩn',
                price: '1000000',
                formattedPrice: '1.000.000VNĐ',
                subscriptionPackageId: 1
            });
        };

        // @ts-expect-error - Adding custom method to Window interface
        window.handleCaoCapClick = () => {
            handleSelectPlan({
                name: 'Cao cấp',
                price: '1350000',
                formattedPrice: '1.350.000VNĐ',
                subscriptionPackageId: 2
            });
        };

        // @ts-expect-error - Adding custom method to Window interface
        window.handleDoanhNghiepClick = () => {
            handleSelectPlan({
                name: 'Doanh Nghiệp',
                price: '3000000',
                formattedPrice: '3.000.000VNĐ',
                subscriptionPackageId: 3
            });
        };

        // @ts-expect-error - Adding custom method to Window interface
        window.handlePayment = () => {
            setShowPaymentModal(false);
            // Navigate directly to job creation page
            window.location.href = '/employer/create-job';
        };

        return () => {
            // Clean up
            // @ts-expect-error - Removing custom method from Window interface
            delete window.handleTieuChuanClick;
            // @ts-expect-error - Removing custom method from Window interface
            delete window.handleCaoCapClick;
            // @ts-expect-error - Removing custom method from Window interface
            delete window.handleDoanhNghiepClick;
            // @ts-expect-error - Removing custom method from Window interface
            delete window.handlePayment;
        };
    }, []);



    // Show loading state while checking subscription
    if (isCheckingSubscription) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#309689] mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang kiểm tra đăng ký của bạn...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1">
            {/* Header section with title and image */}
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-2xl font-semibold">Mua đăng ký trả phí để đăng tuyển dụng</h1>
                <div className="hidden lg:block w-[350px]">
                    <img
                        src="/pricehiring.png"
                        alt="Pricing Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>



            {/* Pricing plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pr-4 md:pr-16 mb-20">
                {/* Standard Plan */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-medium mb-4">Tiêu Chuẩn</h3>
                    <div className="text-xl font-bold text-[#309689] mb-4">
                        1.000.000VNĐ <span className="text-sm font-normal text-gray-500">/tháng</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Đăng 10 bài</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Tin tuyển dụng khán cấp & nổi bật</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Làm nổi bật tin bằng highlight</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Truy cập & lưu trữ 5 hồ sơ ứng viên</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hiển thị hồ sơ ứng tuyển trong 10 ngày</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hỗ trợ 24/7</span>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={createStandardButtonHtml('Chọn Gói', 'window.handleTieuChuanClick()')} />
                </div>

                {/* Premium Plan - with more height and distinctive styling */}
                <div className="bg-white rounded-lg shadow-xl border-2 border-[#309689] p-6 relative mt-[-30px] transform scale-110 z-10">
                    <div className="absolute top-0 right-0 bg-[#309689] text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        Khuyến Nghi
                    </div>
                    <h3 className="text-xl font-bold text-[#309689] mb-4 text-center">Cao Cấp</h3>
                    <div className="text-xl font-bold text-[#309689] mb-4">
                        1.350.000VNĐ <span className="text-sm font-normal text-gray-500">/tháng</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Đăng 15 bài</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Tin tuyển dụng khán cấp & nổi bật</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Làm nổi bật tin bằng màu sắc</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Truy cập & lưu trữ 10 hồ sơ ứng viên</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hiển thị hồ sơ ứng tuyển trong 20 ngày</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hỗ trợ 24/7</span>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={createPremiumButtonHtml('Chọn Gói', 'window.handleCaoCapClick()')} />
                </div>

                {/* Enterprise Plan */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-medium mb-4">Doanh Nghiệp</h3>
                    <div className="text-xl font-bold text-[#309689] mb-4">
                        3.000.000VNĐ <span className="text-sm font-normal text-gray-500">/3 Months</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Đăng tin không giới hạn + Quảng bá thương hiệu</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Tin tuyển dụng khán cấp & nổi bật</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Làm nổi bật tin bằng màu sắc</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Truy cập & lưu trữ 20 hồ sơ ứng viên</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hiển thị hồ sơ ứng tuyển trong 30 ngày</span>
                        </div>
                        <div className="flex items-start">
                            <FaCheck className="text-[#309689] mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">Hỗ trợ 24/7</span>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={createStandardButtonHtml('Chọn Gói', 'window.handleDoanhNghiepClick()')} />
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h2 className="text-xl font-semibold">Thanh toán</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Left Column - Payment Method */}
                                <div className="w-full md:w-3/5">
                                    <h3 className="text-lg font-medium mb-4">Phương thức thanh toán</h3>

                                    {/* Payment Tabs */}
                                    <div className="flex border-b mb-6 justify-center">
                                        <button
                                            className={`pb-2 px-8 ${paymentMethod === 'card' ? 'border-b-2 border-[#309689] text-[#309689] font-medium' : 'text-gray-500'}`}
                                            onClick={() => setPaymentMethod('card')}
                                        >
                                            <div className="flex items-center">
                                                <FaCreditCard className="mr-2" />
                                                Debit/Credit Card
                                            </div>
                                        </button>
                                        <button
                                            className={`pb-2 px-8 ${paymentMethod === 'paypal' ? 'border-b-2 border-[#309689] text-[#309689] font-medium' : 'text-gray-500'}`}
                                            onClick={() => setPaymentMethod('paypal')}
                                        >
                                            Paypal
                                        </button>
                                    </div>

                                    {paymentMethod === 'card' && (
                                        <>
                                            {/* Existing Card Option */}
                                            <div
                                                className={`mb-4 border rounded-lg p-4 cursor-pointer ${useExistingCard ? 'border-[#309689] bg-[#F4FBFA]' : ''}`}
                                                onClick={() => setUseExistingCard(true)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-5 w-5 rounded-full border border-[#309689] flex items-center justify-center">
                                                            {useExistingCard && <div className="h-3 w-3 rounded-full bg-[#309689]"></div>}
                                                        </div>
                                                        <img src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard" className="h-8" />
                                                    </div>
                                                    <div className="flex gap-12">
                                                        <div>
                                                            <div className="text-sm text-gray-500">Card Number</div>
                                                            <div className="font-medium">2911 **** **** ****</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm text-gray-500">Name on Card</div>
                                                            <div className="font-medium">Le Thanh Vu</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* New Card Option */}
                                            <div
                                                className={`mb-6 border rounded-lg p-4 cursor-pointer ${!useExistingCard ? 'border-[#309689] bg-[#F4FBFA]' : ''}`}
                                                onClick={() => setUseExistingCard(false)}
                                            >
                                                <div className="flex items-center">
                                                    <div className="h-5 w-5 rounded-full border border-[#309689] flex items-center justify-center mr-3">
                                                        {!useExistingCard && <div className="h-3 w-3 rounded-full bg-[#309689]"></div>}
                                                    </div>
                                                    <span>Thẻ thanh toán mới</span>
                                                </div>
                                            </div>

                                            {/* Card Details Form */}
                                            {!useExistingCard && (
                                                <div className="space-y-8 mt-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="block text-sm text-gray-500 mb-2">Card Number</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Card number"
                                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#309689] focus:border-[#309689] focus:outline-none text-gray-700"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-gray-500 mb-2">Name on Card</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Name"
                                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#309689] focus:border-[#309689] focus:outline-none text-gray-700"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-6 w-1/2">
                                                        <div>
                                                            <label className="block text-sm text-gray-500 mb-2">Expiry</label>
                                                            <input
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#309689] focus:border-[#309689] focus:outline-none text-gray-700"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-gray-500 mb-2">CVC</label>
                                                            <input
                                                                type="text"
                                                                placeholder="CVC"
                                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#309689] focus:border-[#309689] focus:outline-none text-gray-700"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {paymentMethod === 'paypal' && (
                                        <div className="text-center py-8 flex flex-col items-center">
                                            <div className="mb-6">
                                                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className="h-20 mx-auto" />
                                            </div>
                                            <p className="text-gray-600 mb-4">You will be redirected to PayPal after submitting</p>
                                            <div className="mt-4 w-2/3">
                                                <PayPalScriptProvider options={paypalOptions}>
                                                    <PayPalButtons
                                                        style={{
                                                            layout: 'vertical',
                                                            color: 'gold',
                                                            shape: 'rect',
                                                            label: 'paypal',
                                                            height: 40
                                                        }}
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                intent: 'CAPTURE',
                                                                purchase_units: [
                                                                    {
                                                                        amount: {
                                                                            value: convertVNDToUSD(parseInt(selectedPlan.price)),
                                                                            currency_code: 'USD'
                                                                        }
                                                                    }
                                                                ]
                                                            });
                                                        }}
                                                        onApprove={handlePayPalApprove}
                                                    />
                                                </PayPalScriptProvider>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column - Order Summary */}
                                <div className="w-full md:w-2/5 bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Order Summary</h3>

                                    <div className="mb-6 pb-6 border-b">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Plan:</span>
                                            <span className="font-medium text-gray-800">{selectedPlan.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Duration:</span>
                                            <span className="font-medium text-gray-800">{selectedPlan.subscriptionPackageId === 3 ? '3 months' : '1 month'}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">VAT (10%):</span>
                                            <span className="font-medium text-gray-800">{(parseInt(selectedPlan.price) * 0.1).toLocaleString()}VNĐ</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-lg font-semibold mb-6">
                                        <span>Total:</span>
                                        <div className="text-right">
                                            <span className="text-[#309689] block">{selectedPlan.formattedPrice}</span>
                                            {paymentMethod === 'paypal' && (
                                                <span className="text-sm text-gray-500">(${convertVNDToUSD(parseInt(selectedPlan.price))} USD)</span>
                                            )}
                                        </div>
                                    </div>

                                    <div dangerouslySetInnerHTML={createPremiumButtonHtml('Thanh Toán', 'window.handlePayment()')} />

                                    <div className="text-center text-sm text-gray-500 mt-4">
                                        By clicking "Thanh Toán", you agree to our <a href="#" className="text-[#309689]">Terms and Conditions</a>
                                    </div>

                                    <div className="flex items-center justify-center mt-6">
                                        <div className="flex space-x-2">
                                            <img src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard" className="h-6" />
                                            <img src="https://www.visa.com/images/processing/visa-logo-800x450.png" alt="Visa" className="h-6" />
                                            <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="PayPal" className="h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default PostJobContent;