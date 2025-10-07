import React, { useState, useEffect, useRef } from 'react';
import { Patient, Consultation, api } from '../services/mock-db';
import { ConsultationForm } from './ConsultationForm';
import { PhysicalExamForm } from './PhysicalExamForm';
import { FormSection } from './FormSection';

interface ConsultationHistoryProps {
    patient: Patient;
    isPrinting?: boolean;
}

export const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({ patient, isPrinting = false }) => {
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [viewingConsultation, setViewingConsultation] = useState<Consultation | null>(null);
    const newConsultationFormRef = useRef<HTMLFormElement>(null);
    
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
        if (!newConsultationFormRef.current) return;

        const formData = new FormData(newConsultationFormRef.current);
        const data: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            // A more robust solution would handle nested objects and data types
            data[key] = value;
        });

        const newConsultationData = {
            patientId: patient.id,
            date: new Date().toISOString(),
            motivo_consulta: data.motivo_consulta || 'Nueva consulta (sin motivo)',
            desarrollo_consulta: data.desarrollo_consulta || 'El paciente acude para una nueva evaluación.',
            data: data
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
                        <h2 className="text-xl font-semibold text-blue-700 mb-2">Consulta - {new Date(consult.date).toLocaleDateString()}</h2>
                        <ConsultationForm data={consult.data} readOnly={true} />
                        <PhysicalExamForm data={consult.data} readOnly={true} />
                    </div>
                ))}
            </div>
        )
    }
    
    if (viewingConsultation) {
        return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <button onClick={() => setViewingConsultation(null)} className="text-blue-600 hover:text-blue-800 font-semibold">&larr; Volver al Historial</button>
                        <h2 className="text-xl font-semibold text-blue-700 mt-2">Detalle de la Consulta</h2>
                        <p className="text-sm text-gray-500">{new Date(viewingConsultation.date).toLocaleString()}</p>
                    </div>
                </div>
                <div className="space-y-4">
                   <ConsultationForm data={viewingConsultation.data} readOnly={true} />
                   <PhysicalExamForm data={viewingConsultation.data} readOnly={true} />
                </div>
            </div>
        )
    }

    if (isAdding) {
        return (
            <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-6">Nueva Consulta</h2>
                <form ref={newConsultationFormRef}>
                    <ConsultationForm />
                    <PhysicalExamForm />
                </form>
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
                         <div key={consult.id} onClick={() => setViewingConsultation(consult)} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{new Date(consult.date).toLocaleString()}</p>
                                    <p className="text-sm text-gray-600 mt-1">{consult.motivo_consulta}</p>
                                </div>
                                <span className="text-sm font-medium text-blue-600">Ver Consulta Completa &rarr;</span>
                            </div>
                        </div>
                    )) : <p>No hay consultas registradas para este paciente.</p>}
                </div>
            )}
        </div>
    );
};