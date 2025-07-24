import React from 'react';
import { AdminService } from '../../services/adminService';

// Add BlogPost type
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
        date: '25 Tháng 3, 2025',
        title: 'Làm Thế Nào Để Tìm Công Việc Theo Giờ Phù Hợp Với Bạn?',
        image: 'https://th.bing.com/th/id/OIP.U8ksr3LMkLtn9jWXjlXZUAHaEK?rs=1&pid=ImgDetMain',
        slug: 'lam-the-nao-de-tim-cong-viec-theo-gio-phu-hop-voi-ban',
    },
    {
        id: 2,
        category: 'Ads',
        date: '30 Tháng 3, 2025',
        title: 'Mẹo Tìm Việc Theo Giờ Nhanh Chóng & Hiệu Quả',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070',
        slug: 'meo-tim-viec-theo-gio-nhanh-chong-va-hieu-qua',
    }
];

const BlogSection: React.FC = () => {
    const [adPosts, setAdPosts] = React.useState<BlogPost[]>(hardcodedPosts);

    React.useEffect(() => {
        AdminService.getAllAdvertisements()
            .then((ads) => {
                const formatDate = (dateStr: string) => {
                    const date = new Date(dateStr);
                    return `${date.getDate().toString().padStart(2, '0')} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
                };
                const posts = [1, 2].map((idx) => {
                    const ad = ads[idx];
                    const fallbackImage = (hardcodedPosts[idx] && hardcodedPosts[idx].image) || 'https://via.placeholder.com/600x400?text=Blog+Image';
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
                    } else if (hardcodedPosts[idx]) {
                        return { ...hardcodedPosts[idx], employerUserName: undefined };
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
                setAdPosts(hardcodedPosts.map(p => ({ ...p, employerUserName: undefined })));
            });
    }, []);

    return (
        <section className="py-8 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="mb-6 md:mb-8">
                    <div className="text-left">
                        <h2 className="text-2xl md:text-4xl font-bold text-black text-left">Tin tức & Quảng cáo</h2>
                        <p className="text-sm md:text-base text-gray-600 mt-2 text-left">
                            Cập nhật những xu hướng tuyển dụng mới nhất và tìm các công việc phù hợp.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-4 md:mt-8">
                    {adPosts.map((post, i) => {
                        const isHardcoded =
                            (hardcodedPosts[i] && post.id === hardcodedPosts[i].id && post.title === hardcodedPosts[i].title && !post.employerUserName);
                        return (
                            <div key={post.id || i} className="rounded-xl shadow-sm overflow-hidden bg-white">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 md:h-72 object-cover transition-transform hover:scale-105 duration-500"
                                        style={{ objectFit: 'cover', width: '100%' }}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = (hardcodedPosts[i] && hardcodedPosts[i].image) || 'https://via.placeholder.com/600x400?text=Blog+Image';
                                        }}
                                    />
                                    <div className="absolute top-4 left-4 bg-[#309689] text-white py-1 px-3 md:px-4 rounded-full text-xs md:text-sm">
                                        Ads
                                    </div>
                                </div>

                                <div className="p-4 md:p-6 text-left">
                                    <div className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3 font-medium text-left">{isHardcoded ? hardcodedPosts[i].date : post.date}</div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight text-left line-clamp-2">{isHardcoded ? hardcodedPosts[i].title : post.title}</h3>
                                    {post.employerUserName && !isHardcoded && (
                                        <div className="text-gray-700 text-sm md:text-base mb-2 text-left font-medium">{post.employerUserName}</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogSection; 