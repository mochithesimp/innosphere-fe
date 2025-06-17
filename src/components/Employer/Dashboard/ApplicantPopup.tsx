import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiStarLine, RiMailLine, RiUserReceived2Line, RiToggleLine, RiToggleFill } from 'react-icons/ri';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRedditAlien, FaInstagram, FaYoutube, FaStar } from 'react-icons/fa';
import { JobApplicationService } from '../../../services/jobApplicationService';

// Enhanced Applicant interface to support API data
interface Applicant {
    id: number;
    name: string;
    position: string;
    experience: string;
    education: string;
    applicationDate: string;
    coverNote?: string;
    // Enhanced API worker profile data (optional - fallback to hardcoded if null/empty)
    workerProfile?: {
        fullName?: string;
        bio?: string;
        dateOfBirth?: string;
        nationality?: string;
        maritalStatus?: string;
        gender?: string;
        personalWebsite?: string;
        contactLocation?: string;
        phoneNumber?: string;
        email?: string;
        experience?: string;
        education?: string;
    };
    resumeTitle?: string;
    isFromAPI?: boolean; // Flag to identify API data
    applicationId?: number; // Job application ID for API calls
    applicationStatus?: string; // Current application status
    jobPostingStatus?: string; // Job posting status (OPEN, CLOSED, etc.)
}

interface ApplicantPopupProps {
    isOpen: boolean;
    onClose: () => void;
    applicant: Applicant | null;
    onHire?: (applicantId: number) => void; // Add callback for hire action
}

// Rating Popup Component
interface RatingPopupProps {
    isOpen: boolean;
    onClose: () => void;
    applicant: Applicant | null;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ isOpen, onClose, applicant }) => {
    const [ratings, setRatings] = useState({
        workEfficiency: 3,
        attitude: 4,
        responsibility: 2,
        skills: 5
    });
    const [comment, setComment] = useState('');

    if (!isOpen || !applicant) return null;

    const handleRatingChange = (category: string, value: number) => {
        setRatings(prev => ({
            ...prev,
            [category]: value
        }));
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-[450px] overflow-auto relative p-6">
                <div className="flex justify-between items-center mb-4 text-left">
                    <h2 className="text-xl font-semibold text-left">Đánh giá ứng viên: {applicant.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>

                <p className="text-gray-600 mb-6 text-left">Độ tin cậy và chất lượng công việc thế nào?</p>

                <div className="space-y-6">
                    <div className="text-left">
                        <p className="mb-2 text-gray-700 font-medium text-left">Hiệu suất công việc</p>
                        <div className="flex space-x-2 justify-start">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingChange('workEfficiency', star)}
                                >
                                    <FaStar
                                        size={24}
                                        className={star <= ratings.workEfficiency
                                            ? "text-yellow-500"
                                            : "text-gray-300"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="mb-2 text-gray-700 font-medium text-left">Thái độ và tinh thần làm việc</p>
                        <div className="flex space-x-2 justify-start">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingChange('attitude', star)}
                                >
                                    <FaStar
                                        size={24}
                                        className={star <= ratings.attitude
                                            ? "text-yellow-500"
                                            : "text-gray-300"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="mb-2 text-gray-700 font-medium text-left">Tinh thần trách nhiệm</p>
                        <div className="flex space-x-2 justify-start">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingChange('responsibility', star)}
                                >
                                    <FaStar
                                        size={24}
                                        className={star <= ratings.responsibility
                                            ? "text-yellow-500"
                                            : "text-gray-300"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="mb-2 text-gray-700 font-medium text-left">Kỹ năng và năng lực</p>
                        <div className="flex space-x-2 justify-start">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingChange('skills', star)}
                                >
                                    <FaStar
                                        size={24}
                                        className={star <= ratings.skills
                                            ? "text-yellow-500"
                                            : "text-gray-300"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="mb-2 text-gray-700 font-medium text-left">Bạn có thể cho chúng tôi biết thêm không?</p>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3 h-[100px] resize-none focus:outline-none focus:border-[#309689] text-left"
                            placeholder="Thêm phản hồi"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Hủy bỏ
                    </button>
                    <a href="#" className="px-6 py-2 bg-[#309689] text-white rounded-md hover:bg-[#277b70] flex items-center justify-center">
                        Gửi
                    </a>
                </div>
            </div>
        </div>
    );
};

const ApplicantPopup: React.FC<ApplicantPopupProps> = ({ isOpen, onClose, applicant, onHire }) => {
    const [isRatingMode, setIsRatingMode] = useState(false);
    const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);
    const [isHired, setIsHired] = useState(false);
    const [isHiring, setIsHiring] = useState(false);

    // Update isHired state when applicant changes
    useEffect(() => {
        setIsHired(applicant?.applicationStatus === 'ACCEPTED');
    }, [applicant]);

    if (!isOpen || !applicant) return null;

    // Debug log to check status values
    console.log('ApplicantPopup - Application Status:', applicant.applicationStatus);
    console.log('ApplicantPopup - Job Posting Status:', applicant.jobPostingStatus);
    console.log('ApplicantPopup - Is Hired:', isHired);

    const handleHireApplicant = async () => {
        if (!applicant.applicationId || isHiring || isHired) return;

        try {
            setIsHiring(true);
            await JobApplicationService.updateJobApplicationStatus(applicant.applicationId, 'ACCEPTED');
            setIsHired(true);
            // Call the callback to refresh data in parent component
            if (onHire && applicant.id) {
                onHire(applicant.id);
            }
        } catch (error) {
            console.error('Error hiring applicant:', error);
            alert('Có lỗi xảy ra khi thuê ứng viên');
        } finally {
            setIsHiring(false);
        }
    };

    const toggleRatingMode = () => {
        setIsRatingMode(!isRatingMode);
    };

    const openRatingPopup = () => {
        setIsRatingPopupOpen(true);
    };

    const closeRatingPopup = () => {
        setIsRatingPopupOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-[90%] max-w-5xl max-h-[90vh] overflow-auto relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <IoMdClose size={24} />
                </button>

                <div className="p-6">
                    {/* Header - Full width */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="w-16 h-16 bg-gray-400 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {applicant.workerProfile?.fullName || applicant.name}
                                </h2>
                                <p className="text-gray-600">{applicant.position}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleRatingMode}
                                className="p-2 text-gray-400 hover:text-[#309689]"
                            >
                                {isRatingMode ?
                                    <RiToggleFill size={24} className="text-[#309689]" /> :
                                    <RiToggleLine size={24} />
                                }
                            </button>
                            <button className="p-2 text-gray-400 border border-gray-200 rounded-md hover:bg-gray-50">
                                <RiStarLine size={20} />
                            </button>
                            <button className="flex items-center gap-2 py-2 px-4 text-[#309689] border border-[#309689] rounded-md hover:bg-[#f0f9f8]">
                                <RiMailLine className="text-[#309689]" />
                                <span>Send Mail</span>
                            </button>
                            {isRatingMode ? (
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        openRatingPopup();
                                    }}
                                    className="w-auto h-auto flex items-center gap-2 py-2 px-4 bg-[#309689] text-white rounded-md"
                                >
                                    <span>Đánh Giá Ứng Viên</span>
                                </a>
                            ) : (
                                isHired && applicant.jobPostingStatus === 'CLOSED' ? (
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openRatingPopup();
                                        }}
                                        className="w-auto h-auto flex items-center gap-2 py-2 px-4 bg-[#309689] text-white rounded-md"
                                    >
                                        <span>Đánh giá ứng viên</span>
                                    </a>
                                ) : isHired ? (
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        className="w-auto h-auto flex items-center gap-2 py-2 px-4 bg-[#309689] text-white rounded-md cursor-not-allowed pointer-events-none"
                                    >
                                        <RiUserReceived2Line />
                                        <span>Đã thuê</span>
                                    </a>
                                ) : (
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!isHiring) {
                                                handleHireApplicant();
                                            }
                                        }}
                                        className={`w-auto h-auto flex items-center gap-2 py-2 px-4 bg-[#309689] text-white rounded-md ${isHiring ? 'opacity-75 cursor-not-allowed pointer-events-none' : ''}`}
                                    >
                                        <RiUserReceived2Line />
                                        <span>{isHiring ? 'Đang thuê...' : 'Thuê Ứng Viên'}</span>
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    {/* Content - Two columns */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left side - Profile info */}
                        <div className="md:w-2/3">
                            {/* Bio section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-left">Tiêu sử</h3>
                                <p className="text-gray-600 text-left">
                                    {(applicant.workerProfile?.bio && applicant.workerProfile.bio.trim() !== '')
                                        ? applicant.workerProfile.bio
                                        : 'Tôi đã đam mê thiết kế đồ họa và nghệ thuật kỹ thuật số từ khi còn nhỏ với mối quan tâm sâu sắc đến Giao diện người dùng trang web và ứng dụng di động. Tôi có thể tạo ra các thiết kế chất lượng cao và thẩm mỹ trong thời gian quay vòng nhanh chóng. Kiểm tra phần danh mục đầu tư trong hồ sơ của tôi để xem các mẫu tác phẩm của tôi và vui lòng thảo luận về nhu cầu thiết kế của bạn. Tôi chủ yếu sử dụng Adobe Photoshop, Illustrator, XD và Figma. * Thiết kế giao diện và trải nghiệm người dùng trang web (UI/UX) - dành cho tất cả các loại trang web Chuyên nghiệp và Cá nhân. * Trải nghiệm người dùng ứng dụng di động và thiết kế giao diện - cho tất cả các loại iOS / Android và Ứng dụng di động lại. * Thiết kế khung dây.'}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-6"></div>

                            {/* Application section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-left">Đơn xin việc</h3>
                                <p className="text-gray-600 mb-4 text-left">Kính thưa,</p>
                                <p className="text-gray-600 mb-4 text-left">
                                    {applicant.coverNote || 'Tôi viết thư để bày tỏ sự quan tâm của mình đối với vị trí giảng dạy lớp bốn hiện có trong Hệ thống Trường Công đồng Fort Wayne. Tôi biết về việc mở cửa thông qua một thông báo được đăng trên JobZone, có số dữ liệu việc làm của IPFW. Tôi tự tin rằng nền tảng học vấn và kỹ năng phát triển chương trình giảng dạy của mình sẽ được sử dụng thành công ở vị trí giảng dạy này.'}
                                </p>
                                <p className="text-gray-600 mb-4 text-left">
                                    {applicant.coverNote ? '' : 'Tôi vừa hoàn thành bằng Cử nhân Khoa học tại Harvard và đã hoàn thành xuất sắc Praxis I và Praxis II. Trong kinh nghiệm giảng dạy sinh viên của mình, tôi đã phát triển và khởi xướng một chuỗi chương trình giảng dạy kéo dài ba tuần về các loài động vật và tài nguyên trái đất. Đơn vị hợp tác này liên quan đến việc làm việc với ba giáo viên lớp ba khác trong nhóm của tôi và lên đến đỉnh điểm là một chuyến đi thực tế đến Đơn vị Nghiên cứu Động vật của Sở thú Indianapolis.'}
                                </p>
                                <p className="text-gray-600 mb-1 text-left">Thân mến,</p>
                                <p className="text-gray-600 text-left">{applicant.applicationDate}</p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-6"></div>

                            {/* Social media */}
                            <div>
                                <p className="text-sm text-gray-500 mb-3 text-left">Theo dõi tôi Truyền thông xã hội</p>
                                <div className="flex gap-2">
                                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                                        <FaFacebookF />
                                    </a>
                                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#309689] text-white rounded-md">
                                        <FaTwitter />
                                    </a>
                                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                                        <FaLinkedinIn />
                                    </a>
                                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                                        <FaRedditAlien />
                                    </a>
                                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                                        <FaInstagram />
                                    </a>
                                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                                        <FaYoutube />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Details */}
                        <div className="md:w-1/3">
                            {/* Personal details cards */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {/* DOB */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 2V5" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 2V5" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.5 9.09H20.5" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1 text-left">NGÀY SINH</span>
                                        <p className="text-gray-700 font-bold text-left">
                                            {(applicant.workerProfile?.dateOfBirth && applicant.workerProfile.dateOfBirth.trim() !== '')
                                                ? applicant.workerProfile.dateOfBirth
                                                : '29 Nov, 2003'}
                                        </p>
                                    </div>
                                </div>

                                {/* Nationality */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1 text-left">QUỐC TỊCH</span>
                                        <p className="text-gray-700 font-bold text-left">
                                            {(applicant.workerProfile?.nationality && applicant.workerProfile.nationality.trim() !== '')
                                                ? applicant.workerProfile.nationality
                                                : 'Vietnam'}
                                        </p>
                                    </div>
                                </div>

                                {/* Marital Status */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7.16021 14.56C4.74021 16.18 4.74021 18.82 7.16021 20.43C9.91021 22.27 14.4202 22.27 17.1702 20.43C19.5902 18.81 19.5902 16.17 17.1702 14.56C14.4302 12.73 9.92021 12.73 7.16021 14.56Z" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1 text-left">TÌNH TRẠNG HÔN NHÂN</span>
                                        <p className="text-gray-700 font-bold text-left">
                                            {(applicant.workerProfile?.maritalStatus && applicant.workerProfile.maritalStatus.trim() !== '')
                                                ? applicant.workerProfile.maritalStatus
                                                : 'Độc Thân'}
                                        </p>
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 8V13" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.9946 16H12.0036" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1">GIỚI TÍNH</span>
                                        <p className="text-gray-700 font-bold">
                                            {(applicant.workerProfile?.gender && applicant.workerProfile.gender.trim() !== '')
                                                ? applicant.workerProfile.gender
                                                : 'Nam'}
                                        </p>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 8H4V17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19H17" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 8H17V5C17 4.46957 16.7893 3.96086 16.4142 3.58579C16.0391 3.21071 15.5304 3 15 3H9C8.46957 3 7.96086 3.21071 7.58579 3.58579C7.21071 3.96086 7 4.46957 7 5V17C7 17.5304 7.21071 18.0391 7.58579 18.4142C7.96086 18.7893 8.46957 19 9 19H16.5" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 8V16C20 17.1046 19.1046 18 18 18C16.8954 18 16 17.1046 16 16V8H20Z" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1">KINH NGHIỆM</span>
                                        <p className="text-gray-700 font-bold">
                                            {(applicant.workerProfile && applicant.isFromAPI && applicant.workerProfile.experience && applicant.workerProfile.experience.trim() !== '')
                                                ? applicant.workerProfile.experience
                                                : applicant.experience}
                                        </p>
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15Z" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1">HỌC VẤN</span>
                                        <p className="text-gray-700 font-bold">
                                            {(applicant.workerProfile && applicant.isFromAPI && applicant.workerProfile.education && applicant.workerProfile.education.trim() !== '')
                                                ? applicant.workerProfile.education
                                                : applicant.education.replace('Học vấn: ', '')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Resume download */}
                            <div className="border-t border-gray-200 pt-6 mb-6">
                                <h3 className="text-gray-700 font-medium mb-3 text-left">Tải xuống sơ yếu lý lịch của tôi</h3>
                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                    <div className="flex items-start">
                                        <div className="bg-gray-200 p-2 rounded mr-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 2H9C8.44772 2 8 2.44772 8 3V21C8 21.5523 8.44772 22 9 22H15C15.5523 22 16 21.5523 16 21V3C16 2.44772 15.5523 2 15 2Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8 6H6C5.44772 6 5 6.44772 5 7V17C5 17.5523 5.44772 18 6 18H8" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 6H18C18.5523 6 19 6.44772 19 7V17C19 17.5523 18.5523 18 18 18H16" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <p className="text-sm text-gray-600 font-bold">
                                                {(applicant.resumeTitle && applicant.resumeTitle.trim() !== '')
                                                    ? applicant.resumeTitle
                                                    : applicant.name}
                                            </p>
                                            <p className="text-xs text-gray-500">PDF</p>
                                        </div>
                                    </div>
                                    <a href="#" className="text-[#309689]">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 10L12 15L17 10" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 15V3" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Contact information */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-gray-700 font-medium mb-4 text-left">Thông tin liên lạc</h3>

                                {/* Website */}
                                <div className="flex items-start mb-4">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.00001 3H9.00001C7.05001 8.84 7.05001 15.16 9.00001 21H8.00001" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 9.00001C8.84 7.05001 15.16 7.0501 21 9.00001" stroke="#309689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1 text-left">WEBSITE</span>
                                        <p className="text-gray-700 font-bold text-left">
                                            {(applicant.workerProfile?.personalWebsite && applicant.workerProfile.personalWebsite.trim() !== '')
                                                ? applicant.workerProfile.personalWebsite
                                                : 'www.mochithecuite.com'}
                                        </p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 my-4"></div>

                                {/* Address */}
                                <div className="flex items-start mb-4">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z" stroke="#309689" strokeWidth="1.5" />
                                                <path d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159998 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z" stroke="#309689" strokeWidth="1.5" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1">ĐỊA CHỈ</span>
                                        <p className="text-gray-700 font-bold">
                                            {(applicant.workerProfile?.contactLocation && applicant.workerProfile.contactLocation.trim() !== '')
                                                ? applicant.workerProfile.contactLocation
                                                : 'Landmark, L5'}
                                        </p>
                                        <p className="text-gray-500 text-sm">Tower L5, HCM City</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 my-4"></div>

                                {/* Phone */}
                                <div className="flex items-start mb-4">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.31 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1">LIÊN HỆ 1</span>
                                        <p className="text-gray-700 font-bold">
                                            {(applicant.workerProfile?.phoneNumber && applicant.workerProfile.phoneNumber.trim() !== '')
                                                ? applicant.workerProfile.phoneNumber
                                                : '+84 0989783393'}
                                        </p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 my-4"></div>

                                {/* Email */}
                                <div className="flex items-start">
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#309689] mb-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase mb-1 text-left">EMAIL</span>
                                        <p className="text-gray-700 font-bold text-left">
                                            {(applicant.workerProfile?.email && applicant.workerProfile.email.trim() !== '')
                                                ? applicant.workerProfile.email
                                                : 'vult2911@gmail.com'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating Popup */}
            <RatingPopup
                isOpen={isRatingPopupOpen}
                onClose={closeRatingPopup}
                applicant={applicant}
            />
        </div >
    );
};

export default ApplicantPopup; 