import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import EmailVerificationForm from '../components/auth/EmailVerificationForm';

const EmailVerificationPage: React.FC = () => {
    return (
        <AuthLayout>
            <EmailVerificationForm />
        </AuthLayout>
    );
};

export default EmailVerificationPage; 