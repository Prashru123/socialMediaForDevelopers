import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({
  experience: { company, from, to, description, location, title },
}) => {
  return (
    <Fragment>
      <div>
        <h3 className='text-dark'>{company}</h3>
        <p>
          <Moment format='MMM D,YYYY'>{moment.utc(from)}</Moment> till{' '}
          {!to ? 'Now' : <Moment format='MMM D,YYYY'>{moment.utc(to)}</Moment>}
        </p>
        <p>
          <strong>Position: </strong>
          {title}
        </p>
        <p>
          <strong>Location: </strong> {location}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </Fragment>
  );
};

export default ProfileExperience;
