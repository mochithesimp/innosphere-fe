import React from 'react';

const StarRating = () => (
    <div className="flex justify-start">
        {Array(5).fill(0).map((_, index) => (
            <svg key={index} className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
        ))}
    </div>
);

const TestimonialQuote: React.FC = () => (
    <div className="absolute right-8 bottom-24 opacity-80">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#309689" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
    </div>
);

const testimonials = [
    {
        id: 1,
        title: 'Dịch vụ tuyệt vời',
        content: '22 năm cuộc đời, tôi chưa thấy nền tảng tìm việc làm nào tuyệt vời như vậy. Tôi đã ngất ngây, thật vì diệu!',
        author: 'Nguyễn Thành Nhân',
        position: 'Khách hàng thân thiết',
        avatar: '/avatar1.jpg' // Default fallback will be used if this doesn't exist
    },
    {
        id: 2,
        title: 'Đơn giản, nhanh chóng',
        content: 'Ôi, tôi đã kiếm được một công việc ổn định sau khi tìm được nền tảng này. Thật là vĩ diệu, nó giúp tôi có được bữa ăn ngon mỗi ngày.',
        author: 'Chiêm Tấn Tài',
        position: 'Lao động phổ công',
        avatar: '/avatar2.jpg'
    },
    {
        id: 3,
        title: 'Rất tuyệt vời!',
        content: 'Dịch vụ tuyệt vời, là một người giao hàng, tôi đã mua được một chiếc C300 nhờ nền tảng này. Tôi sẽ giới thiệu cho các anh em shipper.',
        author: 'Đặng Trung Kiên',
        position: 'Người giao hàng',
        avatar: '/avatar3.jpg'
    }
];

const TestimonialsSection: React.FC = () => {
    return (
        <section className="py-16 bg-[#f5faf9]">
            <div className="container mx-auto px-4 max-w-[90%]">
                <h2 className="text-4xl font-bold mb-12 text-left">Đánh Giá Từ Khách Hàng Của Chúng Tôi</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-8 rounded-lg relative"
                        >
                            <StarRating />

                            <h3 className="text-xl font-bold mt-4 mb-3 text-left">{testimonial.title}</h3>

                            <p className="text-gray-600 mb-16 text-left italic">
                                {testimonial.content}
                            </p>

                            <TestimonialQuote />

                            <div className="flex items-center mt-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.author}
                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=309689&color=fff`;
                                    }}
                                />
                                <div>
                                    <p className="font-bold text-gray-800 text-left">{testimonial.author}</p>
                                    <p className="text-gray-500 text-left">{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection; 