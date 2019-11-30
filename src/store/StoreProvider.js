import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

export const StoreProvider = ({reducer, initialState, children}) => (
  <GlobalContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalContext.Provider>
);

export const useGlobalContext = () => useContext(GlobalContext);