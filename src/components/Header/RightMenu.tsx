import React from 'react';
import { Menu, Grid } from 'antd';
import { NavLink } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { login, logout } from 'src/components/Auth/Auth.thunks';
import { connect, ConnectedProps } from 'react-redux';
import { PATH } from 'src/constants/paths';

const { useBreakpoint } = Grid;

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user as IUser,
});
const mapDispatchToProps = { login, logout };

const connector = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connector> {}

const _RightMenu = (props: Props) => {
  const { isAuthenticated, login, logout, user } = props;
  const { md } = useBreakpoint();
  const guestLinks = (
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <Menu.Item key="menukey-login" onClick={() => login()}>
        <span className="navbar-item primary">Sign In</span>
      </Menu.Item>
    </Menu>
  );
  const authLinks = (
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <Menu.Item key="menukey-profile">
        <NavLink className="navbar-item primary" to={PATH.PROFILE}>
          Hi <strong>{user.username}</strong>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="menukey-logout" onClick={() => logout()}>
        <span className="navbar-item primary">
          <LoginOutlined />
          Log Out
        </span>
      </Menu.Item>
    </Menu>
  );
  return <>{isAuthenticated ? authLinks : guestLinks}</>;
};

const RightMenu = connector(_RightMenu);
export { RightMenu };
