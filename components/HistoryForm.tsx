
import React from 'react';
import { FormSection } from './FormSection';
import { FormInput, TextAreaInput } from './FormInput';
import { RadioInput } from './RadioInput';
import { PatientHistory } from '../services/mock-db';

interface HistoryFormProps {
    history?: PatientHistory;
    readOnly?: boolean;
}


export const HistoryForm: React.FC<HistoryFormProps> = ({ history, readOnly = false }) => {
  return (
    <form>
      <FormSection title="Antecedentes Personales No Patológicos">
        <RadioInput label="Tabaquismo" name="tabaquismo" defaultValue={history?.nonPathological.tabaquismo} readOnly={readOnly}/>
        <RadioInput label="Alcoholismo" name="alcoholismo" defaultValue={history?.nonPathological.alcoholismo} readOnly={readOnly}/>
        <RadioInput label="Biomasa (exposición a humo)" name="biomasa" defaultValue={history?.nonPathological.biomasa} readOnly={readOnly}/>
        <RadioInput label="Exposición laboral riesgosa" name="exposicion_laboral" defaultValue={history?.nonPathological.exposicion_laboral} readOnly={readOnly}/>
        <FormInput label="Inmunizaciones (vacunas)" name="inmunizaciones" placeholder="Completo, incompleto, cual falta" defaultValue={history?.nonPathological.inmunizaciones} readOnly={readOnly}/>
        <FormInput label="Suplementación" name="suplementacion" defaultValue={history?.nonPathological.suplementacion} readOnly={readOnly}/>
      </FormSection>
      
      <FormSection title="Antecedentes Personales Patológicos">
        <RadioInput label="Hipertensión Arterial" name="hipertension" defaultValue={history?.pathological.hipertension} readOnly={readOnly}/>
        <RadioInput label="Diabetes Mellitus" name="diabetes" defaultValue={history?.pathological.diabetes} readOnly={readOnly}/>
        <RadioInput label="Distiroidismo (hipo/hipertiroidismo)" name="distiroidismo" defaultValue={history?.pathological.distiroidismo} readOnly={readOnly}/>
        <RadioInput label="Alergias" name="alergias" defaultValue={history?.pathological.alergias} readOnly={readOnly}/>
        <RadioInput label="EPOC" name="epoc" defaultValue={history?.pathological.epoc} readOnly={readOnly}/>
        <RadioInput label="Transfusiones" name="transfusiones" defaultValue={history?.pathological.transfusiones} readOnly={readOnly}/>
        <RadioInput label="Cirugías" name="cirugias" defaultValue={history?.pathological.cirugias} readOnly={readOnly}/>
        <TextAreaInput label="Antecedentes Cardiovasculares (cuál, fechas, tratamientos)" name="cardiovasculares" className="md:col-span-2 lg:col-span-3" defaultValue={history?.pathological.cardiovasculares} readOnly={readOnly}/>
        <TextAreaInput label="Hospitalizaciones Recientes (cuándo, motivo, complicaciones)" name="hospitalizaciones" className="md:col-span-2 lg:col-span-3" defaultValue={history?.pathological.hospitalizaciones} readOnly={readOnly}/>
        <TextAreaInput label="Traumáticos (fracturas, accidentes)" name="traumaticos" className="md:col-span-2 lg:col-span-3" defaultValue={history?.pathological.traumaticos} readOnly={readOnly}/>
        <TextAreaInput label="Otros" name="patologicos_otros" className="md:col-span-2 lg:col-span-3" defaultValue={history?.pathological.otros} readOnly={readOnly}/>
      </FormSection>
      
      <FormSection title="Antecedentes Heredo-Familiares">
          <TextAreaInput label="Madre (viva, edad, finada, causa)" name="madre_info" className="md:col-span-1" defaultValue={history?.family.madre_info} readOnly={readOnly}/>
          <TextAreaInput label="Padre (vivo, edad, finado, causa)" name="padre_info" className="md:col-span-1" defaultValue={history?.family.padre_info} readOnly={readOnly}/>
          <TextAreaInput label="Hermanos" name="hermanos_info" className="md:col-span-1" defaultValue={history?.family.hermanos_info} readOnly={readOnly}/>
          <TextAreaInput label="Hijos" name="hijos_info" className="md:col-span-1" defaultValue={history?.family.hijos_info} readOnly={readOnly}/>
          <TextAreaInput label="Antecedentes Neurodegenerativos, Psiquiátricos, Abuso de Sustancias" name="neuro_psi" className="md:col-span-2" defaultValue={history?.family.neuro_psi} readOnly={readOnly}/>
      </FormSection>
    </form>
  );
};
