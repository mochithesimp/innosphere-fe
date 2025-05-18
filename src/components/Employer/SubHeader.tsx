import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiFileText, FiGlobe, FiPhone } from 'react-icons/fi';

type SubHeaderProps = {
    currentStep: string;
};

const SubHeader: React.FC<SubHeaderProps> = ({ currentStep }) => {
    const steps = [
        { id: 'business-info', title: 'Thông tin doanh nghiệp', icon: <FiUser className="w-5 h-5" />, path: '/employer/settings' },
        { id: 'establishment-info', title: 'Thông tin thành lập', icon: <FiFileText className="w-5 h-5" />, path: '/employer/establishment-info' },
        { id: 'social-media-info', title: 'Thông tin mạng xã hội', icon: <FiGlobe className="w-5 h-5" />, path: '/employer/social-media-info' },
        { id: 'contact-info', title: 'Thông tin liên hệ', icon: <FiPhone className="w-5 h-5" />, path: '/employer/contact-info' },
    ];

    return (
        <div className="max-w-screen-lg mx-auto px-4 mb-6">
            <div className="border-b">
                <div className="flex justify-center">
                    {steps.map((step) => (
                        <Link
                            key={step.id}
                            to={step.path}
                            className={`flex items-center px-6 py-3 border-b-2 ${currentStep === step.id ? 'border-[#309689] text-[#309689] font-medium' : 'border-transparent text-gray-500'
                                }`}
                        >
                            <span className="mr-2">{step.icon}</span>
                            <span>{step.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubHeader; 