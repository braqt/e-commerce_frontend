import { useContext, createContext } from "react";

import { ICartContext } from "../../interfaces/context";

const CartContext = createContext({} as ICartContext);

export const useCart = () => useContext(CartContext);
export { CartContext };
