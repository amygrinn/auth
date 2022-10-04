import React from 'react';
import AuthComponent, { AuthProps } from './Auth';
import TayBoundary from './components/ErrorBoundary';
import useAuthStore, { actions, AuthContext as Context } from './store';

export { useAuthStore, actions, Context };

export const Component = (props: AuthProps) => (
  <TayBoundary>
    <AuthComponent {...props} />
  </TayBoundary>
);
