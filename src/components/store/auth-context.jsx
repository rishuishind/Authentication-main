import React, { useState } from 'react';


export const AuthContext = React.createContext({
    token: '',
    isLoggenIn: false,
    login: (token) => { },
    logout: () => { }
});

const AuthProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggenIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const AuthObject = {
        token: token,
        isLoggenIn: userIsLoggenIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={AuthObject} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;