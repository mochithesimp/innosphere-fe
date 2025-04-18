import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Banner */}
            <div className="bg-black text-white py-12 text-center">
                <h1 className="text-5xl font-bold">Liên Hệ</h1>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 max-w-[90%] py-12">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Left Column - Contact Info */}
                    <div className="md:w-1/2">
                        <h2 className="text-5xl font-bold mb-4 text-left">Hỗ Trợ Tìm Việc Làm Theo Giờ</h2>
                        <p className="text-gray-700 mb-10 text-left leading-relaxed">
                            Chúng tôi luôn sẵn sàng hỗ trợ bạn tìm kiếm công việc linh hoạt phù hợp với nhu cầu. Hãy liên hệ với chúng tôi ngay hôm nay!
                        </p>

                        {/* Contact Details */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                            {/* Phone */}
                            <div className="text-left">
                                <FaPhone className="text-[#26AB7B] text-2xl mb-3" />
                                <h3 className="font-bold text-2xl mb-2">Gọi ngay:</h3>
                                <p className="text-gray-700 text-lg">+89 89783393</p>
                            </div>

                            {/* Email */}
                            <div className="text-left">
                                <FaEnvelope className="text-[#26AB7B] text-2xl mb-3" />
                                <h3 className="font-bold text-2xl mb-2">Email:</h3>
                                <p className="text-gray-700 text-lg">innosphere@vieclamtheogio.com</p>
                            </div>

                            {/* Business Hours */}
                            <div className="text-left">
                                <FaClock className="text-[#26AB7B] text-2xl mb-3" />
                                <h3 className="font-bold text-2xl mb-2">Giờ làm việc:</h3>
                                <p className="text-gray-700 text-lg">7h00-16h00</p>
                            </div>

                            {/* Office */}
                            <div className="text-left">
                                <FaMapMarkerAlt className="text-[#26AB7B] text-2xl mb-3" />
                                <h3 className="font-bold text-2xl mb-2">Văn phòng:</h3>
                                <p className="text-gray-700 text-lg">Quận 9, TP.HCM</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="md:w-1/2 bg-[#F0F9F6] rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-4 text-left">Gửi Tin Nhắn</h3>
                        <p className="text-gray-600 mb-6 text-left">
                            Bạn có câu hỏi? Hãy để lại thông tin, chúng tôi sẽ phản hồi sớm nhất.
                        </p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Name field */}
                                <div>
                                    <label className="block text-gray-700 mb-2 text-left">Họ</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26AB7B]"
                                    />
                                </div>

                                {/* Last Name field */}
                                <div>
                                    <label className="block text-gray-700 mb-2 text-left">Tên</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26AB7B]"
                                    />
                                </div>
                            </div>

                            {/* Email field */}
                            <div>
                                <label className="block text-gray-700 mb-2 text-left">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26AB7B]"
                                />
                            </div>

                            {/* Message field */}
                            <div>
                                <label className="block text-gray-700 mb-2 text-left">Tin nhắn</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26AB7B]"
                                ></textarea>
                            </div>

                            {/* Submit button */}
                            <div className="flex justify-start mt-4">
                                <div
                                    onClick={() => {
                                        // Handle form submission
                                        const form = document.querySelector('form');
                                        if (form) form.submit();
                                    }}
                                    className="bg-[#2A9D8F] text-white py-3 px-12 rounded cursor-pointer text-center"
                                    style={{
                                        background: '#2A9D8F',
                                        minWidth: '250px',
                                    }}
                                >
                                    Gửi Tin Nhắn
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-[400px] mt-12">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.765013942632!2d106.75676121892088!3d10.82321717970286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1651288892438!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="InnoSphere Office Location"
                ></iframe>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage; 