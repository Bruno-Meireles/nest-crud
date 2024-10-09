import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ProductCatalog.css";
import Button from "../ui/Button/Button";
import ProductForm from "../ProductForm/ProductForm";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="product-catalog">
      <h1>Cadastrar Produto</h1>
      <ProductForm onAddProduct={addProduct} />
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={
                product.imageUrl
                  ? `http://localhost:3000/${product.imageUrl}`
                  : "caminho/default.jpg"
              }
              alt={product.name}
              className="card-image"
            />
            <h3 className="card-title">{product.name}</h3>
            <p className="card-description">{product.description}</p>
            <p className="card-price">R$ {product.price.toFixed(2)}</p>

            <Button
              onClick={() =>
                console.log("Produto adicionado ao carrinho:", product)
              }
              text="Adicionar ao Carrinho"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
