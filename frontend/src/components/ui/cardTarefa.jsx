import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

/* eslint-disable react/prop-types */
const CardTarefa = ({
  id,
  nome,
  descricao,
  finalizada,
  data_de_termino,
  membro_id,
  prioridade,
}) => {
  return (
    <div className="bg-white rounded py-4 px-5 mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex flex-col items-start">
              <p className="font-bold text-2xl">{nome}</p>
              <p className="font-medium text-2x1">
                Status:{" "}
                {finalizada ? `Finalizada ${data_de_termino}` : "Pendente"}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <p className="font-regular text-2xl">{descricao}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id={id} />
                <Label htmlFor={id}>Finalizada</Label>
              </div>
              <div className="flex mt-2 gap-3">
                <Button>Editar</Button>
                <Button variant="destructive">Excluir</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CardTarefa;
