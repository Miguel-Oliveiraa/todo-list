import api from "../index";

export default async function dadosPerfil(token) {
  try {
    const response = await api.get("/membro", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
