import React, { Fragment } from 'react';

const ProfileAbout = ({
  profile: {
    user: { name },
    bio,
    skills,
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{name.split(' ')[0]}'s Bio</h2>
          <div className='line'></div>
        </Fragment>
      )}

      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => (
          <div className='p-1' key={index}>
            <i className='fa fa-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
