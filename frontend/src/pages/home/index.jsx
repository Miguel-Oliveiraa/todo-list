import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "react-feather";
import CardTarefa from "@/components/ui/cardTarefa";
import ModalCriarTarefa from "@/components/ui/modalCriarTarefa";
import exibirTarefas from "@/services/tarefas/exibirTarefas";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import ModalEditarTarefa from "@/components/ui/modalEditarTarefa";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Todas");
  const [modalCriarTarefa, setModalCriarTarefa] = useState(false);
  const [modalEditarTarefa, setModalEditarTarefa] = useState(false);
  const [dadosEditarTarefa, setDadosEditarTarefa] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const [tarefasFiltradas, setTarefasFiltradas] = useState([]);
  const [baixaPrioridade, setBaixaPrioridade] = useState([]);
  const [mediaPrioridade, setMediaPrioridade] = useState([]);
  const [altaPrioridade, setAltaPrioridade] = useState([]);
  const [prioridadeInicial, setPrioridadeInicial] = useState("");
  const [deletar, setDeletar] = useState(false);
  const [finalizar, setFinalizar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigate("/");
    }

    setDeletar(false);
    setFinalizar(false);
    const fetchData = async () => {
      try {
        const response = await exibirTarefas(token);
        setTarefas(response);
      } catch (_) {
        toast.error("Erro ao buscar tarefas");
      }
    };
    fetchData();
    if (status == "Todas") {
      setTarefasFiltradas(tarefas);
    } else if (status == "Pendentes") {
      setTarefasFiltradas(
        tarefas.filter((tarefa) => tarefa.finalizada === false)
      );
    } else {
      setTarefasFiltradas(
        tarefas.filter((tarefa) => tarefa.finalizada === true)
      );
    }
  }, [
    modalCriarTarefa,
    modalEditarTarefa,
    deletar,
    finalizar,
    status,
    navigate,
    tarefas,
  ]);

  useEffect(() => {
    setBaixaPrioridade(
      tarefasFiltradas.filter((tarefa) => tarefa.prioridade === "Baixa")
    );
    setMediaPrioridade(
      tarefasFiltradas.filter((tarefa) => tarefa.prioridade === "Média")
    );
    setAltaPrioridade(
      tarefasFiltradas.filter((tarefa) => tarefa.prioridade === "Alta")
    );
  }, [tarefasFiltradas]);

  const handleModalCriarTarefa = () => {
    setModalCriarTarefa(!modalCriarTarefa);
  };

  const handleModalEditarTarefa = (
    id_tarefa,
    nomeInicial,
    descricaoInicial,
    prioridadeInicial
  ) => {
    setDadosEditarTarefa({
      id: id_tarefa,
      nomeInicial,
      descricaoInicial,
      prioridadeInicial,
    });
    setModalEditarTarefa(!modalEditarTarefa);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("membroId");
    window.location.href = "/";
  };

  return (
    <>
      <div className="flex flex-col pt-16 mx-auto w-[87%] h-screen">
        <header className="flex justify-between">
          <p className="text-6xl font-bold">Tarefas</p>
          <div className="flex gap-8 h-fit">
            <button
              onClick={() => {
                navigate("/membros");
              }}
            >
              <p className="text-2xl">membros</p>
            </button>
            <button
              onClick={() => {
                navigate("/perfil");
              }}
            >
              <p className="text-2xl">perfil</p>
            </button>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              <p className="text-2xl bg-red-200 rounded px-1">logout</p>
            </button>
          </div>
        </header>
        <body className="mt-8 h-full">
          <div className="flex items-end justify-between border-b">
            <div className="flex h-fit">
              <button
                onClick={() => {
                  setStatus("Todas");
                }}
              >
                <p
                  className={
                    status == "Todas"
                      ? "text-3xl font-bold pr-3 border-b pb-2 border-black"
                      : "text-3xl font-bold pr-3 border-b pb-2 text-gray-500"
                  }
                >
                  Todas
                </p>
              </button>
              <button
                onClick={() => {
                  setStatus("Pendentes");
                }}
              >
                <p
                  className={
                    status == "Pendentes"
                      ? "text-3xl font-bold pr-3 border-b pb-2 border-black"
                      : "text-3xl font-bold pr-3 border-b pb-2 text-gray-500"
                  }
                >
                  Pendentes
                </p>
              </button>
              <button
                onClick={() => {
                  setStatus("Finalizadas");
                }}
              >
                <p
                  className={
                    status == "Finalizadas"
                      ? "text-3xl font-bold pr-3 border-b pb-2 border-black"
                      : "text-3xl font-bold pr-3 border-b pb-2 text-gray-500"
                  }
                >
                  Finalizadas
                </p>
              </button>
            </div>
            <Button className="mb-2" onClick={handleModalCriarTarefa}>
              Criar
            </Button>
          </div>
          <div className="flex gap-3 mt-4 min-h-[85%] max-h-fit pb-6">
            <div className="flex flex-col w-1/3 ">
              <div className="flex justify-between bg-green-100 py-2 px-4 rounded">
                <p className="font-bold text-2xl text-gray-700">
                  Baixa prioridade
                </p>
                <Button variant="secondary" size="icon">
                  <Plus
                    className="w-5 h-5 text-gray-500"
                    onClick={() => {
                      setPrioridadeInicial("Baixa");
                      handleModalCriarTarefa();
                    }}
                  />
                </Button>
              </div>
              <div className="flex flex-col h-full mt-3 bg-green-100 pb-2 px-4 rounded">
                {baixaPrioridade.map((tarefa) => (
                  <CardTarefa
                    key={tarefa.id}
                    id={tarefa.id}
                    nome={tarefa.nome}
                    descricao={tarefa.descricao}
                    finalizada={tarefa.finalizada}
                    data_de_termino={tarefa.data_de_termino}
                    membro_id={tarefa.membro_id}
                    prioridade={tarefa.prioridade}
                    stateDeletar={deletar}
                    setDeletar={setDeletar}
                    stateFinalizar={finalizar}
                    setFinalizar={setFinalizar}
                    toastError={toast}
                    handleModalEditarTarefa={handleModalEditarTarefa}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-1/3 ">
              <div className="flex justify-between bg-yellow-100 py-2 px-4 rounded">
                <p className="font-bold text-2xl text-gray-700">
                  Média prioridade
                </p>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    setPrioridadeInicial("Média");
                    handleModalCriarTarefa();
                  }}
                >
                  <Plus className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
              <div className="flex flex-col h-full mt-3 bg-yellow-100 pb-2 px-4 rounded">
                {mediaPrioridade.map((tarefa) => (
                  <CardTarefa
                    key={tarefa.id}
                    id={tarefa.id}
                    nome={tarefa.nome}
                    descricao={tarefa.descricao}
                    finalizada={tarefa.finalizada}
                    data_de_termino={tarefa.data_de_termino}
                    membro_id={tarefa.membro_id}
                    prioridade={tarefa.prioridade}
                    stateDeletar={deletar}
                    setDeletar={setDeletar}
                    stateFinalizar={finalizar}
                    setFinalizar={setFinalizar}
                    toastError={toast}
                    handleModalEditarTarefa={handleModalEditarTarefa}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-1/3 ">
              <div className="flex justify-between bg-red-100 py-2 px-4 rounded">
                <p className="font-bold text-2xl text-gray-700">
                  Alta prioridade
                </p>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    setPrioridadeInicial("Alta");
                    handleModalCriarTarefa();
                  }}
                >
                  <Plus className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
              <div className="flex flex-col h-full mt-3 bg-red-100 pb-2 px-4 rounded">
                {altaPrioridade.map((tarefa) => (
                  <CardTarefa
                    key={tarefa.id}
                    id={tarefa.id}
                    nome={tarefa.nome}
                    descricao={tarefa.descricao}
                    finalizada={tarefa.finalizada}
                    data_de_termino={tarefa.data_de_termino}
                    membro_id={tarefa.membro_id}
                    prioridade={tarefa.prioridade}
                    stateDeletar={deletar}
                    setDeletar={setDeletar}
                    stateFinalizar={finalizar}
                    setFinalizar={setFinalizar}
                    toastError={toast}
                    handleModalEditarTarefa={handleModalEditarTarefa}
                  />
                ))}
              </div>
            </div>
          </div>
        </body>
      </div>
      {modalCriarTarefa && (
        <ModalCriarTarefa
          handleModal={handleModalCriarTarefa}
          prioridadeInicial={prioridadeInicial}
          setPrioridadeInicial={setPrioridadeInicial}
        />
      )}
      {modalEditarTarefa && (
        <ModalEditarTarefa
          handleModal={handleModalEditarTarefa}
          dados={dadosEditarTarefa}
        />
      )}
      <Toaster richColors expand={true} closeButton />
    </>
  );
}

export default HomeScreen;
