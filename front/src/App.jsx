import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateProduct from "./components/pages/CreateProduct/CreateProduct";
import ProductCatalog from "./components/pages/ProductCatalog/ProductCatalog";
import EditProduct from "./components/pages/EditProduct/EditProduct";
import LoginPage from "./components/pages/LoginPage/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("Logout chamado");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/products" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/products"
          element={<ProductCatalog onLogout={handleLogout} />}
        />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
