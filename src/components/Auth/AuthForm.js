import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import { AuthContext } from '../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();

  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;

    setIsLoading(true);

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true
        }),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(data => {
            let errorMessage = 'Authentication Failed';
            throw new Error(errorMessage);
          })
        }
      })
        .then((data) => {
          history.replace('/');
          authCtx.login(data.idToken);
          console.log(data.idToken);
        })
        .catch((err) => { alert(err) })
    }
    else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true
        }),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        setIsLoading(false);
        if (response.ok) {
          alert('Account created');
          return response.json();
        } else {
          throw new Error('Authentication Failed');
        }
      }).then((data) => {
        console.log(data);
        authCtx.login(data.idToken);
        history.replace('/');
      }).catch((err) => {
        alert(err);
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
