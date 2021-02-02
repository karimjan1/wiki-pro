import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listPostDetails} from '../actions/postActions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import TopRated from '../components/TopRated';

const PostsScreen = ({match}) => {
  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const {loading, error, post} = postDetails;

  useEffect(() => {
    dispatch(listPostDetails(match.params.id));
  }, [dispatch, match]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='container py-5 px-5 mt-5'>
            <div className='row featurette '>
              <div className='col-md-12'>
                <h2 className='featurette-heading'>
                  {post.name} <span className='text-muted'> </span>
                </h2>
                <p className='lead'>{post.description}</p>
              </div>
              <div className='col-md-12'>
                <img src={post.image} alt={post.name} className='card-img' />
              </div>
            </div>
            <hr className='featurette-divider'></hr>
            <div className='row featurette'>
              <div className='col-md-12'>
                <p className='lead'>{post.descriptionDetails}</p>
              </div>
              <div className='col-md-12'>
                <img src={post.images} alt={post.name} className='card-img' />
              </div>
            </div>
            <div className='container text-center'>
              <small>Share it</small> <br />
              <a href='www.facebook.com' className='btn btn-outline-primary'>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href='www.instagram.com'
                className='btn btn-outline-secondary ml-2'
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href='www.twitter.com'
                className='btn btn-outline-primary ml-2'
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <hr />
          </div>
        </>
      )}
      <h1 className='text-center'>Latest Posts</h1>
      <div className='container justify-content-center mr-5'>
        <div className='row'>
          <TopRated />
        </div>
      </div>
    </>
  );
};

export default PostsScreen;
