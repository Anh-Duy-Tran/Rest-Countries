import React, { useEffect } from "react";
import { reducer, initialState } from "./reducer.js";
import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/all';

export const UserContext = React.createContext(initialState);

export const UserProvider = ({ children }) => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type : "fetching" })
    
    axios
      .get(baseUrl)
      .then(res => {
        dispatch({ type : "update-countries", payload : res.data })
        dispatch({ type : "fetch-complete" })
      })
      .catch(err => console.log(err));
    
  }, []);

  return (
    <UserContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </UserContext.Provider>
  )
}