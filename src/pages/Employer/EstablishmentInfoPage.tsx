import React from 'react';
import SettingsHeader from '../../components/Employer/SettingsHeader';
import SubHeader from '../../components/Employer/SubHeader';
import EstablishmentInfoForm from '../../components/Employer/EstablishmentInfoForm';

const EstablishmentInfoPage: React.FC = () => {
    const currentStep = 'establishment-info';

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SettingsHeader currentStep={currentStep} />
            <main className="flex-grow">
                <SubHeader currentStep={currentStep} />
                <EstablishmentInfoForm />
            </main>
            <footer className="text-center py-4 text-gray-500 text-sm border-t mt-8">
                © 2025 InnoSphere. All rights Reserved
            </footer>
        </div>
    );
};

export default EstablishmentInfoPage; 