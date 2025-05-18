import React from 'react';
import DashboardLayout from '../../components/Employer/Dashboard/DashboardLayout';
import OverviewContent from '../../components/Employer/Dashboard/OverviewContent';

const DashboardPage: React.FC = () => {
    return (
        <DashboardLayout>
            <OverviewContent />
        </DashboardLayout>
    );
};

export default DashboardPage; 