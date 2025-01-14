declare type FaculdadesModel = {
    id: string;
    nome: string;
    ativo?: string;
};

declare type CursosModel = {
    id: string;
    nome: string;
    faculdade: FaculdadesModel;
    ativo?: string;
};

declare type DisciplinasModel = {
    id: string;
    codDisciplina: string;
    nome: string;
    curso: CursosModel;
    cargaHoraria: number;
    ementa: string;
    programa: string;
    ativo?: string;
};

declare type UsuariosModel = {
    id: string;
    nome: string;
    email: string;
    faculdade: FaculdadesModel;
    tipo: string;
    ativo?: string;
};