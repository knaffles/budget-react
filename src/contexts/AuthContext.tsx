import { User as FirebaseUser } from "firebase/auth";
import {
  FC,
  ReactNode,
  Reducer,
  createContext,
  useReducer,
  useEffect,
} from "react";
import { AuthContextType } from "../types/types.global";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

// TODO: Cleanup type definitions. See https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks#usereducer

interface AuthContextProviderType {
  children: ReactNode;
}

interface AuthState {
  user: FirebaseUser | null;
  authIsReady: boolean;
}

interface AuthAction {
  type: string;
  user: FirebaseUser | null;
}

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.user };
    }
    case "LOGOUT": {
      return { ...state, user: null };
    }
    case "AUTH_IS_READY": {
      return { ...state, user: action.user, authIsReady: true };
    }
    default:
      return state;
  }
};

const AuthContextProvider: FC<AuthContextProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  console.log("Auth State: ", state);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", user: user });

      // We really only need to get an initial response from onAuthStateChanged. Any following updates are not necessary, so we unsubscribe right away.
      unsubscribe();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.authIsReady && <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
