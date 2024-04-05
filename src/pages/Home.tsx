import budgetObject from "../../data/budget.json";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import Heading from "../components/Heading";
import { useState } from "react";

const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(username);
  };

  return (
    <>
      <Heading as="h1">Login</Heading>

      <form className="max-w-2xl m-auto my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="form-control w-full">
            <div className="label pt-0">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
          </label>
          <label className="form-control w-full">
            <div className="label pt-0">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>
      </form>

      <div role="alert" className="alert">
        <span>DEV only.</span>
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
    </>
  );
};

export default Home;
