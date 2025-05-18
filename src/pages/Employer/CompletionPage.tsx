import React from 'react';
import CompletionMessage from '../../components/Employer/CompletionMessage';
import SettingsHeader from '../../components/Employer/SettingsHeader';

const CompletionPage: React.FC = () => {
    const currentStep = 'completion'; // Will show 100% completed

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SettingsHeader currentStep={currentStep} />
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