import React from 'react';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginReturn = () => {
        navigate('/login');
    };

    const handleResetPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        // checkkkkkk
        // APIIIII
        navigate('/reset-password');
    };

    return (
        <div className="space-y-6">
            {/* Title */}
            <div className="text-left">
                <h1 className="text-2xl font-bold mb-4">Quên mật khẩu</h1>
                <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <span>Quay lại </span>
                        <a
                            href="#"
                            className="text-[#309689] hover:underline ml-1"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLoginReturn();
                            }}
                        >
                            Đăng nhập
                        </a>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <span>Không có tài khoản? </span>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/register');
                            }}
                            className="text-[#309689] hover:underline ml-1"
                        >
                            Tạo tài khoản
                        </a>
                    </div>
                </div>
            </div>

            {/* Email field */}
            <Input type="email" placeholder="Địa chỉ Email" className="w-full p-3" />

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

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-sm text-gray-500 absolute">hoặc</span>
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.016 4.432 10.984 10.206 11.852V15.18h-3.008v-3.154h3.008V9.927c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.154h-2.796v8.672C19.568 22.984 24 18.016 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-sm">Đăng nhập với Facebook</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
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
                    <span className="text-sm">Đăng nhập với Google</span>
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordForm; 