import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { AuthContext } from './components/store/auth-context';
import { useContext, useEffect } from 'react';

function App() {

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.isLoggenIn) {
      if (Date.now() > localStorage.getItem('time')) {
        console.log('Date now, ', Date.now(), ' expiry time: ', authCtx.expiryTime);
        authCtx.logout();
      }
    }
  })
  return (

    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
