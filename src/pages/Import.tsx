// TODO: Show progress indicator when uploading transactions.

import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import papa from "papaparse";
import { useState } from "react";
import useAppContext from "../hooks/useAppContext";
import { preProcessUpload, processUpload } from "../lib/uploads";
import { db } from "../services/firebase";
import {
  generateBudget,
  generateCategories,
} from "../services/firebase-actions";
import { IUploadRaw } from "../types/Upload";
import Heading from "../components/Heading";
import useAuthContext from "../hooks/useAuthContext";

// TODO: Fix user type.

const Import = () => {
  const { year } = useAppContext();
  const { user } = useAuthContext();
  const [file, setFile] = useState<File | null>(null);
  const handleCallBack = async (result: string) => {
    const parsedResult = papa.parse(result, {
      delimiter: ",",
      quoteChar: '"',
      header: true,
      skipEmptyLines: true,
    });

    const transactions = processUpload(parsedResult.data as IUploadRaw[]);

    // First, purge existing transactions for the selected year.
    const qDelete = query(
      collection(db, `user/${user?.uid}/transaction`),
      where("year", "==", year)
    );

    const querySnapshot = await getDocs(qDelete);
    const deleteDocs: Promise<void>[] = [];
    querySnapshot.forEach(async (doc) => {
      deleteDocs.push(deleteDoc(doc.ref));
    });

    await Promise.all(deleteDocs);

    // Loop through each item and add to the transaction collection.
    // TODO: *********** Create a promise to add all the docs, just like above.
    transactions.forEach(async (transaction) => {
      // Only add docs for the current year.
      if (transaction.year === year) {
        await addDoc(
          collection(db, `user/${user?.uid}/transaction`),
          transaction
        );
      }
    });

    console.log("Done uploading.");

    // TODO: Add progress/notification when complete.
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (file) {
      preProcessUpload(file, handleCallBack);
    }
  };

  return (
    <>
      <Heading as="h1">Import Data</Heading>
      <form onSubmit={handleSubmit}>
        <label>
          Upload a CSV file with transactions:
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files?.length) {
                setFile(event.target.files[0]);
              }
            }}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Import
        </button>
      </form>

      <button
        onClick={() => generateCategories(user ? user.uid : "")}
        className="btn btn-primary"
      >
        Generate categories
      </button>
      <button
        onClick={() => generateBudget(user ? user.uid : "", year)}
        className="btn btn-primary"
      >
        Generate budget
      </button>
    </>
  );
};

export default Import;
