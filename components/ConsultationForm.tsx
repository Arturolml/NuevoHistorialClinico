
import React from 'react';
import { FormSection } from './FormSection';
import { TextAreaInput } from './FormInput';
import { RadioInput } from './RadioInput';

const MedicationRow: React.FC<{index: number}> = ({ index }) => (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-5 gap-2 items-center border-b pb-2">
        <input type="text" placeholder="Medicamento" className="sm:col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md" />
        <input type="text" placeholder="Dosis" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        <input type="text" placeholder="Tiempo de uso" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        <div className="flex items-center space-x-4">
            <label className="flex items-center">
                <input type="radio" name={`prescrito-${index}`} className="form-radio"/>
                <span className="ml-2 text-sm">Prescrito</span>
            </label>
            <label className="flex items-center">
                <input type="radio" name={`prescrito-${index}`} className="form-radio"/>
                <span className="ml-2 text-sm">No Prescrito</span>
            </label>
        </div>
    </div>
);

export const ConsultationForm: React.FC = () => {
  return (
    <form>
        <FormSection title="Motivo de Consulta">
            <TextAreaInput label="Motivo Principal" name="motivo_consulta" className="md:col-span-2 lg:col-span-3" />
            <TextAreaInput label="Desarrollo del motivo de consulta" name="desarrollo_consulta" rows={5} className="md:col-span-2 lg:col-span-3" />
        </FormSection>

        <FormSection title="Medicamentos que está usando o ha usado en las últimas semanas">
            <MedicationRow index={1} />
            <MedicationRow index={2} />
            <MedicationRow index={3} />
            <MedicationRow index={4} />
        </FormSection>

        <FormSection title="Revisión por Sistemas">
            <RadioInput label="Fiebre" name="fiebre" />
            <RadioInput label="Alt. De la visión" name="vision" />
            <RadioInput label="Alt. De la audición" name="audicion" />
            <RadioInput label="Alt. De la masticación" name="masticacion" />
            <RadioInput label="Alt. De la deglución" name="deglucion" />
            <RadioInput label="Mareos / Vértigos" name="mareos" />
            <RadioInput label="Cefalea" name="cefalea" />
            <RadioInput label="Alt. De la cognición" name="cognicion" />
            <RadioInput label="Dolor torácico" name="dolor_toracico" />
            <RadioInput label="Disnea" name="disnea" />
            <RadioInput label="Náuseas" name="nauseas" />
            <RadioInput label="Vómitos" name="vomitos" />
            <RadioInput label="Pirosis" name="pirosis" />
            <RadioInput label="Diarrea" name="diarrea" />
            <RadioInput label="Estreñimiento" name="estrenimiento_rev" />
            <RadioInput label="Alt. Osteoarticulares" name="osteoarticulares" />
            <RadioInput label="Alt. De la piel" name="piel" />
            <RadioInput label="Alt. Genitourinarias" name="genitourinarias" />
            <RadioInput label="Alteración del sueño" name="sueno" />
        </FormSection>
    </form>
  );
};
