
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api, Patient, PatientDemographics, PatientHistory, PatientSyndromes } from '../services/mock-db';
import { CreatePatientForm } from '../components/CreatePatientForm';


export const DashboardPage: React.FC = () => {
    const { user, logout, selectPatient } = useAuth();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    const loadPatients = () => {
        if (user) {
            setIsLoading(true);
            api.getPatientsByDoctorId(user.id).then(data => {
                setPatients(data);
                setIsLoading(false);
            });
        }
    };

    useEffect(() => {
        loadPatients();
    }, [user]);

    const handleSavePatient = async (patientData: {
        demographics: PatientDemographics;
        history: PatientHistory;
        syndromes: PatientSyndromes;
    }) => {
        if (!user) return;
        
        const newPatientData = {
            doctorId: user.id,
            ...patientData,
        };

        setIsLoading(true);
        await api.addPatient(newPatientData as Omit<Patient, 'id'>);
        setIsCreating(false);
        loadPatients(); 
    };

    if (isCreating) {
        return (
             <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Registrar Nuevo Paciente</h1>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                     <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                        <CreatePatientForm onSave={handleSavePatient} onCancel={() => setIsCreating(false)} />
                     </div>
                </main>
            </div>
        )
    }

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Panel de Pacientes</h1>
                            <p className="text-sm text-gray-500 mt-1">Bienvenido, {user?.name}.</p>
                        </div>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-blue-700">Mis Pacientes</h2>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors"
                        >
                            + Nuevo Paciente
                        </button>
                    </div>

                    {isLoading ? (
                        <p>Cargando pacientes...</p>
                    ) : (
                        <div className="space-y-4">
                            {patients.length > 0 ? patients.map(patient => (
                                <div key={patient.id} onClick={() => selectPatient(patient)}
                                    className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors">
                                    <div>
                                        <p className="font-semibold text-gray-800">{patient.demographics.nombre} {patient.demographics.apellidos}</p>
                                        <p className="text-sm text-gray-500">Edad: {patient.demographics.edad}</p>
                                    </div>
                                    <span className="text-sm font-medium text-blue-600">Ver Detalles &rarr;</span>
                                </div>
                            )) : (
                                <p className="text-gray-500">No hay pacientes registrados. ¡Añada uno para comenzar!</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};