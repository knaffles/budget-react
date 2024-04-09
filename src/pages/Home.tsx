import budgetObject from "../../data/budget.json";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";

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
      <Heading as="h1">Home</Heading>
      <div className="prose">
        <p>
          Get started by <Link to="/signup">creating an account</Link>.
        </p>
      </div>

      <details className="collapse collapse-arrow bg-base-200">
        <summary className="collapse-title font-medium">
          Development content
        </summary>
        <div className="collapse-content">
          <div className="join">
            <button className="btn btn-neutral join-item" onClick={handleClick}>
              Import budget data
            </button>

            <button
              className="btn btn-neutral join-item"
              onClick={handleTransactionsClick}
            >
              Import transactions data
            </button>
          </div>
        </div>
      </details>
    </>
  );
};

export default Home;
