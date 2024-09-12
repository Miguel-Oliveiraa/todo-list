/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/PasswordInput";

const CardCadastro = ({
  nomeCadastro,
  setNomeCadastro,
  emailCadastro,
  setEmailCadastro,
  senhaCadastro,
  setSenhaCadastro,
  confirmarSenhaCadastro,
  setConfirmarSenhaCadastro,
  handleCadastro,
}) => {
  return (
    <div className="w-full mt-10 flex flex-col items-center border pt-10 pb-24">
      <p className="font-bold text-6xl">Cadastro</p>
      <div className="mt-12">
        <div className="w-[362px] gap-2">
          <Label htmlFor="nome-cadastro">Nome</Label>
          <Input
            type="text"
            id="nome-cadastro"
            placeholder="Nome"
            value={nomeCadastro}
            onChange={(e) => setNomeCadastro(e.target.value)}
          />
        </div>
        <div className="w-[362px] gap-2 mt-4">
          <Label htmlFor="email-cadastro">Email</Label>
          <Input
            type="email"
            id="email-cadastro"
            placeholder="Email"
            value={emailCadastro}
            onChange={(e) => setEmailCadastro(e.target.value)}
          />
        </div>
        <div className="w-[362px] gap-2 mt-4">
          <Label htmlFor="senha-cadastro">Senha</Label>
          <PasswordInput
            id="senha-login"
            placeholder="Senha"
            value={senhaCadastro}
            onChange={(e) => setSenhaCadastro(e.target.value)}
          />
        </div>
        <div className="w-[362px] gap-2 mt-4">
          <Label htmlFor="repetir-senha-cadastro">Confirmar senha</Label>
          <PasswordInput
            id="senha-login"
            placeholder="Confirmar senha"
            value={confirmarSenhaCadastro}
            onChange={(e) => setConfirmarSenhaCadastro(e.target.value)}
          />
        </div>
      </div>
      <Button className="w-[362px] mt-8" onClick={handleCadastro}>
        Inscreva-se
      </Button>
    </div>
  );
};

export default CardCadastro;
