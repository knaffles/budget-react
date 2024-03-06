import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Budget from "./pages/Budget";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import { AppContextType } from "./types/types.global";
export const AppContext = createContext<AppContextType | null>(null);

function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [theme, setTheme] = useState<string>("light");

  return (
    <AppContext.Provider
      value={{ year, setYear, user: "user1", theme, setTheme }}
    >
      <div
        data-theme={theme}
        className="p-4 flex flex-col w-full min-h-[100vh]"
      >
        <div className="w-full max-w-[90rem] mx-auto mr-auto grow">
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
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
