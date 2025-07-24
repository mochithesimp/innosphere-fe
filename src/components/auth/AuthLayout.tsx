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
        <div className="flex min-h-screen w-full bg-white">
            {/* Left side - Form Content */}
            <div className="w-full lg:w-3/5 flex flex-col relative bg-white">
                {/* Logo - Fixed at the top */}
                <div className="sticky top-0 bg-white z-10 p-8 border-b">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="InnoSphere Logo" className="w-8 h-8" />
                        <span className="text-xl font-medium">InnoSphere</span>
                    </div>
                </div>

                {/* Form Container - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex items-start justify-center px-8 py-6">
                        <div className="w-full max-w-md">
                            {children}
                        </div>
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
                    }}
                >
                </div>
            </div>
        </div>
    );
};

export default AuthLayout; 