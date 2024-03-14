// TODO: Add additional error handling.
import { doc, updateDoc } from "firebase/firestore";
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

  const handleCellClick = (nodeId: IBudget["nodeId"], initialValue: number) => {
    setShowModal(true);
    setModalNodeId(nodeId);
    setModalInitialValue(initialValue);
  };

  const handleCellUpdate = async (budgetValue: number) => {
    // TODO - Check to see if nodeId exists...if not, create a new budget entry first.
    try {
      const docRef = doc(db, `user/${user}/budget/${modalNodeId}`);
      await updateDoc(docRef, { amount: budgetValue });
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
        />
      )}

      {budgetData.budgetIncome?.length > 0 && (
        <BudgetTable
          label="Income"
          data={budgetData.budgetIncome}
          totals={budgetData.totalIncome}
          firstColLabel="Category"
          onCellClick={handleCellClick}
        />
      )}

      {/* TODO: Fix this conditional. Should be checking to see if budgetDiff is populated. */}
      {budgetData.budgetExpenses?.length && budgetData.budgetIncome?.length && (
        <BudgetDiff label="Income - Expenses" data={budgetData.budgetDiff} />
      )}

      {
        <Modal
          handleUpdate={handleCellUpdate}
          showModal={showModal}
          initialValue={modalInitialValue}
          handleClose={() => {
            setShowModal(false);
          }}
        />
      }
    </>
  );
};

export default Budget;
