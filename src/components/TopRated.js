import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import {listTopPosts} from '../actions/postActions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
const TopRated = () => {
  const dispatch = useDispatch();

  const postTopRated = useSelector((state) => state.postTopRated);
  const {loading, error, posts} = postTopRated;

  useEffect(() => {
    dispatch(listTopPosts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='container'>
          <div className='album py-2'>
            <div className='container'>
              <div className='row row-cols-1 row-cols-sm-4 row-cols-md-4'>
                {posts.map((post) => (
                  <div className='card shadow-sm mr-3 justify-content-center'>
                    <img src={post.image} className='img-fluid' alt='img' />

                    <div className='card-body'>
                      <h4>{post.name}</h4>

                      <p className='card-text'>
                        {post.description.substring(0, 60)}...
                      </p>
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
                          <FontAwesomeIcon icon={faClock} /> {post.timeToRead}{' '}
                          mins read <br />
                          category:
                          <span className='text-danger'>
                            {' '}
                            {post.category}
                          </span>{' '}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopRated;
