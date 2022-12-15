import React, { useEffect } from "react";
import { reducer, initialState } from "./reducer.js";

export const UserContext = React.createContext(initialState);

export const UserProvider = ({ children }) => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    
  }, []);

  return (
    <UserContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </UserContext.Provider>
  )
}