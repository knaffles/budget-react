import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Budget from "./pages/Budget";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import { db } from "./services/firebase";

function App() {
  const [data, setData] = useState<object>({});

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
  );
}

export default App;
