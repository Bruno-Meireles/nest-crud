// src/components/UserForm.tsx
import React, { useState } from "react";
import axios from "axios";

interface CreateUserDto {
  name: string;
  email: string;
  password: string; // Adicione a senha aqui
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState<CreateUserDto>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    console.log("Dados a serem enviados:", user); // Para verificar os dados
    await axios.post("http://localhost:3000/users", user);
    alert("Usuário criado com sucesso!");
    setUser({ name: "", email: "", password: "" }); // Limpa o formulário
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Verifica se o erro é um erro do Axios
      console.error(
        "Erro ao criar usuário",
        error.response?.data || error.message
      ); // Mostra detalhes do erro
      alert(
        "Erro ao criar usuário: " +
          (error.response?.data.message || error.message)
      );
    } else if (error instanceof Error) {
      // Se não for erro do Axios, mas for um erro padrão
      console.error("Erro inesperado:", error);
      alert("Erro inesperado ao criar usuário: " + error.message);
    } else {
      // Erro inesperado sem tipo conhecido
      console.error("Erro desconhecido:", error);
      alert("Erro desconhecido ao criar usuário.");
    }
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password" // Adicione este campo
        value={user.password}
        onChange={handleChange}
        placeholder="Senha"
        required
      />
      <button type="submit">Criar Usuário</button>
    </form>
  );
};

export default UserForm;
