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