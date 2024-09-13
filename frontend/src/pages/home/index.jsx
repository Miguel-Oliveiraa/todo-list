import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "react-feather";
import CardTarefa from "@/components/ui/cardTarefa";
import ModalCriarTarefa from "@/components/ui/modalCriarTarefa";

function HomeScreen() {
  const [modalCriarTarefa, setModalCriarTarefa] = useState(false);

  const handleModalCriarTarefa = () => {
    setModalCriarTarefa(!modalCriarTarefa);
  };

  return (
    <>
      <div className="flex flex-col pt-16 mx-auto w-[87%] h-screen">
        <header className="flex justify-between">
          <p className="text-6xl font-bold">Tarefas</p>
          <div className="flex gap-8 h-fit">
            <p className="text-2xl">membros</p>
            <p className="text-2xl">perfil</p>
            <p className="text-2xl bg-red-200 rounded px-1">logout</p>
          </div>
        </header>
        <body className="mt-8 h-full">
          <div className="flex items-end justify-between border-b">
            <div className="flex h-fit">
              <p className="text-3xl font-bold pr-3 border-b pb-2 border-black">
                Todas
              </p>
              <p className="text-3xl font-bold px-3 border-b pb-2 border-black">
                Pendentes
              </p>
              <p className="text-3xl font-bold px-3 border-b pb-2 border-black">
                Finalizadas
              </p>
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
                  <Plus className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
              <div className="flex flex-col h-full mt-3 bg-green-100 pb-2 px-4 rounded">
                <CardTarefa
                  id={1}
                  nome="Tarefa 1"
                  descricao="Descrição 1"
                  finalizada={false}
                  data_de_termino="2022-12-31"
                  membro_id={1}
                  prioridade="Baixa"
                />
                <CardTarefa
                  id={1}
                  nome="Tarefa 1"
                  descricao="Descrição 1"
                  finalizada={false}
                  data_de_termino="2022-12-31"
                  membro_id={1}
                  prioridade="Baixa"
                />
              </div>
            </div>
            <div className="flex flex-col w-1/3 ">
              <div className="flex justify-between bg-yellow-100 py-2 px-4 rounded">
                <p className="font-bold text-2xl text-gray-700">
                  Média prioridade
                </p>
                <Button variant="secondary" size="icon">
                  <Plus className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
              <div className="flex flex-col h-full mt-3 bg-yellow-100 pb-2 px-4 rounded">
                <CardTarefa
                  id={2}
                  nome="Tarefa 2"
                  descricao="Descrição 2"
                  finalizada={true}
                  data_de_termino="2022-12-31"
                  membro_id={2}
                  prioridade="Média"
                />
              </div>
            </div>
            <div className="flex flex-col w-1/3 ">
              <div className="flex justify-between bg-red-100 py-2 px-4 rounded">
                <p className="font-bold text-2xl text-gray-700">
                  Alta prioridade
                </p>
                <Button variant="secondary" size="icon">
                  <Plus className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
              <div className="flex flex-col h-full mt-3 bg-red-100 pb-2 px-4 rounded">
                <CardTarefa
                  id={3}
                  nome="Tarefa 3"
                  descricao="Descrição 3"
                  finalizada={false}
                  data_de_termino="2022-12-31"
                  membro_id={3}
                  prioridade="Alta"
                />
              </div>
            </div>
          </div>
        </body>
      </div>
      {modalCriarTarefa && (
        <ModalCriarTarefa handleModal={handleModalCriarTarefa} />
      )}
    </>
  );
}

export default HomeScreen;
