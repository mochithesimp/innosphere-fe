import React from 'react';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { AdminService } from '../../services/adminService';

interface BlogPost {
    id: number;
    category: string;
    date: string;
    title: string;
    image: string;
    slug: string;
    employerUserName?: string;
}

const hardcodedPosts: BlogPost[] = [
    {
        id: 1,
        category: 'Ads',
        date: '20 Tháng 3, 2025',
        title: 'Cải Thiện Tinh Thần Nơi Làm Việc : Các Chiến Lược Nâng Cao Năng Suất Nhân Viên Trong Năm 2025',
        image: '/image 6.png',
        slug: 'cai-thien-tinh-than-noi-lam-viec',
    },
    {
        id: 2,
        category: 'Ads',
        date: '25 Tháng 3, 2025',
        title: 'Tránh 6 Lỗi Phổ Biến Nhất Trong Phỏng Vấn Xin Việc',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070',
        slug: 'tranh-6-loi-pho-bien-nhat-trong-phong-van-xin-viec',
    }
];

const AboutPage: React.FC = () => {
    const [adPosts, setAdPosts] = React.useState<BlogPost[]>(hardcodedPosts);

    React.useEffect(() => {
        AdminService.getAllAdvertisements()
            .then((ads) => {
                const formatDate = (dateStr: string) => {
                    const date = new Date(dateStr);
                    return `${date.getDate().toString().padStart(2, '0')} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
                };
                const posts = [3, 4].map((idx, i) => {
                    const ad = ads[idx];
                    const fallbackImage = (hardcodedPosts[i] && hardcodedPosts[i].image) || 'https://via.placeholder.com/600x400?text=Blog+Image';
                    if (ad) {
                        return {
                            id: ad.id,
                            category: 'Ads',
                            date: formatDate(ad.startDate),
                            title: ad.adTitle,
                            image: ad.imageUrl || fallbackImage,
                            slug: '',
                            employerUserName: ad.employerUserName || undefined
                        };
                    } else if (hardcodedPosts[i]) {
                        return hardcodedPosts[i];
                    } else {
                        return {
                            id: idx,
                            category: 'Ads',
                            date: '',
                            title: '',
                            image: fallbackImage,
                            slug: '',
                            employerUserName: undefined
                        };
                    }
                });
                setAdPosts(posts);
            })
            .catch(() => {
                setAdPosts(hardcodedPosts);
            });
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Banner */}
            <div className="bg-black text-white py-12 text-center">
                <h1 className="text-5xl font-bold text-center">Về Chúng Tôi</h1>
            </div>

            {/* Main content with two columns for text, then image below */}
            <div className="container mx-auto px-4 max-w-[90%] py-12">
                {/* Text content in two columns */}
                <div className="flex flex-col md:flex-row gap-12 mb-8">
                    {/* Left column - Heading */}
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-left leading-tight">Giúp Bạn Kết Nối Với Công Việc Linh Hoạt</h2>
                    </div>

                    {/* Right column - Description text */}
                    <div className="md:w-1/2">
                        <p className="text-gray-700 leading-relaxed text-left">
                            Chúng tôi là nền tảng kết nối giữa ứng viên và doanh nghiệp, mang đến cơ hội việc làm linh hoạt theo giờ, theo ca. Dù bạn là sinh viên, lao động tự do hay nhân viên tìm kiếm công việc tạm thời, chúng tôi giúp bạn tiếp cận hàng ngàn công việc nhanh chóng, dễ dàng.
                        </p>
                    </div>
                </div>

                {/* Full width image below */}
                <div className="w-full">
                    <img
                        src="/aboutus.png"
                        alt="Business meeting"
                        className="w-full rounded-xl h-auto object-cover"
                    />
                </div>
            </div>

            {/* How it works section */}
            <div className="container mx-auto px-4 max-w-[90%] py-12">
                <h2 className="text-3xl font-bold mb-12 text-center">Cách Thức Hoạt Động</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Step 1 */}
                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <div className="p-2">
                                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="24" fill="white" />
                                    <path d="M24 14C19.6 14 16 17.6 16 22C16 24.9 17.5 27.3 19.9 28.5C20 28.5 20 28.6 19.9 28.6C19.3 29.4 18.4 30 17.4 30C16.4 30 16 30.7 16 31.3C16 31.9 16.5 32.6 17.5 32.6C19.6 32.6 21.3 31 22 28.9C22.7 29 23.3 29 24 29C28.4 29 32 25.4 32 21C32 16.6 28.4 14 24 14ZM20 23C19.4 23 19 22.6 19 22C19 21.4 19.4 21 20 21C20.6 21 21 21.4 21 22C21 22.6 20.6 23 20 23ZM24 23C23.4 23 23 22.6 23 22C23 21.4 23.4 21 24 21C24.6 21 25 21.4 25 22C25 22.6 24.6 23 24 23ZM28 23C27.4 23 27 22.6 27 22C27 21.4 27.4 21 28 21C28.6 21 29 21.4 29 22C29 22.6 28.6 23 28 23Z" fill="#26AB7B" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-1">1. Tạo tài khoản</h3>
                        <p className="text-gray-600 text-sm">
                            Đăng ký miễn phí và tạo hồ sơ của bạn chỉ trong vài phút.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <div className="p-2">
                                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="24" fill="white" />
                                    <path d="M30 14H18C16.9 14 16 14.9 16 16V32C16 33.1 16.9 34 18 34H30C31.1 34 32 33.1 32 32V16C32 14.9 31.1 14 30 14ZM30 32H18V16H30V32ZM21 20H27V22H21V20ZM21 24H27V26H21V24ZM21 28H24V30H21V28Z" fill="#26AB7B" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-1">2. Cập nhật hồ sơ</h3>
                        <p className="text-gray-600 text-sm">
                            Thêm thông tin kinh nghiệm, kỹ năng để nhà tuyển dụng chú ý.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <div className="p-2">
                                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="24" fill="white" />
                                    <path d="M30 18H28V17C28 16.5 27.5 16 27 16C26.5 16 26 16.5 26 17V18H22V17C22 16.5 21.5 16 21 16C20.5 16 20 16.5 20 17V18H18C16.9 18 16 18.9 16 20V30C16 31.1 16.9 32 18 32H30C31.1 32 32 31.1 32 30V20C32 18.9 31.1 18 30 18ZM30 30H18V23H30V30ZM30 22H18V20H30V22ZM22 27H20V25H22V27ZM26 27H24V25H26V27ZM28 27V25H30V27H28Z" fill="#26AB7B" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-1">3. Tìm kiếm công việc</h3>
                        <p className="text-gray-600 text-sm">
                            Duyệt qua hàng ngàn công việc theo giờ, theo ca phù hợp với bạn.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <div className="p-2">
                                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="24" fill="white" />
                                    <path d="M24 14C18.5 14 14 18.5 14 24C14 29.5 18.5 34 24 34C29.5 34 34 29.5 34 24C34 18.5 29.5 14 24 14ZM24 32C19.6 32 16 28.4 16 24C16 19.6 19.6 16 24 16C28.4 16 32 19.6 32 24C32 28.4 28.4 32 24 32ZM28.7 20.7L22 27.4L19.3 24.7C18.9 24.3 18.3 24.3 17.9 24.7C17.5 25.1 17.5 25.7 17.9 26.1L21.3 29.5C21.7 29.9 22.3 29.9 22.7 29.5L30 22.2C30.4 21.8 30.4 21.2 30 20.8C29.6 20.4 29 20.3 28.7 20.7Z" fill="#26AB7B" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-1">4. Ứng tuyển dễ dàng</h3>
                        <p className="text-gray-600 text-sm">
                            Chỉ với một cú nhấp chuột, bạn có thể nộp đơn và bắt đầu công việc.
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container mx-auto px-4 max-w-[90%] py-12">
                <h2 className="text-3xl font-bold mb-12 text-center">Câu Hỏi Thường Gặp</h2>

                <div className="space-y-6 max-w-4xl mx-auto">
                    {/* FAQ Item 1 - Open */}
                    <div className="bg-[#F0F9F6] rounded-lg p-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-[#26AB7B] font-bold text-xl">01</span>
                                <h3 className="text-xl font-bold text-left">Tôi có thể tải lên CV không?</h3>
                            </div>
                            <button className="bg-[#26AB7B] text-white w-8 h-8 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-3 text-gray-700 pl-10 text-left">
                            Không bắt buộc, nhưng việc tải lên CV sẽ giúp nhà tuyển dụng hiểu rõ hơn về kỹ năng và kinh nghiệm của bạn, tăng cơ hội được tuyển dụng nhanh chóng.
                        </p>
                    </div>

                    {/* FAQ Item 2 - Closed */}
                    <div className="border-t border-b border-gray-200 py-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-[#6B7280] font-bold text-xl">02</span>
                                <h3 className="text-xl font-bold">Quy trình tuyển dụng cho công việc theo giờ mất bao lâu?</h3>
                            </div>
                            <button className="border border-[#26AB7B] text-[#26AB7B] w-8 h-8 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* FAQ Item 4 - Closed (out of order as in image) */}
                    <div className="border-b border-gray-200 py-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-[#6B7280] font-bold text-xl">04</span>
                                <h3 className="text-xl font-bold">Tôi có thể làm việc theo giờ nếu chưa có kinh nghiệm không?</h3>
                            </div>
                            <button className="border border-[#26AB7B] text-[#26AB7B] w-8 h-8 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* FAQ Item 3 - Closed */}
                    <div className="border-b border-gray-200 py-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-[#6B7280] font-bold text-xl">03</span>
                                <h3 className="text-xl font-bold">Công việc theo giờ có lịch làm việc linh hoạt không?</h3>
                            </div>
                            <button className="border border-[#26AB7B] text-[#26AB7B] w-8 h-8 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* FAQ Item 5 - Closed */}
                    <div className="border-b border-gray-200 py-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-[#6B7280] font-bold text-xl">05</span>
                                <h3 className="text-xl font-bold">Việc làm theo giờ có trả lương ngay không?</h3>
                            </div>
                            <button className="border border-[#26AB7B] text-[#26AB7B] w-8 h-8 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Partners Section */}
            <div className="container mx-auto px-4 max-w-[90%] py-12">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Left side - Image */}
                    <div className="md:w-1/2 flex items-center justify-center">
                        <img src="/webest.png" alt="Business partners" className="w-3/4 h-auto rounded-lg" />
                    </div>

                    {/* Right side - Content */}
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold mb-10 text-left leading-tight">Chúng Tôi Làm Việc Với Những Đối Tác Tốt Nhất</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                            {/* Feature 1 */}
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 mt-1">
                                    <div className="bg-[#E5F9F5] p-2 rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#26AB7B" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-xl mb-1 text-left">Việc làm chất lượng</h3>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 mt-1">
                                    <div className="bg-[#E5F9F5] p-2 rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#26AB7B" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-xl mb-1 text-left">Hồ sơ chuyên nghiệp</h3>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 mt-1">
                                    <div className="bg-[#E5F9F5] p-2 rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#26AB7B" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-xl mb-1 text-left">Doanh nghiệp uy tín</h3>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 mt-1">
                                    <div className="bg-[#E5F9F5] p-2 rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#26AB7B" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-xl mb-1 text-left">Lao động có chọn lọc</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Section */}
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="mb-8">
                    <div className="text-left">
                        <h2 className="text-4xl font-bold text-black text-left">Tin Tức & Quảng cáo</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
                    {adPosts.map((post, i) => {
                        const isHardcoded =
                            (hardcodedPosts[i] && post.id === hardcodedPosts[i].id && post.title === hardcodedPosts[i].title && !post.employerUserName);
                        return (
                            <div key={post.id || i} className="rounded-xl shadow-sm overflow-hidden bg-white">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-72 object-cover transition-transform hover:scale-105 duration-500"
                                        style={{ objectFit: 'cover', width: '100%', height: '18rem' }}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = (hardcodedPosts[i] && hardcodedPosts[i].image) || 'https://via.placeholder.com/600x400?text=Blog+Image';
                                        }}
                                    />
                                    <div className="absolute top-4 left-4 bg-[#309689] text-white py-1 px-4 rounded-full text-sm">
                                        Ads
                                    </div>
                                </div>
                                <div className="p-6 text-left">
                                    <div className="text-gray-500 text-sm mb-3 font-medium text-left">{isHardcoded ? hardcodedPosts[i].date : post.date}</div>
                                    <h3 className="text-2xl font-bold mb-2 leading-tight text-left">{isHardcoded ? hardcodedPosts[i].title : post.title}</h3>
                                    {post.employerUserName && !isHardcoded && (
                                        <div className="text-gray-700 text-base mb-2 text-left font-medium">{post.employerUserName}</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage; 