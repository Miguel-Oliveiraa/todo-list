import api from "../index";

export default async function Login(email, senha) {
  try {
    const response = await api.post("/login", {
      email,
      senha,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
