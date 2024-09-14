import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import Login from "@/services/autenticacao/login";
import Cadastro from "@/services/autenticacao/cadastro";
import CardLogin from "./components/CardLogin";
import CardCadastro from "./components/CardCadastro";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Autenticacao() {
  const navigate = useNavigate();
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [confirmarSenhaCadastro, setConfirmarSenhaCadastro] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await Login(emailLogin, senhaLogin);

      if (response.error) {
        toast.error(response.error);
      } else {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("membroId", response.id);
        navigate("/home");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Erro ao realizar login");
    }
  };

  const handleCadastro = async () => {
    try {
      if (senhaCadastro !== confirmarSenhaCadastro) {
        toast.error("As senhas não coincidem");
        return;
      }

      const response = await Cadastro(
        emailCadastro,
        nomeCadastro,
        senhaCadastro
      );

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Cadastro realizado com sucesso!!");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Erro ao realizar cadastro!");
    }
  };

  return (
    <>
      <div className="flex mt-8 justify-center">
        <Tabs defaultValue="login" className="w-full max-w-[545px]">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="w-1/2">
              Login
            </TabsTrigger>
            <TabsTrigger value="cadastro" className="w-1/2">
              Cadastro
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardLogin
              emailLogin={emailLogin}
              setEmailLogin={setEmailLogin}
              senhaLogin={senhaLogin}
              setSenhaLogin={setSenhaLogin}
              handleLogin={handleLogin}
            />
          </TabsContent>
          <TabsContent value="cadastro">
            <CardCadastro
              nomeCadastro={nomeCadastro}
              setNomeCadastro={setNomeCadastro}
              emailCadastro={emailCadastro}
              setEmailCadastro={setEmailCadastro}
              senhaCadastro={senhaCadastro}
              setSenhaCadastro={setSenhaCadastro}
              confirmarSenhaCadastro={confirmarSenhaCadastro}
              setConfirmarSenhaCadastro={setConfirmarSenhaCadastro}
              handleCadastro={handleCadastro}
            />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster richColors expand={true} closeButton />
    </>
  );
}

export default Autenticacao;
