import api from "../index";

export default async function criarTarefa(token, nome, descricao, prioridade) {
  try {
    const response = await api.post(
      "/tarefas",
      {
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

    console.log(response);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
