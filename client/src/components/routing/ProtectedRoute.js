import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  auth: { isAuthenticated, loading },
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedRoute);
