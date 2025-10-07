
import React from 'react';
import { FormSection } from './FormSection';
import { FormInput, TextAreaInput } from './FormInput';

const ExamRow: React.FC<{ area: string }> = ({ area }) => (
    <div className="contents">
        <span className="font-medium text-sm text-gray-700 py-2 border-b border-gray-200">{area}</span>
        <div className="py-2 border-b border-gray-200">
            <input type="text" placeholder="Normal" className="w-full px-2 py-1 border border-gray-300 rounded-md" />
        </div>
        <div className="py-2 border-b border-gray-200">
            <input type="text" placeholder="Patológico" className="w-full px-2 py-1 border border-gray-300 rounded-md" />
        </div>
    </div>
);

const ExamSubheading: React.FC<{ title: string }> = ({ title }) => (
    <h4 className="font-bold text-md text-gray-800 mt-4 col-span-3 bg-gray-100 p-2 rounded-md">{title}</h4>
);

const GradedInput: React.FC<{ label: string; name: string }> = ({ label, name }) => (
  <div className="col-span-1 flex items-center justify-between p-2 border-b">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div className="flex items-center space-x-2">
      {['I', 'II', 'III', 'IV', 'V'].map(grade => (
        <label key={grade} className="flex items-center">
          <input type="radio" name={name} value={grade} className="form-radio h-4 w-4 text-blue-600" />
          <span className="ml-1 text-xs">{grade}</span>
        </label>
      ))}
    </div>
  </div>
);

export const PhysicalExamForm: React.FC = () => {
  return (
    <form>
        <FormSection title="Examen Físico - Datos Básicos">
            <FormInput label="Peso (kg)" name="ex_peso" type="number" />
            <FormInput label="Talla (cm)" name="ex_talla" type="number" />
            <FormInput label="Temperatura (°C)" name="ex_temp" type="number" />
            <FormInput label="Pulso (lpm)" name="ex_pulso" type="number" />
            <FormInput label="Frecuencia Respiratoria (rpm)" name="ex_fr" type="number" />
            <FormInput label="Frecuencia Cardíaca (lpm)" name="ex_fc" type="number" />
            <FormInput label="TA Acostado" name="ta_acostado" />
            <FormInput label="TA Sentado" name="ta_sentado" />
            <FormInput label="TA De pie" name="ta_de_pie" />
            <FormInput label="Perímetro abdominal (cm)" name="per_abdominal" type="number" />
        </FormSection>

        <FormSection title="Condición General y Examen Mental">
            <TextAreaInput label="Examen Mental (hallazgos, historia de pérdidas de memoria, olvidos, desorientación)" name="examen_mental" className="md:col-span-3" />
            <FormInput label="Apariencia" name="apariencia" className="md:col-span-1" />
            <FormInput label="Hidratación" name="hidratacion" className="md:col-span-1" />
            <FormInput label="Piel y anexos" name="piel_anexos" className="md:col-span-1" />
        </FormSection>

        <div className="border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-700 border-b border-gray-200 pb-3 mb-6">Examen por Áreas</h3>
            <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[200px_1fr_1fr] gap-x-4 items-center">
                <div className="font-semibold text-left pb-2 border-b-2 col-span-1">Área del Cuerpo</div>
                <div className="font-semibold text-left pb-2 border-b-2 col-span-1 hidden sm:block">Normal</div>
                <div className="font-semibold text-left pb-2 border-b-2 col-span-1 hidden sm:block">Patológico</div>

                <ExamRow area="Cabeza" />
                
                <ExamSubheading title="Ojos" />
                <ExamRow area="Fondo de ojo" />
                <ExamRow area="Conjuntivas" />
                <ExamRow area="Pupilas" />
                <ExamRow area="Lagrimeo" />
                <ExamRow area="Párpados" />

                <ExamSubheading title="Nariz" />
                <ExamRow area="Mucosa/septum" />
                
                <ExamSubheading title="Boca" />
                <ExamRow area="Labios" />
                <ExamRow area="Lengua" />
                <ExamRow area="Encías" />
                <ExamRow area="Orofaringe" />
                <ExamRow area="Dentadura" />
                
                <ExamSubheading title="Oídos" />
                <ExamRow area="Pabellón auricular" />
                <ExamRow area="Cond. Auditivo Ext." />
                
                <ExamSubheading title="Cuello" />
                <ExamRow area="Movs. Laterales" />
                <ExamRow area="Pulso carotídeo" />
                <ExamRow area="Tiroides" />
                <ExamRow area="Injurgitación yugular" />
                <ExamRow area="Reflujo H-Y" />
                
                <ExamSubheading title="Tórax" />
                <ExamRow area="Insp. Gral" />
                <ExamRow area="Mamas" />
                <ExamRow area="Ausc.Pulmonar" />
                <ExamRow area="Percusión Pulmonar" />
                <ExamRow area="Ruidos Cardiacos" />
                <ExamRow area="Choque de la punta" />
                <ExamRow area="Ritmo" />
                <ExamRow area="Soplos" />
                
                <ExamSubheading title="Abdomen" />
                <ExamRow area="Insp. gral." />
                <ExamRow area="Palpación hígado" />
                <ExamRow area="Palpación bazo" />
                <ExamRow area="Latido aortico" />
                <ExamRow area="Auscultación" />
                <ExamRow area="Percusión" />
                <ExamRow area="Hernias" />
                <ExamRow area="Cicatrices" />
                
                <ExamSubheading title="Genito Urinario y Rectal" />
                <ExamRow area="Gen. Externos" />
                <ExamRow area="T. vaginal" />
                <ExamRow area="T. rectal" />
                <ExamRow area="Ex. Próstata" />
            </div>
        </div>

        <FormSection title="Examen Musculoesquelético">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Cuello" name="ms_cuello" />
                <FormInput label="Hombros" name="ms_hombros" />
                <FormInput label="Pelvis" name="ms_pelvis" />
                <FormInput label="Columna torácica" name="ms_col_toracica" />
                <FormInput label="Columna lumbar" name="ms_col_lumbar" />
                <FormInput label="Rodillas" name="ms_rodillas" />
                <FormInput label="Tobillos" name="ms_tobillos" />
                <FormInput label="Manos" name="ms_manos" />
                <FormInput label="Pies" name="ms_pies" />
            </div>
        </FormSection>

        <FormSection title="Sistema Locomotor">
            <FormInput label="Movilidad articular" name="sl_movilidad" />
            <FormInput label="Fuerza muscular" name="sl_fuerza" />
            <FormInput label="Forma articular" name="sl_forma" />
            <FormInput label="Marcha" name="sl_marcha" />
        </FormSection>

        <FormSection title="Examen Neurológico">
             <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <FormInput label="Estado de conciencia" name="conciencia" />
                <FormInput label="Sensibilidad" name="sensibilidad" />
                <FormInput label="Motilidad" name="motilidad" />
                <FormInput label="Pares craneales" name="pares_craneales" />
                <FormInput label="Coordinación" name="coordinacion" />
                <FormInput label="Movimientos anormales" name="mov_anormales" />
                <GradedInput label="Fuerza Muscular" name="fuerza_muscular" />
                <GradedInput label="Tono Muscular" name="tono_muscular" />
             </div>
        </FormSection>
        
        <FormSection title="ROTS (Reflejos Osteotendinosos)">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <GradedInput label="Bicipital" name="rots_bicipital" />
              <GradedInput label="Rotuliano" name="rots_rotuliano" />
              <GradedInput label="Aquiliano" name="rots_aquiliano" />
              <FormInput label="Cutáneo plantar" name="cutaneo_plantar" />
            </div>
        </FormSection>

        <FormSection title="Pulsos">
            <FormInput label="Carotídeo" name="pulso_carotideo" />
            <FormInput label="Radial" name="pulso_radial" />
            <FormInput label="Femoral" name="pulso_femoral" />
            <FormInput label="Poplíteo" name="pulso_popliteo" />
            <FormInput label="Pedio" name="pulso_pedio" />
        </FormSection>

        <FormSection title="Adenopatías">
            <FormInput label="Axilares" name="adeno_axilares" />
            <FormInput label="Inguinales" name="adeno_inguinales" />
        </FormSection>
    </form>
  );
};
