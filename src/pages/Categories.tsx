import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import useAppContext from "../hooks/useAppContext";
import { db } from "../services/firebase";
import { ICategory } from "../types/Category";

const Budget = () => {
  const { user, loadingCategories, categoryModel } = useAppContext();
  const [sortedCategories, setSortedCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  // Add a new category.
  const handleNewCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {
      addDoc(collection(db, `user/${user}/category`), {
        name: newCategory,
        envelope: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loadingCategories) {
      return;
    }

    setSortedCategories(categoryModel.getSorted());
  }, [loadingCategories, categoryModel]);

  const handleClick = async (nodeId: string, checked: boolean) => {
    try {
      const docRef = doc(db, `user/${user}/category/${nodeId}`);
      await updateDoc(docRef, { envelope: checked });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Categories</h1>

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

      <table className="table table-zebra table-xs">
        <thead>
          <tr>
            <th>Category</th>
            <th>Envelope?</th>
          </tr>
        </thead>
        <tbody>
          {sortedCategories.length > 0 &&
            sortedCategories.map((category) => {
              return (
                <tr key={category.name}>
                  <td>{category.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={category.envelope}
                      onChange={(event) => {
                        handleClick(category.nodeId, event.target.checked);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Budget;
