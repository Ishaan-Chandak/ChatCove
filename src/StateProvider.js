import React, {createContext, useReducer, useContext} from "react"
// create a data layer
export const StateContext = createContext();
// set up the data
export const StateProvider = ({reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
// pulls info from the data layer
export const useStateValue = () => useContext(StateContext);
