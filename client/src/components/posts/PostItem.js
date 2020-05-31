import React from 'react';
import Moment from 'react-moment';
import { deletePost, addLike, removeLike } from '../../actions/post';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const PostItem = ({
  auth,
  deletePost,
  addLike,
  removeLike,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img class='round-img' src={avatar} alt={name} />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='MMM D,YYYY'>{date}</Moment>
        </p>
        <button
          type='button'
          class='btn btn-light'
          onClick={() => addLike(_id)}
        >
          <i class='fas fa-thumbs-up'></i>{' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          type='button'
          class='btn btn-light'
          onClick={() => removeLike(_id)}
        >
          <i class='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/posts/${_id}`} class='btn btn-primary'>
          Discussion <span className='comment-count'>{comments.length}</span>
        </Link>
        {!auth.loading && auth.user._id === user && (
          <button
            type='button'
            class='btn btn-danger'
            onClick={() => deletePost(_id)}
          >
            <i class='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
