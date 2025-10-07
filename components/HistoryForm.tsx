
import React from 'react';
import { FormSection } from './FormSection';
import { FormInput, TextAreaInput } from './FormInput';
import { RadioInput } from './RadioInput';

export const HistoryForm: React.FC = () => {
  return (
    <form>
      <FormSection title="Antecedentes Personales No Patológicos">
        <RadioInput label="Tabaquismo" name="tabaquismo" />
        <RadioInput label="Alcoholismo" name="alcoholismo" />
        <RadioInput label="Biomasa (exposición a humo)" name="biomasa" />
        <RadioInput label="Exposición laboral riesgosa" name="exposicion_laboral" />
        <FormInput label="Inmunizaciones (vacunas)" name="inmunizaciones" placeholder="Completo, incompleto, cual falta" />
        <FormInput label="Suplementación" name="suplementacion" />
      </FormSection>
      
      <FormSection title="Antecedentes Personales Patológicos">
        <RadioInput label="Hipertensión Arterial" name="hipertension" />
        <RadioInput label="Diabetes Mellitus" name="diabetes" />
        <RadioInput label="Distiroidismo (hipo/hipertiroidismo)" name="distiroidismo" />
        <RadioInput label="Alergias" name="alergias" />
        <RadioInput label="EPOC" name="epoc" />
        <RadioInput label="Transfusiones" name="transfusiones" />
        <RadioInput label="Cirugías" name="cirugias" />
        <TextAreaInput label="Antecedentes Cardiovasculares (cuál, fechas, tratamientos)" name="cardiovasculares" className="md:col-span-2 lg:col-span-3"/>
        <TextAreaInput label="Hospitalizaciones Recientes (cuándo, motivo, complicaciones)" name="hospitalizaciones" className="md:col-span-2 lg:col-span-3"/>
        <TextAreaInput label="Traumáticos (fracturas, accidentes)" name="traumaticos" className="md:col-span-2 lg:col-span-3"/>
        <TextAreaInput label="Otros" name="patologicos_otros" className="md:col-span-2 lg:col-span-3"/>
      </FormSection>
      
      <FormSection title="Antecedentes Heredo-Familiares">
          <TextAreaInput label="Madre (viva, edad, finada, causa)" name="madre_info" className="md:col-span-1" />
          <TextAreaInput label="Padre (vivo, edad, finado, causa)" name="padre_info" className="md:col-span-1" />
          <TextAreaInput label="Hermanos" name="hermanos_info" className="md:col-span-1" />
          <TextAreaInput label="Hijos" name="hijos_info" className="md:col-span-1" />
          <TextAreaInput label="Antecedentes Neurodegenerativos, Psiquiátricos, Abuso de Sustancias" name="neuro_psi" className="md:col-span-2" />
      </FormSection>
    </form>
  );
};
