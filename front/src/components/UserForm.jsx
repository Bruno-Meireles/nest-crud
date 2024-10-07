import { useState } from "react";
import api from "../services/api";

const UserForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Dados a serem enviados:", user);cha
      await api.post("users", user);
      alert("Usuário criado com sucesso!");
      setUser({ name: "", email: "", password: "" });
    } catch (error) {
      // console.error(
      //   "Erro ao criar usuário",
      //   error.response?.data || error.message
      // );
      alert(
        "Erro ao criar usuário: " +
          (error.response?.data.message || error.message)
      );
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
        name="password"
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
