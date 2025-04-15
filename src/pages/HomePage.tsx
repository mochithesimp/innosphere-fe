import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import JobCategoryGrid from '../components/home/JobCategoryGrid';
import FreelanceSection from '../components/home/FreelanceSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogSection from '../components/home/BlogSection';
import Footer from '../components/layout/Footer';
import JoinBanner from '../components/home/JoinBanner';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <HeroBanner />
            <FreelanceSection />
            <JobCategoryGrid />
            <JoinBanner />
            <TestimonialsSection />
            <BlogSection />
            <Footer />
        </div>
    );
};

export default HomePage; 