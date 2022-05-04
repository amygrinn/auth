import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<App />, document.getElementById('app'));
