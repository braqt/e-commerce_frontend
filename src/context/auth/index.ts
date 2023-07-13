import { useContext, createContext } from "react";

import { IAuthContext } from "../../interfaces/context/firebase";

const AuthContext = createContext({} as IAuthContext);

export const useAuthentication = () => useContext(AuthContext);
export { AuthContext };
