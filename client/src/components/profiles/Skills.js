import React from 'react';

const Skills = ({ skill }) => {
  return (
    <li className='text-primary'>
      <i className='fas fa-check'></i>
      {skill}
    </li>
  );
};

export default Skills;
