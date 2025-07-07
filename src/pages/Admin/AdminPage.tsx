import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboardContent from '../../components/Admin/Dashboard/AdminDashboardContent';
import TransactionsContent from '../../components/Admin/Transactions/TransactionsContent';
import AccountsContent from '../../components/Admin/Accounts/AccountsContent';
import PackagesContent from '../../components/Admin/Packages/PackagesContent';
import SettingsContent from '../../components/Admin/Settings/SettingsContent';
import StatisticsContent from '../../components/Admin/Statistics/StatisticsContent';

const AdminPage: React.FC = () => {
    const location = useLocation();

    const renderContent = () => {
        switch (location.pathname) {
            case '/admin/dashboard':
                return <AdminDashboardContent />;
            case '/admin/orders':
                return <TransactionsContent />;
            case '/admin/accounts':
                return <AccountsContent />;
            case '/admin/statistics':
                return <StatisticsContent />;
            case '/admin/credit-cards':
                return <div className="p-6">Thẻ tín dụng content coming soon...</div>;
            case '/admin/loans':
                return <div className="p-6">Khoản vay content coming soon...</div>;
            case '/admin/services':
                return <div className="p-6">Dịch vụ content coming soon...</div>;
            case '/admin/packages':
                return <PackagesContent />;
            case '/admin/settings':
                return <SettingsContent />;
            default:
                return <AdminDashboardContent />;
        }
    };

    return renderContent();
};

export default AdminPage; 