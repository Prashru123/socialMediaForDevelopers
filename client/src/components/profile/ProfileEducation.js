import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation = ({
  education: { school, degree, from, to, description, fieldofstudy },
}) => {
  return (
    <Fragment>
      <div>
        <h3 className='text-dark'>{school}</h3>
        <p>
          <Moment format='MMM D,YYYY'>{moment.utc(from)}</Moment> till{' '}
          {!to ? 'Now' : <Moment format='MMM D,YYYY'>{moment.utc(to)}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field of study: </strong> {fieldofstudy}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </Fragment>
  );
};

export default ProfileEducation;
