import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api, User } from '../services/mock-db';
import { EditDoctorModal } from '../components/EditDoctorModal';

export const AdminDashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const [doctors, setDoctors] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newDoctorName, setNewDoctorName] = useState('');
    const [newDoctorEmail, setNewDoctorEmail] = useState('');
    const [newDoctorPassword, setNewDoctorPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingDoctor, setEditingDoctor] = useState<User | null>(null);

    const loadDoctors = () => {
        setIsLoading(true);
        api.getDoctors().then(data => {
            setDoctors(data);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    const handleAddDoctor = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        if (!newDoctorName || !newDoctorPassword || !newDoctorEmail) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        try {
            await api.addUser({
                name: newDoctorName,
                email: newDoctorEmail,
                passwordHash: newDoctorPassword,
                role: 'doctor',
            });
            setSuccessMessage(`¡Médico "${newDoctorName}" creado exitosamente!`);
            setNewDoctorName('');
            setNewDoctorEmail('');
            setNewDoctorPassword('');
            loadDoctors(); // Refresh the list
        } catch (err) {
            setError('Error al crear el médico.');
        }
    };

    const handleUpdatePassword = async (password: string) => {
        if (!editingDoctor) return;
        
        setError('');
        setSuccessMessage('');

        try {
            await api.updateUser(editingDoctor.id, { passwordHash: password });
            setSuccessMessage(`Contraseña para ${editingDoctor.name} actualizada.`);
            setEditingDoctor(null); // Close modal on success
        } catch (err) {
            setError('Error al actualizar la contraseña.');
        }
    };

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create User Form */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-blue-700 mb-6">Crear Nueva Cuenta de Médico</h2>
                    <form onSubmit={handleAddDoctor} className="space-y-4">
                        <div>
                            <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo del Médico</label>
                            <input
                                type="text"
                                id="doctorName"
                                value={newDoctorName}
                                onChange={(e) => setNewDoctorName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Ej: Dr. Juan Pérez"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="doctorEmail" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                id="doctorEmail"
                                value={newDoctorEmail}
                                onChange={(e) => setNewDoctorEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                                placeholder="ejemplo@correo.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="doctorPassword" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                            <input
                                type="password"
                                id="doctorPassword"
                                value={newDoctorPassword}
                                onChange={(e) => setNewDoctorPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Ingrese una contraseña segura"
                                required
                            />
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors"
                            >
                                Crear Usuario
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Doctor List */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-blue-700 mb-6">Médicos Existentes</h2>
                    {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
                    {successMessage && <p className="mb-4 text-sm text-green-600">{successMessage}</p>}
                    {isLoading ? (
                        <p>Cargando médicos...</p>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {doctors.map(doc => (
                                <div key={doc.id} className="p-3 border rounded-lg flex justify-between items-center bg-gray-50">
                                    <div>
                                        <p className="font-medium text-gray-800">{doc.name}</p>
                                        <p className="text-sm text-gray-500">{doc.email}</p>
                                    </div>
                                    <button 
                                      onClick={() => setEditingDoctor(doc)}
                                      className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                      Editar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            {editingDoctor && (
                <EditDoctorModal
                    doctor={editingDoctor}
                    onClose={() => setEditingDoctor(null)}
                    onSave={handleUpdatePassword}
                />
            )}
        </>
    );
};