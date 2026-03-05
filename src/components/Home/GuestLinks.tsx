import { Button } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { login } from 'src/components/Auth/Auth.thunks';

const mapDispatchToProps = { login };
const connector = connect(undefined, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connector> {}

const _GuestLinks = (props: Props) => {
  return (
    <div className="homepage">
      <div className="home-overlay">
        <div className="container homepage-inner">
          <div className="home-content">
            <h1>React Typescript Template</h1>
            <p>Please sign in with your Microsoft account.</p>
            <div className="home-button-wrap">
              <Button type="primary" size="large" onClick={() => props.login()}>
                {process.env.NODE_ENV === 'development'
                  ? 'Dev Login (Local)'
                  : 'Sign in with Microsoft'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GuestLinks = connector(_GuestLinks);
