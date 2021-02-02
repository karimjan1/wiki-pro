import React, {useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {listPosts, createPost, deletePost} from '../actions/postActions';
import {POST_CREATE_RESET} from '../constants/postConstants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
const PostListScreen = ({history, match}) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const {loading, error, posts, page, pages} = postList;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  useEffect(() => {
    dispatch({type: POST_CREATE_RESET});

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/post/${createdPost._id}/edit`);
    } else {
      dispatch(listPosts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdPost,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePost(id));
    }
  };

  const createPostHandler = () => {
    dispatch(createPost());
  };

  return (
    <>
      <Container>
        <Row className='align-items-center'>
          <Col>
            <h1>Posts</h1>
          </Col>
          <Col className='text-right'>
            <Button className='my-3' onClick={createPostHandler}>
              <FontAwesomeIcon icon={faPlus} /> Create Post
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>Description</th>
                  <th>CATEGORY</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td>{post.name}</td>
                    <td>{post.description.substring(0, 40)}</td>
                    <td>{post.category}</td>

                    <td>
                      <LinkContainer to={`/admin/post/${post._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm ml-2'
                        onClick={() => deleteHandler(post._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </Container>
    </>
  );
};

export default PostListScreen;
