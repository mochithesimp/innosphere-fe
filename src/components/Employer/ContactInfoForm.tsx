import React from 'react';
import { Link } from 'react-router-dom';

const ContactInfoForm: React.FC = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Địa chỉ
                </label>
                <input
                    type="text"
                    placeholder="Địa chỉ văn phòng"
                    className="w-full px-3 py-2 bg-[#F1F2F4] border border-[#E4E5E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Số điện thoại
                </label>
                <div className="flex">
                    <div className="relative">
                        <select className="appearance-none bg-[#F1F2F4] border border-[#E4E5E8] rounded-l-md pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white text-gray-700">
                            <option value="+84">+84</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+61">+61</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        className="flex-1 px-3 py-2 bg-[#F1F2F4] border border-[#E4E5E8] border-l-0 rounded-r-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Email
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-[#309689]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    </div>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full pl-10 pr-3 py-2 bg-[#F1F2F4] border border-[#E4E5E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                    />
                </div>
            </div>

            <div className="flex justify-start gap-4 mt-12">
                <Link
                    to="/employer/social-media-info"
                    className="bg-[#EBF5F4] hover:bg-[#daeae8] text-gray-700 font-medium py-2.5 px-6 rounded-md inline-flex items-center border border-[#E4E5E8]"
                >
                    Trang Trước
                </Link>
                <Link
                    to="/employer/setup-complete"
                    className="bg-[#309689] hover:bg-[#277b70] text-white font-medium py-2.5 px-6 rounded-md inline-flex items-center"
                >
                    Hoàn Thành
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default ContactInfoForm; 