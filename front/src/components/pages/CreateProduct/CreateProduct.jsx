import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Button from "../../ui/Button/Button";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if (image) {
        formData.append("file", image);
      }

      const response = await api.post("/products", formData);
      console.log("Produto cadastrado:", response.data);

      setIsProductCreated(true);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <div className="create-product">
      <h1>Cadastrar Novo Produto</h1>
      {isProductCreated ? (
        <div>
          <p>Produto cadastrado com sucesso!</p>
          <Button text="Ir para o Catálogo" onClick={() => navigate("/")} />
          <Button
            text="Cadastrar Novo Produto"
            onClick={() => setIsProductCreated(false)}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Preço:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Imagem:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <button type="submit">Cadastrar Produto</button>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;
