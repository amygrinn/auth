import useSwitch from '@tygr/switch';
import React, { FC, useContext, useEffect } from 'react';
import Login from './components/Login';
import * as Spinners from './components/Spinners';
import User from './components/User';
import { actions, AuthContext } from './store';

export interface AuthProps {
  Header?: FC;
  Account?: FC;
  google?: boolean;
  github?: boolean;
}

export default function Auth(props: AuthProps) {
  const [state, , dispatch] = useContext(AuthContext);

  const { loading, user, error } = state;
  const { Header, Account, google, github } = props;

  useEffect(() => dispatch(actions.init), []);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const [pageContainer, setPage] = useSwitch(
    { name: 'page' },
    'loading',
    'login',
    'user'
  );
  const currentPage = loading ? 'loading' : user ? 'user' : 'login';
  useEffect(setPage(currentPage), [loading, user]);

  return (
    <div {...pageContainer} className="tygr-auth">
      <div data-page="user">
        <User>{Account && <Account />}</User>
      </div>
      <div data-page="loading">
        <Spinners.Large />
      </div>
      <div data-page="login">
        <Login google={google} github={github}>
          {Header && <Header />}
        </Login>
      </div>
    </div>
  );
}
