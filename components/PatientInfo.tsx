
import React from 'react';
import { Patient } from '../services/mock-db';
import { IdentificationForm } from './IdentificationForm';
import { HistoryForm } from './HistoryForm';
import { GeriatricSyndromesForm } from './GeriatricSyndromesForm';

interface PatientInfoProps {
    patient: Patient;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
    return (
        <div>
            <IdentificationForm patient={patient.demographics} readOnly={true} />
            <HistoryForm history={patient.history} readOnly={true} />
            {/* The syndromes form would also need to be adapted to be read-only with default values if it were part of the static record */}
            <GeriatricSyndromesForm /> 
        </div>
    );
};
