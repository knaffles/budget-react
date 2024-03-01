import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Budget from "./pages/Budget";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import { db } from "./services/firebase";
import { YearContextType } from "./types/types.global";
export const AppContext = createContext<YearContextType | null>(null);

function App() {
  const [data, setData] = useState<object>({});
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "budget", "iw2OeORlaWrdRujqfnGy");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ year, setYear }}>
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
