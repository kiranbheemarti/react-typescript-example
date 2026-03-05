import React from 'react';
import { Button } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from './Auth.thunks';
import { PATH } from 'src/constants/paths';

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = { login };
const connector = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connector> {}

const _Login = (props: Props) => {
  const { isAuthenticated, login } = props;

  if (isAuthenticated) {
    return <Redirect to={PATH.HOME} />;
  }
  return (
    <div className="container">
      <div className="login-form-wrap">
        <h1 className="login-form-title">LOGIN</h1>
        <div className="login-form">
          <Button
            type="primary"
            className="login-form-button"
            onClick={() => login()}
          >
            {process.env.NODE_ENV === 'development'
              ? 'Dev Login (Local)'
              : 'Sign in with Microsoft'}
          </Button>
        </div>
      </div>
    </div>
  );
};
const Login = connector(_Login);
export { Login };
