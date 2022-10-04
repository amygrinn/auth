import React from 'react';
import { createRoot } from 'react-dom/client';
import Auth, { AuthContext, useAuthStore } from '../lib';
import './styles/main.scss';

function App() {
  const store = useAuthStore();
  return (
    <AuthContext.Provider value={store}>
      <Auth google github facebook />
    </AuthContext.Provider>
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />, document.getElementById('app'));
