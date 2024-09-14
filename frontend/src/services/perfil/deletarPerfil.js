import api from "../index";

export default async function deletarPerfil(token) {
  try {
    const response = await api.delete("/membros", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
