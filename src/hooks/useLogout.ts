import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setPending(true);

    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      setPending(false);
    } catch (err) {
      let message = "Logout failed.";

      // Technically, the error thrown could be of some type other than Error, in which err.message would not be a valid
      // property.
      if (err instanceof Error) {
        message = err.message;
      }

      setPending(false);
      setError(message);
    }
  };

  return { error, pending, logout };
};

export default useLogout;
