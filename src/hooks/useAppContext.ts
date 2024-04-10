import { useContext } from "react";
import AppContext from "../contexts/AppContext";

const useAppContext = () => {
  const currentAppContext = useContext(AppContext);

  // Throw an error if the current app context is still null. This keeps us from having to use optional chaining everytime we reference an app context variable, e.g. appContex?.user.
  if (!currentAppContext) {
    throw new Error(
      "useAppContext has to be used within <AppContext.Provider>"
    );
  }

  return currentAppContext;
};

export default useAppContext;
