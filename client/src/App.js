import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { loadUser } from './actions/auth';
//utils
import setAuthToken from './utilis/setAuthToken';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
