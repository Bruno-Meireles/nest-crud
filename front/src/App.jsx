import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateProduct from "./components/pages/CreateProduct/CreateProduct";
import ProductCatalog from "./components/pages/ProductCatalog/ProductCatalog";
import EditProduct from "./components/pages/EditProduct/EditProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
