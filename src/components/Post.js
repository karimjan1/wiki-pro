import React from 'react';
import {Link} from 'react-router-dom';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Post = ({post}) => {
  return (
    <>
      <div className='card shadow-sm'>
        <img src={post.image} className='card-img' alt='img' />

        <div className='card-body'>
          <h4>{post.name}</h4>

          <p className='card-text'>{post.description.substring(0, 60)}...</p>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='btn-group'>
              <Link
                to={`/post/${post._id}`}
                className='btn btn-sm btn-outline-danger'
              >
                Read more...
              </Link>
            </div>
            <small className='text-muted'>
              <FontAwesomeIcon icon={faClock} /> {post.timeToRead} mins read{' '}
              <br />
              category:<span className='text-danger'>
                {' '}
                {post.category}
              </span>{' '}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
