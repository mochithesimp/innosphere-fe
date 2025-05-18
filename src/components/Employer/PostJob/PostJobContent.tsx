import React, { useState } from 'react';
import { FaCheck, FaTimes, FaCreditCard } from 'react-icons/fa';
import JobPromotionPopup from './JobPromotionPopup';

interface PlanDetails {
    name: string;
    price: string;
    formattedPrice: string;
}

const PostJobContent: React.FC = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [useExistingCard, setUseExistingCard] = useState(true);
    const [showPromotionPopup, setShowPromotionPopup] = useState(false);

    const handleSelectPlan = (plan: PlanDetails) => {
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    };

    const closeModal = () => {
        setShowPaymentModal(false);
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
                formattedPrice: '1.000.000VNĐ'
            });
        };

        // @ts-expect-error - Adding custom method to Window interface
        window.handleCaoCapClick = () => {
            handleSelectPlan({
                name: 'Cao cấp',
                price: '1350000',
                formattedPrice: '1.350.000VNĐ'
            });
        };

        // @ts-expect-error - Adding custom method to Window interface
        window.handleDoanhNghiepClick = () => {
            handleSelectPlan({
                name: 'Doanh Nghiệp',
                price: '3000000',
                formattedPrice: '3.000.000VNĐ'
            });
        };

        // @ts-expect-error - Adding custom method to Window interface
        window.handlePayment = () => {
            setShowPaymentModal(false);
            // Show promotion popup before navigating to job creation page
            setShowPromotionPopup(true);
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

    // Add the navigation function for the promotion popup
    const handlePromotionComplete = () => {
        setShowPromotionPopup(false);
        window.location.href = '/employer/create-job';
    };

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

            {/* FOR TESTING: Direct link to job posting form */}
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 mb-2 font-medium">For Testing Purposes Only</p>
                <p className="text-yellow-700 mb-3">This direct link bypasses the payment requirement and is only for development testing.</p>
                <a
                    href="/employer/create-job"
                    className="inline-block bg-yellow-500 text-white font-medium px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                >
                    Skip to Job Posting Form →
                </a>
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
                                                <button
                                                    className="bg-[#0070BA] text-white py-3 px-6 rounded-md w-full flex items-center justify-center"
                                                >
                                                    <span className="mr-2">Continue with</span>
                                                    <span className="font-bold">PayPal</span>
                                                </button>
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
                                            <span className="font-medium text-gray-800">1 tháng</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">VAT (10%):</span>
                                            <span className="font-medium text-gray-800">{(parseInt(selectedPlan.price) * 0.1).toLocaleString()}VNĐ</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-lg font-semibold mb-6">
                                        <span>Total:</span>
                                        <span className="text-[#309689]">{selectedPlan.formattedPrice}</span>
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

            {/* Promotion Popup */}
            <JobPromotionPopup
                isOpen={showPromotionPopup}
                onClose={handlePromotionComplete}
            />
        </div>
    );
};

export default PostJobContent;