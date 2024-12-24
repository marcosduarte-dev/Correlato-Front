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
  
  declare type HomePageProps = {
    status: StatusModel[];
    data: RegistroModel[];
  };
  
  export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };