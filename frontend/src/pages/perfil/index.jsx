import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function PerfilScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigate("/");
    }
    toast.success("Bem vindo ao perfil");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("membroId");
    window.location.href = "/";
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
        <body className="mt-8 h-full">
          <Button>teste</Button>
        </body>
      </div>
      <Toaster richColors expand={true} closeButton />
    </>
  );
}

export default PerfilScreen;
