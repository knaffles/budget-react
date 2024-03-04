import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Budget from "./pages/Budget";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import { YearContextType } from "./types/types.global";
export const AppContext = createContext<YearContextType | null>(null);

function App() {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <AppContext.Provider value={{ year, setYear, user: "user1" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="budget" element={<Budget />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
