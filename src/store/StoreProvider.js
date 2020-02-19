import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

export const StoreProvider = ({reducer, initialState, children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);