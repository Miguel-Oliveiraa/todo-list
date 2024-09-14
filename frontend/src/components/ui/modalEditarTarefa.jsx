/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "react-feather";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import editarTarefa from "@/services/tarefas/editarTarefa";

const ModalEditarTarefa = ({ handleModal, dados }) => {
  const [nome, setNome] = useState(dados.nomeInicial);
  const [descricao, setDescricao] = useState(dados.descricaoInicial);
  const [prioridade, setPrioridade] = useState(dados.prioridadeInicial);

  const handleEditarTarefas = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await editarTarefa(token, dados.id, nome, descricao, prioridade);
      handleModal("", "", "", "");
    } catch (error) {
      // eslint-disable-next-line no-console
      toast.error(error.error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80">
      <div className="flex bg-white rounded px-24 pt-20 pb-16">
        <div className="w-[750px]">
          <div className="flex justify-between items-center">
            <p className="text-5xl font-bold">Editar Tarefa</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => {
                handleModal("", "", "", "");
              }}
            >
              <X className="w-10 h-10 text-black" />
            </Button>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <Input
              type="text"
              id="nome-cadastro"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Select value={prioridade} onValueChange={setPrioridade}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridade" aria-label={prioridade} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baixa">Baixa</SelectItem>
                <SelectItem value="Média">Média</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2">
            <Textarea
              className="min-h-40"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <Button
            className="mt-4"
            onClick={() => {
              handleEditarTarefas();
            }}
          >
            Editar
          </Button>
        </div>
      </div>
      <Toaster richColors expand={true} closeButton />
    </div>
  );
};

export default ModalEditarTarefa;
