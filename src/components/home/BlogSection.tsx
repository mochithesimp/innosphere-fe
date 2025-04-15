import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';

const blogPosts = [
    {
        id: 1,
        category: 'News',
        date: '25 Tháng 3, 2025',
        title: 'Làm Thế Nào Để Tìm Công Việc Theo Giờ Phù Hợp Với Bạn?',
        image: 'https://th.bing.com/th/id/OIP.U8ksr3LMkLtn9jWXjlXZUAHaEK?rs=1&pid=ImgDetMain',
        slug: 'lam-the-nao-de-tim-cong-viec-theo-gio-phu-hop-voi-ban'
    },
    {
        id: 2,
        category: 'Tips',
        date: '30 Tháng 3, 2025',
        title: 'Mẹo Tìm Việc Theo Giờ Nhanh Chóng & Hiệu Quả',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070',
        slug: 'meo-tim-viec-theo-gio-nhanh-chong-va-hieu-qua'
    }
];

const BlogSection: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-left">
                        <h2 className="text-4xl font-bold text-black text-left">Tin tức & Blog</h2>
                        <p className="text-gray-600 mt-2 text-left">
                            Cập nhật những xu hướng tuyển dụng mới nhất và mẹo tìm việc hiệu quả.
                        </p>
                    </div>
                    <Link to="/blog" className="text-[#309689] text-lg font-medium hover:underline">
                        Tất cả
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="rounded-xl shadow-sm overflow-hidden bg-white">
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-72 object-cover transition-transform hover:scale-105 duration-500"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://via.placeholder.com/600x400?text=Blog+Image";
                                    }}
                                />
                                <div className="absolute top-4 left-4 bg-[#309689] text-white py-1 px-4 rounded-full text-sm">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 text-left">
                                <div className="text-gray-500 text-sm mb-3 font-medium text-left">{post.date}</div>

                                <h3 className="text-2xl font-bold mb-4 leading-tight text-left">{post.title}</h3>

                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="text-[#309689] font-medium hover:underline flex items-center mt-4 group text-left"
                                >
                                    Xem thêm
                                    <HiOutlineArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection; 