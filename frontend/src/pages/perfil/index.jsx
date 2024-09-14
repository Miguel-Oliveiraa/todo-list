import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import dadosPerfil from "@/services/perfil/dadosPerfil";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/PasswordInput";
import atualizarPerfil from "@/services/perfil/atualizarPerfil";
import { Label } from "@/components/ui/label";
import deletarPerfil from "@/services/perfil/deletarPerfil";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import alterarSenha from "@/services/perfil/alterarSenha";

function PerfilScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [modoTela, setModoTela] = useState("visualizacao");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confimarSenha, setConfimarSenha] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigate("/");
    }

    async function fetchData() {
      try {
        const response = await dadosPerfil(token);
        setEmail(response.email);
        setNome(response.nome);
      } catch (error) {
        toast.error("Erro ao buscar dados: " + error);
      }
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("membroId");
    window.location.href = "/";
  };

  const handleEditar = () => {
    setModoTela("edicao");
  };

  const handleCancelar = () => {
    setModoTela("visualizacao");
  };

  const handleSalvar = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await atualizarPerfil(token, email, nome);
      toast.success(response.message);
      setModoTela("visualizacao");
    } catch (error) {
      toast.error("Erro ao atualizar perfil: " + error.error);
    }
  };

  const handleDeletar = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await deletarPerfil(token);
      localStorage.removeItem("authToken");
      localStorage.removeItem("membroId");
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      toast.error("Erro ao deletar perfil: " + error.error);
    }
  };

  const handleAlterarSenha = () => {
    setModoTela("alterarSenha");
  };

  const handleAtualizarSenha = async () => {
    const token = localStorage.getItem("authToken");
    if (novaSenha == confimarSenha) {
      try {
        const response = await alterarSenha(token, senhaAtual, novaSenha);
        toast.success(response.message);
        setModoTela("visualizacao");
      } catch (error) {
        toast.error(error.error);
      }
    } else {
      toast.error("As senhas não coincidem");
    }
  };

  return (
    <>
      <div className="flex flex-col pt-16 mx-auto w-[87%] h-screen">
        <header className="flex justify-between">
          <p className="text-6xl font-bold">Perfil</p>
          <div className="flex gap-8 h-fit">
            <button
              onClick={() => {
                navigate("/home");
              }}
            >
              <p className="text-2xl">home</p>
            </button>
            <button
              onClick={() => {
                navigate("/membros");
              }}
            >
              <p className="text-2xl">membros</p>
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
        <body className="mt-8 h-full w-1/3">
          {modoTela && modoTela === "visualizacao" ? (
            <>
              <div className="flex flex-col">
                <Label htmlFor="nome-perfil">Nome</Label>
                <p id="nome-perfil" className="text-2xl">
                  {nome}
                </p>
              </div>
              <div className="flex flex-col mt-2">
                <Label htmlFor="email-perfil">Email</Label>
                <p id="email-perfil" className="text-2xl">
                  {email}
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => {
                    handleEditar();
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleAlterarSenha();
                  }}
                >
                  AlterarSenha
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    {" "}
                    <Button variant="destructive">Deletar</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Tem certeza que deseja deletar sua conta?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isto irá
                        permanentemente exclua sua conta e remova seus dados de
                        nosso servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          handleDeletar();
                        }}
                      >
                        Deletar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          ) : (
            <></>
          )}
          {modoTela && modoTela === "edicao" ? (
            <>
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleCancelar();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    handleSalvar();
                  }}
                >
                  Salvar
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
          {modoTela && modoTela === "alterarSenha" ? (
            <div className="flex flex-col">
              <div>
                <Label htmlFor="senha-atual">Senha atual</Label>
                <PasswordInput
                  id="senha-atual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <Label htmlFor="nova-senha">Nova senha</Label>
                <PasswordInput
                  id="nova-senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <Label htmlFor="confirmar-senha">Confirmar senha</Label>
                <PasswordInput
                  id="confirmar-senha"
                  value={confimarSenha}
                  onChange={(e) => setConfimarSenha(e.target.value)}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleCancelar();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    handleAtualizarSenha();
                  }}
                >
                  Alterar Senha
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </body>
      </div>
      <Toaster richColors expand={true} closeButton />
    </>
  );
}

export default PerfilScreen;
