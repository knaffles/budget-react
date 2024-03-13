import { useState } from "react";
import papa from "papaparse";
import { processUpload, preProcessUpload } from "../lib/uploads";
import { db } from "../services/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  generateCategories,
  generateBugdet,
} from "../services/firebase-actions";
import { IUploadRaw } from "../types/Upload";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleCallBack = (result: string) => {
    const parsedResult = papa.parse(result, {
      delimiter: ",",
      quoteChar: '"',
      header: true,
      skipEmptyLines: true,
    });

    const transactions = processUpload(parsedResult.data as IUploadRaw[]);

    // Loop through each item and add to the transaction collection.
    transactions.forEach(async (value) => {
      await addDoc(collection(db, "user/user1/transaction"), value);
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (file) {
      preProcessUpload(file, handleCallBack);
    }
  };

  return (
    <>
      <h1>Upload Data</h1>
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
          Upload
        </button>
      </form>

      <button onClick={generateCategories} className="btn btn-primary">
        Generate categories
      </button>
      <button onClick={generateBugdet} className="btn btn-primary">
        Generate budget
      </button>
    </>
  );
};

export default Upload;
