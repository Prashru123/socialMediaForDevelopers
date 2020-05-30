import React, { Fragment } from 'react';
import Skills from './Skills';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img className='round-img' src={avatar} alt='' />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span> at {company}</span>}
          </p>
          <p>{location}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        {/*  want to display only 4 skills here so using slice */}
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <Skills key={index} skill={skill} />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ProfileItem;
