"use client";

import React, { useEffect, useState } from "react";

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
  Select,
  SelectItem,
  Spinner,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import {
  create,
  deleteEntity,
  edit,
} from "@/service/actions/disciplinas-service";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { getByFaculdade } from "@/service/actions/cursos-service";

async function getCursosData(id: any): Promise<CursosModel[]> {
  return await getByFaculdade(id);
}

const DisciplinasModal = ({ data, faculdades }: { data: DisciplinasModel[], faculdades: FaculdadesModel[] }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [entity, setEntity] = useState({} as DisciplinasModel);
  const [faculdadeSelecionada, setFaculdadeSelecionada] = useState<number>();
  const [cursosData, setCursosData] = useState<CursosModel[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    setIsRequesting(true);

    const fetchCursos = async () => {
      try {
        if (faculdadeSelecionada) {
          const cursos = await getCursosData(faculdadeSelecionada);
          if (isMounted) {
            setCursosData(cursos);
          }
        } else {
          setCursosData([]);
        }
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        if (isMounted) {
          setCursosData([]);
        }
      } finally {
        setIsRequesting(false);
      }
    };

    fetchCursos();

    return () => {
      isMounted = false;
    };
}, [faculdadeSelecionada]);

  const handleEditId = (key: any) => {
    setEntity(key);
    setFaculdadeSelecionada(key.curso.faculdade.id.toString());
    setEditMode(true);
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
        description: "Disciplina Deletada!",
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
      setEntity({} as DisciplinasModel)
    } else {
      router.refresh();
      toast({
        title: "Sucesso!",
        description: "Disciplina Salva!",
        duration: 3000,
      });
      setEntity({} as DisciplinasModel)
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
        onClose={() => {
          setEntity({} as DisciplinasModel)
          setFaculdadeSelecionada(undefined);
          setEditMode(false);
          setCursosData([]);
        }}
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
                {entity.id ? "Editar Disciplina" : "Nova Disciplina"}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Disciplina"
                  placeholder="Digite o nome da disciplina"
                  variant="bordered"
                  value={entity.nome}
                  onChange={(e) => setEntity({ ...entity, nome: e.target.value })}
                />
                <Input
                  label="Código"
                  placeholder="Digite o código da disciplina"
                  variant="bordered"
                  value={entity.codDisciplina}
                  onChange={(e) => setEntity({ ...entity, codDisciplina: e.target.value })}
                />
                <Select 
                  label="Selecione uma faculdade"
                  onChange={(e) => setFaculdadeSelecionada(Number(e.target.value))}
                  selectedKeys={faculdadeSelecionada ? [faculdadeSelecionada.toString()] : []}
                >
                  {faculdades.map((faculdade) => (
                    <SelectItem key={faculdade.id}>{faculdade.nome}</SelectItem>
                  ))}
                </Select>
                <Select 
                  label="Selecione um curso"
                  onChange={(e) => setEntity({ ...entity, curso: {
                    id: e.target.value, nome: e.target.value,
                    faculdade: {
                      id: "",
                      nome: "",
                      ativo: undefined
                    }
                  } })}
                  selectedKeys={entity.curso ? [entity.curso.id.toString()] : []}
                >
                  {cursosData.map((cursos) => (
                    <SelectItem key={cursos.id}>{cursos.nome}</SelectItem>
                  ))}
                </Select>
                <Input
                  label="Carga Horária"
                  placeholder="Digite a carga horária"
                  variant="bordered"
                  value={entity.cargaHoraria ? entity.cargaHoraria.toString(): ""}
                  onChange={(e) => setEntity({ ...entity, cargaHoraria: Number(e.target.value) })}
                  type="number"
                />
                <Textarea 
                  label="Ementa" 
                  placeholder="Digite a ementa" 
                  variant="bordered" 
                  value={entity.ementa ? entity.ementa : ""} 
                  onChange={(e) => setEntity({ ...entity, ementa: e.target.value })} 
                />
                <Textarea
                  label="Programa"
                  placeholder="Digite o programa"
                  variant="bordered"
                  value={entity.programa ? entity.programa : ""}
                  onChange={(e) => setEntity({ ...entity, programa: e.target.value })}
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

      {isRequesting && (editMode || faculdadeSelecionada) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <Spinner 
            size="lg"
            color="default"
            label="Carregando..."
          />
        </div>
      )}
    </main>
  );
};

export default DisciplinasModal;