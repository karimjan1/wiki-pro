import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listPosts} from '../actions/postActions';
import RoutesContainer from '../components/RoutesContainer';
const HealthScreen = ({match}) => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const {loading, error, posts} = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <RoutesContainer>
          {posts.map((post) => (
            <>
              {post.category === 'health' ? (
                <div className='col'>
                  <div className='card shadow-sm'>
                    <img src={post.image} className='card-img' alt='img' />

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
                </div>
              ) : (
                ''
              )}
            </>
          ))}
        </RoutesContainer>
      )}
    </>
  );
};

export default HealthScreen;
