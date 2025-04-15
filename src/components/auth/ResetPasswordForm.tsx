import React, { useState } from 'react';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm: React.FC = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleLoginReturn = () => {
        navigate('/login');
    };

    const handleResetPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        // API call
        // Test Section
        navigate('/login');
    };

    return (
        <div className="space-y-6">
            {/* Title - Centered */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">Đặt lại mật khẩu</h1>
                <p className="text-gray-600 text-sm">
                    Hãy ghi nhớ mật khẩu mới của bạn thật kỹ.
                </p>
            </div>

            {/* New Password field */}
            <div className="relative">
                <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Mật khẩu mới"
                    className="w-full p-3 pr-10"
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
            </div>

            {/* Confirm Password field */}
            <div className="relative">
                <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu"
                    className="w-full p-3 pr-10"
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
            </div>

            {/* Submit button */}
            <a
                href="#"
                onClick={handleResetPassword}
                className="block w-full bg-[#309689] text-white rounded-md text-center py-3 font-medium"
            >
                <div className="flex items-center justify-center">
                    Đặt Lại Mật Khẩu
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