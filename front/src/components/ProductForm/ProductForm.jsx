import { useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";
import "./ProductForm.css";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === "price" ? parseFloat(value) || 0 : value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("products", product);
      alert("Produto criado com sucesso!");
      onAddProduct(response.data);
      setProduct({ name: "", description: "", price: 0 });
    } catch (error) {
      alert(
        "Erro ao criar produto: " +
          (error.response?.data.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <Input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Descrição"
        required
      />
      <Input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Preço"
        required
      />
      <Button text="Criar Produto" />
    </form>
  );
};

ProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default ProductForm;
