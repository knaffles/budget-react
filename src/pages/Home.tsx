import budgetObject from "../../data/budget.json";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

const Home = () => {
  const handleClick = () => {
    const budget = budgetObject.budget;
    budget.forEach(async (value) => {
      await addDoc(collection(db, "user/user1/budget"), value);
    });
  };

  const handleTransactionsClick = () => {
    const transactions = budgetObject.transaction;
    transactions.forEach(async (value) => {
      await addDoc(collection(db, "user/user1/transaction"), value);
    });
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

      <p>
        <button className="btn" onClick={handleTransactionsClick}>
          Import transactions data
        </button>
      </p>
    </>
  );
};

export default Home;
