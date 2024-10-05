import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App = () => {
  return (
    <div>
      <h1>Gerenciamento de Usuários</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;
