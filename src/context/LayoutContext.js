import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router';
import { updateQueryParams } from '../utils/helper';

export const LayoutContext = createContext();

const initialState = {
    lang: 'en-IN',
    theme: 'light'
};

function layoutReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            };
    }

    return state;
}

export default function LayoutProvider({ children }) {
    const [state, dispatch] = useReducer(layoutReducer, initialState);

    const history = useHistory();

    const actionChangeTheme = () => dispatch({type: 'CHANGE_THEME'});
    return (
        <LayoutContext.Provider value={{
            ...state,
            actionChangeTheme
        }}>
            {children}
        </LayoutContext.Provider>
    );
}