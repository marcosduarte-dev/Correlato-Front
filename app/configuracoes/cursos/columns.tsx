import { Collumns } from "@/types/geral";

export const columns: Collumns[] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Curso",
    dataIndex: "nome",
    key: "nome",
  },
  {
    title: "Faculdade",
    dataIndex: "faculdade.nome",
    key: "faculdade.nome"
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