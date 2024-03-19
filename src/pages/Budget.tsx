// TODO: Add additional error handling.
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { BudgetDiff, BudgetTable } from "../components/BudgetTable";
import Modal from "../components/Modal";
import useAppContext from "../hooks/useAppContext";
import { db } from "../services/firebase";
import { IBudget } from "../types/Budget";

const Budget = () => {
  const { user, budgetData } = useAppContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInitialValue, setModalInitialValue] = useState<number>(0);
  const [modalNodeId, setModalNodeId] = useState<string>("");
  const [modalMonth, setModalMonth] = useState<number>(0);

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
        <Modal
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
