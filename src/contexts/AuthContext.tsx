import { User as FirebaseUser } from "firebase/auth";
import { FC, ReactNode, Reducer, createContext, useReducer } from "react";
import { AuthContextType } from "../types/types.global";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderType {
  children: ReactNode;
}

interface AuthState {
  user: FirebaseUser | null;
}

interface AuthAction {
  type: string;
  user: FirebaseUser;
}

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.user };
    }
    case "LOGOUT": {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};

const AuthContextProvider: FC<AuthContextProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("Auth State: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
