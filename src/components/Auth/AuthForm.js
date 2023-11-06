import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;

    setIsLoading(true);

    if (isLogin) {
      //...
    }
    else {
      console.log('inside else');
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

        } else {
          return response.json().then(data => {
            alert(data.error.message);
          })
        }
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
          {isLoading && <p>Sending Request...</p>}
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
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
