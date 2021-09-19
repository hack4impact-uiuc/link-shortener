import { createContext } from "react";

interface ContextType {
  error: string | undefined;
  setError: (error: string) => void;
}

const context: ContextType = {
  error: undefined,
  setError: (_: string) => {},
};

export default createContext(context);
