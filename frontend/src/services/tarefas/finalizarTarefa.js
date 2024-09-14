import api from "../index";

export default async function finalizarTarefa(token, id) {
  try {
    const response = await api.put(
      `/tarefas/${id}/finalizar`,
      {},
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
