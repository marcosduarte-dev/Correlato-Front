"use client";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon";
import { capitalize } from "@/lib/utils";
import { AnaliseEquivalenciaProps } from "@/types/geral";
import { columnsAnaliseEquivalencias } from "./columns";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useState } from 'react';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "professorResponsavel",
  "disciplinaOrigem",
  "disciplinaDestino",
  "status",
  "aprovado",
];

type Selection = string | Set<any>;

const Data = ({ data }: AnaliseEquivalenciaProps) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columnsAnaliseEquivalencias;

    return columnsAnaliseEquivalencias.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredAnalises = [...data];

    if (hasSearchFilter) {
      filteredAnalises = filteredAnalises.filter((obj) =>
        obj.disciplinaDestino.nome.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== status.length
    ) {
      filteredAnalises = filteredAnalises.filter((analise) =>
        Array.from(statusFilter).includes(String(analise.status))
      );
    }

    return filteredAnalises;
  }, [data, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: AnaliseEquivalenciasModel, b: AnaliseEquivalenciasModel) => {
      let first, second;

      if (sortDescriptor.column === 'disciplinaOrigem') {
          first = a.disciplinaOrigem.nome;
          second = b.disciplinaOrigem.nome;
      } else if (sortDescriptor.column === 'disciplinaDestino') {
          first = a.disciplinaOrigem.nome;
          second = b.disciplinaOrigem.nome;
      } else if (sortDescriptor.column === 'professor') {
          first = a.professorResponsavel.nome;
          second = b.professorResponsavel.nome;
      }
      // else {
      //     first = a[sortDescriptor.column as keyof AnaliseEquivalenciasModel] as number;
      //     second = b[sortDescriptor.column as keyof AnaliseEquivalenciasModel] as number;
      // }

      const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
}, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (analise: AnaliseEquivalenciasModel, columnKey: React.Key) => {
      let cellValue: React.ReactNode = '';

      if (typeof columnKey === 'string') {
        switch (columnKey) {
            case "professorResponsavel":
            cellValue = analise.professorResponsavel.nome ? analise.professorResponsavel.nome : "";
            break;
            case "disciplinaOrigem":
            cellValue = analise.disciplinaOrigem.nome ? analise.disciplinaOrigem.nome + " - " + analise.disciplinaOrigem.curso.faculdade.nome : "";
            break;
            case "disciplinaDestino":
            cellValue = analise.disciplinaDestino.nome ? analise.disciplinaDestino.nome + " - " + analise.disciplinaDestino.curso.faculdade.nome : "";
            break;    
            default:
            const value = analise[columnKey as keyof AnaliseEquivalenciasModel];
            cellValue = value != null ? String(value) : "";
            break;
        }
      }

      switch (columnKey) {
        // case "role":
        //   return (
        //     <div className="flex flex-col">
        //       <p className="text-bold text-small capitalize">{cellValue}</p>
        //       <p className="text-bold text-tiny capitalize text-default-400">
        //         {analise.team}
        //       </p>
        //     </div>
        //   );
        case "status":
          return (
            <Chip
              className="capitalize"
            //   style={{ backgroundColor: analise.status.color }}
              size="sm"
              variant="flat"
            >
              {analise.status}
            </Chip>
          );
        case "aprovado":
          return (
            <Chip
              className="capitalize"
              color={analise.aprovado ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {analise.aprovado ? "APROVADO" : "NÃO APROVADO"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key={"view"}>View</DropdownItem>
                  <DropdownItem key={"edit"}>Edit</DropdownItem>
                  <DropdownItem key={"delete"}>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar pela disciplina destino..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
                color="secondary"
              >
                {status.map((status) => (
                  <DropdownItem key={status.id} className="capitalize">
                    <Chip
                      className="capitalize"
                      style={{ backgroundColor: status.color }}
                      size="sm"
                      variant="flat"
                    >
                      {capitalize(status.status)}
                    </Chip>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsAnaliseEquivalencias.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Novo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data.length} análises
          </span>
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    data.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos items selecionados"
            : `${Array.from(selectedKeys).length} of ${filteredItems.length} selecionado`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Próximo
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage]);

  return (
    <Table
      aria-label="Tabela de Midias"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"Nenhuma análise encontrada"}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Data;