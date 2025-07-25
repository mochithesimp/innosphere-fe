import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { registerWorker, registerEmployer } from '../apiServices/AccountServices/authServices';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateFullName,
    validateDisplayName,
    validatePhoneNumber,
    validateTermsAccepted
} from '../../utils/validation';

const RegisterForm: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('Employer'); // Employer or Worker
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Error states
    const [fullNameError, setFullNameError] = useState('');
    const [displayNameError, setDisplayNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [termsError, setTermsError] = useState('');

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const validateForm = () => {
        const fullNameValidation = validateFullName(fullName);
        const displayNameValidation = validateDisplayName(displayName);
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);
        const phoneValidation = validatePhoneNumber(phoneNumber);
        const termsValidation = validateTermsAccepted(termsAccepted);

        setFullNameError(fullNameValidation);
        setDisplayNameError(displayNameValidation);
        setEmailError(emailValidation);
        setPasswordError(passwordValidation);
        setConfirmPasswordError(confirmPasswordValidation);
        setPhoneNumberError(phoneValidation);
        setTermsError(termsValidation);

        return !fullNameValidation && !displayNameValidation && !emailValidation &&
            !passwordValidation && !confirmPasswordValidation && !phoneValidation && !termsValidation;
    };

    const handleRegisterSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const registerData = {
                email,
                password,
                fullName,
                phoneNumber,
                address: address || undefined,
                avatarUrl: undefined
            };

            let response;
            if (userType === 'Worker') {
                response = await registerWorker(registerData);
            } else {
                response = await registerEmployer(registerData);
            }

            if (response?.status === 200) {
                // Store email for verification
                localStorage.setItem('pendingEmailVerification', email);
                localStorage.setItem('userType', userType);

                toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
                navigate('/verify-email');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    const errorMessage = error.response?.data?.message || 'Thông tin đăng ký không hợp lệ';
                    toast.error(errorMessage);
                } else if (error.response?.status === 409) {
                    toast.error('Email đã được sử dụng. Vui lòng chọn email khác.');
                } else {
                    toast.error('Đăng ký thất bại. Vui lòng thử lại.');
                }
            } else {
                console.error('Registration error:', error);
                toast.error('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 pb-6">
            {/* Title and Dropdown in a layout row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Tạo tài khoản.</h1>
                    <div className="text-sm text-gray-600 mt-2">
                        Bạn đã có tài khoản?{' '}
                        <a
                            href="#"
                            className="text-[#309689] hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLoginClick();
                            }}
                        >
                            Đăng nhập
                        </a>
                    </div>
                </div>

                {/* Dropdown */}
                <div className="relative w-full md:w-auto">
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="w-full md:w-auto p-2 border rounded-md appearance-none pr-8 text-gray-600 bg-white min-w-[150px] text-sm"
                    >
                        <option value="Employer">Nhà tuyển dụng</option>
                        <option value="Worker">Người làm việc</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                            className="w-3 h-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* Name fields - Side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Input
                            type="text"
                            placeholder="Họ và tên đầy đủ"
                            className="w-full p-3"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                                if (fullNameError) setFullNameError('');
                            }}
                        />
                        {fullNameError && <span className="text-red-500 text-sm mt-1">{fullNameError}</span>}
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Tên hiển thị"
                            className="w-full p-3"
                            value={displayName}
                            onChange={(e) => {
                                setDisplayName(e.target.value);
                                if (displayNameError) setDisplayNameError('');
                            }}
                        />
                        {displayNameError && <span className="text-red-500 text-sm mt-1">{displayNameError}</span>}
                    </div>
                </div>

                {/* Email field */}
                <div>
                    <Input
                        type="email"
                        placeholder="Địa chỉ Email"
                        className="w-full p-3"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError('');
                        }}
                    />
                    {emailError && <span className="text-red-500 text-sm mt-1">{emailError}</span>}
                </div>

                {/* Phone Number field */}
                <div>
                    <Input
                        type="tel"
                        placeholder="Số điện thoại"
                        className="w-full p-3"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (phoneNumberError) setPhoneNumberError('');
                        }}
                    />
                    {phoneNumberError && <span className="text-red-500 text-sm mt-1">{phoneNumberError}</span>}
                </div>

                {/* Address field (optional) */}
                <div>
                    <Input
                        type="text"
                        placeholder="Địa chỉ (tùy chọn)"
                        className="w-full p-3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Password field */}
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        className="w-full p-3 pr-10"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError) setPasswordError('');
                        }}
                    />
                    <button
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        type="button"
                        onClick={togglePasswordVisibility}
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
                                d={showPassword
                                    ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.6 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
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
                                    : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.6 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                }
                            />
                        </svg>
                    </button>
                    {confirmPasswordError && <span className="text-red-500 text-sm mt-1">{confirmPasswordError}</span>}
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start space-x-2">
                    <Checkbox
                        id="terms"
                        className="mt-1"
                        checked={termsAccepted}
                        onChange={(e) => {
                            setTermsAccepted(e.target.checked);
                            if (termsError) setTermsError('');
                        }}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                        Tôi đã đọc và đồng ý với <a href="#" className="text-[#309689]">Điều khoản dịch vụ</a> của InnoSphere.
                    </label>
                </div>
                {termsError && <span className="text-red-500 text-sm">{termsError}</span>}
            </div>

            {/* Submit button */}
            <button
                type="button"
                onClick={handleRegisterSubmit}
                disabled={isLoading}
                style={{ backgroundColor: '#309689' }}
                className="register-submit-btn w-full text-white rounded-md py-3 font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:!bg-[#277a6e] flex items-center justify-center"
            >
                <div className="flex items-center justify-center">
                    <span>{isLoading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản"}</span>
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
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-sm text-gray-500 absolute">hoặc</span>
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 p-2.5 border border-gray-300 rounded-md hover:bg-gray-50 w-full transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.016 4.432 10.984 10.206 11.852V15.18h-3.008v-3.154h3.008V9.927c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.154h-2.796v8.672C19.568 22.984 24 18.016 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-sm font-medium">Facebook</span>
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 p-2.5 border border-gray-300 rounded-md hover:bg-gray-50 w-full transition-colors duration-200"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#EA4335"
                            d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                        />
                        <path
                            fill="#34A853"
                            d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                        />
                        <path
                            fill="#4A90E2"
                            d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                        />
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                </button>
            </div>
        </div>
    );
};

export default RegisterForm; 