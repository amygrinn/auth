import Logo from '@taylorgrinn/logo';
import useSwitch from '@taylorgrinn/switch';
import React, { PropsWithChildren } from 'react';
import API_BASE_URL from '../../api-base-url';
import ErrorBoundary from '../ErrorBoundary';
import * as icons from '../icons';
import LocalForm from './LocalForm';

interface LoginProps {
  google?: boolean;
  github?: boolean;
  facebook?: boolean;
}

const getProviderLink = (provider: string) => {
  if (!API_BASE_URL) return '';
  const url = new URL(`${API_BASE_URL}/${provider}`);
  const params = new URLSearchParams({ redirect: location.href });
  url.search = params.toString();
  return url.href;
};

export default function Login(props: PropsWithChildren<LoginProps>) {
  const { children, google, github, facebook } = props;
  const hasChildren = !!children;

  const [authContainer, setAuth, LOGIN, REGISTER, RESET] = useSwitch(
    { name: 'auth' },
    'login',
    'register',
    'reset'
  );

  const [provContainer, setProv, LOCAL, EXTERNAL] = useSwitch(
    { name: 'prov' },
    'local',
    'external'
  );

  return (
    <div className="tay-login" {...authContainer} {...provContainer}>
      {hasChildren ? (
        <ErrorBoundary>{children}</ErrorBoundary>
      ) : (
        <div className="header">
          <Logo height="32px" />
          <h3>Tay Login</h3>
        </div>
      )}

      <nav>
        <button
          id="login"
          type="button"
          onClick={setAuth('login')}
          className={EXTERNAL ? 'selected expanded' : LOGIN ? 'selected' : ''}
        >
          Login{EXTERNAL ? '/Register' : ''}
        </button>
        <button
          type="button"
          data-prov="local"
          onClick={setAuth('register')}
          id="register"
          className={`disappear ${REGISTER ? 'selected' : ''}`}
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => {
            setAuth('reset')();
            setProv('local')();
          }}
          className={RESET ? 'selected' : "'"}
        >
          Reset Password
        </button>
      </nav>

      <nav data-auth="!reset">
        <button
          type="button"
          onClick={setProv('local')}
          className={LOCAL ? 'selected' : ''}
        >
          Local
        </button>
        <button
          type="button"
          onClick={setProv('external')}
          className={EXTERNAL ? 'selected' : ''}
        >
          Use Provider:
          {google && <icons.Google />}
          {github && <icons.Github />}
          {facebook && <icons.Facebook />}
        </button>
      </nav>

      <LocalForm {...{ LOGIN, REGISTER, RESET }} />

      <div className="providers">
        {google && (
          <a
            className="provider"
            data-prov="external"
            href={getProviderLink('google')}
          >
            <icons.Google /> Sign in with Google
          </a>
        )}
        {github && (
          <a
            className="provider"
            data-prov="external"
            href={getProviderLink('github')}
          >
            <icons.Github /> Sign in with Github
          </a>
        )}
        {facebook && (
          <a
            className="provider"
            data-prov="external"
            href={getProviderLink('facebook')}
          >
            <icons.Facebook /> Sign in with Facebook
          </a>
        )}
      </div>
    </div>
  );
}
