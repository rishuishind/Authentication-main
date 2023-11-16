import React, { useState } from 'react';


export const AuthContext = React.createContext({
    token: '',
    isLoggenIn: false,
    expiryTime: Date.now(),
    login: (token) => { },
    logout: () => { },
    expiry: (time) => { }
});

const AuthProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [time, setTime] = useState(Date.now());

    console.log('token is: ', token);
    const userIsLoggenIn = !!token;
    console.log('islogged is: ', userIsLoggenIn);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const setExpiryTime = (time) => {
        setTime(time);
        localStorage.setItem('time', time);
    }

    const AuthObject = {
        token: token,
        isLoggenIn: userIsLoggenIn,
        expiryTime: time,
        login: loginHandler,
        logout: logoutHandler,
        expiry: setExpiryTime,
    }

    console.log('auth object:-> ', AuthObject.expiryTime);
    console.log('real time:-> ', Date.now());

    return (
        <AuthContext.Provider value={AuthObject} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;