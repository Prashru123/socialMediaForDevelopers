import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUsersProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGitHub from './ProfileGitHub';
const Profile = ({
  profile: { loading, profile },
  auth,
  getUsersProfile,
  match,
}) => {
  useEffect(() => {
    getUsersProfile(match.params.id);
  }, [getUsersProfile, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {profile.experience.length > 0 && (
              <div class='profile-exp bg-white p-2'>
                <h2 class='text-primary'>Experience</h2>
                {profile.experience.map((exp) => (
                  <ProfileExperience key={exp._id} experience={exp} />
                ))}
              </div>
            )}
            {profile.education.length > 0 && (
              <div class='profile-edu bg-white p-2'>
                <h2 class='text-primary'>Education</h2>
                {profile.education.map((edu) => (
                  <ProfileEducation key={edu._id} education={edu} />
                ))}
              </div>
            )}
            {profile.githubusername && (
              <ProfileGitHub githubuser={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getUsersProfile })(Profile);
