import * as actions from './Auth.actions';

const DEV_USER: IUser = {
  id: 'dev-user',
  username: 'Dev User',
  email: 'dev@localhost',
  password: '',
};

export const loadUser = () => async dispatch => {
  if (process.env.NODE_ENV === 'development') {
    const stored = localStorage.getItem('devUser');
    if (stored) {
      dispatch(actions.userLoaded(JSON.parse(stored)));
    } else {
      dispatch(actions.authError());
    }
    return;
  }
  try {
    const res = await fetch('/.auth/me');
    const data = await res.json();
    const principal = data?.clientPrincipal;
    if (!principal) {
      dispatch(actions.authError());
      return;
    }
    const user: IUser = {
      id: principal.userId,
      username: principal.userDetails,
      email: principal.userDetails,
      password: '',
    };
    dispatch(actions.userLoaded(user));
  } catch (error) {
    dispatch(actions.authError());
  }
};

export const login = () => async dispatch => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('devUser', JSON.stringify(DEV_USER));
    dispatch(actions.userLoaded(DEV_USER));
    return;
  }
  window.location.href = '/.auth/login/aad';
};

export const logout = () => async dispatch => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.removeItem('devUser');
    dispatch(actions.logoutSuccess());
    return;
  }
  window.location.href = '/.auth/logout';
};
