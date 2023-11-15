import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthProvider, { AuthContext } from './components/store/auth-context';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
