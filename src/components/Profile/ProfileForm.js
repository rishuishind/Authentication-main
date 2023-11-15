import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../store/auth-context';

const ProfileForm = () => {

  const authCtx = useContext(AuthContext);

  const newEnterPass = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const newPass = newEnterPass.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPass,
        returnSecureToken: false
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        console.log(response);
        authCtx.logout();
        return response.json();
      })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="6" ref={newEnterPass} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
