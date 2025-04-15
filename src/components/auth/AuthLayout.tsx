import React, { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    backgroundImage?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    backgroundImage = '/loginLogo.png'
}) => {
    return (
        <div className="flex h-screen w-full bg-white fixed">
            {/* Left side - Form Content */}
            <div className="w-full lg:w-3/5 p-8 flex flex-col relative bg-white">
                {/* Logo - Fixed position at the top */}
                <div className="absolute top-8 left-8 z-10">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="InnoSphere Logo" className="w-8 h-8" />
                        <span className="text-xl font-medium">InnoSphere</span>
                    </div>
                </div>

                {/* Form Container - Centered */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-md w-full px-4">
                        {children}
                    </div>
                </div>
            </div>

            {/* Right side - Banner */}
            <div className="hidden lg:block lg:w-2/5 bg-green-900 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: 'scale(1.05)'
                    }}
                >
                </div>
            </div>
        </div>
    );
};

export default AuthLayout; 