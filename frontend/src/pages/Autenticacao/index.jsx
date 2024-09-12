import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/PasswordInput";

function Autenticacao() {
  return (
    <>
      <div className="mt-8 ml-[664px]">
        <Tabs defaultValue="login" className="w-[545px]">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="w-1/2">
              Login
            </TabsTrigger>
            <TabsTrigger value="cadastro" className="w-1/2">
              Cadastro
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="w-full mt-10 flex flex-col items-center border pt-10 pb-24">
              <p className="font-bold text-6xl">login</p>
              <div className="mt-12">
                <div className="w-[362px] gap-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    type="email-login"
                    id="email-login"
                    placeholder="Email"
                  />
                </div>
                <div className="w-[362px] gap-2 mt-4">
                  <Label htmlFor="senha-login">Senha</Label>
                  <PasswordInput id="senha-login" placeholder="Senha" />
                </div>
              </div>
              <Button className="w-[362px] mt-8">Conecte-se</Button>
            </div>
          </TabsContent>
          <TabsContent value="cadastro">
            <div className="w-full mt-10 flex flex-col items-center border pt-10 pb-24">
              <p className="font-bold text-6xl">Cadastro</p>
              <div className="mt-12">
                <div className="w-[362px] gap-2">
                  <Label htmlFor="nome-cadastro">Nome</Label>
                  <Input type="text" id="nome-cadastro" placeholder="Nome" />
                </div>
                <div className="w-[362px] gap-2 mt-4">
                  <Label htmlFor="email-cadastro">Email</Label>
                  <Input type="email" id="email-cadastro" placeholder="Email" />
                </div>
                <div className="w-[362px] gap-2 mt-4">
                  <Label htmlFor="senha-cadastro">Senha</Label>
                  <PasswordInput id="senha-login" placeholder="Senha" />
                </div>
                <div className="w-[362px] gap-2 mt-4">
                  <Label htmlFor="repetir-senha-cadastro">
                    Confirmar senha
                  </Label>
                  <PasswordInput
                    id="senha-login"
                    placeholder="Confirmar senha"
                  />
                </div>
              </div>
              <Button className="w-[362px] mt-8">Inscreva-se</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Autenticacao;
