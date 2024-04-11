import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setError(null);
    setPending(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      if (!response) {
        throw new Error("Login failed for an unknown reason.");
      }

      dispatch({ type: "LOGIN", user: response.user });
      setPending(false);
    } catch (err) {
      let message = "Login failed.";

      // Technically, the error thrown could be of some type other than Error, in which err.message would not be a valid
      // property.
      if (err instanceof Error) {
        message = err.message;
      }

      setPending(false);
      setError(message);
    }
  };

  return { error, pending, login };
};

export default useLogin;
