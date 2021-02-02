import React, {useEffect} from 'react';
// import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Post from '../components/Post';
import {listPosts} from '../actions/postActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
const HomeScreen = ({match}) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const {loading, error, posts, page, pages} = postList;

  useEffect(() => {
    dispatch(listPosts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='album py-2 bg-light'>
          <div className='container'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2'>
              {posts.map((post) => (
                <div key={post._id} className='col'>
                  <Post post={post} />
                </div>
              ))}
            </div>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
