import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

const LoginPage: React.FC = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
};

export default LoginPage;