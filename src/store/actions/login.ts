import type { AuthStore } from '..';
import http from './http';

type Action = AuthStore['Action'];

const login =
  (email: string, password: string): Action =>
  async ({ commit }) => {
    commit({ type: 'loading' });

    try {
      const user = await http.post('/login', { email, password });
      commit({ type: 'set-user', payload: user });
    } catch (err: any) {
      commit({ type: 'error', payload: err.message });
    }
  };

export default login;
