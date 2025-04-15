import React from 'react';

interface InnoSphereLogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    variant?: 'default' | 'banner';
}

const InnoSphereLogo: React.FC<InnoSphereLogoProps> = ({
    size = 'md',
    className = '',
    variant = 'default'
}) => {
    let sizeClasses = '';

    switch (size) {
        case 'sm':
            sizeClasses = 'w-6 h-6';
            break;
        case 'md':
            sizeClasses = 'w-12 h-12';
            break;
        case 'lg':
            sizeClasses = 'w-16 h-16';
            break;
        default:
            sizeClasses = 'w-12 h-12';
    }

    if (variant === 'default') {
        return (
            <div className={`${sizeClasses} ${className} rounded-full flex items-center justify-center bg-green-500`}>
                <svg
                    viewBox="0 0 24 24"
                    width="60%"
                    height="60%"
                    className="text-white"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>
        );
    }

    // Banner variant with NP text
    return (
        <div className={`${sizeClasses} ${className} bg-white p-3 rounded-lg`}>
            <div className="w-full h-full rounded-full flex items-center justify-center bg-green-500">
                <span className="text-white font-bold" style={{ fontSize: size === 'lg' ? '1.5rem' : '1rem' }}>NP</span>
            </div>
        </div>
    );
};

export default InnoSphereLogo; 