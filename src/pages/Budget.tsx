// TODO: Add additional error handling.
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { BudgetDiff, BudgetTable } from "../components/BudgetTable";
import BudgetModal from "../components/BudgetModal";
import useAppContext from "../hooks/useAppContext";
import { db } from "../services/firebase";
import { IBudget } from "../types/Budget";

const Budget = () => {
  const { user, budgetData, year } = useAppContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInitialValue, setModalInitialValue] = useState<number>(0);
  const [modalNodeId, setModalNodeId] = useState<string>("");
  const [modalMonth, setModalMonth] = useState<number>(0);
  const [newCategory, setNewCategory] = useState<string>("");

  // Add a new category to the budget.
  const handleNewCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {
      addDoc(collection(db, `user/${user}/budget`), {
        amount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        category: newCategory,
        year: year,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCellClick = (
    nodeId: IBudget["nodeId"],
    initialValue: number,
    month: number
  ) => {
    setShowModal(true);
    setModalNodeId(nodeId);
    setModalInitialValue(initialValue);
    setModalMonth(month);
  };

  const handleCellUpdate = async (budgetValue: number) => {
    try {
      const docRef = doc(db, `user/${user}/budget/${modalNodeId}`);
      const docSnap = await getDoc(docRef);
      const amount = docSnap.data()?.amount;
      amount[modalMonth] = budgetValue;
      await updateDoc(docRef, { amount: amount });
    } catch (error) {
      console.log(error);
    }
  };

  const handleYearUpdate = async (budgetValue: number) => {
    try {
      const docRef = doc(db, `user/${user}/budget/${modalNodeId}`);
      const amount = Array(12).fill(budgetValue);
      await updateDoc(docRef, { amount: amount });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (nodeId: IBudget["nodeId"]) => {
    try {
      const docRef = doc(db, `user/${user}/budget/${nodeId}`);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Budget</h1>

      <div className="flex justify-end" onSubmit={handleNewCategory}>
        <form className="flex flex-1 gap-2 max-w-sm">
          <input
            placeholder="Add a category to the budget"
            className="input input-bordered input-md w-full"
            type="text"
            onChange={(event) => setNewCategory(event?.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>
      </div>

      {budgetData.budgetExpenses?.length > 0 && (
        <BudgetTable
          label="Expenses"
          data={budgetData.budgetExpenses}
          totals={budgetData.totalExpenses}
          firstColLabel="Category"
          onCellClick={handleCellClick}
          onDelete={handleDelete}
        />
      )}

      {budgetData.budgetIncome?.length > 0 && (
        <BudgetTable
          label="Income"
          data={budgetData.budgetIncome}
          totals={budgetData.totalIncome}
          firstColLabel="Category"
          onCellClick={handleCellClick}
          onDelete={handleDelete}
        />
      )}

      {/* TODO: Fix this conditional. Should be checking to see if budgetDiff is populated. */}
      {budgetData.budgetExpenses?.length && budgetData.budgetIncome?.length && (
        <BudgetDiff label="Income - Expenses" data={budgetData.budgetDiff} />
      )}

      {showModal && (
        <BudgetModal
          onUpdate={handleCellUpdate}
          onYearUpdate={handleYearUpdate}
          initialValue={modalInitialValue}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default Budget;
