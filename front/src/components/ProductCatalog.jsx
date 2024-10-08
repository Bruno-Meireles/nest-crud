import { useEffect, useState } from "react";
import api from "../services/api";
const addToCart = (product) => {
  console.log("Produto adicionado ao carrinho:", product);
};
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
      <h1>Acessórios Disponíveis</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>R$ {product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
