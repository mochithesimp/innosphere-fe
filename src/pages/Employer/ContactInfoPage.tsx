import React from 'react';
import SettingsHeader from '../../components/Employer/SettingsHeader';
import SubHeader from '../../components/Employer/SubHeader';
import ContactInfoForm from '../../components/Employer/ContactInfoForm';

const ContactInfoPage: React.FC = () => {
    const currentStep = 'contact-info';

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SettingsHeader currentStep={currentStep} />
            <main className="flex-grow">
                <SubHeader currentStep={currentStep} />
                <ContactInfoForm />
            </main>
            <footer className="text-center py-4 text-gray-500 text-sm border-t mt-8">
                © 2025 InnoSphere. All rights Reserved
            </footer>
        </div>
    );
};

export default ContactInfoPage; 