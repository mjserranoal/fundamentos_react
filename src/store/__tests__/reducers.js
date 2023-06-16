import { authLoginSuccess, authLogoutSuccess } from '../actions';
import { auth, defaultState } from '../reducers';

describe('auth', () => {
  test('should manage "AUTH_LOGIN_SUCCESS" action', () => {
    const state = defaultState.auth;
    const action = authLoginSuccess();
    const newState = auth(state, action);
    expect(newState).toBe(true);
  });

  test('should manage "AUTH_LOGOUT" action', () => {
    const state = defaultState.auth;
    const action = authLogoutSuccess();
    const newState = auth(state, action);
    expect(newState).toBe(false);
  });

  test('should manage any other action when state is undefined', () => {
    const state = undefined;
    const action = { type: 'ANY' };
    const newState = auth(state, action);
    expect(newState).toBe(defaultState.auth);
  });

  test('should manage any other action when state is not undefined', () => {
    const state = true;
    const action = { type: 'ANY' };
    const newState = auth(state, action);
    expect(newState).toBe(state);
  });
});
