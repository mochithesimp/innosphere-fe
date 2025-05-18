import React from 'react';
import SettingsHeader from '../../components/Employer/SettingsHeader';
import SubHeader from '../../components/Employer/SubHeader';
import BusinessInfoForm from '../../components/Employer/BusinessInfoForm';

const EmployerSettingsPage: React.FC = () => {
    const currentStep = 'business-info';

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SettingsHeader currentStep={currentStep} />
            <main className="flex-grow">
                <SubHeader currentStep={currentStep} />
                <BusinessInfoForm />
            </main>
            <footer className="text-center py-4 text-gray-500 text-sm border-t mt-8">
                © 2025 InnoSphere. All rights Reserved
            </footer>
        </div>
    );
};

export default EmployerSettingsPage; 