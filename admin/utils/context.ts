import { createContext, SetStateAction } from "react";
import { SetErrorType } from ".";

interface ContextType {
  error: string | undefined;
  setError: SetErrorType;
}

const context: ContextType = {
  error: undefined,
  /* eslint-disable-next-line */
  setError: (_: SetStateAction<string | undefined>) => {},
};

export default createContext(context);
