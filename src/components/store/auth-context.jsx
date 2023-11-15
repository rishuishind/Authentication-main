import React, { useState } from 'react';


export const AuthContext = React.createContext({
    token: '',
    isLoggenIn: false,
    login: (token) => { },
    logout: () => { }
});

const AuthProvider = (props) => {
    const [token, setToken] = useState(null);

    const userIsLoggenIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
    }
    const logoutHandler = () => {
        setToken(null);
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