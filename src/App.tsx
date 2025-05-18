import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/Auth/ResetPasswordPage'
import EmailVerificationPage from './pages/Auth/EmailVerificationPage'
import HomePage from './pages/Home/HomePage'
import JobsPage from './pages/Home/JobsPage'
import JobDetailPage from './pages/Home/JobDetailPage'
import AboutPage from './pages/Home/AboutPage'
import ContactPage from './pages/Home/ContactPage'
import AdsPage from './pages/Home/AdsPage'
import EmployeeDashboard from './pages/Employee/EmployeeDashboard'
import EmployeeJobsPage from './pages/Employee/EmployeeJobsPage'
import EmployeeFavorites from './pages/Employee/EmployeeFavorites'
import EmployeeJobAlerts from './pages/Employee/EmployeeJobAlerts'
import EmployeeSettings from './pages/Employee/EmployeeSettings'
import EmployerSettingsPage from './pages/Employer/SettingsPage'
import EstablishmentInfoPage from './pages/Employer/EstablishmentInfoPage'
import SocialMediaInfoPage from './pages/Employer/SocialMediaInfoPage'
import ContactInfoPage from './pages/Employer/ContactInfoPage'
import CompletionPage from './pages/Employer/CompletionPage'
import DashboardPage from './pages/Employer/DashboardPage'

function App() {
  return (
    <div className="fixed inset-0 overflow-auto bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/job-detail" element={<JobDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ads" element={<AdsPage />} />

          {/* Employee routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/jobs" element={<EmployeeJobsPage />} />
          <Route path="/employee/favorites" element={<EmployeeFavorites />} />
          <Route path="/employee/job-alerts" element={<EmployeeJobAlerts />} />
          <Route path="/employee/notifications" element={<EmployeeDashboard />} />
          <Route path="/employee/settings" element={<EmployeeSettings />} />

          {/* Employer routes */}
          <Route path="/employer/settings" element={<EmployerSettingsPage />} />
          <Route path="/employer/establishment-info" element={<EstablishmentInfoPage />} />
          <Route path="/employer/social-media-info" element={<SocialMediaInfoPage />} />
          <Route path="/employer/contact-info" element={<ContactInfoPage />} />
          <Route path="/employer/setup-complete" element={<CompletionPage />} />
          <Route path="/employer/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
