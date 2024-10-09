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
    price: "", // Mantenha como string para o input
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: files[0], // Armazena o arquivo no estado
      }));
    } else {
      const newValue = name === "price" ? value : value; // Não precisa de parseFloat aqui, pois price será string
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      if (product.image) {
        formData.append("file", product.image);
      }

      const response = await api.post("products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Produto criado com sucesso!");
      onAddProduct(response.data);
      setProduct({ name: "", description: "", price: "", image: null }); // Reseta o estado
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
        type="text" // Alterado para "text" para permitir string
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Preço"
        required
      />
      <Input
        type="file"
        name="image"
        onChange={handleChange}
        placeholder="Imagem"
      />
      <Button text="Criar Produto" />
    </form>
  );
};

ProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default ProductForm;
