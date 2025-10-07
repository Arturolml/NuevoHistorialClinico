
// --- DATA TYPES ---

export interface User {
    id: string;
    name: string;
    passwordHash: string; // In a real app, never store plain text passwords
    role: 'doctor';
}

export interface PatientDemographics {
    nombre: string;
    apellidos: string;
    edad: number;
    genero: string;
    fecha_nacimiento: string;
    lugar_nacimiento: string;
    residencia: string;
    estado_civil: string;
    telefono: string;
    escolaridad: string;
    ocupacion: string;
    religion: string;
    record_numero: string;
    registro_geriatria: string;
    vive_con: string;
    cuidador_primario: string;
    red_apoyo: string;
    zarit: string;
    informado_por: string;
}

export interface PatientHistory {
    nonPathological: {
        tabaquismo: { value: 'si' | 'no', description?: string };
        alcoholismo: { value: 'si' | 'no', description?: string };
        biomasa: { value: 'si' | 'no', description?: string };
        exposicion_laboral: { value: 'si' | 'no', description?: string };
        inmunizaciones: string;
        suplementacion: string;
    };
    pathological: {
        hipertension: { value: 'si' | 'no', description?: string };
        diabetes: { value: 'si' | 'no', description?: string };
        distiroidismo: { value: 'si' | 'no', description?: string };
        alergias: { value: 'si' | 'no', description?: string };
        epoc: { value: 'si' | 'no', description?: string };
        transfusiones: { value: 'si' | 'no', description?: string };
        cirugias: { value: 'si' | 'no', description?: string };
        cardiovasculares: string;
        hospitalizaciones: string;
        traumaticos: string;
        otros: string;
    };
    family: {
        madre_info: string;
        padre_info: string;
        hermanos_info: string;
        hijos_info: string;
        neuro_psi: string;
    };
}

export interface Consultation {
    id: string;
    patientId: string;
    date: string;
    motivo_consulta: string;
    desarrollo_consulta: string;
    // ... add all other consultation and exam fields
}

export interface Patient {
    id: string;
    doctorId: string;
    demographics: PatientDemographics;
    history: PatientHistory;
}


// --- MOCK DATABASE ---

const users: User[] = [
    { id: 'doc1', name: 'Dr. House', passwordHash: 'password', role: 'doctor' }
];

const patients: Patient[] = [
    {
        id: 'p1',
        doctorId: 'doc1',
        demographics: {
            nombre: 'Juan',
            apellidos: 'Pérez García',
            edad: 78,
            genero: 'Masculino',
            fecha_nacimiento: '1946-03-15',
            lugar_nacimiento: 'Ciudad de México',
            residencia: 'Calle Falsa 123, CDMX',
            estado_civil: 'Viudo',
            telefono: '55-1234-5678',
            escolaridad: 'Primaria',
            ocupacion: 'Jubilado',
            religion: 'Católica',
            record_numero: 'REC-001',
            registro_geriatria: 'GER-001',
            vive_con: 'Hija',
            cuidador_primario: 'Hija (Ana Pérez)',
            red_apoyo: 'Familia',
            zarit: '25',
            informado_por: 'Paciente y Familiar',
        },
        history: {
            nonPathological: {
                tabaquismo: { value: 'no' },
                alcoholismo: { value: 'si', description: 'Socialmente, 1 vez por semana' },
                biomasa: { value: 'no' },
                exposicion_laboral: { value: 'no' },
                inmunizaciones: 'Completas',
                suplementacion: 'Calcio y Vitamina D',
            },
            pathological: {
                hipertension: { value: 'si', description: 'Controlada con Losartán' },
                diabetes: { value: 'si', description: 'Tipo II, controlada con Metformina' },
                distiroidismo: { value: 'no' },
                alergias: { value: 'no' },
                epoc: { value: 'no' },
                transfusiones: { value: 'no' },
                cirugias: { value: 'si', description: 'Apendicectomía en 1985' },
                cardiovasculares: 'Ninguno relevante',
                hospitalizaciones: 'Neumonía en 2020',
                traumaticos: 'Caída con fractura de muñeca en 2022',
                otros: 'Hiperplasia prostática benigna',
            },
            family: {
                madre_info: 'Finada a los 85 años, Cáncer',
                padre_info: 'Finado a los 80 años, Infarto',
                hermanos_info: '1 hermano vivo, sano. 1 hermana finada, diabetes.',
                hijos_info: '2 hijos vivos, sanos.',
                neuro_psi: 'Ninguno',
            },
        }
    }
];

const consultations: Consultation[] = [
    {
        id: 'c1',
        patientId: 'p1',
        date: '2024-05-10T10:00:00Z',
        motivo_consulta: 'Seguimiento de control de hipertensión y diabetes.',
        desarrollo_consulta: 'El paciente refiere sentirse bien, sin síntomas nuevos. Adherencia al tratamiento adecuada.',
    },
    {
        id: 'c2',
        patientId: 'p1',
        date: '2024-07-22T11:30:00Z',
        motivo_consulta: 'Dolor en rodilla derecha.',
        desarrollo_consulta: 'Inició hace 2 semanas, empeora al caminar. Se sospecha de osteoartritis. Se solicitan radiografías.',
    }
];

// --- MOCK API FUNCTIONS ---

export const api = {
    login: async (name: string, password_not_hashed: string): Promise<User | null> => {
        await new Promise(res => setTimeout(res, 500)); // Simulate network delay
        const user = users.find(u => u.name === name);
        if (user && user.passwordHash === password_not_hashed) {
            return user;
        }
        return null;
    },

    getPatientsByDoctorId: async (doctorId: string): Promise<Patient[]> => {
        await new Promise(res => setTimeout(res, 500));
        return patients.filter(p => p.doctorId === doctorId);
    },

    getConsultationsByPatientId: async (patientId: string): Promise<Consultation[]> => {
        await new Promise(res => setTimeout(res, 500));
        return consultations.filter(c => c.patientId === patientId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    
    addPatient: async (patientData: Omit<Patient, 'id'>): Promise<Patient> => {
        await new Promise(res => setTimeout(res, 500));
        const newPatient: Patient = {
            id: `p${patients.length + 1}`,
            ...patientData
        };
        patients.push(newPatient);
        return newPatient;
    },

    addConsultation: async (consultationData: Omit<Consultation, 'id'>): Promise<Consultation> => {
        await new Promise(res => setTimeout(res, 500));
        const newConsultation: Consultation = {
            id: `c${consultations.length + 1}`,
            ...consultationData
        };
        consultations.push(newConsultation);
        return newConsultation;
    }
};
