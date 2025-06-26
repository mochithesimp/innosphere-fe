import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getRoleFromToken } from '../../utils/jwtHelper';
import { ResumeService, WorkerProfileResponse } from '../../services/resumeService';
import { EmployerService, EmployerProfileModel } from '../../services/employerService';
import { handleEmployerAvatarClick } from '../../utils/employerAuth';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    const token = localStorage.getItem("token");
    const isLoggedIn = token;
    const [workerProfile, setWorkerProfile] = useState<WorkerProfileResponse | null>(null);
    const [employerProfile, setEmployerProfile] = useState<EmployerProfileModel | null>(null);

    // Load worker and employer profiles to get avatars
    useEffect(() => {
        const loadProfiles = async () => {
            if (isLoggedIn && token) {
                const role = getRoleFromToken(token);

                if (role === "Worker") {
                    try {
                        const profile = await ResumeService.getWorkerProfile();
                        setWorkerProfile(profile);
                    } catch (error) {
                        console.error('Error loading worker profile:', error);
                        // Don't show error to user, just use default avatar
                    }
                } else if (role === "Employer") {
                    try {
                        const profile = await EmployerService.getEmployerProfile();
                        setEmployerProfile(profile);
                    } catch (error) {
                        console.error('Error loading employer profile:', error);
                        // Don't show error to user, just use default avatar
                    }
                }
            }
        };

        loadProfiles();
    }, [isLoggedIn, token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    };

    const handleAvatarClick = async () => {
        if (token) {
            const role = getRoleFromToken(token);
            if (role === "Admin") {
                navigate("/admin/dashboard");
            } else if (role === "Worker") {
                navigate("/employee/dashboard");
            } else if (role === "Employer") {
                // Use employer auth logic to check profile and redirect appropriately
                await handleEmployerAvatarClick(navigate, token);
            }
        }
    };

    return (
        <header className="bg-black text-white py-4">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.png" alt="InnoSphere Logo" className="h-8 mr-2" />
                            <span className="font-semibold text-xl">InnoSphere</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center">
                        <Link
                            to="/"
                            className={`px-4 py-2 text-base ${path === '/' ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            to="/jobs"
                            className={`px-4 py-2 text-base ${path === '/jobs' || path.includes('/job/') ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Công việc
                        </Link>
                        <Link
                            to="/about"
                            className={`px-4 py-2 text-base ${path === '/about' ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Về chúng tôi
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-4 py-2 text-base ${path === '/contact' ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Liên hệ
                        </Link>
                        <Link
                            to="/ads"
                            className={`px-4 py-2 text-base ${path === '/ads' ? 'font-bold text-white' : 'font-normal text-gray-300 hover:text-[#309689]'}`}
                        >
                            Quảng cáo
                        </Link>
                    </nav>

                    {/* Auth buttons */}
                    <div className="flex items-center">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-3">
                                {/* User Avatar */}
                                <button
                                    onClick={handleAvatarClick}
                                    className="w-8 h-8 bg-[#309689] rounded-full flex items-center justify-center hover:bg-[#277a6e] transition-colors overflow-hidden"
                                    title="Đi tới Dashboard"
                                >
                                    <img
                                        src={
                                            token && getRoleFromToken(token) === "Worker"
                                                ? workerProfile?.avatarUrl || "/avatar.jpg"
                                                : token && getRoleFromToken(token) === "Employer"
                                                    ? employerProfile?.avatarUrl || "/avatar.jpg"
                                                    : "/avatar.jpg"
                                        }
                                        alt="User Avatar"
                                        className="w-full h-full rounded-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "/avatar.jpg";
                                        }}
                                    />
                                </button>

                                {/* Logout Button */}
                                <Link
                                    to="/login"
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-white hover:text-[#309689] text-base"
                                >
                                    Đăng xuất
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 text-white hover:text-[#309689] text-base">
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-[#309689] hover:bg-[#277a6e] text-white px-5 py-2 rounded-md text-base ml-2"
                                >
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 