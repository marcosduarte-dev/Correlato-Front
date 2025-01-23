"use client";

import { useToast } from "@/components/ui/use-toast";
import { getByFaculdade } from "@/service/actions/cursos-service";
import { getByCurso } from "@/service/actions/disciplinas-service";
import { create, getAtivos } from "@/service/actions/faculdades-service";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea, useDisclosure } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { create as createCurso } from "@/service/actions/cursos-service"
import { create as createDisciplina } from "@/service/actions/disciplinas-service"
import { disciplinaOrigem } from "@/types/geral";

async function getFaculdadesData(): Promise<CursosModel[]> {
    return await getAtivos();
}

async function getCursosData(id: any): Promise<CursosModel[]> {
    return await getByFaculdade(id);
}

async function getDisciplinasData(id: any): Promise<DisciplinasModel[]> {
    return await getByCurso(id);
}

const StepDisciplinaOrigem = ({ disciplinaOrigem, setDisciplinaOrigem }: { disciplinaOrigem: disciplinaOrigem, setDisciplinaOrigem: any}) => {

    const [faculdadeSelecionada, setFaculdadeSelecionada] = useState<number>();
    const [faculdadesData, setFaculdadesData] = useState<FaculdadesModel[]>([]);

    const { isOpen: isOpenFaculdade, onOpen: onOpenFaculdade, onOpenChange: onOpenChangeFaculdade } = useDisclosure();
    const [faculdadeEntity, setFaculdadeEntity] = useState({} as FaculdadesModel);

    const [cursoSelecionado, setCursoSelecionado] = useState<number>();
    const [cursosData, setCursosData] = useState<CursosModel[]>([]);

    const { isOpen: isOpenCurso, onOpen: onOpenCurso, onOpenChange: onOpenChangeCurso } = useDisclosure();
    const [cursoEntity, setCursoEntity] = useState({} as CursosModel);

    const [disciplinaSelecionado, setDisciplinaSelecionado] = useState<number>();
    const [disciplinasData, setDisciplinasData] = useState<DisciplinasModel[]>([]);

    const { isOpen: isOpenDisciplina, onOpen: onOpenDisciplina, onOpenChange: onOpenChangeDisciplina } = useDisclosure();
    const [disciplinaEntity, setDisciplinaEntity] = useState({} as DisciplinasModel);

    const [isRequesting, setIsRequesting] = useState(true);

    const { toast } = useToast();
    const router = useRouter();

    const handleFaculdadeChange = (e: number) => {
        setDisciplinaOrigem((prevDisciplinaOrigem: any) => ({
          ...prevDisciplinaOrigem,
          faculdade: e,
        }));
      };
    
      const handleCursoChange = (e: number) => {
        setDisciplinaOrigem((prevDisciplinaOrigem: any) => ({
          ...prevDisciplinaOrigem,
          curso: e,
        }));
      };
    
      const handleDisciplinaChange = (e: number) => {
        setDisciplinaOrigem((prevDisciplinaOrigem: any) => ({
          ...prevDisciplinaOrigem,
          disciplina: e,
        }));
      };

    const fetchFaculdades = async (isMounted: boolean, closeModal: boolean = false) => {
        try {
            if (faculdadesData.length == 0 || closeModal) {
                const faculdades = await getFaculdadesData();
                if (isMounted) {
                    setFaculdadesData(faculdades);
                }
            } else {
                setFaculdadesData([]);
            }
        } catch (error) {
            console.error('Erro ao buscar Faculdades:', error);
            if (isMounted) {
                setFaculdadesData([]);
            }
        } finally {
            setIsRequesting(false);
        }
    };

    const fetchCursos = async (isMounted: boolean, closeModal: boolean = false) => {
        try {
            if (faculdadeSelecionada || closeModal) {
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

    const fetchDisciplinas = async (isMounted: boolean, closeModal: boolean = false) => {
        try {
            if (cursoSelecionado || closeModal) {
                const disciplinas = await getDisciplinasData(cursoSelecionado);
                if (isMounted) {
                    setDisciplinasData(disciplinas);
                }
            } else {
                setDisciplinasData([]);
            }
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error);
            if (isMounted) {
                setDisciplinasData([]);
            }
        } finally {
            setIsRequesting(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        setIsRequesting(true);

        fetchFaculdades(isMounted);

        if (disciplinaOrigem.faculdade) {
            setFaculdadeSelecionada(disciplinaOrigem.faculdade);
        }
        if (disciplinaOrigem.curso) {
            setCursoSelecionado(disciplinaOrigem.curso);
        }
        if (disciplinaOrigem.disciplina) {
            setDisciplinaSelecionado(disciplinaOrigem.disciplina);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        setIsRequesting(true);

        fetchCursos(isMounted);

        return () => {
            isMounted = false;
        };
    }, [faculdadeSelecionada]);

    useEffect(() => {
        let isMounted = true;

        setIsRequesting(true);

        fetchDisciplinas(isMounted);

        return () => {
            isMounted = false;
        };
    }, [cursoSelecionado]);

    const handleSaveFaculdade = async () => {
        let result;

        result = await create(faculdadeEntity);

        if (result.id == undefined || result.statusCode == 400) {
            toast({
                title: "Erro!",
                description: "Não foi possivel salvar!",
                duration: 3000,
            });
            setFaculdadeEntity({} as FaculdadesModel)
        } else {
            router.refresh();
            toast({
                title: "Sucesso!",
                description: "Faculdade Salva!",
                duration: 3000,
            });
            setFaculdadeEntity({} as FaculdadesModel)
        }
        fetchFaculdades(true, true);
        onOpenChangeFaculdade();
    };

    const handleSaveCurso = async () => {
        let result;

        var cursoDTO = { ...cursoEntity, faculdade: { id: faculdadeSelecionada!.toString(), nome: faculdadeSelecionada!.toString() } }

        result = await createCurso(cursoDTO);

        if (result.id == undefined || result.statusCode == 400) {
            toast({
                title: "Erro!",
                description: "Não foi possivel salvar!",
                duration: 3000,
            });
            setCursoEntity({} as CursosModel)
        } else {
            router.refresh();
            toast({
                title: "Sucesso!",
                description: "Curso Salvo!",
                duration: 3000,
            });
            setCursoEntity({} as CursosModel)
        }
        fetchCursos(true, true);
        onOpenChangeCurso();
    };

    const handleSaveDisciplina = async () => {
        let result;

        var disciplinaDTO = {
            ...disciplinaEntity, curso: {
                id: cursoSelecionado!.toString(), nome: cursoSelecionado!.toString(),
                faculdade: {
                    id: "",
                    nome: "",
                    ativo: undefined
                }
            }
        }

        result = await createDisciplina(disciplinaDTO);

        if (result.id == undefined || result.statusCode == 400) {
            toast({
                title: "Erro!",
                description: "Não foi possivel salvar!",
                duration: 3000,
            });
            setDisciplinaEntity({} as DisciplinasModel)
        } else {
            router.refresh();
            toast({
                title: "Sucesso!",
                description: "Disciplina Salva!",
                duration: 3000,
            });
            setDisciplinaEntity({} as DisciplinasModel)
        }
        fetchDisciplinas(true, true);
        onOpenChangeDisciplina();
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
                    Selecione a disciplina que o aluno cursou
                </span>
                <div className="flex items-center gap-2 p-2">
                    <Select
                        label="Selecione uma faculdade"
                        onChange={(e) => {
                            setFaculdadeSelecionada(Number(e.target.value))
                            handleFaculdadeChange(Number(e.target.value))
                        }}
                        selectedKeys={faculdadeSelecionada ? [faculdadeSelecionada.toString()] : []}
                        className="flex-1"
                    >
                        {faculdadesData.map((faculdade) => (
                            <SelectItem key={faculdade.id}>{faculdade.nome}</SelectItem>
                        ))}
                    </Select>
                    <Button
                        onPress={onOpenFaculdade}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                        isIconOnly
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex items-center gap-2 p-2">
                    <Select
                        label="Selecione um curso"
                        onChange={(e) => {
                            setCursoSelecionado(Number(e.target.value))
                            handleCursoChange(Number(e.target.value))
                        }}
                        selectedKeys={cursoSelecionado ? [cursoSelecionado.toString()] : []}
                    >
                        {cursosData.map((cursos) => (
                            <SelectItem key={cursos.id}>{cursos.nome}</SelectItem>
                        ))}
                    </Select>
                    <Button
                        onPress={onOpenCurso}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                        isIconOnly
                        isDisabled={!faculdadeSelecionada}
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex items-center gap-2 p-2">
                    <Select
                        label="Selecione uma disciplina"
                        onChange={(e) => {
                            setDisciplinaSelecionado(Number(e.target.value))
                            handleDisciplinaChange(Number(e.target.value))
                        }}
                        selectedKeys={disciplinaSelecionado ? [disciplinaSelecionado.toString()] : []}
                    >
                        {disciplinasData.map((disciplinas) => (
                            <SelectItem key={disciplinas.id}>{disciplinas.nome}</SelectItem>
                        ))}
                    </Select>
                    <Button
                        onPress={onOpenDisciplina}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                        isIconOnly
                        isDisabled={!cursoSelecionado}
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Modal Faculdade */}

            <Modal
                isOpen={isOpenFaculdade}
                onOpenChange={onOpenChangeFaculdade}
                isDismissable={false}
                placement="top-center"
                onClose={() => {
                    setFaculdadeEntity({} as FaculdadesModel)
                    fetchFaculdades(true, true);
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
                                {"Nova Faculdade"}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Faculdade"
                                    placeholder="Digite o nome da faculdade"
                                    variant="bordered"
                                    value={faculdadeEntity.nome}
                                    onChange={(e) => setFaculdadeEntity({ ...faculdadeEntity, nome: e.target.value })}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="secondary" onPress={() => handleSaveFaculdade()}>
                                    {faculdadeEntity.id ? "Editar" : "Criar"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Modal Curso */}

            <Modal
                isOpen={isOpenCurso}
                onOpenChange={onOpenChangeCurso}
                isDismissable={false}
                placement="top-center"
                onClose={() => setCursoEntity({} as CursosModel)}
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
                                {cursoEntity.id ? "Editar Curso" : "Novo Curso"}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Curso"
                                    placeholder="Digite o nome do curso"
                                    variant="bordered"
                                    value={cursoEntity.nome}
                                    onChange={(e) => setCursoEntity({ ...cursoEntity, nome: e.target.value })}
                                />
                                <Select
                                    label="Selecione uma faculdade"
                                    onChange={(e) => setCursoEntity({ ...cursoEntity, faculdade: { id: e.target.value, nome: e.target.value } })}
                                    selectedKeys={faculdadeSelecionada?.toString()}
                                    isDisabled
                                >
                                    {faculdadesData.map((faculdade) => (
                                        <SelectItem key={faculdade.id}>{faculdade.nome}</SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="secondary" onPress={() => handleSaveCurso()}>
                                    Criar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Modal Disciplina */}

            <Modal
                isOpen={isOpenDisciplina}
                onOpenChange={onOpenChangeDisciplina}
                isDismissable={false}
                placement="top-center"
                onClose={() => {
                    setDisciplinaEntity({} as DisciplinasModel)
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
                                {disciplinaEntity.id ? "Editar Disciplina" : "Nova Disciplina"}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Disciplina"
                                    placeholder="Digite o nome da disciplina"
                                    variant="bordered"
                                    value={disciplinaEntity.nome}
                                    onChange={(e) => setDisciplinaEntity({ ...disciplinaEntity, nome: e.target.value })}
                                />
                                <Input
                                    label="Código"
                                    placeholder="Digite o código da disciplina"
                                    variant="bordered"
                                    value={disciplinaEntity.codDisciplina}
                                    onChange={(e) => setDisciplinaEntity({ ...disciplinaEntity, codDisciplina: e.target.value })}
                                />
                                <Select
                                    label="Selecione uma faculdade"
                                    selectedKeys={faculdadeSelecionada?.toString()}
                                    isDisabled
                                >
                                    {faculdadesData.map((faculdade) => (
                                        <SelectItem key={faculdade.id}>{faculdade.nome}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    label="Selecione um curso"
                                    selectedKeys={cursoSelecionado?.toString()}
                                    isDisabled
                                >
                                    {cursosData.map((cursos) => (
                                        <SelectItem key={cursos.id}>{cursos.nome}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    label="Carga Horária"
                                    placeholder="Digite a carga horária"
                                    variant="bordered"
                                    value={disciplinaEntity.cargaHoraria ? disciplinaEntity.cargaHoraria.toString() : ""}
                                    onChange={(e) => setDisciplinaEntity({ ...disciplinaEntity, cargaHoraria: Number(e.target.value) })}
                                    type="number"
                                />
                                <Textarea
                                    label="Ementa"
                                    placeholder="Digite a ementa"
                                    variant="bordered"
                                    value={disciplinaEntity.ementa ? disciplinaEntity.ementa : ""}
                                    onChange={(e) => setDisciplinaEntity({ ...disciplinaEntity, ementa: e.target.value })}
                                />
                                <Textarea
                                    label="Programa"
                                    placeholder="Digite o programa"
                                    variant="bordered"
                                    value={disciplinaEntity.programa ? disciplinaEntity.programa : ""}
                                    onChange={(e) => setDisciplinaEntity({ ...disciplinaEntity, programa: e.target.value })}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="secondary" onPress={() => handleSaveDisciplina()}>
                                    Criar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default StepDisciplinaOrigem;