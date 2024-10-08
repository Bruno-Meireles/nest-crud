import { useState } from "react";
import api from "../../services/api";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("users", user);
      alert("Usuário criado com sucesso!");
      setUser({ name: "", email: "", password: "" });
    } catch (error) {
      alert(
        "Erro ao criar usuário: " +
          (error.response?.data.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <Input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Senha"
        required
      />
      <Button text="Criar Usuário" />
    </form>
  );
};

export default UserForm;
