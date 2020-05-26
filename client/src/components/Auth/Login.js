import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../reducers/auth';
const Login = ({ login, isAuthenticated }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const { email, password } = loginData;
  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
    console.log('LOGIN SUCCESS');
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form
        className='form'
        action='dashboard.html'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
