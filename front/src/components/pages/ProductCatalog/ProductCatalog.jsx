import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../services/api";
import "./ProductCatalog.css";
import Button from "../../ui/Button/Button";

const ProductCatalog = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="product-catalog">
      <Button text="Logout" onClick={handleLogout} />
      <Button text="Criar Novo Produto" onClick={() => navigate("../create")} />

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

ProductCatalog.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default ProductCatalog;
