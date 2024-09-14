import api from "../index";

export default async function atualizarPerfil(token, email, nome) {
  try {
    const response = await api.put(
      "/membros",
      {
        email,
        nome,
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
