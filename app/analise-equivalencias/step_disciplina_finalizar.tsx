"use client";

import { useToast } from "@/components/ui/use-toast";
import { create, getByProfessorByFaculdadeId } from "@/service/actions/usuarios-service";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea, useDisclosure } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function getProfessorsData(id: String): Promise<UsuariosModel[]> {
    return await getByProfessorByFaculdadeId(id);
}

const StepFinalizar = ({ professorResponsavel, setProfessorResponsavel, idFaculdadeSelecionada }: { professorResponsavel: String, setProfessorResponsavel: any, idFaculdadeSelecionada: Number }) => {

    const [professorSelecionada, setProfessorSelecionada] = useState<String>();
    const [professorsData, setProfessorsData] = useState<UsuariosModel[]>([]);

    const { isOpen: isOpenProfessor, onOpen: onOpenProfessor, onOpenChange: onOpenChangeProfessor } = useDisclosure();
    const [professorEntity, setProfessorEntity] = useState({} as UsuariosModel);
    const [isRequesting, setIsRequesting] = useState(true);

    const { toast } = useToast();
    const router = useRouter();
    
      const handleProfessorChange = (e: String) => {
        setProfessorResponsavel((prevProfessorResponsavel: any) => (prevProfessorResponsavel = e));
      };

    const fetchProfessors = async (isMounted: boolean, closeModal: boolean = false) => {
        try {
            if (professorsData.length == 0 || closeModal) {
                const professors = await getProfessorsData(idFaculdadeSelecionada.toString());
                if (isMounted) {
                    setProfessorsData(professors);
                }
            } else {
                setProfessorsData([]);
            }
        } catch (error) {
            console.error('Erro ao buscar Professors:', error);
            if (isMounted) {
                setProfessorsData([]);
            }
        } finally {
            setIsRequesting(false);
        }
    }

    useEffect(() => {
        let isMounted = true;

        setIsRequesting(true);

        fetchProfessors(isMounted);

        if (professorResponsavel != null && professorResponsavel != undefined) {
            setProfessorSelecionada(professorResponsavel);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSaveProfessor = async () => {
        let result;

        result = await create(professorEntity);

        if (result.id == undefined || result.statusCode == 400) {
            toast({
                title: "Erro!",
                description: "Não foi possivel salvar!",
                duration: 3000,
            });
            setProfessorEntity({} as UsuariosModel)
        } else {
            router.refresh();
            toast({
                title: "Sucesso!",
                description: "Professor Salva!",
                duration: 3000,
            });
            setProfessorEntity({} as UsuariosModel)
        }
        fetchProfessors(true, true);
        onOpenChangeProfessor();
    };

    return (
        <>
            {isRequesting && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
            <Spinner 
                size="lg"
                color="default"
                label="Carregando..."
            />
            </div>
        )}

            <div className="flex flex-col gap-4 mt-4">
                <span className="text-default-400 text-small">
                    Selecione o professor responsável pela disciplina
                </span>
                <div className="flex items-center gap-2 p-2">
                    <Select
                        label="Selecione um professor"
                        onChange={(e) => {
                            setProfessorSelecionada(e.target.value)
                            handleProfessorChange(e.target.value);
                        }}
                        selectedKeys={professorSelecionada ? [professorSelecionada.toString()] : []}
                        className="flex-1"
                    >
                        {professorsData.map((professor) => (
                            <SelectItem key={professor.id}>{professor.nome}</SelectItem>
                        ))}
                    </Select>
                    {/* <Button
                        onPress={onOpenProfessor}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                        isIconOnly
                    >
                        <Plus className="h-5 w-5" />
                    </Button> */}
                </div>
            </div>

            {/* Modal Professor */}

            <Modal
                isOpen={isOpenProfessor}
                onOpenChange={onOpenChangeProfessor}
                isDismissable={false}
                placement="top-center"
                onClose={() => {
                    setProfessorEntity({} as UsuariosModel)
                    fetchProfessors(true, true);
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
                                {"Nova Professor"}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Professor"
                                    placeholder="Digite o nome da professor"
                                    variant="bordered"
                                    value={professorEntity.nome}
                                    onChange={(e) => setProfessorEntity({ ...professorEntity, nome: e.target.value })}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="secondary" onPress={() => handleSaveProfessor()}>
                                    {professorEntity.id ? "Editar" : "Criar"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default StepFinalizar;