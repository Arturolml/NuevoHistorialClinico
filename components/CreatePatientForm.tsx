import React, { useRef } from 'react';
import { IdentificationForm } from './IdentificationForm';
import { HistoryForm } from './HistoryForm';
import { GeriatricSyndromesForm } from './GeriatricSyndromesForm';
import { PatientDemographics, PatientHistory, PatientSyndromes } from '../services/mock-db';

interface CreatePatientFormProps {
    onSave: (patientData: {
        demographics: PatientDemographics;
        history: PatientHistory;
        syndromes: PatientSyndromes;
    }) => void;
    onCancel: () => void;
}

// Helper to safely convert form data to a specific type
const getField = (data: { [key: string]: any }, key: string, type: 'string' | 'number' = 'string'): any => {
    const value = data[key] || '';
    if (type === 'number') return Number(value) || 0;
    return value;
};

export const CreatePatientForm: React.FC<CreatePatientFormProps> = ({ onSave, onCancel }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        const patientData = {
            demographics: {
                nombre: getField(data, 'nombre'),
                apellidos: getField(data, 'apellidos'),
                edad: getField(data, 'edad', 'number'),
                genero: getField(data, 'genero'),
                fecha_nacimiento: getField(data, 'fecha_nacimiento'),
                lugar_nacimiento: getField(data, 'lugar_nacimiento'),
                residencia: getField(data, 'residencia'),
                estado_civil: getField(data, 'estado_civil'),
                telefono: getField(data, 'telefono'),
                escolaridad: getField(data, 'escolaridad'),
                ocupacion: getField(data, 'ocupacion'),
                religion: getField(data, 'religion'),
                record_numero: getField(data, 'record_numero'),
                registro_geriatria: getField(data, 'registro_geriatria'),
                vive_con: getField(data, 'vive_con'),
                cuidador_primario: getField(data, 'cuidador_primario'),
                red_apoyo: getField(data, 'red_apoyo'),
                zarit: getField(data, 'zarit'),
                informado_por: getField(data, 'informado_por'),
            },
            history: {
                nonPathological: {
                    tabaquismo: { value: getField(data, 'tabaquismo'), description: getField(data, 'tabaquismo_description') },
                    alcoholismo: { value: getField(data, 'alcoholismo'), description: getField(data, 'alcoholismo_description') },
                    biomasa: { value: getField(data, 'biomasa'), description: getField(data, 'biomasa_description') },
                    exposicion_laboral: { value: getField(data, 'exposicion_laboral'), description: getField(data, 'exposicion_laboral_description') },
                    inmunizaciones: getField(data, 'inmunizaciones'),
                    suplementacion: getField(data, 'suplementacion'),
                },
                pathological: {
                    hipertension: { value: getField(data, 'hipertension'), description: getField(data, 'hipertension_description') },
                    diabetes: { value: getField(data, 'diabetes'), description: getField(data, 'diabetes_description') },
                    distiroidismo: { value: getField(data, 'distiroidismo'), description: getField(data, 'distiroidismo_description') },
                    alergias: { value: getField(data, 'alergias'), description: getField(data, 'alergias_description') },
                    epoc: { value: getField(data, 'epoc'), description: getField(data, 'epoc_description') },
                    transfusiones: { value: getField(data, 'transfusiones'), description: getField(data, 'transfusiones_description') },
                    cirugias: { value: getField(data, 'cirugias'), description: getField(data, 'cirugias_description') },
                    cardiovasculares: getField(data, 'cardiovasculares'),
                    hospitalizaciones: getField(data, 'hospitalizaciones'),
                    traumaticos: getField(data, 'traumaticos'),
                    otros: getField(data, 'patologicos_otros'),
                },
                family: {
                    madre_info: getField(data, 'madre_info'),
                    padre_info: getField(data, 'padre_info'),
                    hermanos_info: getField(data, 'hermanos_info'),
                    hijos_info: getField(data, 'hijos_info'),
                    neuro_psi: getField(data, 'neuro_psi'),
                },
            },
            syndromes: {
                hist_caidas: getField(data, 'hist_caidas'),
                deficit_visual: getField(data, 'deficit_visual'),
                deficit_auditivo: getField(data, 'deficit_auditivo'),
                patologia_dental: getField(data, 'patologia_dental'),
                incon_urinaria: getField(data, 'incon_urinaria'),
                incon_fecal: getField(data, 'incon_fecal'),
                estrenimiento: getField(data, 'estrenimiento'),
                depresion: getField(data, 'depresion'),
                demencia: getField(data, 'demencia'),
                sd_confusional: getField(data, 'sd_confusional'),
                inmovilismo: getField(data, 'inmovilismo'),
                ulceras: getField(data, 'ulceras'),
                polifarmacia: getField(data, 'polifarmacia'),
                queja_memoria: getField(data, 'queja_memoria'),
                osteoporosis: getField(data, 'osteoporosis'),
                func_antes: getField(data, 'func_antes', 'number'),
                func_ingreso: getField(data, 'func_ingreso', 'number'),
                psi_antes: getField(data, 'psi_antes', 'number'),
                psi_ingreso: getField(data, 'psi_ingreso', 'number'),
                peso_actual: getField(data, 'peso_actual', 'number'),
                peso_ideal: getField(data, 'peso_ideal', 'number'),
                peso_diferencia: getField(data, 'peso_diferencia'),
            },
        };

        onSave(patientData as any);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* The individual forms don't need their own <form> tags */}
            <div dangerouslySetInnerHTML={{ __html: "<style>form > form { display: contents; }</style>" }} />
            
            <IdentificationForm />
            <HistoryForm />
            <GeriatricSyndromesForm />
            
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                    Cancelar
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                    Guardar Paciente
                </button>
            </div>
        </form>
    );
};