import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { verifyEmailOtp, resendEmailOtp } from '../apiServices/AccountServices/authServices';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { validateOtp } from '../../utils/validation';

const EmailVerificationForm: React.FC = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Get email from localStorage that was stored during registration
        const pendingEmail = localStorage.getItem('pendingEmailVerification');
        if (pendingEmail) {
            setEmail(pendingEmail);
        } else {
            // If no pending email, redirect to register
            navigate('/register');
        }
    }, [navigate]);

    const handleVerifyAccount = async (e: React.MouseEvent) => {
        e.preventDefault();

        const otpValidation = validateOtp(otp);
        setOtpError(otpValidation);

        if (otpValidation) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await verifyEmailOtp(email, otp);

            if (response?.status === 200) {
                toast.success('Email đã được xác thực thành công!');

                // Clear pending verification data
                localStorage.removeItem('pendingEmailVerification');
                localStorage.removeItem('userType');

                // Navigate to login page
                navigate('/login');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error('Mã OTP không hợp lệ hoặc đã hết hạn');
                } else {
                    toast.error('Xác thực thất bại. Vui lòng thử lại.');
                }
            } else {
                console.error('Email verification error:', error);
                toast.error('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error('Không tìm thấy email. Vui lòng đăng ký lại.');
            return;
        }

        setIsResending(true);

        try {
            const response = await resendEmailOtp(email);

            if (response?.status === 200) {
                toast.success('Mã xác thực đã được gửi lại. Vui lòng kiểm tra email của bạn.');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error('Không thể gửi lại mã OTP. Email có thể đã được xác thực.');
                } else {
                    toast.error('Gửi lại mã thất bại. Vui lòng thử lại.');
                }
            } else {
                console.error('Resend OTP error:', error);
                toast.error('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
            }
        } finally {
            setIsResending(false);
        }
    };

    const maskedEmail = email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : '';

    return (
        <div className="space-y-6">
            {/* Title - Centered */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">Xác minh Email</h1>
                <p className="text-gray-600 text-sm px-4">
                    Chúng tôi đã gửi mã xác thực tới <span className="font-semibold">{maskedEmail}</span> để xác
                    minh địa chỉ email của bạn và kích hoạt tài khoản của bạn.
                </p>
            </div>

            {/* Verification code input */}
            <div>
                <Input
                    type="text"
                    placeholder="Nhập mã xác thực 6 chữ số"
                    className="w-full p-3"
                    value={otp}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                        if (value.length <= 6) {
                            setOtp(value);
                            if (otpError) setOtpError('');
                        }
                    }}
                    maxLength={6}
                />
                {otpError && <span className="text-red-500 text-sm mt-1">{otpError}</span>}
            </div>

            {/* Submit button */}
            <a
                href="#"
                onClick={handleVerifyAccount}
                className="block w-full bg-[#309689] text-white rounded-md text-center py-3 font-medium"
            >
                <div className="flex items-center justify-center">
                    {isLoading ? 'Đang xác minh...' : 'Xác Minh Tài Khoản Của Tôi'}
                    {!isLoading && (
                        <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    )}
                </div>
            </a>

            {/* Resend code link */}
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Không nhận được mã nào?
                    <a
                        href="#"
                        onClick={handleResendCode}
                        className="text-[#309689] hover:underline ml-1"
                    >
                        {isResending ? 'Đang gửi...' : 'Gửi lại'}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default EmailVerificationForm; 