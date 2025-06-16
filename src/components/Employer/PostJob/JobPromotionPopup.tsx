import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

interface JobPromotionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle?: string;
    onJobPost?: (isUrgent: boolean, isHighlighted: boolean) => Promise<void>;
    isSubmitting?: boolean;
}

const JobPromotionPopup: React.FC<JobPromotionPopupProps> = ({
    isOpen,
    onClose,
    jobTitle = 'Nhà thiết kế UI/UX',
    onJobPost,
    isSubmitting = false
}) => {
    const [promotionType, setPromotionType] = useState<'top' | 'highlight'>('top');

    // Add button styles using CSS
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .post-job-btn {
                background-color: #309689 !important;
                color: white !important;
                padding: 10px 24px !important;
                border-radius: 6px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-weight: 500 !important;
                border: none !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
            }
            
            .post-job-btn:hover {
                background-color: #257b6f !important;
            }

            .post-job-btn:disabled {
                background-color: #9CA3AF !important;
                cursor: not-allowed !important;
            }
            
            .skip-now-btn {
                padding: 10px 24px !important;
                border-radius: 6px !important;
                color: #6B7280 !important;
                font-weight: 500 !important;
                background-color: transparent !important;
                border: none !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
            }
            
            .skip-now-btn:hover {
                color: #374151 !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handlePostJob = async () => {
        if (onJobPost) {
            const isUrgent = promotionType === 'top';
            const isHighlighted = promotionType === 'highlight';
            await onJobPost(isUrgent, isHighlighted);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    disabled={isSubmitting}
                >
                    <IoMdClose size={24} />
                </button>

                <div className="p-6">
                    <div className="mb-4 text-left">
                        <h2 className="text-xl font-semibold flex items-start">
                            <span className="mr-2">🎉</span>
                            Xin chúc mừng, Công việc của bạn đã được đăng thành công!
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Bạn có thể quản lý biểu mẫu phân công việc của tôi trong bảng điều khiển của mình
                        </p>
                    </div>

                    <div className="mt-4 mb-4 text-left">
                        <a href="/employer/my-jobs" className="inline-flex items-center text-[#309689] border border-[#309689] rounded-md px-6 py-3">
                            Xem Việc Làm <FiArrowRight className="ml-2" />
                        </a>
                    </div>

                    <hr className="my-6" />

                    <div className="mb-4 text-left">
                        <h3 className="text-lg font-medium mb-4">Quảng bá công việc: {jobTitle}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First option - Top position */}
                            <div
                                className={`border ${promotionType === 'top' ? 'border-teal-600 border-2' : 'border-gray-300'} rounded-md p-4 relative cursor-pointer transition-all ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                                onClick={() => !isSubmitting && setPromotionType('top')}
                            >
                                <div className="bg-white">
                                    <h4 className="text-sm font-medium mb-4 uppercase text-left">ALWAYS ON THE TOP</h4>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-start space-x-2 border-2 border-teal-600 rounded p-1">
                                            <div className="h-8 w-8 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 w-3/4 mb-1 rounded-sm"></div>
                                                <div className="h-1.5 bg-teal-600 w-full rounded-sm"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 p-1">
                                            <div className="h-8 w-8 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 w-3/4 mb-1 rounded-sm"></div>
                                                <div className="h-1.5 bg-gray-200 w-full rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-start space-x-2 p-1">
                                            <div className="h-8 w-8 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 w-3/4 mb-1 rounded-sm"></div>
                                                <div className="h-1.5 bg-gray-200 w-full rounded-sm"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 p-1">
                                            <div className="h-8 w-8 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 w-3/4 mb-1 rounded-sm"></div>
                                                <div className="h-1.5 bg-gray-200 w-full rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center relative ${promotionType === 'top' ? 'border-[#309689]' : 'border-gray-300'}`}>
                                        {promotionType === 'top' && (
                                            <div className="w-4 h-4 bg-[#309689] rounded-full absolute"></div>
                                        )}
                                    </div>
                                    <div className="ml-3 text-left">
                                        <h4 className="font-medium">Nổi bật công việc của bạn</h4>
                                        <p className="text-sm text-gray-600">Hiển thị công việc này trên top đầu các công việc của bạn.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Second option - Highlight with color */}
                            <div
                                className={`border ${promotionType === 'highlight' ? 'border-teal-600 border-2' : 'border-gray-300'} rounded-md p-4 relative cursor-pointer transition-all ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                                onClick={() => !isSubmitting && setPromotionType('highlight')}
                            >
                                <div className="bg-white">
                                    <h4 className="text-sm font-medium mb-4 uppercase text-left">HIGHLIGHT JOB WITH COLOR</h4>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-start space-x-2 p-1">
                                            <div className="h-8 w-8 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 w-3/4 mb-1 rounded-sm"></div>
                                                <div className="h-1.5 bg-gray-200 w-full rounded-sm"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 border-2 border-amber-400 rounded p-1">
                                            <div className="h-8 w-8 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 w-3/4 mb-1 rounded-sm"></div>
                                                <div className="h-1.5 bg-amber-400 w-full rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-start space-x-2 p-1">
                                            <div className="h-8 w-8 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 w-3/4 mb-1 rounded-sm"></div>
                                                <div className="h-1.5 bg-gray-200 w-full rounded-sm"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 p-1">
                                            <div className="h-8 w-8 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 w-3/4 mb-1 rounded-sm"></div>
                                                <div className="h-1.5 bg-gray-200 w-full rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center relative ${promotionType === 'highlight' ? 'border-[#309689]' : 'border-gray-300'}`}>
                                        {promotionType === 'highlight' && (
                                            <div className="w-4 h-4 bg-[#309689] rounded-full absolute"></div>
                                        )}
                                    </div>
                                    <div className="ml-3 text-left">
                                        <h4 className="font-medium">Highlight công việc của bạn</h4>
                                        <p className="text-sm text-gray-600">Làm nổi bật công việc này của bạn bằng cách highlight màu cho công việc đó.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <button
                            className="skip-now-btn"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Bỏ qua ngay bây giờ
                        </button>
                        <button
                            className="post-job-btn"
                            onClick={handlePostJob}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang đăng...
                                </>
                            ) : (
                                <>
                                    Đăng việc
                                    <FiArrowRight className="ml-2" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPromotionPopup; 