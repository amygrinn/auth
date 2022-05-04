import type { AuthStore } from '..';
import http from './http';

type Action = AuthStore['Action'];

const deleteAccount: Action = async ({ commit }) => {
  commit({ type: 'loading' });

  try {
    await http.delete('/user');
    commit({ type: 'logout' });
  } catch (err: any) {
    commit({ type: 'error', payload: err.message });
  }
};

export default deleteAccount;
