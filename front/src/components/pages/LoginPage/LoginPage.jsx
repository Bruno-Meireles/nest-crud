import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Button from "../../ui/Button/Button";
import PropTypes from "prop-types";
import Input from "../../ui/Input/Input";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      if (response.status === 201) {
        onLogin();
        navigate("/products");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Email ou senha incorretos.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teste@gmail.com"
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="1aA$22"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" text="Entrar" />
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
