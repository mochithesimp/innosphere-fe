import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginButtonProps {
    className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className = "" }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogin}
            className={`flex items-center justify-center text-[#333] font-medium hover:text-[#309689] transition-colors ${className}`}
        >
            Đăng Nhập
            <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
        </button>
    );
};

export default LoginButton; 