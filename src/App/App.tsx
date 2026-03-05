import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loadUser } from 'src/components/Auth/Auth.thunks';
import { Routes } from 'src/routes';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  loadUser,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connector> {}

const _App = (props: Props) => {
  const { loadUser } = props;
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return <Routes />;
};

export const App = connector(_App);
