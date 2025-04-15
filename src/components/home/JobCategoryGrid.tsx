import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
    icon: React.ReactNode;
    title: string;
    count: number;
    to: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, count, to }) => {
    return (
        <Link to={to} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-all border border-gray-100">
            <div className="flex justify-center mb-4">
                <div className="bg-[#ecf8f6] p-4 rounded-full">
                    {icon}
                </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm bg-[#ecf8f6] text-[#309689] py-1 px-3 rounded-full inline-block">
                {count.toLocaleString()} công việc
            </p>
        </Link>
    );
};

const JobCategoryGrid: React.FC = () => {
    const categories = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.9999V7.9999C21 6.8954 20.1046 5.9999 19 5.9999H5C3.89543 5.9999 3 6.8954 3 7.9999V15.9999M3 15.9999L5 13.9999M3 15.9999H5M5 15.9999V13.9999M5 15.9999H15M21 15.9999L19 13.9999M21 15.9999H19M19 15.9999V13.9999M19 15.9999H15M15 15.9999V7.9999M15 15.9999V13.9999" />
                </svg>
            ),
            title: 'Phục vụ & Thu ngân',
            count: 1254,
            to: '/categories/service'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            ),
            title: 'Pha chế & Bếp',
            count: 816,
            to: '/categories/cooking'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            title: 'Hỗ trợ sự kiện',
            count: 2082,
            to: '/categories/events'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            title: 'Sắp xếp hàng hóa',
            count: 1520,
            to: '/categories/stocking'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Bán hàng & Tiếp thị',
            count: 1022,
            to: '/categories/sales'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3zm0 3h16M7 14a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: 'Vệ sinh & Dọn dẹp',
            count: 1496,
            to: '/categories/cleaning'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Hỗ trợ kỹ thuật',
            count: 1529,
            to: '/categories/tech-support'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#309689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            title: 'Công việc khác',
            count: 1244,
            to: '/categories/other'
        }
    ];

    return (
        <section className="py-16 bg-[#f0f7f6]">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold mb-2">Danh mục công việc</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={index}
                            icon={category.icon}
                            title={category.title}
                            count={category.count}
                            to={category.to}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JobCategoryGrid; 