import api from "../index";

export default async function Cadastro(email, nome, senha) {
  try {
    const response = await api.post("/cadastro", {
      email,
      nome,
      senha,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
