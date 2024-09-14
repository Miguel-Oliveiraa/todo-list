import api from "../index";

export default async function deletar(token, id_tarefa) {
  try {
    const response = await api.delete(`/tarefas/${id_tarefa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
