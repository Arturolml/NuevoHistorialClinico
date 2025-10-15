// --- DATA TYPES ---

export interface User {
    id: string;
    name: string;
    email?: string;
    passwordHash: string; // In a real app, never store plain text passwords
    role: 'doctor' | 'admin';
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

export interface PatientSyndromes {
    hist_caidas: 'si' | 'no';
    deficit_visual: 'si' | 'no';
    deficit_auditivo: 'si' | 'no';
    patologia_dental: 'si' | 'no';
    incon_urinaria: 'si' | 'no';
    incon_fecal: 'si' | 'no';
    estrenimiento: 'si' | 'no';
    depresion: 'si' | 'no';
    demencia: 'si' | 'no';
    sd_confusional: 'si' | 'no';
    inmovilismo: 'si' | 'no';
    ulceras: 'si' | 'no';
    polifarmacia: 'si' | 'no';
    queja_memoria: 'si' | 'no';
    osteoporosis: 'si' | 'no';
    func_antes: number;
    func_ingreso: number;
    psi_antes: number;
    psi_ingreso: number;
    peso_actual: number;
    peso_ideal: number;
    peso_diferencia: string;
}


export interface Consultation {
    id: string;
    patientId: string;
    date: string;
    motivo_consulta: string;
    desarrollo_consulta: string;
    data: any; // Holds a snapshot of all form fields for this consultation
}

export interface Patient {
    id: string;
    doctorId: string;
    demographics: PatientDemographics;
    history: PatientHistory;
    syndromes: PatientSyndromes;
}


// --- MOCK DATABASE ---

const users: User[] = [
    { id: 'admin1', name: 'Admin', passwordHash: 'admin', role: 'admin' },
    { id: 'doc1', name: 'Dr. House', email: 'house@example.com', passwordHash: 'password', role: 'doctor' }
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
        },
        syndromes: {
            hist_caidas: 'si',
            deficit_visual: 'si',
            deficit_auditivo: 'no',
            patologia_dental: 'si',
            incon_urinaria: 'no',
            incon_fecal: 'no',
            estrenimiento: 'si',
            depresion: 'no',
            demencia: 'no',
            sd_confusional: 'no',
            inmovilismo: 'no',
            ulceras: 'no',
            polifarmacia: 'si',
            queja_memoria: 'si',
            osteoporosis: 'no',
            func_antes: 3,
            func_ingreso: 2,
            psi_antes: 1,
            psi_ingreso: 1,
            peso_actual: 75,
            peso_ideal: 70,
            peso_diferencia: '+7%',
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
        data: {
            ex_peso: 75,
            ex_talla: 170,
            ex_temp: 36.5,
            ex_pulso: 70,
            ex_fr: 18,
            ex_fc: 70,
            ta_acostado: "120/80",
            ta_sentado: "125/82",
            ta_de_pie: "122/81",
            apariencia: "Buen estado general",
            hidratacion: "Adecuada",
            cabeza_normal: "Normocéfalo, sin hundimientos ni exostosis.",
            cabeza_pathological: "",
            // ... more sample data
        }
    },
    {
        id: 'c2',
        patientId: 'p1',
        date: '2024-07-22T11:30:00Z',
        motivo_consulta: 'Dolor en rodilla derecha.',
        desarrollo_consulta: 'Inició hace 2 semanas, empeora al caminar. Se sospecha de osteoartritis. Se solicitan radiografías.',
        data: {
            ex_peso: 75.5,
            ex_talla: 170,
            ex_temp: 36.6,
            ex_pulso: 72,
            ex_fr: 16,
            ex_fc: 72,
            ta_acostado: "122/80",
            ta_sentado: "128/85",
            ta_de_pie: "125/83",
            apariencia: "Adolorido, claudica al caminar",
            hidratacion: "Adecuada",
            ms_rodillas: "Dolor a la palpación en rodilla derecha, crepitación.",
            // ... more sample data
        }
    }
];

// --- MOCK API FUNCTIONS ---

export const api = {
    login: async (credential: string, password_not_hashed: string): Promise<User | null> => {
        await new Promise(res => setTimeout(res, 500)); // Simulate network delay
        const user = users.find(u =>
            (u.role === 'admin' && u.name.toLowerCase() === credential.toLowerCase()) ||
            (u.role === 'doctor' && u.email?.toLowerCase() === credential.toLowerCase())
        );
        if (user && user.passwordHash === password_not_hashed) {
            return user;
        }
        return null;
    },

    getDoctors: async (): Promise<User[]> => {
        await new Promise(res => setTimeout(res, 300));
        return users.filter(u => u.role === 'doctor');
    },

    addUser: async (userData: Omit<User, 'id'>): Promise<User> => {
        await new Promise(res => setTimeout(res, 500));
        const newUser: User = {
            id: `user${users.length + 1}`,
            ...userData,
        };
        users.push(newUser);
        return newUser;
    },
    
    updateUser: async (userId: string, updates: Partial<Omit<User, 'id'>>): Promise<User | null> => {
        await new Promise(res => setTimeout(res, 500));
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            // In a real app, you'd be careful about merging properties.
            // Here, we're just updating the whole user object.
            users[userIndex] = { ...users[userIndex], ...updates };
            return users[userIndex];
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

    addConsultation: async (consultationData: Omit<Consultation, 'id' | 'data'> & { data: any }): Promise<Consultation> => {
        await new Promise(res => setTimeout(res, 500));
        const newConsultation: Consultation = {
            id: `c${consultations.length + 1}`,
            ...consultationData
        };
        consultations.push(newConsultation);
        return newConsultation;
    }
};