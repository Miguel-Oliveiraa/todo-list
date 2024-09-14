import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import dadosPerfil from "@/services/perfil/dadosPerfil";
import { Input } from "@/components/ui/input";
import atualizarPerfil from "@/services/perfil/atualizarPerfil";
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

function PerfilScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [modoTela, setModoTela] = useState("visualizacao");

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
              <div className="flex gap-2">
                <p className="font-bold text-2xl">Nome: </p>
                <p className="text-2xl">{nome}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-2xl">Email: </p>
                <p className="text-2xl">{email}</p>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => {
                    handleEditar();
                  }}
                >
                  Editar
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
              <div className="flex gap-2">
                <p className="font-bold text-2xl">Nome: </p>
                <Input value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="flex gap-2 mt-2">
                <p className="font-bold text-2xl">Email: </p>
                <Input
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
        </body>
      </div>
      <Toaster richColors expand={true} closeButton />
    </>
  );
}

export default PerfilScreen;
