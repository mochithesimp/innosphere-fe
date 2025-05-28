import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboardContent from '../../components/Admin/Dashboard/AdminDashboardContent';
import TransactionsContent from '../../components/Admin/Transactions/TransactionsContent';

const AdminPage: React.FC = () => {
    const location = useLocation();

    const renderContent = () => {
        switch (location.pathname) {
            case '/admin/dashboard':
                return <AdminDashboardContent />;
            case '/admin/orders':
                return <TransactionsContent />;
            case '/admin/accounts':
                return <div className="p-6">Tài khoản content coming soon...</div>;
            case '/admin/investments':
                return <div className="p-6">Đầu tư content coming soon...</div>;
            case '/admin/credit-cards':
                return <div className="p-6">Thẻ tín dụng content coming soon...</div>;
            case '/admin/loans':
                return <div className="p-6">Khoản vay content coming soon...</div>;
            case '/admin/services':
                return <div className="p-6">Dịch vụ content coming soon...</div>;
            case '/admin/packages':
                return <div className="p-6">Các gói dịch vụ và quảng cáo content coming soon...</div>;
            case '/admin/settings':
                return <div className="p-6">Cài đặt content coming soon...</div>;
            default:
                return <AdminDashboardContent />;
        }
    };

    return renderContent();
};

export default AdminPage; 