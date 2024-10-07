import { useState } from "react";
import api from "../services/api";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("products", product);
      alert("Produto criado com sucesso!");
      setProduct({ name: "", description: "", price: "" });
    } catch (error) {
      alert(
        "Erro ao criar produto: " +
          (error.response?.data.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Descrição"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Preço"
        required
      />
      <button type="submit">Criar Produto</button>
    </form>
  );
};

export default ProductForm;
