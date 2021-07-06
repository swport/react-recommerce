import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useHistory } from "react-router-dom";
import axios from '../utils/axios';
import Loader from '../components/Loader';

const Cookie = require('js-cookie');

export const AuthContext = createContext();

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    userLoaded: false,
    errors: {}
};

// interseptor to handle side-effects
function dispatchWithMiddleware(dispatch, history) {
    return (action) => {
        dispatch(action);
        
        switch (action.type) {
            case 'LOGIN_REQUEST':
                axios.post('/api/login', action.payload)
                    .then(function(response) {
                        if( response.data ) {
                            const { user, token } = response.data;

                            Cookie.set('auth_token', token.id);

                            dispatch({
                                type: 'LOGIN_SUCCESS',
                                payload: { user, token:token.id }
                            });

                            // don't redirect unless user is on the auth page
                            if( history.location.pathname === '/auth' ) {
                                history.push('/');
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log("error: ", error);
                        dispatch({ type: 'LOGIN_FAIL'});
                    });
                break;

            case 'LOGOUT':
                Cookie.remove('auth_token');
                break;
        }
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isLoading: true
            };

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                userLoaded: true,
                isLoggedIn: true,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token
            };

        case 'LOGIN_FAIL':
            return {
                ...initialState,
                error: 'login error'
            };

        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
                user: null
            };
    }
    
    return state;
}

export default function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(
        reducer,
        initialState,
        function() {
            if( ! Cookie.get('auth_token') ) {
                initialState.userLoaded = true;
            }

            return initialState;
        }
    );

    // run once; load user
    useEffect(async () => {
        if( ! state.userLoaded ) {
            const token = Cookie.get('auth_token');

            try {
                const { data: { user } } = await axios.post('/api/me', { token });
                dispatch({ type: 'LOGIN_SUCCESS', payload: {user, token} });
            } catch(err) {
                dispatch({ type: 'LOGIN_FAIL'});
            }
        }
    }, []);

    const history = useHistory();

    // dispatch middleware wrapper to handle side affects
    const _dispatch = dispatchWithMiddleware(dispatch, history);

    const loginAction = ({ email, password }) =>
        _dispatch({ type: 'LOGIN_REQUEST', payload: { email, password } });

    const logoutAction = () => _dispatch({ type: 'LOGOUT' });

    const signupAction = ({ email, password }) => {

    };

    return (
        <AuthContext.Provider value={{
            ...state,
            loginAction,
            logoutAction,
            signupAction
        }}>
            {children}
        </AuthContext.Provider>
    );
}