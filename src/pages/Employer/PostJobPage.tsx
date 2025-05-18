import React from 'react';
import DashboardLayout from '../../components/Employer/Dashboard/DashboardLayout';
import PostJobContent from '../../components/Employer/PostJob/PostJobContent';

const PostJobPage: React.FC = () => {
    return (
        <DashboardLayout>
            <PostJobContent />
        </DashboardLayout>
    );
};

export default PostJobPage; 