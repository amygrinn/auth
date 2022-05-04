import type { AuthStore } from '..';
import http from './http';

type Action = AuthStore['Action'];

export const sendCode =
  (email: string): Action =>
  async ({ commit }) => {
    commit({ type: 'reset-loading' });

    try {
      await http.post('/reset-password', { email });
      commit({ type: 'set-reset-state', payload: 'verify' });
    } catch (err: any) {
      commit({ type: 'error', payload: err.message });
    }
  };

export const verify =
  (email: string, code: string): Action =>
  async ({ commit }) => {
    commit({ type: 'reset-loading' });

    try {
      await http.get('/reset-password/verify', { email, code });
      commit({ type: 'set-reset-state', payload: 'password' });
    } catch (err: any) {
      commit({ type: 'error', payload: err.message });
    }
  };

export const password =
  (email: string, code: string, password: string): Action =>
  async ({ commit }) => {
    commit({ type: 'reset-loading' });

    try {
      await http.post('/reset-password/reset', { email, code, password });
      commit({ type: 'set-reset-state', payload: 'success' });
    } catch (err: any) {
      commit({ type: 'error', payload: err.message });
    }
  };
