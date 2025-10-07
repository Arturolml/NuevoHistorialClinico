
import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { Patient } from '../services/mock-db';

interface IdentificationFormProps {
    patient?: Patient['demographics'];
    readOnly?: boolean;
}

export const IdentificationForm: React.FC<IdentificationFormProps> = ({ patient, readOnly = false }) => {
  return (
    <form>
      <FormSection title="Ficha de Identificación">
        <FormInput label="Nombre(s)" name="nombre" defaultValue={patient?.nombre} readOnly={readOnly}/>
        <FormInput label="Apellidos" name="apellidos" defaultValue={patient?.apellidos} readOnly={readOnly}/>
        <FormInput label="Edad" name="edad" type="number" defaultValue={patient?.edad} readOnly={readOnly}/>
        <FormInput label="Género" name="genero" defaultValue={patient?.genero} readOnly={readOnly}/>
        <FormInput label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" defaultValue={patient?.fecha_nacimiento} readOnly={readOnly}/>
        <FormInput label="Lugar de Nacimiento" name="lugar_nacimiento" defaultValue={patient?.lugar_nacimiento} readOnly={readOnly}/>
        <FormInput label="Residencia" name="residencia" defaultValue={patient?.residencia} readOnly={readOnly}/>
        <FormInput label="Estado Civil" name="estado_civil" defaultValue={patient?.estado_civil} readOnly={readOnly}/>
        <FormInput label="Teléfono" name="telefono" type="tel" defaultValue={patient?.telefono} readOnly={readOnly}/>
        <FormInput label="Escolaridad" name="escolaridad" defaultValue={patient?.escolaridad} readOnly={readOnly}/>
        <FormInput label="Ocupación" name="ocupacion" defaultValue={patient?.ocupacion} readOnly={readOnly}/>
        <FormInput label="Religión" name="religion" defaultValue={patient?.religion} readOnly={readOnly}/>
        <FormInput label="Número de Record" name="record_numero" defaultValue={patient?.record_numero} readOnly={readOnly}/>
        <FormInput label="Registro de Geriatría" name="registro_geriatria" defaultValue={patient?.registro_geriatria} readOnly={readOnly}/>
      </FormSection>

      <FormSection title="Valoración Socio-Familiar">
        <FormInput label="Vive con" name="vive_con" defaultValue={patient?.vive_con} readOnly={readOnly}/>
        <FormInput label="Cuidador Primario" name="cuidador_primario" defaultValue={patient?.cuidador_primario} readOnly={readOnly}/>
        <FormInput label="Red de Apoyo" name="red_apoyo" defaultValue={patient?.red_apoyo} readOnly={readOnly}/>
        <FormInput label="Zarit (escala de colapso de cuidador)" name="zarit" defaultValue={patient?.zarit} readOnly={readOnly}/>
        <FormInput label="Informado por" name="informado_por" defaultValue={patient?.informado_por} readOnly={readOnly}/>
      </FormSection>
    </form>
  );
};
