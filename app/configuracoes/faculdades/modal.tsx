"use client";

import React, { useState } from "react";

import { columns } from "./columns";
import DataTable from "@/components/data-table";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  create,
  deleteEntity,
  edit,
} from "@/service/actions/faculdades-service";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ColorPicker } from "antd";

const TiposModal = ({ data }: { data: FaculdadesModel[] }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [entity, setEntity] = useState({} as FaculdadesModel);

  const { toast } = useToast();
  const router = useRouter();

  const handleEditId = (key: any) => {
    setEntity(key);
    onOpen();
  };
  const handleDeleteId = async (key: any) => {
    const result = await deleteEntity(key);

    if (result.id == undefined || result.statusCode == 400) {
      toast({
        title: "Erro!",
        description: "Não foi possivel deletar!",
        duration: 3000,
      });
    } else {
      router.refresh();
      toast({
        title: "Sucesso!",
        description: "Faculdade Deletada!",
        duration: 3000,
      });
    }
  };

  const handleSave = async () => {
    let result;

    if (entity.id) {
      result = await edit(entity);
    } else {
      result = await create(entity);
    }

    if (result.id == undefined || result.statusCode == 400) {
      toast({
        title: "Erro!",
        description: "Não foi possivel salvar!",
        duration: 3000,
      });
      setEntity({} as FaculdadesModel)
    } else {
      router.refresh();
      toast({
        title: "Sucesso!",
        description: "Faculdade Salva!",
        duration: 3000,
      });
      setEntity({} as FaculdadesModel)
    }
    onOpenChange();
  };

  return (
    <main className="flex flex-col gap-3">
      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEditId}
        onDelete={handleDeleteId}
      />
      <div className="flex justify-end">
        <Button color="secondary" onPress={onOpen}>
          Novo
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
        onClose={() => setEntity({} as FaculdadesModel)}
        classNames={{
          body: "py-6",
          backdrop: "bg-[#0b101f]/50 backdrop-opacity-40",
          base: "border-[#0b101f] bg-[#18181b] dark:bg-[#18181b] text-[#FFFFFF]",
          header: "border-b-[1px] border-[#0b101f]",
          footer: "border-t-[1px] border-[#0b101f]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {entity.id ? "Editar Faculdade" : "Nova Faculdade"}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Faculdade"
                  placeholder="Digite o nome da faculdade"
                  variant="bordered"
                  value={entity.nome}
                  onChange={(e) => setEntity({ ...entity, nome: e.target.value })}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="secondary" onPress={() => handleSave()}>
                  {entity.id ? "Editar" : "Criar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
};

export default TiposModal;