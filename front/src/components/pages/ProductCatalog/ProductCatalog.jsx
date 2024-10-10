import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import "./ProductCatalog.css";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-catalog">
      <h1>Catálogo de Produtos</h1>
      <Link to="/create">Criar Novo Produto</Link>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={`http://localhost:3000/${product.imageUrl}`}
              alt={product.name}
              className="card-image"
            />
            <h3 className="card-title">{product.name}</h3>
            <p className="card-description">{product.description}</p>
            <p className="card-price">
              R$ {parseFloat(product.price).toFixed(2)}
            </p>
            <Link to={`/edit/${product.id}`}>Editar</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
