import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

interface JobPromotionPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const JobPromotionPopup: React.FC<JobPromotionPopupProps> = ({ isOpen, onClose }) => {
    const [promotionType, setPromotionType] = useState<'top' | 'highlight'>('top');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
                        <h3 className="text-lg font-medium mb-4">Quảng bá công việc: Nhà thiết kế UI/UX</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First option - Top position */}
                            <div
                                className={`border ${promotionType === 'top' ? 'border-teal-600 border-2' : 'border-gray-300'} rounded-md p-4 relative cursor-pointer transition-all`}
                                onClick={() => setPromotionType('top')}
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
                                className={`border ${promotionType === 'highlight' ? 'border-teal-600 border-2' : 'border-gray-300'} rounded-md p-4 relative cursor-pointer transition-all`}
                                onClick={() => setPromotionType('highlight')}
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

                    <div className="flex justify-between mt-8">
                        <button
                            className="px-6 py-2 text-gray-500 font-medium hover:text-gray-700"
                            onClick={onClose}
                        >
                            Skip Now
                        </button>
                        <button
                            style={{
                                backgroundColor: '#309689',
                                color: 'white',
                                padding: '10px 24px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '500',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={onClose}
                        >
                            Đăng Việc <FiArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPromotionPopup; 