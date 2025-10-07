
import React from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PatientDetailPage } from './pages/PatientDetailPage';

// For jsPDF and html2canvas from CDN
declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

const App: React.FC = () => {
  const { user, selectedPatient, clearSelectedPatient } = useAuth();

  const renderContent = () => {
    if (!user) {
      return <LoginPage />;
    }
    if (selectedPatient) {
      return <PatientDetailPage patient={selectedPatient} onBack={() => clearSelectedPatient()} />;
    }
    return <DashboardPage />;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {renderContent()}
    </div>
  );
};

export default App;
