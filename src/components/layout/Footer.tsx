import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-16">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Công Việc */}
                    <div className="text-left">
                        <div className="flex items-center mb-6">
                            <FaBriefcase className="text-white mr-3 text-2xl" />
                            <h3 className="text-xl font-semibold">Công Việc</h3>
                        </div>

                        <p className="text-gray-300 text-base mb-4 leading-relaxed">
                            Ai cũng có thể tìm được cơ hội phù hợp – làm việc linh hoạt, thu nhập ổn định. Kết nối ngay để không bỏ lỡ...
                        </p>
                    </div>

                    {/* Column 2: Về Chúng Tôi */}
                    <div className="text-left">
                        <h3 className="text-xl font-semibold mb-6">Về Chúng Tôi</h3>
                        <ul className="space-y-4 text-left">
                            <li><Link to="/about" className="text-gray-300 hover:text-[#309689]">Giới thiệu</Link></li>
                            <li><Link to="/language" className="text-gray-300 hover:text-[#309689]">Đổi ngữ</Link></li>
                            <li><Link to="/partners" className="text-gray-300 hover:text-[#309689]">Đối tác</Link></li>
                            <li><Link to="/candidates" className="text-gray-300 hover:text-[#309689]">Dành cho ứng viên</Link></li>
                            <li><Link to="/employers" className="text-gray-300 hover:text-[#309689]">Dành cho nhà tuyển dụng</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Danh Mục Công Việc */}
                    <div className="text-left">
                        <h3 className="text-xl font-semibold mb-6">Danh Mục Công Việc</h3>
                        <ul className="space-y-4 text-left">
                            <li><Link to="/jobs/fb" className="text-gray-300 hover:text-[#309689]">F&B</Link></li>
                            <li><Link to="/jobs/retail" className="text-gray-300 hover:text-[#309689]">Retail</Link></li>
                            <li><Link to="/jobs/events" className="text-gray-300 hover:text-[#309689]">Sự Kiện</Link></li>
                            <li><Link to="/jobs/flexible" className="text-gray-300 hover:text-[#309689]">Công việc linh hoạt khác</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Nhận Bản Tin */}
                    <div className="text-left">
                        <h3 className="text-xl font-semibold mb-6">Nhận Bản Tin</h3>
                        <p className="text-gray-300 mb-6 text-left">
                            Nhận thông tin việc làm và mẹo nghề nghiệp mới nhất.
                        </p>
                        <form className="space-y-3 text-left">
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="email"
                                    placeholder="Nhập Email"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        backgroundColor: 'transparent',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '6px',
                                        color: 'white',
                                        fontSize: '15px',
                                        outline: 'none'
                                    }}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <div
                                    style={{
                                        backgroundColor: '#309689',
                                        color: 'white',
                                        padding: '12px 0',
                                        borderRadius: '6px',
                                        fontWeight: '500',
                                        fontSize: '16px',
                                        width: '100%',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Đăng ký ngay
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="mt-16 pt-8 border-t border-gray-800 text-sm">
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/privacy" className="text-gray-300 hover:text-[#309689] underline">Chính sách bảo mật</Link>
                        <Link to="/terms" className="text-gray-300 hover:text-[#309689] underline">Điều khoản & Điều kiện</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 