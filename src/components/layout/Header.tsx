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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Load worker and employer profiles to get avatars
    const loadProfiles = async () => {
        if (isLoggedIn && token) {
            const role = getRoleFromToken(token);

            if (role === "Worker") {
                try {
                    const profile = await ResumeService.getWorkerProfile();
                    setWorkerProfile(profile);
                    console.log('🔄 Main Header: Worker profile loaded/refreshed:', profile);
                } catch (error) {
                    console.error('Error loading worker profile:', error);
                    // Don't show error to user, just use default avatar
                }
            } else if (role === "Employer") {
                try {
                    const profile = await EmployerService.getEmployerProfile();
                    setEmployerProfile(profile);
                    console.log('🔄 Main Header: Employer profile loaded/refreshed:', profile);
                } catch (error) {
                    console.error('Error loading employer profile:', error);
                    // Don't show error to user, just use default avatar
                }
            }
        }
    };

    useEffect(() => {
        loadProfiles();

        // Listen for profile update events
        const handleWorkerProfileUpdate = () => {
            console.log('📢 Main Header: Received worker profile update event, refreshing...');
            loadProfiles();
        };

        const handleEmployerProfileUpdate = () => {
            console.log('📢 Main Header: Received employer profile update event, refreshing...');
            loadProfiles();
        };

        // Add event listeners for profile updates
        window.addEventListener('workerProfileUpdated', handleWorkerProfileUpdate);
        window.addEventListener('employerProfileUpdated', handleEmployerProfileUpdate);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('workerProfileUpdated', handleWorkerProfileUpdate);
            window.removeEventListener('employerProfileUpdated', handleEmployerProfileUpdate);
        };
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
        <header className="bg-black text-white py-4 relative">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.png" alt="InnoSphere Logo" className="h-6 w-6 md:h-8 md:w-8 mr-2" />
                            <span className="font-semibold text-lg md:text-xl">InnoSphere</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
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

                    {/* Desktop Auth buttons */}
                    <div className="hidden md:flex items-center">
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

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800 py-4 z-50">
                        <nav className="flex flex-col space-y-2">
                            <Link
                                to="/"
                                className={`px-4 py-2 text-base ${path === '/' ? 'font-bold text-white' : 'text-gray-300 hover:text-[#309689]'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Trang chủ
                            </Link>
                            <Link
                                to="/jobs"
                                className={`px-4 py-2 text-base ${path === '/jobs' || path.includes('/job/') ? 'font-bold text-white' : 'text-gray-300 hover:text-[#309689]'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Công việc
                            </Link>
                            <Link
                                to="/about"
                                className={`px-4 py-2 text-base ${path === '/about' ? 'font-bold text-white' : 'text-gray-300 hover:text-[#309689]'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Về chúng tôi
                            </Link>
                            <Link
                                to="/contact"
                                className={`px-4 py-2 text-base ${path === '/contact' ? 'font-bold text-white' : 'text-gray-300 hover:text-[#309689]'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Liên hệ
                            </Link>
                            <Link
                                to="/ads"
                                className={`px-4 py-2 text-base ${path === '/ads' ? 'font-bold text-white' : 'text-gray-300 hover:text-[#309689]'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Quảng cáo
                            </Link>

                            {/* Mobile Auth Buttons */}
                            {isLoggedIn ? (
                                <div className="flex flex-col space-y-2 px-4 pt-2 border-t border-gray-800">
                                    <div className="flex items-center space-x-3">
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
                                        <Link
                                            to="/login"
                                            onClick={() => {
                                                handleLogout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="text-white hover:text-[#309689] text-base"
                                        >
                                            Đăng xuất
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-2 px-4 pt-2 border-t border-gray-800">
                                    <Link
                                        to="/login"
                                        className="text-white hover:text-[#309689] text-base"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-[#309689] hover:bg-[#277a6e] text-white px-4 py-2 rounded-md text-base text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Đăng ký
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 