import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
//components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import { loadUser } from './actions/auth';
//utils
import setAuthToken from './utilis/setAuthToken';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route path='/' exact component={Landing} />
          <section className='container'>
            <Alert />
            <Switch exact>
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
              <Route path='/profiles' exact component={Profiles} />
              <Route path='/profile/:id' exact component={Profile} />
              <ProtectedRoute path='/dashboard' exact component={Dashboard} />
              <ProtectedRoute
                path='/create-profile'
                exact
                component={CreateProfile}
              />
              <ProtectedRoute
                path='/add-education'
                exact
                component={AddEducation}
              />
              <ProtectedRoute
                path='/edit-profile'
                exact
                component={EditProfile}
              />
              <ProtectedRoute
                path='/add-experience'
                exact
                component={AddExperience}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
