
import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { RadioInput } from './RadioInput';

const GeriatricSyndromeItem: React.FC<{ label: string; name: string }> = ({ label, name }) => (
    <div className="col-span-1 flex items-center justify-between p-2 border-b">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name={name} value="si" className="form-radio h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm">Sí</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name={name} value="no" className="form-radio h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm">No</span>
            </label>
        </div>
    </div>
);


export const GeriatricSyndromesForm: React.FC = () => {
  return (
    <form>
        <FormSection title="Revisión de Síndromes Geriátricos">
           <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <GeriatricSyndromeItem label="Historia de caídas" name="hist_caidas" />
                <GeriatricSyndromeItem label="Déficit visual (corregido)" name="deficit_visual" />
                <GeriatricSyndromeItem label="Déficit auditivo (corregido)" name="deficit_auditivo" />
                <GeriatricSyndromeItem label="Patología dental (corregido)" name="patologia_dental" />
                <GeriatricSyndromeItem label="Incontinencia urinaria" name="incon_urinaria" />
                <GeriatricSyndromeItem label="Incontinencia fecal" name="incon_fecal" />
                <GeriatricSyndromeItem label="Estreñimiento" name="estrenimiento" />
                <GeriatricSyndromeItem label="Depresión" name="depresion" />
                <GeriatricSyndromeItem label="Demencia" name="demencia" />
                <GeriatricSyndromeItem label="SD. Confusional agudo" name="sd_confusional" />
                <GeriatricSyndromeItem label="Inmovilismo" name="inmovilismo" />
                <GeriatricSyndromeItem label="Úlceras por presión" name="ulceras" />
                <GeriatricSyndromeItem label="Iatrogenia/Polifarmacia" name="polifarmacia" />
                <GeriatricSyndromeItem label="Queja de memoria" name="queja_memoria" />
                <GeriatricSyndromeItem label="Osteoporosis" name="osteoporosis" />
           </div>
        </FormSection>

        <FormSection title="Valoración Funcional (Escala Cruz Roja 0-5)">
            <FormInput label="1 mes antes del ingreso" name="func_antes" type="number" />
            <FormInput label="Al ingreso" name="func_ingreso" type="number" />
        </FormSection>

        <FormSection title="Valoración Psíquica (Escala Cruz Roja 0-5)">
            <FormInput label="1 mes antes del ingreso" name="psi_antes" type="number" />
            <FormInput label="Al ingreso" name="psi_ingreso" type="number" />
        </FormSection>

        <FormSection title="Valoración Nutricional Rápida">
            <FormInput label="Peso actual (kg)" name="peso_actual" type="number" />
            <FormInput label="Peso ideal (kg)" name="peso_ideal" type="number" />
            <FormInput label="% Diferencia" name="peso_diferencia" />
        </FormSection>
    </form>
  );
};
