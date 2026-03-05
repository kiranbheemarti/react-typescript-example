import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { PATH } from 'src/constants/paths';

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const connector = connect(mapStateToProps);
interface Props extends ConnectedProps<typeof connector> {}

const _Register = (props: Props) => {
  if (props.isAuthenticated) {
    return <Redirect to={PATH.HOME} />;
  }
  window.location.href = '/.auth/login/aad';
  return null;
};
const Register = connector(_Register);
export { Register };
