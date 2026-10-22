import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportsList from './pages/ReportsList';
import ReportDetails from './pages/ReportDetails';
import CreateReport from './pages/CreateReport';
import VolunteerDashboard from './pages/VolunteerDashboard';
import AdoptionPortal from './pages/AdoptionPortal';
import VetDirectory from './pages/VetDirectory';
import PetQRGenerator from './pages/PetQRGenerator';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LiveMap from './components/LiveMap';

function FullMapPage() {
  const [reports, setReports] = React.useState([]);
  React.useEffect(() => {
    import('./services/api').then(module => {
      module.default.get('/reports').then(res => {
        if (res.data.success) setReports(res.data.reports);
      });
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Interactive Live Rescue Map
        </h1>
        <p className="text-xs text-slate-500">
          Color-coded incident markers: 🔴 Injured (Red) • 🟠 Lost (Orange) • 🔵 Found (Blue) • 🟣 Abandoned (Purple) • 🟢 Rescued (Green)
        </p>
      </div>
      <div className="h-[75vh] w-full">
        <LiveMap reports={reports} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<FullMapPage />} />
                  <Route path="/reports" element={<ReportsList />} />
                  <Route path="/reports/:id" element={<ReportDetails />} />
                  <Route path="/create-report" element={<CreateReport />} />
                  <Route path="/volunteer" element={<VolunteerDashboard />} />
                  <Route path="/adoption" element={<AdoptionPortal />} />
                  <Route path="/vets" element={<VetDirectory />} />
                  <Route path="/qr-generator" element={<PetQRGenerator />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
