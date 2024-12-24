"use client";

import { DataTableProps } from "@/types/geral";
import {
  Chip,
  ChipProps,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { DeleteIcon } from "../public/DeleteIcon";
import { EditIcon } from "../public/EditIcon";
import { useToast } from "./ui/use-toast";
import { useAsyncList } from "@react-stately/data";


const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

const DataTable = ({ columns, data, onEdit, onDelete }: DataTableProps) => {
  const [editId, setEditId] = React.useState();
  const [deleteId, setDeleteId] = React.useState();

  const [isLoading, setIsLoading] = React.useState(true);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const { toast } = useToast();

  const renderCell = React.useCallback((obj: any, columnKey: React.Key) => {
    const cellValue = obj[columnKey as keyof any];

    switch (columnKey) {
      case "ativo":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[obj.ativo]}
            size="sm"
            variant="flat"
          >
            {cellValue ? "Ativo" : "Inativo"}
          </Chip>
        );
      case "color":
        return (
          <Chip
            className="capitalize"
            style={{ backgroundColor: obj.color }}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "ações":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            {/* <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip> */}
            <Tooltip color="secondary" content="Editar">
              <span
                onClick={() => setEditId(obj)}
                className="text-lg cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Deletar">
              <span
                onClick={() => setDeleteId(obj.id)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  useEffect(() => {
    if (editId) onEdit(editId);
    setEditId(undefined);
  }, [onEdit, editId]);

  useEffect(() => {
    if (deleteId) onDelete(deleteId);
    setDeleteId(undefined);
  }, [onDelete, deleteId]);

  useEffect(() => {
    if (data.length === 0) {
      toast({
        title: "Erro",
        description: "Houve um problema em listar os dados",
      });
    }
  }, []);

  let list = useAsyncList({
    async load() {
      setIsLoading(false);

      return {
        items: data
      };
    },
    async sort({items, sortDescriptor}) {
      return {
        items: items.sort((a: any, b: any) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.items.slice(start, end);
  }, [page, list.items]);

  return (
    <Table selectionMode="single" aria-label="dados"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination  
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "ações" ? "center" : "start"}
            allowsSorting={column.key !== "ações"}
          >
            {column.title}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={items} isLoading={isLoading}>
        {(item) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell align="center">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;