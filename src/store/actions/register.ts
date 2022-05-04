import type { AuthStore } from '..';
import http from './http';

type Action = AuthStore['Action'];

const register =
  (email: string, password: string): Action =>
  async ({ commit }) => {
    commit({ type: 'loading' });

    try {
      const user = await http.post('/register', {
        email,
        password,
      });
      commit({ type: 'set-user', payload: user });
    } catch (err: any) {
      commit({ type: 'error', payload: err.message });
    }
  };

export default register;
