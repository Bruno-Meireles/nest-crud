// src/App.tsx
import React from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App: React.FC = () => {
  return (
    <div>
      <h1>Gerenciador de Usuários</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;
