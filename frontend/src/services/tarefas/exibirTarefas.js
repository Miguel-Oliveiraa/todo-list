import api from "../index";

export default async function exibirTarefas(token) {
  try {
    const response = await api.get("/tarefas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
