import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";

const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const signup = async (username: string, password: string) => {
    setError(null);
    setPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );

      if (!response) {
        throw new Error("Creating user account failed for an unknown reason.");
      }

      console.log(response);

      setPending(false);
    } catch (err) {
      let message = "Signup failed.";

      // Technically, the error thrown could be of some type other than Error, in which err.message would not be a valid
      // property.
      if (err instanceof Error) {
        message = err.message;
      }

      setPending(false);
      setError(message);
    }
  };

  return { error, pending, signup };
};

export default useSignup;
