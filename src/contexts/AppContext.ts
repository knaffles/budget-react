import { createContext } from "react";
import { AppContextType } from "../types/types.global";

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
