import { createContext } from "react";
import { GlobalContextType } from "../types/types.global";

const GlobalContext = createContext<GlobalContextType | null>(null);

export default GlobalContext;
