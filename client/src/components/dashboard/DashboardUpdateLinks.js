import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const DashboardUpdateLinks = (props) => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn btn-light'>
        <i class='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='/addExperience' class='btn btn-light'>
        <i class='fab fa-black-tie text-primary'></i> Add Experience
      </Link>
      <Link to='/addEducation' class='btn btn-light'>
        <i class='fas fa-graduation-cap text-primary'></i> Add Education
      </Link>
    </div>
  );
};

DashboardUpdateLinks.propTypes = {};

export default DashboardUpdateLinks;
