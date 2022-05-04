import type { AuthStore } from '..';
import http from './http';

type Action = AuthStore['Action'];

const logout: Action = async ({ commit }) => {
  commit({ type: 'loading' });

  try {
    await http.put('/logout');
    commit({ type: 'logout' });
  } catch (err: any) {
    commit({ type: 'error', payload: err.message });
  }
};

export default logout;
