import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

const useGlobalContext = () => {
  const currentGlobalContext = useContext(GlobalContext);

  if (!currentGlobalContext) {
    throw new Error(
      "useGlobalContext has to be used within <GlobalContext.Provider>"
    );
  }

  return currentGlobalContext;
};

export default useGlobalContext;
