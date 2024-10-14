import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [isProductUpdated, setIsProductUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await api.put(`/products/${id}`, {
        ...product,
        price: parseFloat(product.price),
      });
      setIsProductUpdated(true);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await api.delete(`/products/${id}`);
        alert("Produto deletado com sucesso!");
        navigate("/");
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  };

  useEffect(() => {
    if (isProductUpdated) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [isProductUpdated, navigate]);

  return (
    <div>
      <h1>Editar Produto</h1>
      {isProductUpdated ? (
        <div>
          <p>Produto editado com sucesso!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Nome do Produto"
            value={product.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Descrição do Produto"
            value={product.description}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="price"
            placeholder="Preço"
            value={product.price}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="imageUrl"
            placeholder="URL da Imagem"
            value={product.imageUrl}
            onChange={handleChange}
          />
          <Button type="submit" text="Salvar" />

          <Button type="button" text="Deletar Produto" onClick={handleDelete} />
        </form>
      )}
    </div>
  );
};

export default EditProduct;
