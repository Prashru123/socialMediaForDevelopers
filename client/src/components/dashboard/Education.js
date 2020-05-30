import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
const Education = ({ education, deleteEducation }) => {
  const tbody = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        <Moment format='MMM D,YYYY'>{moment(edu.form)}</Moment>
        {' - '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format='MMM D,YYYY'>{moment(edu.to)}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    </Fragment>
  );
};

export default connect(null, { deleteEducation })(Education);
