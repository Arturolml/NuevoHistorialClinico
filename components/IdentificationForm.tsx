
import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';

export const IdentificationForm: React.FC = () => {
  return (
    <form>
      <FormSection title="Ficha de Identificación">
        <FormInput label="Nombre(s)" name="nombre" />
        <FormInput label="Apellidos" name="apellidos" />
        <FormInput label="Edad" name="edad" type="number" />
        <FormInput label="Género" name="genero" />
        <FormInput label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" />
        <FormInput label="Lugar de Nacimiento" name="lugar_nacimiento" />
        <FormInput label="Residencia" name="residencia" />
        <FormInput label="Estado Civil" name="estado_civil" />
        <FormInput label="Teléfono" name="telefono" type="tel" />
        <FormInput label="Escolaridad" name="escolaridad" />
        <FormInput label="Ocupación" name="ocupacion" />
        <FormInput label="Religión" name="religion" />
        <FormInput label="Número de Record" name="record_numero" />
        <FormInput label="Registro de Geriatría" name="registro_geriatria" />
      </FormSection>

      <FormSection title="Valoración Socio-Familiar">
        <FormInput label="Vive con" name="vive_con" />
        <FormInput label="Cuidador Primario" name="cuidador_primario" />
        <FormInput label="Red de Apoyo" name="red_apoyo" />
        <FormInput label="Zarit (escala de colapso de cuidador)" name="zarit" />
        <FormInput label="Informado por" name="informado_por" />
      </FormSection>
    </form>
  );
};
