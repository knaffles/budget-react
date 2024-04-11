import budgetObject from "../../data/budget.json";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import Heading from "../components/Heading";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();

  const handleClick = () => {
    const budget = budgetObject.budget;
    budget.forEach(async (value) => {
      await addDoc(collection(db, `user/${user?.uid}/budget`), value);
    });
  };

  const handleTransactionsClick = () => {
    const transactions = budgetObject.transaction;
    transactions.forEach(async (value) => {
      await addDoc(collection(db, `user/${user?.uid}/transaction`), value);
    });
  };

  return (
    <>
      <Heading as="h1">Home</Heading>
      <div className="prose">
        <p>Hello. Welcome to the budget app.</p>
      </div>

      <details className="collapse collapse-arrow bg-base-200">
        <summary className="collapse-title font-medium">
          Development content
        </summary>
        <div className="collapse-content">
          <button className="btn btn-neutral" onClick={handleClick}>
            Import sample budget data
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-neutral" onClick={handleTransactionsClick}>
            Import sample transactions data
          </button>
        </div>
      </details>
    </>
  );
};

export default Home;
