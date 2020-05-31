import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    addPost({ text });
    setText(' ');
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form className='form my-1' onSubmit={submitHandler}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Create a post'
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);
