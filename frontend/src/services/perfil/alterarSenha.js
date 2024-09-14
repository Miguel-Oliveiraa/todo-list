import api from "../index";

export default async function alterarSenha(token, senha, novaSenha) {
  try {
    const response = await api.put(
      "/membro/senha",
      {
        senha,
        novaSenha,
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
