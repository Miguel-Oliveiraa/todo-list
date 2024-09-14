import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import deletar from "@/services/tarefas/deletar";
import finalizarTarefa from "@/services/tarefas/finalizarTarefa";

/* eslint-disable react/prop-types */
const CardTarefa = ({
  id,
  nome,
  descricao,
  finalizada,
  data_de_termino,
  membro_id,
  prioridade,
  stateDeletar,
  setDeletar,
  stateFinalizar,
  setFinalizar,
  toastError,
  handleModalEditarTarefa,
}) => {
  const [permisaoEditar, setPermisaoEditar] = useState(false);
  const [finalizadaState, setFinalizadaState] = useState(finalizada);

  useEffect(() => {
    console.log(data_de_termino);
    const localStorageID = localStorage.getItem("membroId");
    if (localStorageID === membro_id) {
      setPermisaoEditar(true);
    }
  }, []);

  function formatarData(isoString) {
    const data = new Date(isoString);

    const padTo2Digits = (num) => num.toString().padStart(2, "0");

    // Obtém o dia, mês, ano, hora, minuto e segundo
    const dia = padTo2Digits(data.getUTCDate());
    const mes = padTo2Digits(data.getUTCMonth() + 1); // Meses são indexados a partir de 0
    const ano = data.getUTCFullYear();
    const horas = padTo2Digits(data.getUTCHours());
    const minutos = padTo2Digits(data.getUTCMinutes());
    const segundos = padTo2Digits(data.getUTCSeconds());

    // Formata a data no formato desejado
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await finalizarTarefa(
          localStorage.getItem("authToken"),
          id
        );
        // eslint-disable-next-line no-console
        setFinalizar(!stateFinalizar);
      } catch (error) {
        // eslint-disable-next-line no-console
        toastError(error.error);
      }
    }
    if (finalizadaState) {
      fetchData();
    }
  }, [finalizadaState]);

  const handleDeletar = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await deletar(token, id);
      setDeletar(!stateDeletar);
    } catch (error) {
      // eslint-disable-next-line no-console
      toastError(error.error);
    }
  };

  return (
    <div className="bg-white rounded py-4 px-5 mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex flex-col items-start">
              <p className="font-bold text-2xl">{nome}</p>
              <p className="font-medium text-2x1">
                Status:{" "}
                {finalizada
                  ? `Finalizada (${formatarData(data_de_termino)})`
                  : "Pendente"}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <p className="font-regular text-base">{descricao}</p>
              {permisaoEditar && (
                <>
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                      id={id}
                      checked={finalizadaState}
                      onCheckedChange={setFinalizadaState}
                      disabled={finalizadaState}
                    />
                    <Label htmlFor={id}>Finalizada</Label>
                  </div>
                  <div className="flex mt-2 gap-3">
                    <Button
                      onClick={() => {
                        handleModalEditarTarefa(
                          id,
                          nome,
                          descricao,
                          prioridade
                        );
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleDeletar();
                      }}
                    >
                      Excluir
                    </Button>
                  </div>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CardTarefa;
