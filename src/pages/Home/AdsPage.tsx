import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { getUserIdFromToken, isTokenExpired } from '../../utils/auth';
import { CreateAdvertisementModel, AdvertisementService, AdvertisementPackageModel } from '../../services/advertisementService';
import { EmployerService } from '../../services/employerService';
import AdvertisementModal, { AdvertisementFormData } from '../../components/Advertisement/AdvertisementModal';
import AdvertisementPaymentModal from '../../components/Advertisement/AdvertisementPaymentModal';
import { FirebaseStorageService } from '../../services/firebaseStorageService';

const AdsPage: React.FC = () => {
    const [packages, setPackages] = useState<AdvertisementPackageModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState<AdvertisementPackageModel | null>(null);
    const [isAdModalOpen, setIsAdModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [advertisementData, setAdvertisementData] = useState<AdvertisementFormData | null>(null);
    const [employerId, setEmployerId] = useState<number | null>(null);

    // Fetch advertisement packages on component mount
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const activePackages = await AdvertisementService.getAllActivePackages();
                setPackages(activePackages);
            } catch (error) {
                console.error('Error fetching advertisement packages:', error);
                Swal.fire('Lỗi', 'Không thể tải danh sách gói quảng cáo', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // Get employer information if user is logged in
    useEffect(() => {
        const checkEmployerStatus = async () => {
            try {
                const userId = getUserIdFromToken();
                if (userId && !isTokenExpired()) {
                    const employerProfile = await EmployerService.getProfile();
                    console.log('Employer Profile:', employerProfile); // Debug log
                    if (employerProfile?.employerId) {
                        setEmployerId(employerProfile.employerId);
                    }
                }
            } catch (error) {
                console.log('User is not an employer or not logged in:', error);
            }
        };

        checkEmployerStatus();
    }, []);

    // Check if user is logged in
    const isUserLoggedIn = (): boolean => {
        const userId = getUserIdFromToken();
        return !!(userId && !isTokenExpired());
    };

    // Handle "Mua gói" button click
    const handlePurchaseClick = (packageData: AdvertisementPackageModel) => {
        if (!isUserLoggedIn()) {
            // Show SweetAlert and redirect to login
            Swal.fire({
                title: 'Đăng nhập để tiếp tục',
                text: 'Bạn cần đăng nhập để mua gói quảng cáo',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Đăng nhập ngay',
                cancelButtonText: 'Hủy',
                confirmButtonColor: '#309689',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });
            return;
        }

        if (!employerId) {
            Swal.fire({
                title: 'Tài khoản không hợp lệ',
                text: 'Chỉ tài khoản nhà tuyển dụng mới có thể mua gói quảng cáo',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#309689',
            });
            return;
        }

        // Show advertisement modal
        setSelectedPackage(packageData);
        setIsAdModalOpen(true);
    };

    // Handle proceeding to payment
    const handleProceedToPayment = (adData: AdvertisementFormData) => {
        setAdvertisementData(adData);
        setIsAdModalOpen(false);
        setIsPaymentModalOpen(true);
    };

    // Handle payment success
    const handlePaymentSuccess = async (transactionId: string) => {
        if (!advertisementData || !employerId || !selectedPackage) return;

        try {
            // Handle image upload to Firebase
            let imageUrl = "";
            if (advertisementData.imageFile) {
                try {
                    console.log('🚀 Starting image upload to Firebase...');

                    const userId = getUserIdFromToken();
                    if (!userId) {
                        throw new Error('Unable to get user ID from token');
                    }

                    // Upload image to Firebase Storage
                    imageUrl = await FirebaseStorageService.uploadImage(
                        advertisementData.imageFile,
                        userId,
                        'advertisements'
                    );
                    console.log('✅ Image uploaded successfully to Firebase:', imageUrl);
                } catch (uploadError) {
                    console.error('❌ Error uploading image to Firebase:', uploadError);
                    Swal.fire('Lỗi', 'Không thể tải lên hình ảnh. Vui lòng thử lại.', 'error');
                    return;
                }
            }

            // Calculate dates - start now, end after package duration
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + selectedPackage.durationDays);

            // Map adPosition from API to expected values
            let mappedAdPosition = selectedPackage.adPosition;
            if (selectedPackage.adPosition === 'TOP') {
                mappedAdPosition = 'Top';
            } else if (selectedPackage.adPosition === 'MIDDLE') {
                mappedAdPosition = 'Sidebar';
            } else if (selectedPackage.adPosition === 'BOTTOM') {
                mappedAdPosition = 'DetailPage';
            }

            // Create advertisement according to API specification
            const createAdData: CreateAdvertisementModel = {
                employerId: employerId,
                advertisementPackageId: selectedPackage.id,
                adTitle: advertisementData.title,
                adDescription: advertisementData.description,
                imageUrl: imageUrl,
                adPosition: mappedAdPosition,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                price: selectedPackage.price,
                maxImpressions: 1, // Default as specified in requirements
                transactionId: transactionId
            };

            console.log('📤 Creating advertisement with Firebase image URL:', createAdData);
            await AdvertisementService.createAdvertisement(createAdData);

            // Close modals and show success message
            setIsPaymentModalOpen(false);
            setIsAdModalOpen(false);
            setSelectedPackage(null);
            setAdvertisementData(null);

            Swal.fire({
                title: 'Thanh toán thành công!',
                text: 'Quảng cáo của bạn đã được tạo và sẽ được xem xét trong vòng 24 giờ.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#309689',
            });

        } catch (error) {
            console.error('Error creating advertisement:', error);
            Swal.fire('Lỗi', 'Có lỗi xảy ra khi tạo quảng cáo. Vui lòng liên hệ hỗ trợ.', 'error');
        }
    };

    // Close modals
    const handleCloseModals = () => {
        setIsAdModalOpen(false);
        setIsPaymentModalOpen(false);
        setSelectedPackage(null);
        setAdvertisementData(null);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Banner */}
            <div className="bg-black text-white py-12 text-center">
                <h1 className="text-5xl font-bold">Quảng cáo</h1>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 max-w-[90%] py-12">
                {/* Intro Section */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6">Bạn có nhu cầu đăng quảng cáo?</h2>
                    <p className="text-gray-600 mb-16 max-w-3xl mx-auto">Chúng tôi luôn sẵn sàng hỗ trợ bạn để đăng quảng cáo phù hợp với nhu cầu.</p>

                    {/* Features */}
                    <div className="flex flex-col md:flex-row justify-center gap-12 mb-16 max-w-4xl mx-auto">
                        <div className="bg-[#F0F9F6] p-6 rounded-lg flex items-center gap-5">
                            <div className="bg-white p-3 rounded-lg">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <rect width="24" height="24" rx="4" fill="white" />
                                    <path d="M6 10H18V14H6V10ZM4 8V16H20V8H4Z" fill="#2A9D8F" />
                                </svg>
                            </div>
                            <span className="font-medium text-xl">Thương hiệu thông qua sáng tạo</span>
                        </div>

                        <div className="bg-[#F0F9F6] p-6 rounded-lg flex items-center gap-5">
                            <div className="bg-white p-3 rounded-lg">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <rect width="24" height="24" rx="4" fill="white" />
                                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z" fill="#2A9D8F" />
                                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#2A9D8F" />
                                </svg>
                            </div>
                            <span className="font-medium text-xl">Tiềm năng với sự đổi mới</span>
                        </div>
                    </div>
                </div>

                {/* Brand Importance Section */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold mb-8">Nơi thương hiệu của bạn được <span className="text-[#2A9D8F] italic">Chú trọng!</span></h2>
                    <p className="text-gray-600 mb-10">Cho dù bạn muốn nâng cao nhận diện thương hiệu, tăng cường tương tác hay thực đẩy doanh số, các giải pháp tùy chỉnh của chúng tôi được thiết kế để đáp ứng nhu cầu riêng của bạn. Hợp tác với chúng tôi để biến tầm nhìn của bạn thành một câu chuyện hấp dẫn.</p>

                    {/* Service grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Service 1 */}
                        <div className="border border-teal-600 rounded-lg p-8">
                            <div className="flex items-start gap-6 mb-4">
                                <div className="bg-[#F0F9F6] p-4 rounded-lg shrink-0">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" rx="4" fill="white" />
                                        <path d="M6 10H18V14H6V10ZM4 8V16H20V8H4Z" fill="#2A9D8F" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Giải pháp sáng tạo cho kỳ nguyên số</h3>
                                    <p className="text-gray-600">Chúng tôi kết hợp công nghệ và dữ liệu để tạo ra giải pháp sáng tạo, giúp doanh nghiệp nâng cao trải nghiệm khách hàng và tối ưu hóa giá trị thương hiệu.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="border border-teal-600 rounded-lg p-8">
                            <div className="flex items-start gap-6 mb-4">
                                <div className="bg-[#F0F9F6] p-4 rounded-lg shrink-0">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" rx="4" fill="white" />
                                        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#2A9D8F" />
                                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z" fill="#2A9D8F" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Biến đổi ý tưởng thành kỹ thuật số</h3>
                                    <p className="text-gray-600">Chúng tôi giúp hiện thực hóa ý tưởng sáng tạo bằng công nghệ số, tối ưu quy trình vận hành và nâng cao khả năng tiếp cận khách hàng.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="border border-teal-600 rounded-lg p-8 bg-[#F0F9F6]">
                            <div className="flex items-start gap-6 mb-4">
                                <div className="bg-white p-4 rounded-lg shrink-0">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" rx="4" fill="white" />
                                        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="#2A9D8F" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Tạo ra giá trị khác biệt</h3>
                                    <p className="text-gray-600">Sự sáng tạo không chỉ giúp bạn nổi bật, mà còn giúp bạn dẫn đầu. Chúng tôi kết hợp tư duy đổi mới với chiến lược dữ liệu để xây dựng những chiến dịch độc đáo.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service 4 */}
                        <div className="border border-teal-600 rounded-lg p-8">
                            <div className="flex items-start gap-6 mb-4">
                                <div className="bg-[#F0F9F6] p-4 rounded-lg shrink-0">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" rx="4" fill="white" />
                                        <path d="M7 14H17V18H7V14ZM5 12V20H19V12H5Z" fill="#2A9D8F" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Nơi Sáng tạo gặp Chiến lược</h3>
                                    <p className="text-gray-600">Từ ý tưởng đến thực thi, chúng tôi giúp bạn khai thác sức mạnh của sáng tạo để thu hút khách hàng và tối đa hóa hiệu quả kinh doanh.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <h2 className="text-6xl font-bold leading-tight text-left">Đồng hành với <br />chúng tôi</h2>
                        </div>
                        <div className="flex items-center">
                            <p className="text-gray-600 text-left">Cho dù bạn đang muốn nâng cao nhận diện thương hiệu, tăng cường sự tương tác hay thực đẩy doanh số, các giải pháp phù hợp của chúng tôi được thiết kế để đáp ứng</p>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {packages.map((pkg, index) => (
                                <div
                                    key={pkg.id}
                                    className={`border border-teal-500 rounded-3xl flex flex-col h-full overflow-hidden ${index === 1 ? 'bg-[#F0F9F6]' : ''
                                        }`}
                                >
                                    <div className="p-6 border-b border-teal-500 text-left">
                                        <h3 className="font-medium text-lg">{pkg.packageName}</h3>
                                    </div>

                                    <div className="p-6 pb-2">
                                        <h2 className="text-5xl font-bold">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(pkg.price)}
                                        </h2>
                                    </div>

                                    <div className="px-6 pt-20 pb-4 flex-grow">
                                        <div className="space-y-5">
                                            {index === 0 && (
                                                <>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Quảng cáo hiển trong trang chi tiết</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Tối đa 3 chiến dịch</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Báo cáo hàng tháng</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Tồn tại 30 ngày</span>
                                                    </div>
                                                </>
                                            )}
                                            {index === 1 && (
                                                <>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Quảng cáo hiển ở trái/ phải trang chủ</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Tối đa 6 chiến dịch</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Báo cáo hai tuần một lần</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Tồn tại 30 ngày</span>
                                                    </div>
                                                </>
                                            )}
                                            {index === 2 && (
                                                <>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Quảng cáo hiển ở đầu trang chủ</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Không giới hạn chiến dịch</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Báo cáo hàng tuần</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Tồn tại 30 ngày</span>
                                                    </div>
                                                </>
                                            )}
                                            {index > 2 && (
                                                <>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Vị trí: {pkg.adPosition}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                            <FaCheck className="text-sm" />
                                                        </div>
                                                        <span>Thời hạn: {pkg.durationDays} ngày</span>
                                                    </div>
                                                    {pkg.maxImpressions && (
                                                        <div className="flex items-center gap-3">
                                                            <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                                <FaCheck className="text-sm" />
                                                            </div>
                                                            <span>Tối đa {pkg.maxImpressions.toLocaleString()} lượt hiển thị</span>
                                                        </div>
                                                    )}
                                                    {pkg.description && (
                                                        <div className="flex items-center gap-3">
                                                            <div className="rounded-full bg-teal-500 w-6 h-6 flex items-center justify-center text-white">
                                                                <FaCheck className="text-sm" />
                                                            </div>
                                                            <span>{pkg.description}</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 pt-20 mt-auto">
                                        <button
                                            onClick={() => handlePurchaseClick(pkg)}
                                            className="border border-teal-500 text-teal-500 py-4 px-8 rounded-full hover:bg-teal-500 hover:text-white transition duration-300 w-full text-center text-lg"
                                        >
                                            Mua gói
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            {/* Advertisement Modal */}
            <AdvertisementModal
                isOpen={isAdModalOpen}
                onClose={handleCloseModals}
                selectedPackage={selectedPackage}
                onProceedToPayment={handleProceedToPayment}
            />

            {/* Advertisement Payment Modal */}
            <AdvertisementPaymentModal
                isOpen={isPaymentModalOpen}
                onClose={handleCloseModals}
                advertisementData={advertisementData}
                onPaymentSuccess={handlePaymentSuccess}
            />
        </div>
    );
};

export default AdsPage; 