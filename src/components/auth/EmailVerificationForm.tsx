import React from 'react';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';

const EmailVerificationForm: React.FC = () => {
    const navigate = useNavigate();

    const handleVerifyAccount = (e: React.MouseEvent) => {
        e.preventDefault();
        // API call for verification
        navigate('/login');
    };

    const handleResendCode = (e: React.MouseEvent) => {
        e.preventDefault();
        // API call to resend verification code
        console.log('Resending verification code');
    };

    return (
        <div className="space-y-6">
            {/* Title - Centered */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">Xác minh Email</h1>
                <p className="text-gray-600 text-sm px-4">
                    Chúng tôi đã gửi thư xác minh tới <span className="font-semibold">vult291@gmail.com</span> để xác
                    minh địa chỉ email của bạn và kích hoạt tài khoản của bạn.
                </p>
            </div>

            {/* Verification code input */}
            <div>
                <Input
                    type="text"
                    placeholder="Mã xác minh"
                    className="w-full p-3"
                />
            </div>

            {/* Submit button */}
            <a
                href="#"
                onClick={handleVerifyAccount}
                className="block w-full bg-[#309689] text-white rounded-md text-center py-3 font-medium"
            >
                <div className="flex items-center justify-center">
                    Xác Minh Tài Khoản Của Tôi
                    <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </div>
            </a>

            {/* Resend code link */}
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Không nhận được mã nào!
                    <a
                        href="#"
                        className="text-[#309689] hover:underline ml-1"
                        onClick={handleResendCode}
                    >
                        Gửi lại
                    </a>
                </p>
            </div>
        </div>
    );
};

export default EmailVerificationForm; 