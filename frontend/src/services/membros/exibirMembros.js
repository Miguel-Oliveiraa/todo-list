import api from "../index";

export default async function exibirMembros(token) {
  try {
    const response = await api.get("/membros", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
