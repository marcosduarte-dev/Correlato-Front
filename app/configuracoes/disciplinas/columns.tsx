import { Collumns } from "@/types/geral";

export const columns: Collumns[] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Código",
    dataIndex: "codDisciplina",
    key: "codDisciplina",
  },
  {
    title: "Disciplinas",
    dataIndex: "nome",
    key: "nome",
  },
  {
    title: "Faculdade",
    dataIndex: "curso.faculdade.nome",
    key: "curso.faculdade.nome"
  },
  {
    title: "Curso",
    dataIndex: "curso.nome",
    key: "curso.nome"
  },
  {
    title: "Carga Horária",
    dataIndex: "cargaHoraria",
    key: "cargaHoraria"
  },
  {
    title: "Ativo",
    dataIndex: "ativo",
    key: "ativo",
  },
  {
    title: "Ações",
    dataIndex: "ações",
    key: "ações",
  },
];