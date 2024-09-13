/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
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

const ModalCriarTarefa = ({ handleModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-80">
      <div className="flex bg-white rounded px-24 pt-20 pb-16">
        <div className="w-[750px]">
          <div className="flex justify-between items-center">
            <p className="text-5xl font-bold">Criar Tarefa</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => {
                handleModal();
              }}
            >
              <X className="w-10 h-10 text-black" />
            </Button>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <Input type="text" id="nome-cadastro" placeholder="Nome" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Baixa</SelectItem>
                <SelectItem value="dark">Média</SelectItem>
                <SelectItem value="system">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2">
            <Textarea className="min-h-40" placeholder="Descrição" />
          </div>
          <Button className="mt-4">Criar</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalCriarTarefa;
