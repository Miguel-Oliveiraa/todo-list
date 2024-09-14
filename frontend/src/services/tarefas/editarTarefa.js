import api from "../index";

export default async function editarTarefa(
  token,
  id,
  nome,
  descricao,
  prioridade
) {
  try {
    const response = await api.put(
      "/tarefas",
      {
        id,
        nome,
        descricao,
        prioridade,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
