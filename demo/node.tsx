import React from 'react';
import ReactDOM from 'react-dom';
import Auth, { AuthContext, useAuthStore } from '../lib';
import '../lib/tygr-auth.min.css';

function App() {
  const store = useAuthStore();
  return (
    <AuthContext.Provider value={store}>
      <Auth google github />
    </AuthContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
