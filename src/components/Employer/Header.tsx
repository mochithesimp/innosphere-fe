import React from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = {
    currentStep: string;
};

const Header: React.FC<HeaderProps> = ({ currentStep }) => {
    // Calculate the progress percentage based on current step
    const steps = [
        { id: 'business-info', title: 'Thông tin doanh nghiệp' },
        { id: 'establishment-info', title: 'Thông tin thành lập' },
        { id: 'social-media-info', title: 'Thông tin mạng xã hội' },
        { id: 'contact-info', title: 'Thông tin liên hệ' }
    ];

    const currentStepIndex = steps.findIndex(step => step.id === currentStep);
    const progressPercentage = currentStepIndex >= 0
        ? `${(currentStepIndex / (steps.length - 1)) * 100}%`
        : '0%';

    return (
        <header className="bg-white border-b mb-8">
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="InnoSphere" className="h-8" />
                        <span className="text-[#00FF19] font-semibold text-xl ml-2">InnoSphere</span>
                    </Link>
                    <div className="ml-auto">
                        <div className="text-sm text-gray-500 text-left">Quá trình thiết lập</div>
                        <div className="w-64 bg-[#EBF5F4] h-2 rounded-full mt-1">
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