import React from 'react';
import { FormSection } from './FormSection';
import { TextAreaInput } from './FormInput';
import { RadioInput } from './RadioInput';

const MedicationRow: React.FC<{index: number, data?: any, readOnly?: boolean}> = ({ index, data, readOnly }) => (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-5 gap-2 items-center border-b pb-2">
        <input type="text" placeholder="Medicamento" name={`med_name_${index}`} defaultValue={data?.[`med_name_${index}`]} readOnly={readOnly} className={`sm:col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 ${readOnly ? 'bg-gray-100' : ''}`} />
        <input type="text" placeholder="Dosis" name={`med_dose_${index}`} defaultValue={data?.[`med_dose_${index}`]} readOnly={readOnly} className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 ${readOnly ? 'bg-gray-100' : ''}`} />
        <input type="text" placeholder="Tiempo de uso" name={`med_duration_${index}`} defaultValue={data?.[`med_duration_${index}`]} readOnly={readOnly} className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 ${readOnly ? 'bg-gray-100' : ''}`} />
        <div className="flex items-center space-x-4">
            <label className="flex items-center">
                <input type="radio" name={`prescrito-${index}`} value="prescribed" defaultChecked={data?.[`prescrito-${index}`] === 'prescribed'} disabled={readOnly} className="form-radio"/>
                <span className="ml-2 text-sm">Prescrito</span>
            </label>
            <label className="flex items-center">
                <input type="radio" name={`prescrito-${index}`} value="not_prescribed" defaultChecked={data?.[`prescrito-${index}`] === 'not_prescribed'} disabled={readOnly} className="form-radio"/>
                <span className="ml-2 text-sm">No Prescrito</span>
            </label>
        </div>
    </div>
);

interface ConsultationFormProps {
    data?: any;
    readOnly?: boolean;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ data, readOnly }) => {
  return (
    <>
        <FormSection title="Motivo de Consulta">
            <TextAreaInput label="Motivo Principal" name="motivo_consulta" defaultValue={data?.motivo_consulta} readOnly={readOnly} className="md:col-span-2 lg:col-span-3" />
            <TextAreaInput label="Desarrollo del motivo de consulta" name="desarrollo_consulta" rows={5} defaultValue={data?.desarrollo_consulta} readOnly={readOnly} className="md:col-span-2 lg:col-span-3" />
        </FormSection>

        <FormSection title="Medicamentos que está usando o ha usado en las últimas semanas">
            <MedicationRow index={1} data={data} readOnly={readOnly} />
            <MedicationRow index={2} data={data} readOnly={readOnly} />
            <MedicationRow index={3} data={data} readOnly={readOnly} />
            <MedicationRow index={4} data={data} readOnly={readOnly} />
        </FormSection>

        <FormSection title="Revisión por Sistemas">
            <RadioInput label="Fiebre" name="fiebre" defaultValue={data?.fiebre} readOnly={readOnly} />
            <RadioInput label="Alt. De la visión" name="vision" defaultValue={data?.vision} readOnly={readOnly} />
            <RadioInput label="Alt. De la audición" name="audicion" defaultValue={data?.audicion} readOnly={readOnly} />
            <RadioInput label="Alt. De la masticación" name="masticacion" defaultValue={data?.masticacion} readOnly={readOnly} />
            <RadioInput label="Alt. De la deglución" name="deglucion" defaultValue={data?.deglucion} readOnly={readOnly} />
            <RadioInput label="Mareos / Vértigos" name="mareos" defaultValue={data?.mareos} readOnly={readOnly} />
            <RadioInput label="Cefalea" name="cefalea" defaultValue={data?.cefalea} readOnly={readOnly} />
            <RadioInput label="Alt. De la cognición" name="cognicion" defaultValue={data?.cognicion} readOnly={readOnly} />
            <RadioInput label="Dolor torácico" name="dolor_toracico" defaultValue={data?.dolor_toracico} readOnly={readOnly} />
            <RadioInput label="Disnea" name="disnea" defaultValue={data?.disnea} readOnly={readOnly} />
            <RadioInput label="Náuseas" name="nauseas" defaultValue={data?.nauseas} readOnly={readOnly} />
            <RadioInput label="Vómitos" name="vomitos" defaultValue={data?.vomitos} readOnly={readOnly} />
            <RadioInput label="Pirosis" name="pirosis" defaultValue={data?.pirosis} readOnly={readOnly} />
            <RadioInput label="Diarrea" name="diarrea" defaultValue={data?.diarrea} readOnly={readOnly} />
            <RadioInput label="Estreñimiento" name="estrenimiento_rev" defaultValue={data?.estrenimiento_rev} readOnly={readOnly} />
            <RadioInput label="Alt. Osteoarticulares" name="osteoarticulares" defaultValue={data?.osteoarticulares} readOnly={readOnly} />
            <RadioInput label="Alt. De la piel" name="piel" defaultValue={data?.piel} readOnly={readOnly} />
            <RadioInput label="Alt. Genitourinarias" name="genitourinarias" defaultValue={data?.genitourinarias} readOnly={readOnly} />
            <RadioInput label="Alteración del sueño" name="sueno" defaultValue={data?.sueno} readOnly={readOnly} />
        </FormSection>
    </>
  );
};