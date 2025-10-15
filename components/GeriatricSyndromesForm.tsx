
import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { PatientSyndromes } from '../services/mock-db';

interface GeriatricSyndromeItemProps {
    label: string;
    name: string;
    defaultValue?: 'si' | 'no';
    readOnly?: boolean;
}

const GeriatricSyndromeItem: React.FC<GeriatricSyndromeItemProps> = ({ label, name, defaultValue, readOnly = false }) => (
    <div className="col-span-1 flex items-center justify-between p-2 border-b">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name={name} value="si" className="form-radio h-4 w-4 text-blue-600" defaultChecked={defaultValue === 'si'} disabled={readOnly} />
              <span className="ml-2 text-sm">Sí</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name={name} value="no" className="form-radio h-4 w-4 text-blue-600" defaultChecked={defaultValue === 'no'} disabled={readOnly} />
              <span className="ml-2 text-sm">No</span>
            </label>
        </div>
    </div>
);

interface GeriatricSyndromesFormProps {
    data?: Partial<PatientSyndromes>;
    readOnly?: boolean;
}

export const GeriatricSyndromesForm: React.FC<GeriatricSyndromesFormProps> = ({ data = {}, readOnly = false }) => {
  return (
    <>
        <FormSection title="Revisión de Síndromes Geriátricos">
           <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <GeriatricSyndromeItem label="Historia de caídas" name="hist_caidas" defaultValue={data?.hist_caidas} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Déficit visual (corregido)" name="deficit_visual" defaultValue={data?.deficit_visual} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Déficit auditivo (corregido)" name="deficit_auditivo" defaultValue={data?.deficit_auditivo} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Patología dental (corregido)" name="patologia_dental" defaultValue={data?.patologia_dental} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Incontinencia urinaria" name="incon_urinaria" defaultValue={data?.incon_urinaria} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Incontinencia fecal" name="incon_fecal" defaultValue={data?.incon_fecal} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Estreñimiento" name="estrenimiento" defaultValue={data?.estrenimiento} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Depresión" name="depresion" defaultValue={data?.depresion} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Demencia" name="demencia" defaultValue={data?.demencia} readOnly={readOnly} />
                <GeriatricSyndromeItem label="SD. Confusional agudo" name="sd_confusional" defaultValue={data?.sd_confusional} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Inmovilismo" name="inmovilismo" defaultValue={data?.inmovilismo} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Úlceras por presión" name="ulceras" defaultValue={data?.ulceras} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Iatrogenia/Polifarmacia" name="polifarmacia" defaultValue={data?.polifarmacia} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Queja de memoria" name="queja_memoria" defaultValue={data?.queja_memoria} readOnly={readOnly} />
                <GeriatricSyndromeItem label="Osteoporosis" name="osteoporosis" defaultValue={data?.osteoporosis} readOnly={readOnly} />
           </div>
        </FormSection>

        <FormSection title="Valoración Funcional (Escala Cruz Roja 0-5)">
            <FormInput label="1 mes antes del ingreso" name="func_antes" type="number" defaultValue={data?.func_antes} readOnly={readOnly} />
            <FormInput label="Al ingreso" name="func_ingreso" type="number" defaultValue={data?.func_ingreso} readOnly={readOnly} />
        </FormSection>

        <FormSection title="Valoración Psíquica (Escala Cruz Roja 0-5)">
            <FormInput label="1 mes antes del ingreso" name="psi_antes" type="number" defaultValue={data?.psi_antes} readOnly={readOnly} />
            <FormInput label="Al ingreso" name="psi_ingreso" type="number" defaultValue={data?.psi_ingreso} readOnly={readOnly} />
        </FormSection>

        <FormSection title="Valoración Nutricional Rápida">
            <FormInput label="Peso actual (kg)" name="peso_actual" type="number" defaultValue={data?.peso_actual} readOnly={readOnly} />
            <FormInput label="Peso ideal (kg)" name="peso_ideal" type="number" defaultValue={data?.peso_ideal} readOnly={readOnly} />
            <FormInput label="% Diferencia" name="peso_diferencia" defaultValue={data?.peso_diferencia} readOnly={readOnly} />
        </FormSection>
    </>
  );
};