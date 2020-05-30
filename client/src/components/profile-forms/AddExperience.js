import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { addExperience } from '../../actions/profile';
import { connect } from 'react-redux';

const initialState = {
  title: '',
  company: '',
  from: '',
  current: false,
  location: '',
  to: '',
  description: '',
};
const AddExperience = ({ addExperience, history }) => {
  const [experienceData, setExperienceData] = useState(initialState);
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    title,
    company,
    from,
    current,
    location,
    to,
    description,
  } = experienceData;

  const onChange = (e) => {
    setExperienceData({ ...experienceData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(experienceData, history);
  };
  return (
    <Fragment>
      <h1 class='large text-primary'>Add An Experience</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={onSubmit}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setExperienceData({ ...experienceData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            disabled={toDateDisabled ? 'disabled' : ''}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default connect(null, { addExperience })(AddExperience);
