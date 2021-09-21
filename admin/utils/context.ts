import { createContext, SetStateAction } from "react";
import { SetErrorType } from ".";

interface ContextType {
  setError: SetErrorType;
}

const context: ContextType = {
  /* eslint-disable-next-line */
  setError: (_: SetStateAction<string | undefined>) => {},
};

export default createContext(context);
