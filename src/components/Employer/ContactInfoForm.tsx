import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EmployerService, EmployerEditModel, CreateSocialLinkModel } from '../../services/employerService';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const ContactInfoForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+84');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get data from previous steps
    const [formData, setFormData] = useState({
        companyName: '',
        companyDescription: '',
        businessTypeId: undefined as number | undefined,
        newBusinessTypeName: '',
        newBusinessTypeDescription: '',
        companyAddress: '',
        socialLinks: [] as CreateSocialLinkModel[]
    });

    useEffect(() => {
        if (location.state) {
            setFormData({
                companyName: location.state.companyName || '',
                companyDescription: location.state.companyDescription || '',
                businessTypeId: location.state.businessTypeId,
                newBusinessTypeName: location.state.newBusinessTypeName || '',
                newBusinessTypeDescription: location.state.newBusinessTypeDescription || '',
                companyAddress: location.state.companyAddress || '',
                socialLinks: location.state.socialLinks || []
            });

            // Restore contact form fields if they exist
            if (location.state.address) setAddress(location.state.address);
            if (location.state.phoneNumber) {
                // Extract country code and phone number if phone number includes country code
                const phone = location.state.phoneNumber;
                if (phone.startsWith('+84')) {
                    setCountryCode('+84');
                    setPhoneNumber(phone.replace('+84', ''));
                } else if (phone.startsWith('+1')) {
                    setCountryCode('+1');
                    setPhoneNumber(phone.replace('+1', ''));
                } else if (phone.startsWith('+44')) {
                    setCountryCode('+44');
                    setPhoneNumber(phone.replace('+44', ''));
                } else if (phone.startsWith('+61')) {
                    setCountryCode('+61');
                    setPhoneNumber(phone.replace('+61', ''));
                } else {
                    setPhoneNumber(phone);
                }
            }
        }
    }, [location.state]);

    const handleComplete = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare the complete profile data
            const profileData: EmployerEditModel = {
                fullName: undefined, // Not collected in this flow
                avatarUrl: undefined, // Set to undefined as requested (null will be handled by API)
                address: address.trim() || undefined,
                phoneNumber: phoneNumber.trim() || undefined,
                companyName: formData.companyName,
                businessTypeId: formData.businessTypeId,
                newBusinessTypeName: formData.newBusinessTypeName || undefined,
                newBusinessTypeDescription: formData.newBusinessTypeDescription || undefined,
                companyAddress: formData.companyAddress || undefined,
                taxCode: undefined, // Not collected in this flow
                companyDescription: formData.companyDescription || undefined,
                socialLinks: formData.socialLinks
            };

            // Debug: Log the JSON being sent to API
            console.log('=== API Request JSON ===');
            console.log(JSON.stringify(profileData, null, 2));

            // Call the API to create the profile
            await EmployerService.createProfile(profileData);

            toast.success('Hồ sơ công ty đã được tạo thành công!');
            navigate('/employer/setup-complete');
        } catch (error) {
            console.error('Error creating profile:', error);
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.');
                } else if (error.response?.status === 401) {
                    toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                    navigate('/login');
                } else {
                    toast.error('Có lỗi xảy ra khi tạo hồ sơ. Vui lòng thử lại.');
                }
            } else {
                toast.error('Có lỗi không mong muốn xảy ra. Vui lòng thử lại.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Địa chỉ văn phòng
                </label>
                <input
                    type="text"
                    placeholder="Địa chỉ văn phòng"
                    className="w-full px-3 py-2 bg-[#F1F2F4] border border-[#E4E5E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                    Số điện thoại
                </label>
                <div className="flex">
                    <div className="relative">
                        <select
                            className="appearance-none bg-[#F1F2F4] border border-[#E4E5E8] rounded-l-md pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#309689] focus:bg-white text-gray-700"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        >
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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-start gap-4 mt-12">
                <Link
                    to="/employer/social-media-info"
                    className="bg-[#EBF5F4] hover:bg-[#daeae8] text-gray-700 font-medium py-2.5 px-6 rounded-md inline-flex items-center border border-[#E4E5E8]"
                    state={formData}
                >
                    Trang Trước
                </Link>
                <Link
                    to="#"
                    onClick={handleComplete}
                    className={`bg-[#309689] hover:bg-[#277b70] text-white font-medium py-2.5 px-6 rounded-md inline-flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                >
                    {isSubmitting ? 'Đang xử lý...' : 'Hoàn Thành'}
                    {!isSubmitting && (
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default ContactInfoForm; 