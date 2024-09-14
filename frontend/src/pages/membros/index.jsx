import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import exibirMembros from "@/services/membros/exibirMembros";

function MembrosScreen() {
  const navigate = useNavigate();
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigate("/");
    }

    async function fetchData() {
      try {
        const response = await exibirMembros(token);
        setMembros(response);
        console.log(membros);
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

  return (
    <>
      <div className="flex flex-col pt-16 mx-auto w-[87%] h-screen">
        <header className="flex justify-between">
          <p className="text-6xl font-bold">Membros</p>
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
                navigate("/perfil");
              }}
            >
              <p className="text-2xl">perfil</p>
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
          <table className="w-full border border-black rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b border-black text-left">
                  Nome
                </th>
                <th className="px-4 py-2 border-b border-black text-left">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {membros.map((membro, index) => (
                <tr
                  key={membro.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border-b border-black">
                    {membro.nome}
                  </td>
                  <td className="px-4 py-2 border-b border-black">
                    {membro.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </body>
      </div>
      <Toaster richColors expand={true} closeButton />
    </>
  );
}

export default MembrosScreen;
