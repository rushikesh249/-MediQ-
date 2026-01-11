import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './components/layout/DashboardLayout';
import DoctorDashboard from './pages/DoctorDashboard';
import ReportUpload from './pages/ReportUpload';
import PatientPortal from './pages/PatientPortal';
import ReportView from './pages/ReportView';
import WhatsAppChat from './pages/WhatsAppChat';
import PatientHistory from './pages/PatientHistory';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/patient-dashboard" element={<PatientPortal />} />

            {/* Doctor Routes */}
            <Route path="/doctor" element={<DashboardLayout />}>
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="reports" element={<div>Reports Queue (Coming Soon)</div>} />
                <Route path="upload" element={<ReportUpload />} />
                <Route path="critical" element={<div>Critical Cases (Coming Soon)</div>} />
                <Route path="patients" element={<PatientHistory />} />
                <Route path="analytics" element={<div>Analytics (Coming Soon)</div>} />
            </Route>

            {/* Patient Routes */}
            <Route path="/patient" element={<PatientPortal />} />
            <Route path="/report/:id" element={<ReportView />} />
            <Route path="/report/:id" element={<ReportView />} />
            <Route path="/upload" element={<ReportUpload />} />
            <Route path="/whatsapp" element={<WhatsAppChat />} />

            {/* 404 */}
            <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    );
}

export default App;
