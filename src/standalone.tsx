import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthComponent, { AuthProps } from './Auth';
import TayBoundary from './components/ErrorBoundary';
import useAuthStore, { AuthContext } from './store';

function Auth(props: AuthProps) {
  const store = useAuthStore();
  return (
    <TayBoundary>
      <AuthContext.Provider value={store}>
        <AuthComponent {...props} />
      </AuthContext.Provider>
    </TayBoundary>
  );
}

export default {
  mount: (el: Element | DocumentFragment, props: AuthProps) => {
    const root = createRoot(el);
    root.render(React.createElement(Auth, props));
  },
};
