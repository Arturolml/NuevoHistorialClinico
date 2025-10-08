import React, { useState } from 'react';
import { User } from '../services/mock-db';

interface EditDoctorModalProps {
    doctor: User;
    onClose: () => void;
    onSave: (password: string) => Promise<void>;
}

export const EditDoctorModal: React.FC<EditDoctorModalProps> = ({ doctor, onClose, onSave }) => {
    const [newPassword, setNewPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassword) return;
        setIsSaving(true);
        await onSave(newPassword);
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md m-4">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-blue-700">Editar Médico</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <p className="mt-1 text-gray-900 p-2 bg-gray-100 rounded-md">{doctor.name}</p>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <p className="mt-1 text-gray-900 p-2 bg-gray-100 rounded-md">{doctor.email}</p>
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                            placeholder="Introduzca la nueva contraseña"
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                         <button
                            type="submit"
                            disabled={!newPassword || isSaving}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};