import AllRoutes from "./AllRoutes";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <AllRoutes />
    </AuthContextProvider>
  );
}

export default App;
