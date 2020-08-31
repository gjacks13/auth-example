import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Placeholder from '../Placeholder';

//TODO: Remove any type for exact
const PrivateRoute = ({
  component,
  ...args
}: {
  component: React.ComponentType<object>;
  path: string;
  exact?: any;
}) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Placeholder loader="paragraph" />,
    })}
    {...args}
  />
);

export default PrivateRoute;
