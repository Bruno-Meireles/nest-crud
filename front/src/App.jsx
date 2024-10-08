import ProductCatalog from "./components/ProductCatalog";
import ProductForm from "./components/productForm";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <div>
      <h1>Gerenciamento de Usuários</h1>
      <UserForm />
      <ProductForm />
      <ProductCatalog />
    </div>
  );
};

export default App;
