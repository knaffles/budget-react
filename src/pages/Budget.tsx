// TODO: Move data fetching to a hook.
// TODO: Add additional error handling.

import { doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { BudgetDiff, BudgetTable } from "../components/BudgetTable";
import Modal from "../components/Modal";
import { db } from "../services/firebase";
import { IBudget } from "../types/Budget";

const Budget = () => {
  const appContext = useContext(AppContext);
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
      const docRef = doc(db, `user/${appContext?.user}/budget/${modalNodeId}`);
      await updateDoc(docRef, { amount: budgetValue });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Budget</h1>
      {/***************** TODO: Fix all these conditionals */}
      {appContext?.budgetData?.budgetExpenses?.length &&
        appContext?.budgetData.budgetExpenses.length > 0 && (
          <BudgetTable
            label="Expenses"
            data={appContext?.budgetData.budgetExpenses ?? []}
            totals={appContext?.budgetData.totalExpenses ?? {}}
            firstColLabel="Category"
            onCellClick={handleCellClick}
          />
        )}

      {appContext?.budgetData?.budgetIncome?.length &&
        appContext?.budgetData.budgetIncome.length > 0 && (
          <BudgetTable
            label="Income"
            data={appContext?.budgetData.budgetIncome ?? []}
            totals={appContext?.budgetData.totalIncome}
            firstColLabel="Category"
            onCellClick={handleCellClick}
          />
        )}

      {/* TODO: Fix this conditional. Should be checking to see if budgetDiff is populated. */}
      {appContext?.budgetData?.budgetExpenses?.length &&
        appContext?.budgetData?.budgetIncome?.length && (
          <BudgetDiff
            label="Income - Expenses"
            data={appContext?.budgetData.budgetDiff}
          />
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
