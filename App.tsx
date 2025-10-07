
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { IdentificationForm } from './components/IdentificationForm';
import { HistoryForm } from './components/HistoryForm';
import { GeriatricSyndromesForm } from './components/GeriatricSyndromesForm';
import { ConsultationForm } from './components/ConsultationForm';
import { PhysicalExamForm } from './components/PhysicalExamForm';

type Tab = 'identification' | 'history' | 'syndromes' | 'consultation' | 'exam';

// For jsPDF and html2canvas from CDN
declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('identification');

  const handleExportPDF = () => {
    const { jsPDF } = window.jspdf;

    const loader = document.createElement('div');
    loader.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="color: white; font-size: 20px; text-align: center; background: rgba(0,0,0,0.7); padding: 20px; border-radius: 10px;">
          <p>Generando PDF...</p>
          <p style="font-size: 14px;">Esto puede tardar unos segundos.</p>
        </div>
      </div>
    `;
    document.body.appendChild(loader);

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    const PrintableContent = () => (
      <div style={{ padding: '2rem', background: 'white', width: '210mm' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Historia Clínica Geriátrica Unificada</h1>
          <hr className="mb-6"/>
          <IdentificationForm />
          <HistoryForm />
          <GeriatricSyndromesForm />
          <ConsultationForm />
          <PhysicalExamForm />
        </div>
      </div>
    );
    
    const root = ReactDOM.createRoot(container);
    root.render(<PrintableContent />);
    
    setTimeout(() => {
        window.html2canvas(container, { scale: 2, useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / pdfWidth;
            const imgHeight = canvasHeight / ratio;
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            let heightLeft = imgHeight;
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
            position -= pdfHeight;

            while (heightLeft > 0) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
                position -= pdfHeight;
            }
            
            pdf.save('historia-clinica.pdf');

            root.unmount();
            document.body.removeChild(container);
            document.body.removeChild(loader);
        }).catch(err => {
            console.error("Error generating PDF", err);
            root.unmount();
            document.body.removeChild(container);
            document.body.removeChild(loader);
            alert("Hubo un error al generar el PDF.");
        });
    }, 500);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'identification':
        return <IdentificationForm />;
      case 'history':
        return <HistoryForm />;
      case 'syndromes':
        return <GeriatricSyndromesForm />;
      case 'consultation':
        return <ConsultationForm />;
      case 'exam':
        return <PhysicalExamForm />;
      default:
        return <IdentificationForm />;
    }
  };

  const TabButton = ({ tab, label }: { tab: Tab; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activeTab === tab
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Historia Clínica Geriátrica Unificada</h1>
              <p className="text-sm text-gray-500 mt-1">Formulario digital para la consolidación de datos del paciente.</p>
            </div>
            <button
                onClick={handleExportPDF}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors"
            >
                Exportar a PDF
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-2 bg-gray-200/50 rounded-lg">
            <TabButton tab="identification" label="Identificación" />
            <TabButton tab="history" label="Antecedentes" />
            <TabButton tab="syndromes" label="Síndromes y Valoración" />
            <TabButton tab="consultation" label="Consulta Actual" />
            <TabButton tab="exam" label="Examen Físico" />
          </div>
        </div>
        
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          {renderTabContent()}
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Clinical Solutions. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
