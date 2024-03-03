import budgetObject from "../../data/budget.json";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const Home = () => {
  const handleClick = async () => {
    for (const [key, value] of Object.entries(budgetObject)) {
      console.log(`key: ${key}, value: ${value}`);
      await setDoc(doc(db, "user/user1/budget", key), value);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <p>This is the homepage.</p>
      <p>
        <button className="btn" onClick={handleClick}>
          Import budget data
        </button>
      </p>
    </>
  );
};

export default Home;
