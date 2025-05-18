import React from 'react';
import { Link } from 'react-router-dom';
import CompletionMessage from '../../components/Employer/CompletionMessage';

const CompletionPage: React.FC = () => {
    // Use a custom header similar to the original Header component but with 100% progress
    const CustomHeader = () => (
        <header className="bg-white border-b mb-8">
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="InnoSphere" className="h-8" />
                        <span className="text-[#00FF19] font-semibold text-xl ml-2">InnoSphere</span>
                    </Link>
                    <div className="ml-auto">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Quá trình thiết lập</span>
                            <span className="text-[#309689]">Đã hoàn thành 100%</span>
                        </div>
                        <div className="w-64 bg-[#EBF5F4] h-2 rounded-full">
                            <div
                                className="bg-[#309689] h-2 rounded-full"
                                style={{ width: '100%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <CustomHeader />
            <main className="flex-grow flex items-center justify-center py-16">
                <CompletionMessage />
            </main>

            <footer className="text-center py-4 text-gray-500 text-sm border-t">
                © 2025 InnoSphere. All rights Reserved
            </footer>
        </div>
    );
};

export default CompletionPage; 