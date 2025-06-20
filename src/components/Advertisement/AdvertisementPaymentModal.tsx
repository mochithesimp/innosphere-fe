import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { AdvertisementFormData } from './AdvertisementModal';
import Swal from 'sweetalert2';

interface AdvertisementPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    advertisementData: AdvertisementFormData | null;
    onPaymentSuccess: (transactionId: string) => Promise<void>;
    isSubmitting?: boolean;
}

const AdvertisementPaymentModal: React.FC<AdvertisementPaymentModalProps> = ({
    isOpen,
    onClose,
    advertisementData,
    onPaymentSuccess,
    isSubmitting = false
}) => {
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // Exchange rate VND to USD (example rate, you should fetch this from an API)
    const VND_TO_USD_RATE = 0.000041; // 1 VND = 0.000041 USD (approximate)

    // PayPal configuration
    const paypalOptions = {
        clientId: "AbYoH5JdRKNeJ_x46blNYUZnSaxLGAS4mqYfhIx65TlQVu2xEiUCFVHyuaEYFOTfFE4ND7At-F_WcLQc",
        currency: "USD",
        intent: "capture"
    };

    // Add button styles using CSS
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .pay-now-btn {
                background-color: #309689 !important;
                color: white !important;
                padding: 12px 32px !important;
                border-radius: 6px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-weight: 600 !important;
                border: none !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                font-size: 16px !important;
            }
            
            .pay-now-btn:hover {
                background-color: #257b6f !important;
            }

            .pay-now-btn:disabled {
                background-color: #9CA3AF !important;
                cursor: not-allowed !important;
            }
            
            .cancel-pay-btn {
                padding: 12px 32px !important;
                border-radius: 6px !important;
                color: #6B7280 !important;
                font-weight: 500 !important;
                background-color: transparent !important;
                border: 1px solid #D1D5DB !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
            }
            
            .cancel-pay-btn:hover {
                color: #374151 !important;
                border-color: #9CA3AF !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Convert VND to USD
    const convertToUSD = (vndAmount: number): number => {
        return Math.round(vndAmount * VND_TO_USD_RATE * 100) / 100; // Round to 2 decimal places
    };

    // Format currency
    const formatVND = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatUSD = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Handle successful PayPal payment
    // @ts-expect-error - PayPal types can be complex, using any for actions parameter
    const handlePayPalApprove = async (data: unknown, actions: any) => {
        try {
            setIsProcessingPayment(true);

            const order = await actions.order.capture();
            const transactionId = order.id;

            console.log('PayPal payment successful:', order);
            console.log('Transaction ID:', transactionId);

            // Call the success handler with the real transaction ID
            await onPaymentSuccess(transactionId);

        } catch (error) {
            console.error('❌ Error processing PayPal payment:', error);

            Swal.fire({
                icon: 'error',
                title: 'Thanh toán thất bại',
                text: 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.',
                confirmButtonText: 'Thử lại',
                confirmButtonColor: '#dc3545'
            });
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const handlePayPalError = (error: unknown) => {
        console.error('PayPal payment error:', error);

        Swal.fire({
            icon: 'error',
            title: 'Lỗi thanh toán',
            text: 'Có lỗi xảy ra với PayPal. Vui lòng thử lại.',
            confirmButtonText: 'Thử lại',
            confirmButtonColor: '#dc3545'
        });
    };

    if (!isOpen || !advertisementData) return null;

    const usdPrice = convertToUSD(advertisementData.price);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                    disabled={isSubmitting || isProcessingPayment}
                >
                    <IoMdClose size={20} />
                </button>

                <div className="p-4">
                    <div className="mb-3 text-left">
                        <h2 className="text-lg font-semibold flex items-start">
                            <span className="mr-2">💳</span>
                            Thanh toán quảng cáo
                        </h2>
                        <p className="text-gray-600 mt-1 text-sm">
                            Xác nhận thông tin và thanh toán cho gói quảng cáo của bạn
                        </p>
                    </div>

                    <hr className="my-4" />

                    <div className="mb-4 text-left">
                        <h3 className="text-base font-medium mb-3">
                            Quảng cáo - {advertisementData.packageName}
                        </h3>

                        {/* Advertisement Preview Card */}
                        <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    {advertisementData.imageFile ? (
                                        <img
                                            src={URL.createObjectURL(advertisementData.imageFile)}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="text-gray-400 text-xs">Preview</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 text-sm truncate">{advertisementData.title}</h4>
                                    {advertisementData.description && (
                                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{advertisementData.description}</p>
                                    )}
                                    <div className="mt-1">
                                        <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                                            {advertisementData.packageName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Details */}
                        <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="font-medium text-gray-900 mb-2 text-sm">Chi tiết thanh toán</h4>

                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Gói quảng cáo:</span>
                                    <span className="font-medium">{advertisementData.packageName}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Giá gốc (VND):</span>
                                    <span className="font-medium">{formatVND(advertisementData.price)}</span>
                                </div>

                                <div className="flex justify-between border-t pt-1">
                                    <span className="text-gray-600">Giá thanh toán (USD):</span>
                                    <span className="font-bold text-[#309689]">{formatUSD(usdPrice)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                            <p className="text-xs text-blue-700">
                                💡 Quảng cáo của bạn sẽ được xem xét và kích hoạt trong vòng 24 giờ sau khi thanh toán thành công.
                            </p>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-3 text-sm">Thanh toán</h4>

                        <div className="mb-3">
                            <button
                                onClick={onClose}
                                className="cancel-pay-btn"
                                disabled={isSubmitting || isProcessingPayment}
                            >
                                Hủy bỏ
                            </button>
                        </div>

                        {/* PayPal Buttons */}
                        <div className="paypal-buttons-container">
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
                                                        value: convertToUSD(advertisementData!.price).toFixed(2),
                                                        currency_code: 'USD'
                                                    },
                                                    description: `Quảng cáo - ${advertisementData!.packageName}`
                                                }
                                            ]
                                        });
                                    }}
                                    onApprove={handlePayPalApprove}
                                    onError={handlePayPalError}
                                    disabled={isSubmitting || isProcessingPayment}
                                />
                            </PayPalScriptProvider>
                        </div>

                        {isProcessingPayment && (
                            <div className="flex items-center justify-center mt-3 p-3 bg-gray-50 rounded-lg">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#309689]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-[#309689] font-medium text-sm">Đang xử lý thanh toán...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementPaymentModal; 