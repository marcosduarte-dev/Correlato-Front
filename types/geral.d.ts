declare type Collumns = {
    title: string;
    dataIndex: string;
    key: string;
  };
  
  declare type DataTableProps = {
    columns: Collumns[];
    data: any[];
    onEdit: Function;
    onDelete: Function;
  };
  
  declare type AnaliseEquivalenciaProps = {
    data: AnaliseEquivalenciasModel[];
  };
  
  export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };

  declare type disciplinaOrigem = {
    faculdade: number;
    curso: number;
    disciplina: number;
  };

  declare type disciplinaDestino = {
    faculdade: number;
    curso: number;
    disciplina: number;
  };