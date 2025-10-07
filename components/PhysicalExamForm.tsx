import React from 'react';
import { FormSection } from './FormSection';
import { FormInput, TextAreaInput } from './FormInput';

const ExamRow: React.FC<{ area: string, name: string, data?: any, readOnly?: boolean }> = ({ area, name, data, readOnly }) => (
    <div className="contents">
        <span className="font-medium text-sm text-gray-700 py-2 border-b border-gray-200">{area}</span>
        <div className="py-2 border-b border-gray-200">
            <input type="text" name={`${name}_normal`} defaultValue={data?.[`${name}_normal`]} readOnly={readOnly} placeholder="Normal" className={`w-full px-2 py-1 border border-gray-300 rounded-md ${readOnly ? 'bg-gray-100' : ''}`} />
        </div>
        <div className="py-2 border-b border-gray-200">
            <input type="text" name={`${name}_pathological`} defaultValue={data?.[`${name}_pathological`]} readOnly={readOnly} placeholder="Patológico" className={`w-full px-2 py-1 border border-gray-300 rounded-md ${readOnly ? 'bg-gray-100' : ''}`} />
        </div>
    </div>
);

const ExamSubheading: React.FC<{ title: string }> = ({ title }) => (
    <h4 className="font-bold text-md text-gray-800 mt-4 col-span-3 bg-gray-100 p-2 rounded-md">{title}</h4>
);

const GradedInput: React.FC<{ label: string; name: string; defaultValue?: string; readOnly?: boolean }> = ({ label, name, defaultValue, readOnly }) => (
  <div className="col-span-1 flex items-center justify-between p-2 border-b">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div className="flex items-center space-x-2">
      {['I', 'II', 'III', 'IV', 'V'].map(grade => (
        <label key={grade} className="flex items-center">
          <input type="radio" name={name} value={grade} defaultChecked={defaultValue === grade} disabled={readOnly} className="form-radio h-4 w-4 text-blue-600" />
          <span className="ml-1 text-xs">{grade}</span>
        </label>
      ))}
    </div>
  </div>
);

interface PhysicalExamFormProps {
    data?: any;
    readOnly?: boolean;
}

export const PhysicalExamForm: React.FC<PhysicalExamFormProps> = ({ data, readOnly = false }) => {
  return (
    <>
        <FormSection title="Examen Físico - Datos Básicos">
            <FormInput label="Peso (kg)" name="ex_peso" type="number" defaultValue={data?.ex_peso} readOnly={readOnly} />
            <FormInput label="Talla (cm)" name="ex_talla" type="number" defaultValue={data?.ex_talla} readOnly={readOnly} />
            <FormInput label="Temperatura (°C)" name="ex_temp" type="number" defaultValue={data?.ex_temp} readOnly={readOnly} />
            <FormInput label="Pulso (lpm)" name="ex_pulso" type="number" defaultValue={data?.ex_pulso} readOnly={readOnly} />
            <FormInput label="Frecuencia Respiratoria (rpm)" name="ex_fr" type="number" defaultValue={data?.ex_fr} readOnly={readOnly} />
            <FormInput label="Frecuencia Cardíaca (lpm)" name="ex_fc" type="number" defaultValue={data?.ex_fc} readOnly={readOnly} />
            <FormInput label="TA Acostado" name="ta_acostado" defaultValue={data?.ta_acostado} readOnly={readOnly} />
            <FormInput label="TA Sentado" name="ta_sentado" defaultValue={data?.ta_sentado} readOnly={readOnly} />
            <FormInput label="TA De pie" name="ta_de_pie" defaultValue={data?.ta_de_pie} readOnly={readOnly} />
            <FormInput label="Perímetro abdominal (cm)" name="per_abdominal" type="number" defaultValue={data?.per_abdominal} readOnly={readOnly} />
        </FormSection>

        <FormSection title="Condición General y Examen Mental">
            <TextAreaInput label="Examen Mental (hallazgos, historia de pérdidas de memoria, olvidos, desorientación)" name="examen_mental" defaultValue={data?.examen_mental} readOnly={readOnly} className="md:col-span-3" />
            <FormInput label="Apariencia" name="apariencia" defaultValue={data?.apariencia} readOnly={readOnly} className="md:col-span-1" />
            <FormInput label="Hidratación" name="hidratacion" defaultValue={data?.hidratacion} readOnly={readOnly} className="md:col-span-1" />
            <FormInput label="Piel y anexos" name="piel_anexos" defaultValue={data?.piel_anexos} readOnly={readOnly} className="md:col-span-1" />
        </FormSection>

        <div className="border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-700 border-b border-gray-200 pb-3 mb-6">Examen por Áreas</h3>
            <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[200px_1fr_1fr] gap-x-4 items-center">
                <div className="font-semibold text-left pb-2 border-b-2 col-span-1">Área del Cuerpo</div>
                <div className="font-semibold text-left pb-2 border-b-2 col-span-1 hidden sm:block">Normal</div>
                <div className="font-semibold text-left pb-2 border-b-2 col-span-1 hidden sm:block">Patológico</div>

                <ExamRow area="Cabeza" name="cabeza" data={data} readOnly={readOnly} />
                
                <ExamSubheading title="Ojos" />
                <ExamRow area="Fondo de ojo" name="fondo_ojo" data={data} readOnly={readOnly} />
                <ExamRow area="Conjuntivas" name="conjuntivas" data={data} readOnly={readOnly} />
                <ExamRow area="Pupilas" name="pupilas" data={data} readOnly={readOnly} />
                <ExamRow area="Lagrimeo" name="lagrimeo" data={data} readOnly={readOnly} />
                <ExamRow area="Párpados" name="parpados" data={data} readOnly={readOnly} />

                <ExamSubheading title="Nariz" />
                <ExamRow area="Mucosa/septum" name="nariz" data={data} readOnly={readOnly} />
                
                <ExamSubheading title="Boca" />
                <ExamRow area="Labios" name="labios" data={data} readOnly={readOnly} />
                <ExamRow area="Lengua" name="lengua" data={data} readOnly={readOnly} />
                <ExamRow area="Encías" name="encias" data={data} readOnly={readOnly} />
                <ExamRow area="Orofaringe" name="orofaringe" data={data} readOnly={readOnly} />
                <ExamRow area="Dentadura" name="dentadura" data={data} readOnly={readOnly} />
                
                <ExamSubheading title="Oídos" />
                <ExamRow area="Pabellón auricular" name="pabellon_auricular" data={data} readOnly={readOnly} />
                <ExamRow area="Cond. Auditivo Ext." name="cond_auditivo" data={data} readOnly={readOnly} />
                
                <ExamSubheading title="Cuello" />
                <ExamRow area="Movs. Laterales" name="movs_laterales" data={data} readOnly={readOnly} />
                <ExamRow area="Pulso carotídeo" name="pulso_carotideo_cuello" data={data} readOnly={readOnly} />
                <ExamRow area="Tiroides" name="tiroides" data={data} readOnly={readOnly} />
                <ExamRow area="Injurgitación yugular" name="injurgitacion_yugular" data={data} readOnly={readOnly} />
                <ExamRow area="Reflujo H-Y" name="reflujo_hy" data={data} readOnly={readOnly} />
                
                <ExamSubheading title="Tórax" />
                <ExamRow area="Insp. Gral" name="torax_insp_gral" data={data} readOnly={readOnly} />
                <ExamRow area="Mamas" name="mamas" data={data} readOnly={readOnly} />
                <ExamRow area="Ausc.Pulmonar" name="ausc_pulmonar" data={data} readOnly={readOnly} />
                <ExamRow area="Percusión Pulmonar" name="percusion_pulmonar" data={data} readOnly={readOnly} />
                <ExamRow area="Ruidos Cardiacos" name="ruidos_cardiacos" data={data} readOnly={readOnly} />
                <ExamRow area="Choque de la punta" name="choque_punta" data={data} readOnly={readOnly} />
                <ExamRow area="Ritmo" name="ritmo" data={data} readOnly={readOnly} />
                <ExamRow area="Soplos" name="soplos" data={data} readOnly={readOnly} />
                
                <ExamSubheading title="Abdomen" />
                <ExamRow area="Insp. gral." name="abdomen_insp_gral" data={data} readOnly={readOnly} />
                <ExamRow area="Palpación hígado" name="palpacion_higado" data={data} readOnly={readOnly} />
                <ExamRow area="Palpación bazo" name="palpacion_bazo" data={data} readOnly={readOnly} />
                <ExamRow area="Latido aortico" name="latido_aortico" data={data} readOnly={readOnly} />
                <ExamRow area="Auscultación" name="abdomen_auscultacion" data={data} readOnly={readOnly} />
                <ExamRow area="Percusión" name="abdomen_percusion" data={data} readOnly={readOnly} />
                <ExamRow area="Hernias" name="hernias" data={data} readOnly={readOnly} />
                <ExamRow area="Cicatrices" name="cicatrices" data={data} readOnly={readOnly} />
                
                <ExamSubheading title="Genito Urinario y Rectal" />
                <ExamRow area="Gen. Externos" name="gen_externos" data={data} readOnly={readOnly} />
                <ExamRow area="T. vaginal" name="t_vaginal" data={data} readOnly={readOnly} />
                <ExamRow area="T. rectal" name="t_rectal" data={data} readOnly={readOnly} />
                <ExamRow area="Ex. Próstata" name="ex_prostata" data={data} readOnly={readOnly} />
            </div>
        </div>

        <FormSection title="Examen Musculoesquelético">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Cuello" name="ms_cuello" defaultValue={data?.ms_cuello} readOnly={readOnly} />
                <FormInput label="Hombros" name="ms_hombros" defaultValue={data?.ms_hombros} readOnly={readOnly} />
                <FormInput label="Pelvis" name="ms_pelvis" defaultValue={data?.ms_pelvis} readOnly={readOnly} />
                <FormInput label="Columna torácica" name="ms_col_toracica" defaultValue={data?.ms_col_toracica} readOnly={readOnly} />
                <FormInput label="Columna lumbar" name="ms_col_lumbar" defaultValue={data?.ms_col_lumbar} readOnly={readOnly} />
                <FormInput label="Rodillas" name="ms_rodillas" defaultValue={data?.ms_rodillas} readOnly={readOnly} />
                <FormInput label="Tobillos" name="ms_tobillos" defaultValue={data?.ms_tobillos} readOnly={readOnly} />
                <FormInput label="Manos" name="ms_manos" defaultValue={data?.ms_manos} readOnly={readOnly} />
                <FormInput label="Pies" name="ms_pies" defaultValue={data?.ms_pies} readOnly={readOnly} />
            </div>
        </FormSection>

        <FormSection title="Sistema Locomotor">
            <FormInput label="Movilidad articular" name="sl_movilidad" defaultValue={data?.sl_movilidad} readOnly={readOnly} />
            <FormInput label="Fuerza muscular" name="sl_fuerza" defaultValue={data?.sl_fuerza} readOnly={readOnly} />
            <FormInput label="Forma articular" name="sl_forma" defaultValue={data?.sl_forma} readOnly={readOnly} />
            <FormInput label="Marcha" name="sl_marcha" defaultValue={data?.sl_marcha} readOnly={readOnly} />
        </FormSection>

        <FormSection title="Examen Neurológico">
             <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <FormInput label="Estado de conciencia" name="conciencia" defaultValue={data?.conciencia} readOnly={readOnly} />
                <FormInput label="Sensibilidad" name="sensibilidad" defaultValue={data?.sensibilidad} readOnly={readOnly} />
                <FormInput label="Motilidad" name="motilidad" defaultValue={data?.motilidad} readOnly={readOnly} />
                <FormInput label="Pares craneales" name="pares_craneales" defaultValue={data?.pares_craneales} readOnly={readOnly} />
                <FormInput label="Coordinación" name="coordinacion" defaultValue={data?.coordinacion} readOnly={readOnly} />
                <FormInput label="Movimientos anormales" name="mov_anormales" defaultValue={data?.mov_anormales} readOnly={readOnly} />
                <GradedInput label="Fuerza Muscular" name="fuerza_muscular" defaultValue={data?.fuerza_muscular} readOnly={readOnly} />
                <GradedInput label="Tono Muscular" name="tono_muscular" defaultValue={data?.tono_muscular} readOnly={readOnly} />
             </div>
        </FormSection>
        
        <FormSection title="ROTS (Reflejos Osteotendinosos)">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <GradedInput label="Bicipital" name="rots_bicipital" defaultValue={data?.rots_bicipital} readOnly={readOnly} />
              <GradedInput label="Rotuliano" name="rots_rotuliano" defaultValue={data?.rots_rotuliano} readOnly={readOnly} />
              <GradedInput label="Aquiliano" name="rots_aquiliano" defaultValue={data?.rots_aquiliano} readOnly={readOnly} />
              <FormInput label="Cutáneo plantar" name="cutaneo_plantar" defaultValue={data?.cutaneo_plantar} readOnly={readOnly} />
            </div>
        </FormSection>

        <FormSection title="Pulsos">
            <FormInput label="Carotídeo" name="pulso_carotideo" defaultValue={data?.pulso_carotideo} readOnly={readOnly} />
            <FormInput label="Radial" name="pulso_radial" defaultValue={data?.pulso_radial} readOnly={readOnly} />
            <FormInput label="Femoral" name="pulso_femoral" defaultValue={data?.pulso_femoral} readOnly={readOnly} />
            <FormInput label="Poplíteo" name="pulso_popliteo" defaultValue={data?.pulso_popliteo} readOnly={readOnly} />
            <FormInput label="Pedio" name="pulso_pedio" defaultValue={data?.pulso_pedio} readOnly={readOnly} />
        </FormSection>

        <FormSection title="Adenopatías">
            <FormInput label="Axilares" name="adeno_axilares" defaultValue={data?.adeno_axilares} readOnly={readOnly} />
            <FormInput label="Inguinales" name="adeno_inguinales" defaultValue={data?.adeno_inguinales} readOnly={readOnly} />
        </FormSection>
    </>
  );
};