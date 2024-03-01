import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
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
    <>
      <Header />
    </>
  );
}

export default App;
