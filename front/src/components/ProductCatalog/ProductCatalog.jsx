import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ProductCatalog.css";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função para buscar os produtos do backend
    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    // Busca inicial de produtos
    fetchProducts();

    // Configura a conexão com SSE para atualizações em tempo real
    const eventSource = new EventSource(
      "http://localhost:3000/products/events"
    );

    // Atualiza a lista de produtos sempre que um novo evento é recebido
    eventSource.onmessage = (event) => {
      const updatedProducts = JSON.parse(event.data);
      setProducts(updatedProducts);
    };

    // Fecha a conexão quando o componente é desmontado
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="product-catalog">
      <h1>Catálogo de Produtos</h1>
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
            <p className="card-price">
              R$ {parseFloat(product.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
