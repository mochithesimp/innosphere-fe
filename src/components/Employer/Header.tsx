import React from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = {
    currentStep: string;
};

const Header: React.FC<HeaderProps> = ({ currentStep }) => {
    // Calculate the progress percentage based on current step
    const steps = [
        { id: 'business-info', title: 'Thông tin doanh nghiệp', percentage: 0 },
        { id: 'establishment-info', title: 'Thông tin thành lập', percentage: 25 },
        { id: 'social-media-info', title: 'Thông tin mạng xã hội', percentage: 50 },
        { id: 'contact-info', title: 'Thông tin liên hệ', percentage: 100 }
    ];

    const currentStepIndex = steps.findIndex(step => step.id === currentStep);
    const currentPercentage = currentStepIndex >= 0 ? steps[currentStepIndex].percentage : 0;
    const progressPercentage = `${currentPercentage}%`;
    const showCompletionText = currentPercentage > 0;

    return (
        <header className="bg-white border-b mb-8">
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="InnoSphere" className="h-8" />
                        <span className="text-[#00FF19] font-semibold text-xl ml-2">InnoSphere</span>
                    </Link>
                    <div className="ml-auto">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Quá trình thiết lập</span>
                            {showCompletionText && (
                                <span className="text-[#309689]">Đã hoàn thành {progressPercentage}</span>
                            )}
                        </div>
                        <div className="w-64 bg-[#EBF5F4] h-2 rounded-full">
                            <div
                                className="bg-[#309689] h-2 rounded-full"
                                style={{ width: progressPercentage }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 