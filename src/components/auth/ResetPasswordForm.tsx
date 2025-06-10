import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { resetPasswordByOtp, forgotPassword } from '../apiServices/AccountServices/authServices';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { validatePassword, validateConfirmPassword, validateOtp } from '../../utils/validation';

const ResetPasswordForm: React.FC = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    // Error states
    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Get email from localStorage that was stored during forgot password flow
        const resetEmail = localStorage.getItem('resetPasswordEmail');
        if (resetEmail) {
            setEmail(resetEmail);
        } else {
            // If no reset email, redirect to forgot password
            navigate('/forgot-password');
        }
    }, [navigate]);

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleLoginReturn = () => {
        navigate('/login');
    };

    const validateForm = () => {
        const otpValidation = validateOtp(otp);
        const passwordValidation = validatePassword(newPassword);
        const confirmPasswordValidation = validateConfirmPassword(newPassword, confirmPassword);

        setOtpError(otpValidation);
        setPasswordError(passwordValidation);
        setConfirmPasswordError(confirmPasswordValidation);

        return !otpValidation && !passwordValidation && !confirmPasswordValidation;
    };

    const handleResetPassword = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await resetPasswordByOtp(email, otp, newPassword);

            if (response?.status === 200) {
                toast.success('Mật khẩu đã được đặt lại thành công!');

                // Clear reset password data
                localStorage.removeItem('resetPasswordEmail');

                // Navigate to login page
                navigate('/login');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error('Mã OTP không hợp lệ hoặc đã hết hạn.');
                } else {
                    toast.error('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
                }
            } else {
                console.error('Reset password error:', error);
                toast.error('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error('Không tìm thấy email. Vui lòng quay lại trang quên mật khẩu.');
            return;
        }

        setIsResending(true);

        try {
            const response = await forgotPassword(email);

            if (response?.status === 200) {
                toast.success('Mã OTP đã được gửi lại. Vui lòng kiểm tra email của bạn.');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error('Email không tồn tại hoặc chưa được xác thực.');
                } else {
                    toast.error('Gửi lại mã thất bại. Vui lòng thử lại.');
                }
            } else {
                console.error('Resend reset password OTP error:', error);
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
                <h1 className="text-2xl font-bold mb-2">Đặt lại mật khẩu</h1>
                <p className="text-gray-600 text-sm">
                    Chúng tôi đã gửi mã xác thực tới <span className="font-semibold">{maskedEmail}</span>.
                    Vui lòng nhập mã và mật khẩu mới của bạn.
                </p>
            </div>

            {/* OTP field */}
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

            {/* New Password field */}
            <div className="relative">
                <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Mật khẩu mới"
                    className="w-full p-3 pr-10"
                    value={newPassword}
                    onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (passwordError) setPasswordError('');
                    }}
                />
                <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                >
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={showNewPassword
                                ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            }
                        />
                    </svg>
                </button>
                {passwordError && <span className="text-red-500 text-sm mt-1">{passwordError}</span>}
            </div>

            {/* Confirm Password field */}
            <div className="relative">
                <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu"
                    className="w-full p-3 pr-10"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (confirmPasswordError) setConfirmPasswordError('');
                    }}
                />
                <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                >
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={showConfirmPassword
                                ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            }
                        />
                    </svg>
                </button>
                {confirmPasswordError && <span className="text-red-500 text-sm mt-1">{confirmPasswordError}</span>}
            </div>

            {/* Submit button */}
            <a
                href="#"
                onClick={handleResetPassword}
                className="block w-full bg-[#309689] text-white rounded-md text-center py-3 font-medium"
            >
                <div className="flex items-center justify-center">
                    {isLoading ? 'Đang đặt lại...' : 'Đặt Lại Mật Khẩu'}
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

            {/* Return to login link */}
            <div className="text-center mt-4">
                <a
                    href="#"
                    className="text-sm text-[#309689] hover:underline"
                    onClick={(e) => {
                        e.preventDefault();
                        handleLoginReturn();
                    }}
                >
                    Quay lại trang đăng nhập
                </a>
            </div>
        </div>
    );
};

export default ResetPasswordForm; 