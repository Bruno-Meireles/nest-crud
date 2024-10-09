import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductForm from "./ProductForm"; // Certifique-se de que o caminho está correto

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Busca produtos na inicialização
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div>
      <h1>Catálogo de Produtos</h1>
      <ProductForm
        onAddProduct={handleAddProduct}
        fetchProducts={fetchProducts}
      />
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
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>R$ {parseFloat(product.price).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
