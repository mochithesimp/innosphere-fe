import React from 'react';
import { Link } from 'react-router-dom';

interface SettingsHeaderProps {
    currentStep: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ currentStep }) => {
    // Calculate progress percentage based on current step
    const getProgressPercentage = () => {
        switch (currentStep) {
            case 'business-info':
                return 0;
            case 'establishment-info':
                return 25;
            case 'social-media-info':
                return 50;
            case 'contact-info':
                return 75;
            case 'completion':
                return 100;
            default:
                return 0;
        }
    };

    const progressPercentage = getProgressPercentage();

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
                            <span className="text-[#309689]">Đã hoàn thành {progressPercentage}%</span>
                        </div>
                        <div className="w-64 bg-[#EBF5F4] h-2 rounded-full">
                            <div
                                className="bg-[#309689] h-2 rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SettingsHeader; 