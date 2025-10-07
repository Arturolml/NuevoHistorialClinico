
import React, { useState, useEffect } from 'react';
import { Patient, Consultation, api } from '../services/mock-db';
import { ConsultationForm } from './ConsultationForm';
import { PhysicalExamForm } from './PhysicalExamForm';
import { FormSection } from './FormSection';

interface ConsultationHistoryProps {
    patient: Patient;
    isPrinting?: boolean; // Added for PDF export logic
}

export const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({ patient, isPrinting = false }) => {
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    
    const loadConsultations = () => {
        setIsLoading(true);
        api.getConsultationsByPatientId(patient.id).then(data => {
            setConsultations(data);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadConsultations();
    }, [patient.id]);

    const handleSaveConsultation = async () => {
        // In a real app, you would get data from the form
        const newConsultationData = {
            patientId: patient.id,
            date: new Date().toISOString(),
            motivo_consulta: 'Nueva consulta (datos de ejemplo)',
            desarrollo_consulta: 'El paciente acude para una nueva evaluación.',
        };
        await api.addConsultation(newConsultationData);
        setIsAdding(false);
        loadConsultations(); // Refresh the list
    };

    if (isPrinting) {
        return (
            <div>
                {consultations.map(consult => (
                     <div key={consult.id} className="mt-8 border-t-4 border-blue-600 pt-4">
                        <FormSection title={`Consulta - ${new Date(consult.date).toLocaleDateString()}`}>
                           <p className="col-span-3"><strong>Motivo:</strong> {consult.motivo_consulta}</p>
                           <p className="col-span-3"><strong>Desarrollo:</strong> {consult.desarrollo_consulta}</p>
                        </FormSection>
                        {/* In a real app, you would render the full saved ConsultationForm and PhysicalExamForm data here */}
                        <ConsultationForm />
                        <PhysicalExamForm />
                    </div>
                ))}
            </div>
        )
    }

    if (isAdding) {
        return (
            <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-6">Nueva Consulta</h2>
                <ConsultationForm />
                <PhysicalExamForm />
                <div className="flex justify-end gap-4 mt-8">
                    <button onClick={() => setIsAdding(false)} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleSaveConsultation} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Guardar Consulta
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-blue-700">Historial de Consultas</h2>
                <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                    + Nueva Consulta
                </button>
            </div>

            {isLoading ? (
                <p>Cargando historial...</p>
            ) : (
                <div className="space-y-4">
                    {consultations.length > 0 ? consultations.map(consult => (
                         <details key={consult.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <summary className="font-semibold flex justify-between items-center">
                                <span>{new Date(consult.date).toLocaleString()} - {consult.motivo_consulta}</span>
                                <span className="text-sm text-gray-500">Ver detalles</span>
                            </summary>
                            <div className="mt-4 pt-4 border-t">
                                <p><strong>Desarrollo:</strong> {consult.desarrollo_consulta}</p>
                                <p className="mt-4 text-sm text-gray-600 italic">Nota: La visualización completa del examen físico y otros detalles de la consulta se mostraría aquí.</p>
                            </div>
                        </details>
                    )) : <p>No hay consultas registradas para este paciente.</p>}
                </div>
            )}
        </div>
    );
};
