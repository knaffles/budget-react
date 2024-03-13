import { ITransaction } from "../types/Transaction";
import { db } from "./firebase";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";

export const generateCategories = async () => {
  // Loop through all transactions and get a unique list of all categories.
  const qTransactions = query(collection(db, `user/user1/transaction`));
  const querySnapshotTransactions = await getDocs(qTransactions);
  const allCategories = querySnapshotTransactions.docs.map((doc) => {
    return doc.data().category;
  });

  // Filter the categories to a unique list.
  const uniqueCategories = allCategories.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });

  // Loop through the unique list of categories. If the category doesn't exit yet, create it.
  uniqueCategories.forEach(async (category) => {
    // See if the category already exists.
    const qCategories = query(
      collection(db, `user/user1/category`),
      where("name", "==", category)
    );

    const querySnapshotCategories = await getDocs(qCategories);
    if (querySnapshotCategories.empty) {
      // Create the category.
      await addDoc(collection(db, "user/user1/category"), {
        name: category,
        envelope: false,
      });
    }
  });
};

export const generateBugdet = async () => {
  // Get all categories.
  const allCategories = await getDocs(collection(db, "user/user1/category"));

  // Loop through each category.

  allCategories.forEach(async (doc) => {
    const category = doc.data().name;
    const qBudget = query(
      collection(db, `user/user1/budget`),
      where("year", "==", 2024),
      where("category", "==", category)
    );

    const budgetSnapshot = await getDocs(qBudget);

    // Check if a budget entry exists for the category in the given year.
    if (budgetSnapshot.empty) {
      // If not, generate a new budget entry.
      await addDoc(collection(db, "user/user1/budget"), {
        amount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        category: category,
        year: 2024,
      });
    }
  });
};
